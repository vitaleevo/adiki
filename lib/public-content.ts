import {
  Archive,
  BookOpen,
  Boxes,
  Building2,
  PenTool,
  Printer,
  Recycle,
  type LucideIcon
} from "lucide-react";
import { fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import { blogPosts, categories, imageLibrary, products } from "@/lib/site-data";

const iconMap: Record<string, LucideIcon> = {
  Archive,
  BookOpen,
  Boxes,
  Building2,
  PenTool,
  Printer,
  Recycle
};

export type PublicProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

export type PublicCategory = {
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export type PublicBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export type PublicImages = typeof imageLibrary;

function mergePublicImages(images: Partial<Record<keyof PublicImages, string>>) {
  const nextImages: PublicImages = { ...imageLibrary };

  for (const [key, value] of Object.entries(images)) {
    if (value && key in nextImages) {
      nextImages[key as keyof PublicImages] = value;
    }
  }

  return nextImages;
}

export async function getPublicContent() {
  try {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      throw new Error("Convex is not configured.");
    }

    const content = await fetchQuery(api.backoffice.publicContent, {});

    return {
      images: mergePublicImages(content.images),
      products:
        content.products.length > 0
          ? content.products.map((product) => ({
              ...product,
              image: product.image || products[0]?.image || ""
            }))
          : products,
      categories:
        content.categories.length > 0
          ? content.categories.map((category) => ({
              ...category,
              image: category.image || categories[0]?.image || "",
              icon: iconMap[category.icon] ?? Boxes
            }))
          : categories,
      blogPosts:
        content.blogPosts.length > 0
          ? content.blogPosts.map((post) => ({
              ...post,
              image: post.image || blogPosts[0]?.image || ""
            }))
          : blogPosts
    };
  } catch {
    return {
      images: imageLibrary,
      products,
      categories,
      blogPosts
    };
  }
}
