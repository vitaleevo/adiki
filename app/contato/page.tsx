import type { Metadata } from "next";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { contactCards, imageLibrary, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a ADIKI ALVANIR Angola para solicitar orçamento de material gastável de escritório."
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Fale connosco e receba uma proposta profissional."
        description="Use o formulário ou WhatsApp para solicitar orçamento, tirar dúvidas comerciais e planear o abastecimento da sua empresa."
        image={imageLibrary.meeting}
      />

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeader
              label="Contato"
              title="Canais diretos para atendimento comercial."
              description="A página foi desenhada para conversão, com informação clara e ações rápidas para orçamento."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactCards.map((card, index) => (
                <Reveal key={card.label} delay={index * 0.04}>
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                    className="premium-card block rounded-lg p-5 transition hover:-translate-y-1"
                  >
                    <card.icon className="h-6 w-6 text-[var(--brand-gold-dark)]" />
                    <p className="mt-4 text-sm font-semibold text-[var(--brand-muted)]">{card.label}</p>
                    <p className="mt-1 text-sm font-bold leading-6 text-[var(--brand-green)]">{card.value}</p>
                  </a>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { href: site.socials.facebook, icon: Facebook, label: "Facebook" },
                { href: site.socials.instagram, icon: Instagram, label: "Instagram" },
                { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--brand-line)] bg-white text-[var(--brand-green)] transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-dark)]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-soft)]">
        <div className="site-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader
            label="Localização"
            title="Presença comercial em Luanda, pronta para atender empresas."
            description="Mapa indicativo para reforço institucional. O endereço final pode ser ajustado antes da produção."
          />
          <Reveal className="premium-card overflow-hidden rounded-[1.5rem]">
            <div className="flex items-center gap-3 border-b border-[var(--brand-line)] p-5">
              <MapPin className="h-5 w-5 text-[var(--brand-gold-dark)]" />
              <p className="text-sm font-semibold text-[var(--brand-green)]">{site.address}</p>
            </div>
            <iframe
              title="Mapa de Luanda"
              src="https://www.google.com/maps?q=Luanda%20Angola&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
