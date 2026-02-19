import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMotorcycleBySlug } from "@/lib/supabase/queries";
import MotorcycleDetail from "@/components/stand/MotorcycleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const moto = await getMotorcycleBySlug(slug);
    const title = `${moto.name} ${moto.year}`;
    const description =
      moto.description ??
      `${moto.name} ${moto.year} — ${moto.engine_cc}cc, ${moto.mileage === 0 ? "Nova" : `${moto.mileage.toLocaleString("pt-PT")} km`}. Disponível no Stand Motogardunha.`;
    const image = moto.cover_image || null;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/stand/${slug}`,
        siteName: "Motogardunha",
        locale: "pt_PT",
        type: "website",
        ...(image && {
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(image && { images: [image] }),
      },
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
