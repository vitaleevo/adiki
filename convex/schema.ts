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
    .index("by_created_at", ["createdAt"])
});
