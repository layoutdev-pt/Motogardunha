import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMotorcycleBySlug } from "@/lib/supabase/queries";
import MotorcycleDetail from "@/components/stand/MotorcycleDetail";

export const revalidate = 3600; // ISR: revalidate every hour

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
      alternates: { canonical: `/stand/${slug}` },
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

function buildMotorcycleJsonLd(moto: Awaited<ReturnType<typeof getMotorcycleBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${moto.name} ${moto.year}`,
    description:
      moto.description ??
      `${moto.name} ${moto.year} — ${moto.engine_cc}cc`,
    url: `${SITE_URL}/stand/${moto.slug}`,
    ...(moto.cover_image && { image: moto.cover_image }),
    brand: { "@type": "Brand", name: moto.brand },
    model: moto.name,
    productionDate: String(moto.year),
    offers: {
      "@type": "Offer",
      price: moto.price,
      priceCurrency: "EUR",
      availability:
        moto.status === "available"
          ? "https://schema.org/InStock"
          : moto.status === "reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/SoldOut",
      seller: { "@type": "Organization", name: "Motogardunha" },
    },
    vehicleEngine: {
      "@type": "EngineSpecification",
      engineDisplacement: {
        "@type": "QuantitativeValue",
        value: moto.engine_cc,
        unitCode: "CMQ",
      },
    },
    ...(moto.mileage > 0 && {
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: moto.mileage,
        unitCode: "KMT",
      },
    }),
    ...(moto.fuel_type && { fuelType: moto.fuel_type }),
  };
}

export default async function MotorcycleDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const moto = await getMotorcycleBySlug(slug);
    const jsonLd = buildMotorcycleJsonLd(moto);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotorcycleDetail motorcycle={moto} />
      </>
    );
  } catch {
    notFound();
  }
}
