"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/site/cards";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/site-data";
import type { PublicProduct } from "@/lib/public-content";
import { cn } from "@/lib/utils";

export function ProductCatalog({ initialProducts = products }: { initialProducts?: PublicProduct[] }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(initialProducts.map((product) => product.category)))],
    [initialProducts]
  );

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const categoryMatches = category === "Todos" || product.category === category;
      const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return categoryMatches && text.includes(query.toLowerCase());
    });
  }, [category, initialProducts, query]);

  return (
    <div className="space-y-8">
      <div className="premium-card rounded-lg p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Pesquisar produtos</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar por produto, categoria ou necessidade"
              className="pl-11"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-md border px-4 py-3 text-sm font-semibold transition",
                  category === item
                    ? "border-[var(--brand-green)] bg-[var(--brand-green)] text-white"
                    : "border-[rgba(8,45,29,0.12)] bg-white text-[var(--brand-green)] hover:border-[var(--brand-gold)]"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} {...product} delay={(index % 4) * 0.04} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[rgba(8,45,29,0.18)] p-10 text-center">
          <h3 className="font-display text-xl font-semibold text-[var(--brand-green)]">Nenhum produto encontrado</h3>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">
            Experimente remover filtros ou fale connosco para uma cotação personalizada.
          </p>
        </div>
      ) : null}
    </div>
  );
}
