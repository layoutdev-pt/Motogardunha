"use client";

import { Plus, X } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

interface HotspotItem {
  x: number;
  y: number;
  title: string;
  description: string;
  image?: string;
}

interface Props {
  title?: string;
  image: string;
  items: HotspotItem[];
}

export default function Hotspots({ title, image, items }: Props) {
  const [activeItem, setActiveItem] = useState<HotspotItem | null>(null);

  return (
    <div className="py-16 md:py-24 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight mb-12">
            {title}
          </h2>
        )}

        {/* Contentor Principal da Imagem */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-white shadow-xl">
          <Image
            src={image}
            alt="Vista interativa"
            fill
            className="object-contain p-4"
          />

          {/* Pontos Clicáveis (Hotspots) */}
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveItem(item)}
              className="absolute w-8 h-8 md:w-10 md:h-10 -ml-4 -mt-4 md:-ml-5 md:-mt-5 bg-white/80 backdrop-blur-sm border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all shadow-lg z-10 group animate-pulse hover:animate-none"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-label={`Ver detalhes de ${item.title}`}
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal de Detalhe do Hotspot */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Imagem do Modal */}
            {activeItem.image && (
              <div className="relative w-full h-48 md:h-64 bg-gray-100">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Texto do Modal */}
            <div className="p-6 md:p-8 text-left">
              <h3 className="text-2xl font-black text-zinc-900 mb-4">
                {activeItem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base hotspot-description">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}