import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/stand`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/loja`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/servicos`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/contactos`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/termos-servico`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: `${SITE_URL}/politica-privacidade`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: `${SITE_URL}/politica-cookies`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let motoRoutes: MetadataRoute.Sitemap = [];
  let gearRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();

    const [motosRes, gearRes] = await Promise.all([
      supabase
        .from("motorcycles")
        .select("slug, updated_at")
        .eq("status", "available")
        .order("updated_at", { ascending: false }),
      supabase
        .from("gear_products")
        .select("slug, updated_at")
        .eq("status", "active")
        .order("updated_at", { ascending: false }),
    ]);

    motoRoutes = (motosRes.data ?? []).map((m) => ({
      url: `${SITE_URL}/stand/${m.slug}`,
      lastModified: new Date(m.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    gearRoutes = (gearRes.data ?? []).map((p) => ({
      url: `${SITE_URL}/loja/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Supabase unavailable at build time — static routes only
  }

  return [...STATIC_ROUTES, ...motoRoutes, ...gearRoutes];
}
