import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import ExploreSection from "@/components/home/ExploreSection";
import FeaturedShopSection from "@/components/home/FeaturedShopSection";
import { AcquisitionTimeline } from "@/components/home/AcquisitionTimeline";
import ServicesSection from "@/components/home/ServicesSection";
import ContactSection from "@/components/home/ContactSection";
import { getMotorcycles } from "@/lib/supabase/queries";
import type { Motorcycle } from "@/types";

export default async function HomePage() {
  let motorcycles: Motorcycle[] = [];
  try {
    const all = await getMotorcycles();
    motorcycles = all.filter((m) => m.status === "available");
  } catch {
    // silently fail — ExploreSection shows empty state
  }

  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <FeaturedShopSection />
      <GuaranteeSection />
      <ExploreSection motorcycles={motorcycles} />
      <AcquisitionTimeline />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
