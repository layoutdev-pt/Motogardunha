import { getFeaturedGear } from "@/lib/supabase/queries";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import GearCarousel from "./GearCarousel";

const PROMO_IMAGE =
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80";

export default async function FeaturedShopSection() {
  let products: Awaited<ReturnType<typeof getFeaturedGear>> = [];

  try {
    products = await getFeaturedGear();
  } catch {
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Equipamento em Destaque
            </h2>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
          </div>
          <Link
            href="/loja"
            className="text-primary font-medium hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            Ver toda a loja
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left — carousel */}
          <div className="w-full lg:w-[60%]">
            <GearCarousel products={products} />
          </div>

          {/* Right — static promo panel */}
          <div className="hidden lg:block lg:w-[40%]">
            <div className="relative rounded-2xl overflow-hidden h-[480px]">
              <Image
                src={PROMO_IMAGE}
                alt="A Melhor Seleção de Equipamento"
                fill
                className="object-cover"
                sizes="40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-display font-bold text-2xl mb-2">
                  A Melhor Seleção de Equipamento
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Capacetes, casacos, luvas e muito mais das melhores marcas do
                  mundo. Proteção e estilo para cada quilómetro.
                </p>
                <Link
                  href="/loja"
                  className="inline-flex items-center gap-2 mt-4 text-primary font-medium hover:text-red-400 transition-colors text-sm"
                >
                  Explorar loja <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
