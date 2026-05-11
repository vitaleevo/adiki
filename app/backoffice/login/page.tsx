import Image from "next/image";
import { redirect } from "next/navigation";

import { loginBackofficeAction } from "@/app/backoffice/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBackofficeSession } from "@/lib/backoffice-auth";

export const metadata = {
  title: "Backoffice",
  robots: {
    index: false,
    follow: false
  }
};

export default async function BackofficeLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getBackofficeSession();

  if (session) {
    redirect("/backoffice");
  }

  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen bg-[var(--brand-green)] lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
          <div className="flex items-center gap-4">
            <Image src="/brand/adiki-logo-gold.png" alt="ADIKI ALVANIR" width={56} height={56} className="rounded-full" />
            <div>
              <p className="font-display text-lg font-bold text-[var(--brand-green)]">ADIKI Backoffice</p>
              <p className="text-sm text-[var(--brand-muted)]">Acesso administrativo protegido</p>
            </div>
          </div>
          <form action={loginBackofficeAction} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Senha administrativa</span>
              <Input name="password" type="password" required autoComplete="current-password" placeholder="Digite a senha" />
            </label>
            <Button type="submit" size="lg" className="w-full">
              Entrar no backoffice
            </Button>
          </form>
          {error ? (
            <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Senha inválida ou sessão expirada.
            </p>
          ) : null}
          <p className="mt-6 text-xs leading-6 text-[var(--brand-muted)]">
            Esta área não é pública e serve apenas para gestão de leads, imagens e conteúdo do website.
          </p>
        </div>
      </section>
      <section className="hidden min-h-screen items-center justify-center overflow-hidden bg-[var(--brand-green)] p-10 lg:flex">
        <div className="relative aspect-square w-full max-w-lg">
          <div className="absolute inset-0 rounded-full bg-[rgba(232,171,39,0.14)] blur-3xl" />
          <Image src="/brand/adiki-logo-white.png" alt="ADIKI ALVANIR Angola" fill sizes="40vw" className="relative object-contain" />
        </div>
      </section>
    </main>
  );
}
