import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import ExploreSection from "@/components/home/ExploreSection";
import { AcquisitionTimeline } from "@/components/home/AcquisitionTimeline";
import ServicesSection from "@/components/home/ServicesSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <GuaranteeSection />
      <ExploreSection />
      <AcquisitionTimeline />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
