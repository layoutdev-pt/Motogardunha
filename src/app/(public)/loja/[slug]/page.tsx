import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGearProductBySlug } from "@/lib/supabase/queries";
import GearDetail from "@/components/shop/GearDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getGearProductBySlug(slug);
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: "Produto não encontrado" };
  }
}

export default async function GearDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const product = await getGearProductBySlug(slug);
    return <GearDetail product={product} />;
  } catch {
    notFound();
  }
}
