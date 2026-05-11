import Link from "next/link";
import { BarChart3, FileText, ImageIcon, LayoutDashboard, LogOut, Package, Settings, Tags } from "lucide-react";
import type { ReactNode } from "react";

import { logoutBackofficeAction } from "@/app/backoffice/actions";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/backoffice", label: "Dashboard", icon: LayoutDashboard },
  { href: "/backoffice/media", label: "Imagens", icon: ImageIcon },
  { href: "/backoffice/produtos", label: "Produtos", icon: Package },
  { href: "/backoffice/categorias", label: "Categorias", icon: Tags },
  { href: "/backoffice/blog", label: "Blog", icon: FileText },
  { href: "/backoffice/settings", label: "Definições", icon: Settings }
];

export function BackofficeShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[var(--brand-ink)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[var(--brand-line)] bg-white px-5 py-6 lg:block">
        <Link href="/backoffice" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--brand-green)] text-white">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-sm font-bold text-[var(--brand-green)]">ADIKI Backoffice</span>
            <span className="text-xs font-medium text-[var(--brand-muted)]">Gestão do website</span>
          </span>
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-[var(--brand-green)] transition hover:bg-[rgba(8,45,29,0.06)]"
            >
              <item.icon className="h-4 w-4 text-[var(--brand-gold-dark)]" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutBackofficeAction} className="absolute bottom-6 left-5 right-5">
          <Button type="submit" variant="outline" className="w-full">
            <LogOut className="h-4 w-4" />
            Terminar sessão
          </Button>
        </form>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[var(--brand-line)] bg-white/88 px-4 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/backoffice" className="font-display text-sm font-bold text-[var(--brand-green)]">
              ADIKI Backoffice
            </Link>
            <form action={logoutBackofficeAction}>
              <Button type="submit" size="sm" variant="outline">
                Sair
              </Button>
            </form>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-md border border-[var(--brand-line)] px-3 py-2 text-xs font-semibold text-[var(--brand-green)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
