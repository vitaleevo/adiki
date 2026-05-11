import Image from "next/image";

import { upsertCategoryAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader, Field } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBackofficeContentLists } from "@/lib/backoffice-data";

const icons = ["PenTool", "Printer", "Boxes", "BookOpen", "Archive", "Recycle", "Building2"];

function MediaSelect({
  assets,
  defaultValue
}: {
  assets: Awaited<ReturnType<typeof getBackofficeContentLists>>["mediaAssets"];
  defaultValue?: string;
}) {
  return (
    <select name="imageAssetId" defaultValue={defaultValue ?? ""} className="h-12 w-full rounded-md border border-[var(--brand-line)] bg-white px-3 text-sm">
      <option value="">Sem imagem Convex</option>
      {assets
        .filter((asset) => asset.status === "active")
        .map((asset) => (
          <option key={asset._id} value={asset._id}>
            {asset.filename}
          </option>
        ))}
    </select>
  );
}

function CategoryForm({
  mediaAssets,
  category,
  submitLabel
}: {
  mediaAssets: Awaited<ReturnType<typeof getBackofficeContentLists>>["mediaAssets"];
  category?: Awaited<ReturnType<typeof getBackofficeContentLists>>["categories"][number];
  submitLabel: string;
}) {
  return (
    <form action={upsertCategoryAction} className="space-y-4">
      {category ? <input type="hidden" name="id" value={category._id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome">
          <Input name="name" required maxLength={100} defaultValue={category?.name} placeholder="Papelaria" />
        </Field>
        <Field label="Slug">
          <Input name="slug" maxLength={90} defaultValue={category?.slug} placeholder="gerado automaticamente se ficar vazio" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Ícone">
          <select name="icon" defaultValue={category?.icon ?? "Boxes"} className="h-12 w-full rounded-md border border-[var(--brand-line)] bg-white px-3 text-sm">
            {icons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ordem">
          <Input name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 10} />
        </Field>
        <Field label="Imagem Convex">
          <MediaSelect assets={mediaAssets} defaultValue={category?.imageAssetId} />
        </Field>
      </div>
      <Field label="Descrição">
        <textarea
          name="description"
          required
          maxLength={240}
          defaultValue={category?.description}
          className="min-h-24 w-full rounded-md border border-[var(--brand-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]"
        />
      </Field>
      <label className="flex items-center gap-3 text-sm font-semibold text-[var(--brand-green)]">
        <input name="active" type="checkbox" defaultChecked={category?.active ?? true} className="h-4 w-4 accent-[var(--brand-green)]" />
        Categoria visível no website
      </label>
      <Button type="submit" variant="green">
        {submitLabel}
      </Button>
    </form>
  );
}

export default async function BackofficeCategoriesPage() {
  const content = await getBackofficeContentLists();

  return (
    <>
      <AdminHeader
        title="Categorias"
        description="Controle os blocos de categorias exibidos na home e usados como referência no catálogo."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard>
          <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Nova categoria</h2>
          <div className="mt-6">
            <CategoryForm mediaAssets={content.mediaAssets} submitLabel="Criar categoria" />
          </div>
        </AdminCard>

        <div className="space-y-5">
          {content.categories.length > 0 ? (
            content.categories.map((category) => {
              const media = content.mediaAssets.find((asset) => asset._id === category.imageAssetId);

              return (
                <AdminCard key={category._id}>
                  <div className="mb-5 flex flex-wrap items-start gap-4">
                    <div className="relative h-20 w-24 overflow-hidden rounded-md bg-[var(--brand-soft)]">
                      {media?.url ? <Image src={media.url} alt={media.alt} fill sizes="96px" className="object-cover" /> : null}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[var(--brand-green)]">{category.name}</h2>
                      <p className="mt-1 text-sm text-[var(--brand-muted)]">
                        {category.icon} · {category.active ? "visível" : "oculta"}
                      </p>
                    </div>
                  </div>
                  <CategoryForm category={category} mediaAssets={content.mediaAssets} submitLabel="Guardar alterações" />
                </AdminCard>
              );
            })
          ) : (
            <AdminCard>
              <p className="text-sm leading-7 text-[var(--brand-muted)]">
                Ainda não existem categorias no Convex. O website mantém as categorias locais como fallback.
              </p>
            </AdminCard>
          )}
        </div>
      </div>
    </>
  );
}
