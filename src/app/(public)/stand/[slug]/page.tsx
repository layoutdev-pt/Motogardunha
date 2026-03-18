// src/app/(public)/stand/[slug]/page.tsx

import { getAllMotorcycles, getMotorcycleBySlug } from "@/lib/data/motorcycles";

import MotorcycleDetail from "@/components/stand/MotorcycleDetail";
import { notFound } from "next/navigation";

// Isto força o Next.js a gerar as páginas HTML estáticas durante o build
export async function generateStaticParams() {
  const motos = getAllMotorcycles();
  return motos.map((moto) => ({
    slug: moto.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const motorcycle = getMotorcycleBySlug(slug);

  if (!motorcycle) {
    notFound();
  }

  return <MotorcycleDetail motorcycle={motorcycle} />;
}