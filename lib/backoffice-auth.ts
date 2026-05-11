import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "adiki_backoffice_session";
const SESSION_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  role: "admin";
  expiresAt: number;
};

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function sign(value: string) {
  const secret = process.env.BACKOFFICE_SESSION_SECRET;

  if (!secret) {
    throw new Error("BACKOFFICE_SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(24);
  const hash = scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`;
}

export function verifyBackofficePassword(password: string) {
  const passwordHash = process.env.BACKOFFICE_PASSWORD_HASH;

  if (!passwordHash) {
    throw new Error("BACKOFFICE_PASSWORD_HASH is not configured.");
  }

  const [algorithm, saltValue, expectedValue] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !saltValue || !expectedValue) {
    throw new Error("BACKOFFICE_PASSWORD_HASH has an invalid format.");
  }

  const expected = Buffer.from(expectedValue, "base64url");
  const actual = scryptSync(password, Buffer.from(saltValue, "base64url"), expected.length);

  return timingSafeEqual(actual, expected);
}

export async function createBackofficeSession() {
  const cookieStore = await cookies();
  const payload: SessionPayload = {
    role: "admin",
    expiresAt: Date.now() + SESSION_SECONDS * 1000
  };
  const encodedPayload = base64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  cookieStore.set(COOKIE_NAME, `${encodedPayload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS
  });
}

export async function clearBackofficeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getBackofficeSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;

  if (!value) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature || !safeEqual(sign(encodedPayload), signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;

    if (payload.role !== "admin" || payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function requireBackofficeSession() {
  const session = await getBackofficeSession();

  if (!session) {
    redirect("/backoffice/login");
  }

  return session;
}

export function getBackofficeApiKey() {
  const adminKey = process.env.BACKOFFICE_API_KEY;

  if (!adminKey) {
    throw new Error("BACKOFFICE_API_KEY is not configured.");
  }

  return adminKey;
}
