"use server";

import { fetchMutation } from "convex/nextjs";
import { headers } from "next/headers";

import { api } from "@/convex/_generated/api";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emptyState: LeadFormState = { status: "idle", message: "" };

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeSingleLine(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeMessage(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").slice(0, 1200);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitLeadRequest(previousState: LeadFormState = emptyState, formData: FormData) {
  void previousState;

  const honeypot = getString(formData, "website");

  if (honeypot) {
    return {
      status: "success",
      message: "Pedido recebido. A nossa equipa comercial vai analisar e responder brevemente."
    } satisfies LeadFormState;
  }

  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return {
      status: "error",
      message: "Convex ainda não está configurado neste ambiente. Defina NEXT_PUBLIC_CONVEX_URL e tente novamente."
    } satisfies LeadFormState;
  }

  const name = normalizeSingleLine(getString(formData, "name"), 120);
  const company = normalizeSingleLine(getString(formData, "company"), 140);
  const phone = normalizeSingleLine(getString(formData, "phone"), 40);
  const email = normalizeSingleLine(getString(formData, "email"), 160).toLowerCase();
  const message = normalizeMessage(getString(formData, "message"));
  const source = normalizeSingleLine(getString(formData, "source") || "contact-form", 80);

  if (name.length < 2 || phone.length < 6 || message.length < 10) {
    return {
      status: "error",
      message: "Preencha nome, telefone e pedido com informação suficiente para a equipa comercial responder."
    } satisfies LeadFormState;
  }

  if (email && !isValidEmail(email)) {
    return {
      status: "error",
      message: "Informe um email válido ou deixe o campo em branco."
    } satisfies LeadFormState;
  }

  const headerStore = await headers();

  try {
    await fetchMutation(api.leads.create, {
      name,
      company: company || undefined,
      phone,
      email: email || undefined,
      message,
      source,
      userAgent: headerStore.get("user-agent")?.slice(0, 240)
    });

    return {
      status: "success",
      message: "Pedido registado com sucesso. A nossa equipa comercial vai responder brevemente."
    } satisfies LeadFormState;
  } catch {
    return {
      status: "error",
      message: "Não foi possível registar o pedido agora. Use o WhatsApp comercial ou tente novamente dentro de instantes."
    } satisfies LeadFormState;
  }
}
