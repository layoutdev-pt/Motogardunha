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
  openGraph: {
    title: "Motogardunha - Stand de Motos e Equipamento",
    description:
      "Descubra a moto perfeita para cada curva, cada destino, e cada aventura.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${exo2.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
