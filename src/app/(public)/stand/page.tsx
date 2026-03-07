import type { Metadata } from "next";
import StandContent from "@/components/stand/StandContent";
import { getMotorcycles } from "@/lib/supabase/queries";
import type { Motorcycle } from "@/types";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Stand - O Nosso Catálogo de Motos",
  description:
    "Explore a nossa coleção de motos novas e usadas. Aprilia, Vespa, Honda, Yamaha, Zontes e muito mais no nosso stand em Fundão.",
};

export default async function StandPage() {
  let motos: Motorcycle[] = [];
  try {
    motos = await getMotorcycles();
  } catch {
    // Supabase not configured yet
  }

  return <StandContent initialMotos={motos} />;
}
