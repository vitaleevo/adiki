import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

type CategoryCardProps = {
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
  delay?: number;
};

export function CategoryCard({ name, description, image, icon: Icon, delay = 0 }: CategoryCardProps) {
  return (
    <Reveal delay={delay} className="group">
      <Link
        href="/produtos"
        className="premium-card block h-full overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(16,35,63,0.12)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={`Categoria ${name}`}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,45,29,0.82)] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-white/92 text-[var(--brand-green)] shadow-lg">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-semibold text-[var(--brand-green)]">{name}</h3>
            <ArrowRight className="mt-1 h-4 w-4 text-[var(--brand-gold-dark)] transition group-hover:translate-x-1" />
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{description}</p>
        </div>
      </Link>
    </Reveal>
  );
}

type ProductCardProps = {
  name: string;
  category: string;
  description: string;
  image: string;
  delay?: number;
};

export function ProductCard({ name, category, description, image, delay = 0 }: ProductCardProps) {
  const message = `Olá, gostaria de solicitar orçamento para: ${name}.`;

  return (
    <Reveal delay={delay} className="group h-full">
      <article className="premium-card flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(16,35,63,0.12)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-soft)]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-[var(--brand-green)] shadow-sm">
            {category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold text-[var(--brand-green)]">{name}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-[var(--brand-muted)]">{description}</p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Pedir orçamento
            </a>
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
};

export function ServiceCard({ title, description, icon: Icon, delay = 0 }: ServiceCardProps) {
  return (
    <Reveal delay={delay} className="premium-card rounded-lg p-6 transition duration-300 hover:-translate-y-1">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[rgba(232,171,39,0.14)] text-[var(--brand-gold-dark)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold text-[var(--brand-green)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{description}</p>
    </Reveal>
  );
}

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  delay?: number;
};

export function BlogCard({ slug, title, excerpt, category, date, readTime, image, delay = 0 }: BlogCardProps) {
  return (
    <Reveal delay={delay}>
      <article className="premium-card group overflow-hidden rounded-lg">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 28vw, 90vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--brand-muted)]">
            <span className="rounded-full bg-[rgba(232,171,39,0.14)] px-3 py-1 text-[var(--brand-green)]">{category}</span>
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-[var(--brand-green)]">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{excerpt}</p>
          <Link href={`/blog#${slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-green)]">
            Ler artigo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
