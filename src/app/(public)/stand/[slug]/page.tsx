import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_MOTORCYCLES } from "@/lib/mock-data";
import MotorcycleDetail from "@/components/stand/MotorcycleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const moto = MOCK_MOTORCYCLES.find((m) => m.slug === slug);
  if (!moto) return { title: "Moto não encontrada" };
  return {
    title: `${moto.brand} ${moto.model} ${moto.year}`,
    description: moto.description,
  };
}

export default async function MotorcycleDetailPage({ params }: Props) {
  const { slug } = await params;
  const moto = MOCK_MOTORCYCLES.find((m) => m.slug === slug);
  if (!moto) notFound();
  return <MotorcycleDetail motorcycle={moto} />;
}
