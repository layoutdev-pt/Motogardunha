import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGearProductBySlug } from "@/lib/supabase/queries";
import GearDetail from "@/components/shop/GearDetail";

export const revalidate = 3600; // ISR: revalidate every hour

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getGearProductBySlug(slug);
    const title = product.title;
    const description =
      product.description ??
      `${product.title} — Equipamento de moto disponível na Loja Motogardunha.`;
    const image = product.cover_image || null;

    return {
      title,
      description,
      alternates: { canonical: `/loja/${slug}` },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/loja/${slug}`,
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
    return { title: "Produto não encontrado" };
  }
}

function buildGearJsonLd(product: Awaited<ReturnType<typeof getGearProductBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.description ??
      `${product.title} — Equipamento de moto disponível na Loja Motogardunha.`,
    url: `${SITE_URL}/loja/${product.slug}`,
    ...(product.cover_image && { image: product.cover_image }),
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability:
        product.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Motogardunha" },
    },
  };
}

export default async function GearDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const product = await getGearProductBySlug(slug);
    const jsonLd = buildGearJsonLd(product);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GearDetail product={product} />
      </>
    );
  } catch {
    notFound();
  }
}
