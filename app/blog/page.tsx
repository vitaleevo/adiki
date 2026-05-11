import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/site/cards";
import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Button } from "@/components/ui/button";
import { getPublicContent } from "@/lib/public-content";
import { imageLibrary, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre gestão de escritório, material gastável, compras empresariais, logística e produtividade."
};

export const revalidate = 60;

export default async function BlogPage() {
  const { blogPosts } = await getPublicContent();
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const featured = blogPosts[0];

  return (
    <main>
      <PageHero
        title="Conhecimento prático para escritórios mais organizados."
        description="Conteúdos fictícios realistas para reforçar autoridade, SEO e confiança em torno de compras empresariais e abastecimento de escritório."
        image={imageLibrary.desk}
      />

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeader
              label="Artigos"
              title="Guias rápidos para comprar, organizar e abastecer melhor."
              description="O blog apoia o posicionamento institucional da marca e ajuda potenciais clientes a perceberem valor antes do contacto."
            />

            <Reveal className="premium-card mt-10 overflow-hidden rounded-[1.5rem]" id={featured.slug}>
              <div className="grid lg:grid-cols-[1fr_0.86fr]">
                <div className="relative min-h-80">
                  <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
                </div>
                <div className="p-7 md:p-10">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--brand-muted)]">
                    <span className="rounded-full bg-[rgba(232,171,39,0.14)] px-3 py-1 text-[var(--brand-green)]">
                      Destaque
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-[var(--brand-green)]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{featured.excerpt}</p>
                  <div className="mt-7 space-y-3 text-sm leading-7 text-[var(--brand-muted)]">
                    <p>
                      Empresas com consumo recorrente precisam de uma lista base de materiais, periodicidade de
                      reposição e um fornecedor que responda com clareza.
                    </p>
                    <p>
                      Separar compras por categoria, controlar quantidades médias e pedir orçamento antes da rutura
                      reduz urgências, desperdício e decisões de última hora.
                    </p>
                  </div>
                  <Button asChild className="mt-7" variant="green">
                    <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                      Pedir apoio comercial
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {blogPosts.slice(1).map((post, index) => (
                <BlogCard key={post.slug} {...post} delay={index * 0.05} />
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="premium-card rounded-lg p-5">
              <h3 className="font-display text-lg font-semibold text-[var(--brand-green)]">Pesquisar</h3>
              <label className="relative mt-4 block">
                <span className="sr-only">Pesquisar no blog</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]" />
                <input
                  className="h-12 w-full rounded-md border border-[var(--brand-line)] bg-white pl-11 pr-4 text-sm outline-none focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.16)]"
                  placeholder="Tema ou categoria"
                />
              </label>
            </div>
            <div className="premium-card rounded-lg p-5">
              <h3 className="font-display text-lg font-semibold text-[var(--brand-green)]">Categorias</h3>
              <div className="mt-4 grid gap-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="flex items-center justify-between rounded-md border border-[var(--brand-line)] px-4 py-3 text-sm font-semibold text-[var(--brand-green)] transition hover:border-[var(--brand-gold)]"
                  >
                    {category}
                    <BookOpen className="h-4 w-4 text-[var(--brand-gold-dark)]" />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-[var(--brand-green)] p-6 text-white">
              <p className="font-display text-xl font-semibold">Precisa de uma lista de compra?</p>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Envie o perfil da sua empresa e receba orientação para montar um pedido objetivo.
              </p>
              <Button asChild className="mt-5 w-full">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
