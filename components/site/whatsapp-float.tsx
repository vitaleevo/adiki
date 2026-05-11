import { MessageCircle } from "lucide-react";

import { site } from "@/lib/site-data";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Olá, gostaria de solicitar um orçamento para material de escritório.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a ADIKI ALVANIR no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#24d366] text-white shadow-[0_18px_45px_rgba(36,211,102,0.35)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(36,211,102,0.42)]"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
