"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site-data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="premium-card rounded-lg p-5 md:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Nome</span>
          <Input required placeholder="O seu nome" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Empresa</span>
          <Input placeholder="Nome da empresa" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Telefone</span>
          <Input required placeholder="+244 900 000 000" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Email</span>
          <Input type="email" placeholder="email@empresa.com" />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Pedido</span>
        <Textarea required placeholder="Descreva os produtos, quantidades ou necessidades da sua empresa." />
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg">
          <Send className="h-4 w-4" />
          Enviar pedido
        </Button>
        <Button asChild type="button" size="lg" variant="outline">
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
            Enviar via WhatsApp
          </a>
        </Button>
      </div>
      {sent ? (
        <p className="mt-4 rounded-md bg-[rgba(232,171,39,0.14)] px-4 py-3 text-sm font-semibold text-[var(--brand-green)]">
          Pedido registado no website. Para envio imediato, use também o WhatsApp comercial.
        </p>
      ) : null}
    </form>
  );
}
