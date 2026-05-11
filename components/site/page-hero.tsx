import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

type PageHeroProps = {
  title: string;
  description: string;
  image?: string;
  compact?: boolean;
};

export function PageHero({ title, description, image, compact }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-green)] pt-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(232,171,39,0.24),transparent_28rem),linear-gradient(135deg,rgba(8,45,29,0.98),rgba(16,35,63,0.94))]" />
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-18 mix-blend-luminosity"
          priority
        />
      ) : null}
      <div className="site-container relative z-10 grid gap-10 pb-20 pt-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <Reveal className={compact ? "max-w-3xl" : "max-w-4xl"}>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-balance md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="inverse">
              <a href="/contato">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="hidden rounded-md border border-white/12 bg-white/8 p-5 backdrop-blur lg:block">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--brand-gold-soft)]">Resposta comercial</p>
          <p className="mt-4 text-4xl font-semibold">24h</p>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Pedidos tratados com foco em empresas, instituições e equipas que precisam de previsibilidade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
