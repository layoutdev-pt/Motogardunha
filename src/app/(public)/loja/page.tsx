import type { Metadata } from "next";
import ShopContent from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Loja - Equipamento e Acessórios Moto",
  description:
    "Equipamento premium para motociclistas. Capacetes, casacos, luvas, botas e acessórios das melhores marcas.",
};

export default function ShopPage() {
  return <ShopContent />;
}
