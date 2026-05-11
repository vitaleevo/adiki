import { ArrowRight, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

export function CtaSection() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-[var(--brand-green)] px-6 py-12 text-white shadow-[0_30px_90px_rgba(8,45,29,0.26)] md:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(232,171,39,0.28),transparent_22rem),linear-gradient(135deg,rgba(8,45,29,0.96),rgba(16,35,63,0.92))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--brand-gold-soft)]">
                Cotação rápida e profissional
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-balance md:text-5xl">
                Precisa abastecer o escritório com segurança e previsibilidade?
              </h2>
              <p className="mt-5 text-base leading-8 text-white/74">
                Envie a sua lista de necessidades e receba uma proposta organizada, com produtos adequados,
                prazos e orientação comercial.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Falar agora
                </a>
              </Button>
              <Button asChild size="lg" variant="inverse">
                <a href="/contato">
                  Formulário de contato
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
