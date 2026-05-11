"use server";

import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "@/convex/_generated/api";
import {
  clearBackofficeSession,
  createBackofficeSession,
  getBackofficeApiKey,
  requireBackofficeSession,
  verifyBackofficePassword
} from "@/lib/backoffice-auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || undefined;
}

function getOptionalId(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || undefined;
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(getString(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function getTimestamp(formData: FormData, key: string, fallback = Date.now()) {
  const rawValue = getString(formData, key);

  if (!rawValue) {
    return fallback;
  }

  const numericValue = Number(rawValue);

  if (Number.isFinite(numericValue)) {
    return numericValue;
  }

  const dateValue = Date.parse(rawValue);
  return Number.isFinite(dateValue) ? dateValue : fallback;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function loginBackofficeAction(formData: FormData) {
  const password = getString(formData, "password");

  if (!verifyBackofficePassword(password)) {
    redirect("/backoffice/login?error=1");
  }

  await createBackofficeSession();
  redirect("/backoffice");
}

export async function logoutBackofficeAction() {
  await clearBackofficeSession();
  redirect("/backoffice/login");
}

export async function generateMediaUploadUrlAction() {
  await requireBackofficeSession();
  return await fetchMutation(api.backoffice.generateUploadUrl, { adminKey: getBackofficeApiKey() });
}

export async function createMediaAssetAction(input: {
  storageId: string;
  filename: string;
  alt: string;
  kind: "hero" | "product" | "category" | "blog" | "logo" | "general";
  contentType: string;
  size: number;
}) {
  await requireBackofficeSession();

  await fetchMutation(api.backoffice.createMediaAsset, {
    adminKey: getBackofficeApiKey(),
    storageId: input.storageId as never,
    filename: input.filename.slice(0, 180),
    alt: input.alt.slice(0, 180),
    kind: input.kind,
    contentType: input.contentType.slice(0, 80),
    size: input.size
  });

  revalidatePath("/backoffice/media");
  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath("/blog");
}

export async function archiveMediaAssetAction(formData: FormData) {
  await requireBackofficeSession();
  await fetchMutation(api.backoffice.archiveMediaAsset, {
    adminKey: getBackofficeApiKey(),
    id: getString(formData, "id") as never
  });
  revalidatePath("/backoffice/media");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireBackofficeSession();
  await fetchMutation(api.backoffice.updateLeadStatus, {
    adminKey: getBackofficeApiKey(),
    id: getString(formData, "id") as never,
    status: getString(formData, "status") as "new" | "contacted" | "quoted" | "archived"
  });
  revalidatePath("/backoffice");
  revalidatePath("/backoffice/leads");
}

export async function upsertProductAction(formData: FormData) {
  await requireBackofficeSession();
  const name = getString(formData, "name");
  const slug = getOptionalString(formData, "slug") ?? slugify(name);

  await fetchMutation(api.backoffice.upsertProduct, {
    adminKey: getBackofficeApiKey(),
    id: getOptionalId(formData, "id") as never,
    name,
    slug,
    category: getString(formData, "category"),
    description: getString(formData, "description"),
    imageAssetId: getOptionalId(formData, "imageAssetId") as never,
    fallbackImage: getOptionalString(formData, "fallbackImage"),
    active: formData.get("active") === "on",
    sortOrder: getNumber(formData, "sortOrder")
  });

  revalidatePath("/backoffice/produtos");
  revalidatePath("/");
  revalidatePath("/produtos");
}

export async function upsertCategoryAction(formData: FormData) {
  await requireBackofficeSession();
  const name = getString(formData, "name");
  const slug = getOptionalString(formData, "slug") ?? slugify(name);

  await fetchMutation(api.backoffice.upsertCategory, {
    adminKey: getBackofficeApiKey(),
    id: getOptionalId(formData, "id") as never,
    name,
    slug,
    description: getString(formData, "description"),
    icon: getOptionalString(formData, "icon") ?? "Boxes",
    imageAssetId: getOptionalId(formData, "imageAssetId") as never,
    fallbackImage: getOptionalString(formData, "fallbackImage"),
    active: formData.get("active") === "on",
    sortOrder: getNumber(formData, "sortOrder")
  });

  revalidatePath("/backoffice/categorias");
  revalidatePath("/");
  revalidatePath("/produtos");
}

export async function upsertBlogPostAction(formData: FormData) {
  await requireBackofficeSession();
  const title = getString(formData, "title");
  const slug = getOptionalString(formData, "slug") ?? slugify(title);

  await fetchMutation(api.backoffice.upsertBlogPost, {
    adminKey: getBackofficeApiKey(),
    id: getOptionalId(formData, "id") as never,
    title,
    slug,
    excerpt: getString(formData, "excerpt"),
    body: getOptionalString(formData, "body"),
    category: getString(formData, "category"),
    readTime: getOptionalString(formData, "readTime") ?? "4 min",
    imageAssetId: getOptionalId(formData, "imageAssetId") as never,
    fallbackImage: getOptionalString(formData, "fallbackImage"),
    published: formData.get("published") === "on",
    publishedAt: getTimestamp(formData, "publishedAt", Date.now())
  });

  revalidatePath("/backoffice/blog");
  revalidatePath("/");
  revalidatePath("/blog");
}

export async function upsertSettingsAction(formData: FormData) {
  await requireBackofficeSession();
  const keys = ["phone", "whatsapp", "email", "address", "facebook", "instagram", "linkedin"];

  for (const key of keys) {
    await fetchMutation(api.backoffice.upsertSetting, {
      adminKey: getBackofficeApiKey(),
      key,
      value: getString(formData, key)
    });
  }

  revalidatePath("/backoffice/settings");
}
