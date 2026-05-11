import type { ReactNode } from "react";

export function AdminHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--brand-gold-dark)]">Backoffice</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--brand-green)] md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--brand-muted)]">{description}</p>
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-[var(--brand-line)] bg-white p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">{label}</span>
      {children}
    </label>
  );
}
