"use client";

import { Send } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

import { submitLeadRequest, type LeadFormState } from "@/app/actions/lead-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site-data";

const initialState: LeadFormState = {
  status: "idle",
  message: ""
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLeadRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="premium-card rounded-lg p-5 md:p-7"
    >
      <input type="hidden" name="source" value="contact-page" />
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Nome</span>
          <Input required name="name" placeholder="O seu nome" minLength={2} maxLength={120} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Empresa</span>
          <Input name="company" placeholder="Nome da empresa" maxLength={140} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Telefone</span>
          <Input required name="phone" placeholder="+244 900 000 000" minLength={6} maxLength={40} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Email</span>
          <Input name="email" type="email" placeholder="email@empresa.com" maxLength={160} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Pedido</span>
        <Textarea
          required
          name="message"
          placeholder="Descreva os produtos, quantidades ou necessidades da sua empresa."
          minLength={10}
          maxLength={1200}
        />
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "A enviar..." : "Enviar pedido"}
        </Button>
        <Button asChild type="button" size="lg" variant="outline">
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
            Enviar via WhatsApp
          </a>
        </Button>
      </div>
      {state.status !== "idle" ? (
        <p
          aria-live="polite"
          className={
            state.status === "success"
              ? "mt-4 rounded-md bg-[rgba(232,171,39,0.14)] px-4 py-3 text-sm font-semibold text-[var(--brand-green)]"
              : "mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
