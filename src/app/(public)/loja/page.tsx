// src/app/(public)/loja/page.tsx
import type { Metadata } from "next";
import ShopContent from "@/components/shop/ShopContent";
import { getGearProducts } from "@/lib/supabase/queries";
import type { GearProduct } from "@/types";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Loja - Equipamento e Acessórios Moto",
  description:
    "Equipamento premium para motociclistas. Capacetes, casacos, luvas, botas e acessórios das melhores marcas.",
};

export default async function ShopPage() {
  let products: GearProduct[] = [];
  try {
    const all = await getGearProducts();
    products = all.filter((p) => p.status === "active");
  } catch {
    // Supabase not configured yet
  }

  return <ShopContent initialGear={products} />;
}
