import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Truck
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { BlogCard, CategoryCard, ProductCard, ServiceCard } from "@/components/site/cards";
import { CtaSection } from "@/components/site/cta-section";
import { SectionHeader } from "@/components/site/section-header";
import { Button } from "@/components/ui/button";
import {
  advantages,
  blogPosts,
  categories,
  imageLibrary,
  partners,
  products,
  services,
  site,
  testimonials,
  warehouseStats
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden bg-[var(--brand-green)] pt-28 text-white">
        <Image
          src={imageLibrary.hero}
          alt="Escritório moderno abastecido com material profissional"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-34"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,45,29,0.95)_0%,rgba(8,45,29,0.84)_42%,rgba(16,35,63,0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-green)] to-transparent" />

        <div className="site-container relative z-10 grid min-h-[calc(100vh-7rem)] gap-12 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="min-w-0">
            <h1 className="max-w-full break-words font-display text-[2rem] font-semibold leading-[1.12] md:max-w-4xl md:text-6xl md:leading-[1.04] xl:text-7xl">
              <span className="block md:inline">Tudo que o seu</span>
              <span className="block md:inline"> escritório precisa</span>
              <span className="block md:inline"> em um só lugar.</span>
            </h1>
            <p className="mt-7 max-w-[22rem] break-words text-base leading-8 text-white/76 md:max-w-2xl md:text-lg">
              Fornecimento premium de material gastável, papelaria, consumíveis e soluções de escritório para
              empresas que valorizam organização, rapidez e confiança.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contato">
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {warehouseStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/12 bg-white/8 p-4 backdrop-blur">
                  <p className="font-display text-2xl font-semibold text-[var(--brand-gold-soft)]">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/62">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14} className="relative min-w-0">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(232,171,39,0.22),transparent_62%)] blur-xl" />
            <div className="dark-card relative overflow-hidden rounded-[2rem] p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={imageLibrary.supplies}
                  alt="Material de escritório organizado para empresas"
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,45,29,0.78)] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/14 bg-white/12 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[var(--brand-gold)] text-[var(--brand-green)]">
                      <PackageCheck className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold">Cotação empresarial</p>
                      <p className="text-sm text-white/70">Sem carrinho. Sem checkout. Resposta direta.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-green)] text-white">
        <div className="site-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionHeader
              inverse
              label="Sobre a empresa"
              title="Uma parceira sólida para abastecimento corporativo."
              description="A ADIKI ALVANIR Angola atua no comércio e distribuição de material gastável de escritório com foco em atendimento empresarial, resposta clara e apresentação profissional."
            />
            <Button asChild variant="inverse" className="mt-8">
              <Link href="/sobre">
                Conhecer a empresa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="dark-card rounded-lg p-6">
                <item.icon className="h-7 w-7 text-[var(--brand-gold-soft)]" />
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <SectionHeader
            align="center"
            label="Categorias"
            title="Catálogo visual para compras empresariais recorrentes."
            description="Produtos organizados por necessidade para facilitar pedidos, reposição e solicitação de orçamento."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.name} {...category} delay={(index % 3) * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-soft)]">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <SectionHeader
              label="Produtos em destaque"
              title="Itens essenciais para manter o escritório a funcionar."
              description="Uma seleção inicial de linhas de produto para orçamentos rápidos. O catálogo pode ser adaptado à necessidade da sua empresa."
            />
            <div className="flex lg:justify-end">
              <Button asChild variant="green">
                <Link href="/produtos">
                  Ver catálogo completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} {...product} delay={index * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <SectionHeader
            align="center"
            label="Serviços"
            title="Mais do que vender produtos: estruturamos abastecimento."
            description="A empresa não depende de carrinho ou checkout. O contacto comercial é pensado para orientar, cotar e entregar com precisão."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-10">
        <div className="site-container">
          <div className="marquee overflow-hidden border-y border-[var(--brand-line)] py-7">
            <div className="marquee-track flex w-max gap-4">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="flex h-16 w-48 shrink-0 items-center justify-center rounded-md border border-[var(--brand-line)] bg-[var(--brand-soft)] px-6 font-display text-sm font-bold text-[var(--brand-green)]"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-green)] text-white">
        <div className="site-container">
          <SectionHeader
            inverse
            align="center"
            label="Confiança"
            title="Atendimento que empresas conseguem medir."
            description="Depoimentos fictícios realistas para representar o posicionamento desejado: rapidez, organização e compromisso."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 0.05} className="dark-card rounded-lg p-7">
                <Sparkles className="h-6 w-6 text-[var(--brand-gold-soft)]" />
                <blockquote className="mt-6 text-base leading-8 text-white/78">“{testimonial.quote}”</blockquote>
                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="font-display font-semibold">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-white/56">{testimonial.company}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeader
                label="Processo"
                title="Fluxo simples para compras corporativas."
                description="A jornada foi pensada para gerar leads qualificados, não para simular ecommerce. O pedido começa pelo orçamento e segue com acompanhamento humano."
              />
              <div className="mt-8 grid gap-4">
                {["Envie a lista de materiais", "Receba orientação e proposta", "Confirme prazos e condições", "Acompanhe a entrega"].map(
                  (step) => (
                    <div key={step} className="flex items-center gap-3 text-sm font-semibold text-[var(--brand-green)]">
                      <CheckCircle2 className="h-5 w-5 text-[var(--brand-gold-dark)]" />
                      {step}
                    </div>
                  )
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem]">
              <Image
                src={imageLibrary.logistics}
                alt="Logística organizada para entrega de material de escritório"
                width={1200}
                height={820}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg bg-white/90 p-5 shadow-2xl backdrop-blur md:grid-cols-3">
                {[
                  { icon: Truck, title: "Rota" },
                  { icon: BadgeCheck, title: "Conferência" },
                  { icon: CheckCircle2, title: "Entrega" }
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3 text-sm font-bold text-[var(--brand-green)]">
                    <item.icon className="h-5 w-5 text-[var(--brand-gold-dark)]" />
                    {item.title}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-soft)]">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <SectionHeader
              label="Blog"
              title="Conteúdo para compras e gestão de escritório."
              description="Artigos pensados para reforçar autoridade da marca e ajudar empresas a organizar abastecimento."
            />
            <div className="flex lg:justify-end">
              <Button asChild variant="green">
                <Link href="/blog">
                  Ver blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.slug} {...post} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
