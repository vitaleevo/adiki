import { updateLeadStatusAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { getBackofficeLeads } from "@/lib/backoffice-data";

const statuses = ["new", "contacted", "quoted", "archived"];

export default async function BackofficeLeadsPage() {
  const leads = await getBackofficeLeads();

  return (
    <>
      <AdminHeader
        title="Leads e pedidos"
        description="Pedidos submetidos pelo formulário do website, com estado comercial básico para acompanhamento."
      />
      <AdminCard>
        <div className="space-y-4">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <article key={lead._id} className="rounded-md border border-[var(--brand-line)] p-4">
                <div className="grid gap-4 xl:grid-cols-[1fr_220px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-lg font-semibold text-[var(--brand-green)]">{lead.name}</h2>
                      <span className="rounded-full bg-[rgba(232,171,39,0.14)] px-3 py-1 text-xs font-bold text-[var(--brand-green)]">
                        {lead.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--brand-muted)]">
                      {lead.company ? `${lead.company} · ` : ""}
                      {lead.phone}
                      {lead.email ? ` · ${lead.email}` : ""}
                    </p>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--brand-muted)]">{lead.message}</p>
                    <p className="mt-4 text-xs font-semibold text-[var(--brand-muted)]">
                      {new Date(lead.createdAt).toLocaleString("pt-AO")} · {lead.source}
                    </p>
                  </div>
                  <form action={updateLeadStatusAction} className="flex flex-col gap-3">
                    <input type="hidden" name="id" value={lead._id} />
                    <label>
                      <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Estado</span>
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="h-11 w-full rounded-md border border-[var(--brand-line)] bg-white px-3 text-sm"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Button type="submit" variant="green">
                      Atualizar
                    </Button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-md border border-dashed border-[var(--brand-line)] p-8 text-center text-sm text-[var(--brand-muted)]">
              Ainda não existem leads.
            </p>
          )}
        </div>
      </AdminCard>
    </>
  );
}
