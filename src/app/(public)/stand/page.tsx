// src/app/(public)/stand/page.tsx

import type { Metadata } from "next";
import StandContent from "@/components/stand/StandContent";
import { getAllMotorcycles } from "@/lib/data/motorcycles";

export const metadata: Metadata = {
  title: "Stand - Motos Novas e Usadas",
  description: "Explore o nosso stand virtual.",
};

export default function StandPage() {
  const motos = getAllMotorcycles();
  return <StandContent initialMotos={motos} />;
}