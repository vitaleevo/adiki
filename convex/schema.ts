import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    name: v.string(),
    company: v.optional(v.string()),
    phone: v.string(),
    email: v.optional(v.string()),
    message: v.string(),
    source: v.string(),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("quoted"), v.literal("archived")),
    userAgent: v.optional(v.string()),
    createdAt: v.number()
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
  mediaAssets: defineTable({
    storageId: v.id("_storage"),
    filename: v.string(),
    alt: v.string(),
    kind: v.union(
      v.literal("hero"),
      v.literal("product"),
      v.literal("category"),
      v.literal("blog"),
      v.literal("logo"),
      v.literal("general")
    ),
    contentType: v.string(),
    size: v.number(),
    status: v.union(v.literal("active"), v.literal("archived")),
    uploadedAt: v.number()
  })
    .index("by_kind_and_status", ["kind", "status"])
    .index("by_status_and_uploaded_at", ["status", "uploadedAt"]),
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    active: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_active_and_sort_order", ["active", "sortOrder"])
    .index("by_slug", ["slug"]),
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    active: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_active_and_sort_order", ["active", "sortOrder"])
    .index("by_slug", ["slug"]),
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    body: v.optional(v.string()),
    category: v.string(),
    readTime: v.string(),
    imageAssetId: v.optional(v.id("mediaAssets")),
    fallbackImage: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_published_and_published_at", ["published", "publishedAt"])
    .index("by_slug", ["slug"]),
  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number()
  }).index("by_key", ["key"])
});
