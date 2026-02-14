import type { Metadata } from "next";
import StandContent from "@/components/stand/StandContent";

export const metadata: Metadata = {
  title: "Stand - O Nosso Catálogo de Motos",
  description:
    "Explore a nossa coleção de motos novas e usadas. Aprilia, Vespa, Honda, Yamaha, Zontes e muito mais no nosso stand em Fundão.",
};

export default function StandPage() {
  return <StandContent />;
}
