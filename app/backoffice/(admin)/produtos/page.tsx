import Image from "next/image";

import { upsertProductAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader, Field } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBackofficeContentLists } from "@/lib/backoffice-data";

function MediaSelect({
  assets,
  defaultValue
}: {
  assets: Awaited<ReturnType<typeof getBackofficeContentLists>>["mediaAssets"];
  defaultValue?: string;
}) {
  const activeAssets = assets.filter((asset) => asset.status === "active");

  return (
    <select name="imageAssetId" defaultValue={defaultValue ?? ""} className="h-12 w-full rounded-md border border-[var(--brand-line)] bg-white px-3 text-sm">
      <option value="">Sem imagem Convex</option>
      {activeAssets.map((asset) => (
        <option key={asset._id} value={asset._id}>
          {asset.filename}
        </option>
      ))}
    </select>
  );
}

function ProductForm({
  mediaAssets,
  product,
  submitLabel
}: {
  mediaAssets: Awaited<ReturnType<typeof getBackofficeContentLists>>["mediaAssets"];
  product?: Awaited<ReturnType<typeof getBackofficeContentLists>>["products"][number];
  submitLabel: string;
}) {
  return (
    <form action={upsertProductAction} className="space-y-4">
      {product ? <input type="hidden" name="id" value={product._id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome">
          <Input name="name" required maxLength={120} defaultValue={product?.name} placeholder="Papel A4 Premium" />
        </Field>
        <Field label="Slug">
          <Input name="slug" maxLength={90} defaultValue={product?.slug} placeholder="gerado automaticamente se ficar vazio" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Categoria">
          <Input name="category" required maxLength={80} defaultValue={product?.category} placeholder="Papelaria" />
        </Field>
        <Field label="Ordem">
          <Input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 10} />
        </Field>
        <Field label="Imagem Convex">
          <MediaSelect assets={mediaAssets} defaultValue={product?.imageAssetId} />
        </Field>
      </div>
      <Field label="Descrição curta">
        <textarea
          name="description"
          required
          maxLength={260}
          defaultValue={product?.description}
          className="min-h-24 w-full rounded-md border border-[var(--brand-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]"
          placeholder="Resumo comercial para aparecer nos cards do catálogo."
        />
      </Field>
      <label className="flex items-center gap-3 text-sm font-semibold text-[var(--brand-green)]">
        <input name="active" type="checkbox" defaultChecked={product?.active ?? true} className="h-4 w-4 accent-[var(--brand-green)]" />
        Produto visível no website
      </label>
      <Button type="submit" variant="green">
        {submitLabel}
      </Button>
    </form>
  );
}

export default async function BackofficeProductsPage() {
  const content = await getBackofficeContentLists();

  return (
    <>
      <AdminHeader
        title="Produtos"
        description="Crie e atualize produtos do catálogo visual. As imagens devem vir da biblioteca Convex sempre que possível."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard>
          <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Novo produto</h2>
          <div className="mt-6">
            <ProductForm mediaAssets={content.mediaAssets} submitLabel="Criar produto" />
          </div>
        </AdminCard>

        <div className="space-y-5">
          {content.products.length > 0 ? (
            content.products.map((product) => {
              const media = content.mediaAssets.find((asset) => asset._id === product.imageAssetId);

              return (
                <AdminCard key={product._id}>
                  <div className="mb-5 flex flex-wrap items-start gap-4">
                    <div className="relative h-20 w-24 overflow-hidden rounded-md bg-[var(--brand-soft)]">
                      {media?.url ? <Image src={media.url} alt={media.alt} fill sizes="96px" className="object-cover" /> : null}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[var(--brand-green)]">{product.name}</h2>
                      <p className="mt-1 text-sm text-[var(--brand-muted)]">
                        {product.category} · {product.active ? "visível" : "oculto"}
                      </p>
                    </div>
                  </div>
                  <ProductForm product={product} mediaAssets={content.mediaAssets} submitLabel="Guardar alterações" />
                </AdminCard>
              );
            })
          ) : (
            <AdminCard>
              <p className="text-sm leading-7 text-[var(--brand-muted)]">
                Ainda não existem produtos no Convex. O website continua a usar o catálogo local como fallback até criar produtos aqui.
              </p>
            </AdminCard>
          )}
        </div>
      </div>
    </>
  );
}
