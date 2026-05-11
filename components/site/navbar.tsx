"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(255,255,255,0.82)] backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} - página inicial`}>
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-[var(--brand-green)] ring-1 ring-[rgba(232,171,39,0.28)]">
            <Image src="/brand/adiki-logo-dark.png" alt="" fill sizes="48px" className="object-cover" priority />
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-bold tracking-[0.08em] text-[var(--brand-green)]">
              ADIKI
            </span>
            <span className="block font-display text-xs font-semibold tracking-[0.2em] text-[var(--brand-gold-dark)]">
              ALVANIR
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[rgba(8,45,29,0.1)] bg-white/78 p-1 shadow-sm lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-[var(--brand-green)] !text-white hover:bg-[var(--brand-green)] hover:!text-white"
                    : "text-[var(--brand-muted)] hover:bg-[rgba(8,45,29,0.06)] hover:text-[var(--brand-green)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost">
            <Link href="/contato">Solicitar orçamento</Link>
          </Button>
          <Button asChild>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[rgba(8,45,29,0.12)] bg-white text-[var(--brand-green)] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[rgba(8,45,29,0.1)] bg-white lg:hidden"
          >
            <div className="site-container flex flex-col gap-2 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-semibold",
                    pathname === item.href
                      ? "bg-[var(--brand-green)] !text-white"
                      : "text-[var(--brand-green)]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
