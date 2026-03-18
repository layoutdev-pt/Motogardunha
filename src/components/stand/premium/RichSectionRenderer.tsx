// src/components/stand/premium/RichSectionRenderer.tsx

import Hotspots from "./Hotspots";
import Image from "next/image";
import { RichSection } from "@/types";

export default function RichSectionRenderer({ section }: { section: RichSection }) {
  // 1. Bloco de Texto + Imagem (Alternado)
  if (section.type === "text_image") {
    return (
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${section.reversed ? 'md:flex-row-reverse' : ''}`}>
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {section.description}
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title || "Imagem de destaque"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. Mosaico de Galeria (1 imagem grande, 2 pequenas)
  if (section.type === "gallery" && section.items && section.items.length >= 3) {
    return (
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
            {/* Imagem Grande (Ocupa 2 colunas) */}
            <div className="md:col-span-2 relative h-[300px] md:h-full rounded-2xl overflow-hidden">
              <Image src={section.items[0]} alt="Galeria 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            
            {/* Imagens Pequenas (Empilhadas) */}
            <div className="flex flex-col gap-4 h-[600px] md:h-full">
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src={section.items[1]} alt="Galeria 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src={section.items[2]} alt="Galeria 3" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder para os hotspots (Vamos construir na próxima etapa)
if (section.type === "hotspots" && section.items) {
    return (
      <Hotspots
        title={section.title}
        image={section.image || ""}
        items={section.items}
      />
    );
  }

  return null;
}