import type { MetadataRoute } from "next";

import { site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/produtos", "/servicos", "/blog", "/contato"];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-05-11"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
