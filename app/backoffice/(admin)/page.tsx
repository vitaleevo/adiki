import Link from "next/link";
import { ArrowRight, ImageIcon, Inbox, Newspaper, Package, Tags } from "lucide-react";

import { updateLeadStatusAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { getBackofficeDashboard } from "@/lib/backoffice-data";

const statIcons = {
  leads: Inbox,
  mediaAssets: ImageIcon,
  products: Package,
  categories: Tags,
  blogPosts: Newspaper
};

const statLabels = {
  leads: "Leads recentes",
  mediaAssets: "Imagens",
  products: "Produtos",
  categories: "Categorias",
  blogPosts: "Posts"
};

export default async function BackofficeDashboardPage() {
  const dashboard = await getBackofficeDashboard();

  return (
    <>
      <AdminHeader
        title="Painel de gestão"
        description="Visão rápida dos pedidos comerciais, biblioteca de imagens e conteúdo gerido no Convex."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Object.entries(dashboard.stats).map(([key, value]) => {
          const Icon = statIcons[key as keyof typeof statIcons];
          return (
            <AdminCard key={key}>
              <Icon className="h-5 w-5 text-[var(--brand-gold-dark)]" />
              <p className="mt-5 font-display text-3xl font-semibold text-[var(--brand-green)]">{value}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--brand-muted)]">
                {statLabels[key as keyof typeof statLabels]}
              </p>
            </AdminCard>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <AdminCard>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Leads recentes</h2>
            <Link href="/backoffice/leads" className="text-sm font-bold text-[var(--brand-green)]">
              Ver todos
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {dashboard.leads.length > 0 ? (
              dashboard.leads.map((lead) => (
                <div key={lead._id} className="rounded-md border border-[var(--brand-line)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--brand-green)]">{lead.name}</p>
                      <p className="mt-1 text-sm text-[var(--brand-muted)]">{lead.company || lead.phone}</p>
                    </div>
                    <span className="rounded-full bg-[rgba(232,171,39,0.14)] px-3 py-1 text-xs font-bold text-[var(--brand-green)]">
                      {lead.status}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--brand-muted)]">{lead.message}</p>
                  <form action={updateLeadStatusAction} className="mt-4 flex gap-2">
                    <input type="hidden" name="id" value={lead._id} />
                    <input type="hidden" name="status" value="contacted" />
                    <Button size="sm" variant="outline" type="submit">
                      Marcar contactado
                    </Button>
                  </form>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-dashed border-[var(--brand-line)] p-6 text-sm text-[var(--brand-muted)]">
                Ainda não existem leads registados.
              </p>
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Últimas imagens</h2>
            <Link href="/backoffice/media" className="text-sm font-bold text-[var(--brand-green)]">
              Gerir
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {dashboard.mediaAssets.length > 0 ? (
              dashboard.mediaAssets.map((asset) => (
                <Link key={asset._id} href="/backoffice/media" className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-md border border-[var(--brand-line)] bg-[var(--brand-soft)]">
                    {asset.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={asset.url} alt={asset.alt} className="h-full w-full object-cover transition group-hover:scale-105" />
                    ) : null}
                  </div>
                  <p className="mt-2 truncate text-xs font-semibold text-[var(--brand-green)]">{asset.filename}</p>
                </Link>
              ))
            ) : (
              <Link
                href="/backoffice/media"
                className="col-span-2 flex items-center justify-between rounded-md border border-dashed border-[var(--brand-line)] p-5 text-sm font-semibold text-[var(--brand-green)]"
              >
                Enviar primeira imagem
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
