import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const MAX_LEADS_RETURNED = 50;

export const create = mutation({
  args: {
    name: v.string(),
    company: v.optional(v.string()),
    phone: v.string(),
    email: v.optional(v.string()),
    message: v.string(),
    source: v.string(),
    userAgent: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      status: "new",
      createdAt: Date.now()
    });
  }
});

export const recent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leads").withIndex("by_created_at").order("desc").take(MAX_LEADS_RETURNED);
  }
});
