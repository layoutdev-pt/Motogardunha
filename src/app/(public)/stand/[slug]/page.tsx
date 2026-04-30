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

  // Lógica de recomendações (movida para o servidor)
  const modelFamily = motorcycle.name.split(" ")[1];
  let similar = getAllMotorcycles()
    .filter(m => m.id !== motorcycle.id && m.brand === motorcycle.brand && m.name.includes(modelFamily));

  if (similar.length < 3) {
    const fillers = getAllMotorcycles().filter(m =>
      m.id !== motorcycle.id && m.brand === motorcycle.brand && !similar.some(s => s.id === m.id)
    );
    similar = [...similar, ...fillers].slice(0, 3);
  } else {
    similar = similar.slice(0, 3);
  }

  return <MotorcycleDetail motorcycle={motorcycle} similar={similar} />;
  
}


