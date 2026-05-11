import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Button } from "@/components/ui/button";
import { getPublicContent } from "@/lib/public-content";
import { site, values } from "@/lib/site-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Conheça a ADIKI ALVANIR Angola, empresa focada no fornecimento profissional de material gastável de escritório."
};

export default async function AboutPage() {
  const { images } = await getPublicContent();

  return (
    <main>
      <PageHero
        title="Uma marca angolana preparada para servir empresas com rigor."
        description="A ADIKI ALVANIR Angola nasceu para simplificar o abastecimento de escritório com uma abordagem moderna, comercial e orientada à confiança."
        image={images.meeting}
      />

      <section className="section-pad">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-[var(--brand-gold)]" />
            <Image
              src={images.office}
              alt="Ambiente empresarial moderno"
              width={1100}
              height={900}
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_90px_rgba(16,35,63,0.14)]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader
              label="História"
              title="Organização, qualidade e resposta empresarial."
              description="Atuamos como fornecedor institucional para empresas que precisam de materiais confiáveis e processos simples. O nosso posicionamento une catálogo visual, atendimento direto e distribuição organizada."
            />
            <div className="mt-8 grid gap-4">
              {[
                "Foco em material gastável e soluções de escritório.",
                "Atendimento consultivo para compras empresariais.",
                "Processo comercial orientado a orçamento e WhatsApp.",
                "Imagem premium alinhada à confiança que o mercado exige."
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-7 text-[var(--brand-muted)]">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-gold-dark)]" />
                  {item}
                </div>
              ))}
            </div>
            <Button asChild className="mt-8" variant="green">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                Falar com a equipa
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-soft)]">
        <div className="site-container">
          <SectionHeader
            align="center"
            label="Identidade institucional"
            title="Missão, visão e valores que sustentam a operação."
            description="A marca foi estruturada para transmitir solidez, eficiência e proximidade com o cliente empresarial."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Reveal className="premium-card rounded-lg p-7">
              <h3 className="font-display text-2xl font-semibold text-[var(--brand-green)]">Missão</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
                Fornecer material gastável de escritório com qualidade, rapidez e atendimento profissional,
                ajudando empresas a manterem rotinas produtivas e bem organizadas.
              </p>
            </Reveal>
            <Reveal delay={0.05} className="premium-card rounded-lg p-7">
              <h3 className="font-display text-2xl font-semibold text-[var(--brand-green)]">Visão</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
                Ser reconhecida como uma referência angolana em fornecimento corporativo de escritório,
                combinando presença local com padrão visual e operacional premium.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="premium-card rounded-lg p-7">
              <h3 className="font-display text-2xl font-semibold text-[var(--brand-green)]">Compromisso</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
                Tratar cada pedido com clareza, cumprimento de prazos, comunicação responsável e foco na
                continuidade operacional dos nossos clientes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-green)] text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeader
            inverse
            label="Valores"
            title="Uma cultura comercial feita para relações duradouras."
            description="A empresa trabalha para ser lembrada pela qualidade da resposta e pela tranquilidade que entrega às equipas de compra."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05} className="dark-card rounded-lg p-6">
                <value.icon className="h-7 w-7 text-[var(--brand-gold-soft)]" />
                <h3 className="mt-5 font-display text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
