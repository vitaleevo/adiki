import Image from "next/image";

import { upsertBlogPostAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader, Field } from "@/components/backoffice/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBackofficeContentLists } from "@/lib/backoffice-data";

function toDateTimeLocal(value?: number) {
  const date = value ? new Date(value) : new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

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

function BlogPostForm({
  mediaAssets,
  post,
  submitLabel
}: {
  mediaAssets: Awaited<ReturnType<typeof getBackofficeContentLists>>["mediaAssets"];
  post?: Awaited<ReturnType<typeof getBackofficeContentLists>>["blogPosts"][number];
  submitLabel: string;
}) {
  return (
    <form action={upsertBlogPostAction} className="space-y-4">
      {post ? <input type="hidden" name="id" value={post._id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título">
          <Input name="title" required maxLength={140} defaultValue={post?.title} />
        </Field>
        <Field label="Slug">
          <Input name="slug" maxLength={100} defaultValue={post?.slug} placeholder="gerado automaticamente se ficar vazio" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Categoria">
          <Input name="category" required maxLength={80} defaultValue={post?.category} placeholder="Compras empresariais" />
        </Field>
        <Field label="Tempo de leitura">
          <Input name="readTime" maxLength={20} defaultValue={post?.readTime ?? "4 min"} />
        </Field>
        <Field label="Publicação">
          <Input name="publishedAt" type="datetime-local" defaultValue={toDateTimeLocal(post?.publishedAt)} />
        </Field>
        <Field label="Imagem Convex">
          <MediaSelect assets={mediaAssets} defaultValue={post?.imageAssetId} />
        </Field>
      </div>
      <Field label="Resumo SEO">
        <textarea
          name="excerpt"
          required
          maxLength={280}
          defaultValue={post?.excerpt}
          className="min-h-24 w-full rounded-md border border-[var(--brand-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]"
        />
      </Field>
      <Field label="Corpo do artigo">
        <textarea
          name="body"
          defaultValue={post?.body}
          className="min-h-40 w-full rounded-md border border-[var(--brand-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]"
          placeholder="Texto completo para uso futuro. O blog atual exibe cards e resumo."
        />
      </Field>
      <label className="flex items-center gap-3 text-sm font-semibold text-[var(--brand-green)]">
        <input name="published" type="checkbox" defaultChecked={post?.published ?? true} className="h-4 w-4 accent-[var(--brand-green)]" />
        Publicado no website
      </label>
      <Button type="submit" variant="green">
        {submitLabel}
      </Button>
    </form>
  );
}

export default async function BackofficeBlogPage() {
  const content = await getBackofficeContentLists();

  return (
    <>
      <AdminHeader
        title="Blog"
        description="Publique artigos institucionais para SEO, autoridade comercial e nutrição de leads."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCard>
          <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Novo post</h2>
          <div className="mt-6">
            <BlogPostForm mediaAssets={content.mediaAssets} submitLabel="Criar post" />
          </div>
        </AdminCard>

        <div className="space-y-5">
          {content.blogPosts.length > 0 ? (
            content.blogPosts.map((post) => {
              const media = content.mediaAssets.find((asset) => asset._id === post.imageAssetId);

              return (
                <AdminCard key={post._id}>
                  <div className="mb-5 flex flex-wrap items-start gap-4">
                    <div className="relative h-20 w-28 overflow-hidden rounded-md bg-[var(--brand-soft)]">
                      {media?.url ? <Image src={media.url} alt={media.alt} fill sizes="112px" className="object-cover" /> : null}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[var(--brand-green)]">{post.title}</h2>
                      <p className="mt-1 text-sm text-[var(--brand-muted)]">
                        {post.category} · {post.published ? "publicado" : "rascunho"}
                      </p>
                    </div>
                  </div>
                  <BlogPostForm post={post} mediaAssets={content.mediaAssets} submitLabel="Guardar alterações" />
                </AdminCard>
              );
            })
          ) : (
            <AdminCard>
              <p className="text-sm leading-7 text-[var(--brand-muted)]">
                Ainda não existem posts no Convex. O website mantém os artigos locais como fallback.
              </p>
            </AdminCard>
          )}
        </div>
      </div>
    </>
  );
}
