import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_GEAR } from "@/lib/mock-data";
import GearDetail from "@/components/shop/GearDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_GEAR.find((g) => g.slug === slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} - ${product.brand}`,
    description: product.description,
  };
}

export default async function GearDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = MOCK_GEAR.find((g) => g.slug === slug);
  if (!product) notFound();
  return <GearDetail product={product} />;
}
