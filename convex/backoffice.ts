import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const MAX_ITEMS = 100;

const mediaKindValidator = v.union(
  v.literal("hero"),
  v.literal("product"),
  v.literal("category"),
  v.literal("blog"),
  v.literal("logo"),
  v.literal("general")
);

const leadStatusValidator = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("quoted"),
  v.literal("archived")
);

function assertAdmin(adminKey: string) {
  const expected = process.env.BACKOFFICE_API_KEY;

  if (!expected || adminKey !== expected) {
    throw new Error("Unauthorized backoffice request");
  }
}

async function attachMediaUrl(ctx: QueryCtx | MutationCtx, assetId?: Id<"mediaAssets">) {
  if (!assetId) {
    return null;
  }

  const asset = await ctx.db.get(assetId);

  if (!asset || asset.status !== "active") {
    return null;
  }

  return await ctx.storage.getUrl(asset.storageId);
}

async function serializeMedia(ctx: { storage: { getUrl: (storageId: Id<"_storage">) => Promise<string | null> } }, asset: Doc<"mediaAssets">) {
  return {
    ...asset,
    url: await ctx.storage.getUrl(asset.storageId)
  };
}

function normalizeFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function findMediaUrl(mediaAssets: Array<Doc<"mediaAssets"> & { url: string | null }>, names: string[]) {
  const normalizedNames = names.map(normalizeFilename);
  const asset = mediaAssets.find((item) => normalizedNames.includes(normalizeFilename(item.filename)));

  return asset?.url ?? "";
}

export const generateUploadUrl = mutation({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    return await ctx.storage.generateUploadUrl();
  }
});

export const createMediaAsset = mutation({
  args: {
    adminKey: v.string(),
    storageId: v.id("_storage"),
    filename: v.string(),
    alt: v.string(),
    kind: mediaKindValidator,
    contentType: v.string(),
    size: v.number()
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);

    return await ctx.db.insert("mediaAssets", {
      storageId: args.storageId,
      filename: args.filename,
      alt: args.alt,
      kind: args.kind,
      contentType: args.contentType,
      size: args.size,
      status: "active",
      uploadedAt: Date.now()
    });
  }
});

export const archiveMediaAsset = mutation({
  args: { adminKey: v.string(), id: v.id("mediaAssets") },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    await ctx.db.patch(args.id, { status: "archived" });
  }
});

export const mediaList = query({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);

    const assets = await ctx.db.query("mediaAssets").withIndex("by_status_and_uploaded_at").order("desc").take(MAX_ITEMS);
    return await Promise.all(assets.map((asset) => serializeMedia(ctx, asset)));
  }
});

export const dashboard = query({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);

    const [leads, mediaAssets, products, categories, blogPosts] = await Promise.all([
      ctx.db.query("leads").withIndex("by_created_at").order("desc").take(12),
      ctx.db.query("mediaAssets").withIndex("by_status_and_uploaded_at").order("desc").take(8),
      ctx.db.query("products").withIndex("by_active_and_sort_order").take(MAX_ITEMS),
      ctx.db.query("categories").withIndex("by_active_and_sort_order").take(MAX_ITEMS),
      ctx.db.query("blogPosts").withIndex("by_published_and_published_at").order("desc").take(MAX_ITEMS)
    ]);

    return {
      stats: {
        leads: leads.length,
        mediaAssets: mediaAssets.length,
        products: products.length,
        categories: categories.length,
        blogPosts: blogPosts.length
      },
      leads,
      mediaAssets: await Promise.all(mediaAssets.map((asset) => serializeMedia(ctx, asset)))
    };
  }
});

export const leadList = query({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    return await ctx.db.query("leads").withIndex("by_created_at").order("desc").take(MAX_ITEMS);
  }
});

export const updateLeadStatus = mutation({
  args: { adminKey: v.string(), id: v.id("leads"), status: leadStatusValidator },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    await ctx.db.patch(args.id, { status: args.status });
  }
});

export const contentLists = query({
  args: { adminKey: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);

    const [mediaAssets, products, categories, blogPosts, siteSettings] = await Promise.all([
      ctx.db.query("mediaAssets").withIndex("by_status_and_uploaded_at").order("desc").take(MAX_ITEMS),
      ctx.db.query("products").withIndex("by_active_and_sort_order").take(MAX_ITEMS),
      ctx.db.query("categories").withIndex("by_active_and_sort_order").take(MAX_ITEMS),
      ctx.db.query("blogPosts").withIndex("by_published_and_published_at").order("desc").take(MAX_ITEMS),
      ctx.db.query("siteSettings").collect()
    ]);

    return {
      mediaAssets: await Promise.all(mediaAssets.map((asset) => serializeMedia(ctx, asset))),
      products,
      categories,
      blogPosts,
      siteSettings
    };
  }
});

export const upsertProduct = mutation({
  args: {
    adminKey: v.string(),
    id: v.optional(v.id("products")),
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    active: v.boolean(),
    sortOrder: v.number()
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    const now = Date.now();
    const data = {
      name: args.name,
      slug: args.slug,
      category: args.category,
      description: args.description,
      imageAssetId: args.imageAssetId,
      fallbackImage: args.fallbackImage,
      active: args.active,
      sortOrder: args.sortOrder,
      updatedAt: now
    };

    if (args.id) {
      await ctx.db.patch(args.id, data);
      return args.id;
    }

    return await ctx.db.insert("products", { ...data, createdAt: now });
  }
});

export const upsertCategory = mutation({
  args: {
    adminKey: v.string(),
    id: v.optional(v.id("categories")),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    active: v.boolean(),
    sortOrder: v.number()
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    const now = Date.now();
    const data = {
      name: args.name,
      slug: args.slug,
      description: args.description,
      icon: args.icon,
      imageAssetId: args.imageAssetId,
      fallbackImage: args.fallbackImage,
      active: args.active,
      sortOrder: args.sortOrder,
      updatedAt: now
    };

    if (args.id) {
      await ctx.db.patch(args.id, data);
      return args.id;
    }

    return await ctx.db.insert("categories", { ...data, createdAt: now });
  }
});

export const upsertBlogPost = mutation({
  args: {
    adminKey: v.string(),
    id: v.optional(v.id("blogPosts")),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    body: v.optional(v.string()),
    category: v.string(),
    readTime: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.number()
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    const now = Date.now();
    const data = {
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      body: args.body,
      category: args.category,
      readTime: args.readTime,
      imageAssetId: args.imageAssetId,
      fallbackImage: args.fallbackImage,
      published: args.published,
      publishedAt: args.publishedAt,
      updatedAt: now
    };

    if (args.id) {
      await ctx.db.patch(args.id, data);
      return args.id;
    }

    return await ctx.db.insert("blogPosts", { ...data, createdAt: now });
  }
});

export const upsertSetting = mutation({
  args: { adminKey: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminKey);
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
      return existing._id;
    }

    return await ctx.db.insert("siteSettings", { key: args.key, value: args.value, updatedAt: Date.now() });
  }
});

export const publicContent = query({
  args: {},
  handler: async (ctx) => {
    const [products, categories, blogPosts, mediaAssetDocs] = await Promise.all([
      ctx.db.query("products").withIndex("by_active_and_sort_order", (q) => q.eq("active", true)).take(MAX_ITEMS),
      ctx.db.query("categories").withIndex("by_active_and_sort_order", (q) => q.eq("active", true)).take(MAX_ITEMS),
      ctx.db.query("blogPosts").withIndex("by_published_and_published_at", (q) => q.eq("published", true)).order("desc").take(MAX_ITEMS),
      ctx.db.query("mediaAssets").withIndex("by_status_and_uploaded_at", (q) => q.eq("status", "active")).order("desc").take(MAX_ITEMS)
    ]);
    const mediaAssets = await Promise.all(mediaAssetDocs.map((asset) => serializeMedia(ctx, asset)));

    return {
      images: {
        hero: findMediaUrl(mediaAssets, ["Acessórios de mesa.png", "Acessorios de mesa.png"]),
        office: findMediaUrl(mediaAssets, ["Acessórios de mesa.png", "Acessorios de mesa.png"]),
        meeting: findMediaUrl(mediaAssets, ["Equipamentos.jpg"]),
        logistics: findMediaUrl(mediaAssets, ["Equipamentos.jpg"]),
        supplies: findMediaUrl(mediaAssets, ["Papelaria.png"]),
        desk: findMediaUrl(mediaAssets, ["Tinteiros.jpg"]),
        business: findMediaUrl(mediaAssets, ["Arquivo.jpg"]),
        team: findMediaUrl(mediaAssets, ["Procon-divulga-pesquisa-de-preços-do-material-escolar.jpg"]),
        archive: findMediaUrl(mediaAssets, ["Arquivo.jpg"]),
        cleaning: findMediaUrl(mediaAssets, ["Limpeza.jpg"]),
        equipment: findMediaUrl(mediaAssets, ["Equipamentos.jpg"]),
        school: findMediaUrl(mediaAssets, ["Procon-divulga-pesquisa-de-preços-do-material-escolar.jpg"]),
        ink: findMediaUrl(mediaAssets, ["Tinteiros.jpg"]),
        paperPremium: findMediaUrl(mediaAssets, ["papel premium.webp"]),
        operationalConsumables: findMediaUrl(mediaAssets, ["Consumíveis operacionais.jpg", "Consumiveis operacionais.jpg"]),
        deskAccessories: findMediaUrl(mediaAssets, ["Acessórios de mesa.png", "Acessorios de mesa.png"]),
        envelopesLabels: findMediaUrl(mediaAssets, ["Envelopes e etiquetas.webp"])
      },
      products: await Promise.all(
        products.map(async (product) => ({
          id: product.slug,
          name: product.name,
          category: product.category,
          description: product.description,
          image: (await attachMediaUrl(ctx, product.imageAssetId)) ?? product.fallbackImage ?? ""
        }))
      ),
      categories: await Promise.all(
        categories.map(async (category) => ({
          name: category.name,
          description: category.description,
          icon: category.icon,
          image: (await attachMediaUrl(ctx, category.imageAssetId)) ?? category.fallbackImage ?? ""
        }))
      ),
      blogPosts: await Promise.all(
        blogPosts.map(async (post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          date: new Date(post.publishedAt).toLocaleDateString("pt-AO", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }),
          image: (await attachMediaUrl(ctx, post.imageAssetId)) ?? post.fallbackImage ?? "",
          readTime: post.readTime
        }))
      )
    };
  }
});
