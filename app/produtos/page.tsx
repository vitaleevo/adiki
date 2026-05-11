import type { Metadata } from "next";

import { CtaSection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { ProductCatalog } from "@/components/site/product-catalog";
import { SectionHeader } from "@/components/site/section-header";
import { imageLibrary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo visual de material gastável de escritório, papelaria, tinteiros, arquivo, limpeza e equipamentos."
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        title="Catálogo moderno para solicitar orçamento com rapidez."
        description="Explore categorias, pesquise produtos e peça uma cotação diretamente pelo WhatsApp. Sem carrinho, sem checkout, com atendimento comercial personalizado."
        image={imageLibrary.supplies}
      />
      <section className="section-pad">
        <div className="site-container">
          <SectionHeader
            label="Produtos"
            title="Materiais selecionados para empresas, escolas e instituições."
            description="Use os filtros para encontrar linhas de produto. O orçamento final é tratado pela equipa comercial, com quantidades e condições adequadas ao seu pedido."
          />
          <div className="mt-10">
            <ProductCatalog />
          </div>
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
