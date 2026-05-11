import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/site/cards";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Button } from "@/components/ui/button";
import { getPublicContent } from "@/lib/public-content";
import { serviceProcess, services, site } from "@/lib/site-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Fornecimento empresarial, distribuição, entregas programadas e contratos corporativos para material de escritório."
};

export default async function ServicesPage() {
  const { images } = await getPublicContent();

  return (
    <main>
      <PageHero
        title="Serviços desenhados para compras empresariais sem fricção."
        description="Apoiamos empresas com fornecimento, distribuição, entregas programadas e contratos corporativos para manter o escritório sempre operacional."
        image={images.logistics}
      />

      <section className="section-pad">
        <div className="site-container">
          <SectionHeader
            align="center"
            label="Soluções"
            title="Operação comercial preparada para reposição contínua."
            description="Cada serviço foi pensado para reduzir interrupções, melhorar previsibilidade e profissionalizar a compra de material gastável."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-soft)]">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <SectionHeader
              label="Como trabalhamos"
              title="Da necessidade ao abastecimento com controlo."
              description="O processo evita compras dispersas e transforma pedidos de escritório em uma rotina profissional, acompanhada e documentada."
            />
            <div className="mt-8 grid gap-4">
              {serviceProcess.map((step, index) => (
                <div key={step.title} className="premium-card rounded-lg p-5">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--brand-green)] font-display text-sm font-bold text-[var(--brand-gold)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--brand-green)]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem]">
            <Image
              src={images.business}
              alt="Equipa empresarial em planeamento de fornecimento"
              width={1200}
              height={920}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,45,29,0.72)] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/92 p-6 backdrop-blur">
              <p className="font-display text-2xl font-semibold text-[var(--brand-green)]">Contratos B2B</p>
              <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                Listas aprovadas, periodicidade definida e contacto comercial para reposição recorrente.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-green)] text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            inverse
            label="Para quem"
            title="Empresas que precisam comprar melhor, não apenas comprar mais."
            description="O modelo atende escritórios, escolas, clínicas, consultorias, instituições e equipas com consumo recorrente."
          />
          <Reveal className="grid gap-4 md:grid-cols-2">
            {["Escritórios administrativos", "Instituições de ensino", "Clínicas e serviços", "Departamentos corporativos"].map(
              (item) => (
                <div key={item} className="dark-card flex items-center gap-3 rounded-lg p-5 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-gold-soft)]" />
                  {item}
                </div>
              )
            )}
          </Reveal>
          <div className="lg:col-start-2">
            <Button asChild>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                Solicitar proposta de serviço
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
