import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMotorcycleBySlug } from "@/lib/supabase/queries";
import MotorcycleDetail from "@/components/stand/MotorcycleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const moto = await getMotorcycleBySlug(slug);
    return {
      title: `${moto.name} ${moto.year}`,
      description: moto.description,
    };
  } catch {
    return { title: "Moto não encontrada" };
  }
}

export default async function MotorcycleDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const moto = await getMotorcycleBySlug(slug);
    return <MotorcycleDetail motorcycle={moto} />;
  } catch {
    notFound();
  }
}
