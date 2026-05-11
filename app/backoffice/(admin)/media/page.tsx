import Image from "next/image";

import { archiveMediaAssetAction } from "@/app/backoffice/actions";
import { AdminCard, AdminHeader } from "@/components/backoffice/admin-ui";
import { MediaUploadForm } from "@/components/backoffice/media-upload-form";
import { Button } from "@/components/ui/button";
import { getBackofficeMedia } from "@/lib/backoffice-data";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function BackofficeMediaPage() {
  const mediaAssets = await getBackofficeMedia();

  return (
    <>
      <AdminHeader
        title="Biblioteca de imagens"
        description="Envie imagens para o Convex Storage e use-as no catálogo, categorias e artigos sem guardar novos ficheiros públicos no GitHub."
      />
      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <AdminCard>
          <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Nova imagem</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
            Formatos permitidos: JPG, PNG e WEBP. Tamanho máximo: 5MB.
          </p>
          <div className="mt-6">
            <MediaUploadForm />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-xl font-semibold text-[var(--brand-green)]">Imagens guardadas</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mediaAssets.length > 0 ? (
              mediaAssets.map((asset) => (
                <article key={asset._id} className="overflow-hidden rounded-md border border-[var(--brand-line)] bg-white">
                  <div className="relative aspect-[4/3] bg-[var(--brand-soft)]">
                    {asset.url ? (
                      <Image src={asset.url} alt={asset.alt} fill sizes="(min-width: 1280px) 18vw, 45vw" className="object-cover" />
                    ) : null}
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="truncate text-sm font-bold text-[var(--brand-green)]">{asset.filename}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-gold-dark)]">
                        {asset.kind} · {formatSize(asset.size)}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-xs leading-5 text-[var(--brand-muted)]">{asset.alt}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[rgba(8,45,29,0.06)] px-3 py-1 text-xs font-bold text-[var(--brand-green)]">
                        {asset.status}
                      </span>
                      {asset.status === "active" ? (
                        <form action={archiveMediaAssetAction}>
                          <input type="hidden" name="id" value={asset._id} />
                          <Button type="submit" size="sm" variant="outline">
                            Arquivar
                          </Button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="col-span-full rounded-md border border-dashed border-[var(--brand-line)] p-8 text-center text-sm text-[var(--brand-muted)]">
                Ainda não existem imagens guardadas no Convex Storage.
              </p>
            )}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
