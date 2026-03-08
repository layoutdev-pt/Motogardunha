import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Motogardunha - Stand de Motos e Equipamento",
    template: "%s | Motogardunha",
  },
  description:
    "Stand de motos e equipamento em Fundão, Covilhã, Castelo Branco. Venda, restauro e manutenção de motociclos. Aprilia, Vespa, Piaggio, Segway, Voge, Zontes.",
  keywords: [
    "motos",
    "motociclos",
    "stand",
    "fundão",
    "covilhã",
    "castelo branco",
    "equipamento moto",
    "capacetes",
    "restauro motos",
  ],
  icons: {
    icon: [
      {
        url: "/images/branding/black_icon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/branding/white_icon.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    title: "Motogardunha - Stand de Motos e Equipamento",
    description:
      "Descubra a moto perfeita para cada curva, cada destino, e cada aventura.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt",
    siteName: "Motogardunha",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motogardunha - Stand de Motos e Equipamento",
    description:
      "Descubra a moto perfeita para cada curva, cada destino, e cada aventura.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt"
  ),
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://motogardunha.pt";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MotorcycleDealer",
  name: "Motogardunha",
  description:
    "Stand de motos e equipamento em Fundão. Venda, restauro e manutenção de motociclos.",
  url: SITE_URL,
  telephone: "+351963948336",
  email: "moto.gardunha@sapo.pt",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua I Zona Industrial do Fundão, lote 135",
    addressLocality: "Fundão",
    addressRegion: "Castelo Branco",
    postalCode: "6230-483",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.1770511,
    longitude: -7.4906962,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:15",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:30",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://facebook.com/motogardunha",
    "https://instagram.com/motogardunha",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${exo2.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
