"use client";

import { UploadCloud } from "lucide-react";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { createMediaAssetAction, generateMediaUploadUrlAction } from "@/app/backoffice/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 5 * 1024 * 1024;

export function MediaUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");
    const alt = String(formData.get("alt") || "").trim();
    const kind = String(formData.get("kind") || "general") as "hero" | "product" | "category" | "blog" | "logo" | "general";

    if (!(file instanceof File) || file.size === 0) {
      setState("error");
      setMessage("Selecione uma imagem.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setState("error");
      setMessage("Use apenas JPG, PNG ou WEBP.");
      return;
    }

    if (file.size > maxSize) {
      setState("error");
      setMessage("A imagem deve ter no máximo 5MB.");
      return;
    }

    setState("uploading");
    setMessage("A enviar imagem para o Convex Storage...");

    try {
      const uploadUrl = await generateMediaUploadUrlAction();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = (await result.json()) as { storageId: string };

      await createMediaAssetAction({
        storageId,
        filename: file.name,
        alt: alt || file.name,
        kind,
        contentType: file.type,
        size: file.size
      });

      setState("success");
      setMessage("Imagem guardada no Convex Storage.");
      formRef.current?.reset();
    } catch {
      setState("error");
      setMessage("Não foi possível guardar a imagem. Tente novamente.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Imagem</span>
          <Input name="file" type="file" accept="image/jpeg,image/png,image/webp" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Tipo</span>
          <select name="kind" className="h-12 w-full rounded-md border border-[var(--brand-line)] bg-white px-3 text-sm">
            <option value="general">Geral</option>
            <option value="hero">Hero</option>
            <option value="product">Produto</option>
            <option value="category">Categoria</option>
            <option value="blog">Blog</option>
            <option value="logo">Logo</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[var(--brand-green)]">Texto alternativo</span>
        <Input name="alt" maxLength={180} placeholder="Descrição acessível da imagem" />
      </label>
      <Button type="submit" disabled={state === "uploading"}>
        <UploadCloud className="h-4 w-4" />
        {state === "uploading" ? "A enviar..." : "Guardar imagem"}
      </Button>
      {message ? (
        <p className={state === "error" ? "text-sm font-semibold text-red-700" : "text-sm font-semibold text-[var(--brand-green)]"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
