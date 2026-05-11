import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { navItems, products, site } from "@/lib/site-data";

export function Footer() {
  const productCategories = Array.from(new Set(products.map((product) => product.category))).slice(0, 6);

  return (
    <footer className="bg-[var(--brand-green)] text-white">
      <div className="site-container grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-white/12 bg-white/8">
              <Image src="/brand/adiki-logo-dark.png" alt={site.name} fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold">ADIKI ALVANIR</span>
              <span className="block text-xs font-semibold tracking-[0.24em] text-[var(--brand-gold-soft)]">
                ANGOLA
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">{site.description}</p>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--brand-gold)] px-5 py-3 text-sm font-bold text-[var(--brand-green)] transition hover:bg-[var(--brand-gold-soft)]"
          >
            Solicitar orçamento
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase text-[var(--brand-gold-soft)]">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase text-[var(--brand-gold-soft)]">Produtos</h3>
          <ul className="mt-5 space-y-3">
            {productCategories.map((category) => (
              <li key={category}>
                <Link href="/produtos" className="text-sm text-white/70 transition hover:text-white">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase text-[var(--brand-gold-soft)]">Contato</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/72">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
              {site.address}
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="flex gap-3 transition hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                WhatsApp comercial
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="site-container flex flex-col gap-3 text-xs text-white/56 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Website institucional sem ecommerce, orientado a orçamento e relacionamento B2B.</p>
        </div>
      </div>
    </footer>
  );
}
