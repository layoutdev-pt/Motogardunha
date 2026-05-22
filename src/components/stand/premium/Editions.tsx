"use client";

import { CheckCircle, Info } from "lucide-react";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export interface Edition {
  name: string;
  price_modifier: number;
  images: string[];
  included_accessories: string[];
}

interface Props {
  editions?: Edition[];
  basePrice?: number;
}

export default function Editions({ editions, basePrice = 0 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!editions || editions.length === 0) return null;

  const activeEdition = editions[activeIndex];

  return (
    <div className="py-16 md:py-24 bg-zinc-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Personalização
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Edições Disponíveis
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Coluna da Imagem (Esquerda) */}
          <div className="flex-1 w-full relative">
            <div className="relative aspect-[4/3] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
              {editions.map((edition, idx) => (
                <Image
                  key={`edition-img-${idx}`}
                  src={edition.images[0] || "/images/placeholder.jpg"}
                  alt={`Edição ${edition.name}`}
                  fill
                  priority={idx === 0}
                  className={`object-contain p-8 transition-all duration-700 ease-in-out ${
                    activeIndex === idx 
                      ? "opacity-100 z-10 scale-100" 
                      : "opacity-0 z-0 scale-95"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ))}
            </div>
          </div>

          {/* Coluna de Seleção e Detalhes (Direita) */}
          <div className="flex-1 w-full">
            
            {/* Seletor de Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-200/60 rounded-2xl">
              {editions.map((edition, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ease-out ${
                    activeIndex === idx
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
                  }`}
                >
                  {edition.name}
                </button>
              ))}
            </div>

            {/* Preço da Edição */}
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                Valor da Edição {activeEdition.name}
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-zinc-900">
                  {activeEdition.price_modifier === 0 
                    ? "Base" 
                    : `+ ${formatPrice(activeEdition.price_modifier)}`}
                </span>
                {basePrice > 0 && activeEdition.price_modifier > 0 && (
                  <span className="text-sm font-bold text-gray-400 mb-1.5">
                    (Total: {formatPrice(basePrice + activeEdition.price_modifier)})
                  </span>
                )}
              </div>
            </div>

            {/* Lista de Acessórios */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Acessórios Incluídos
              </h3>
              
              {activeEdition.included_accessories.length > 0 ? (
                <ul className="space-y-4">
                  {activeEdition.included_accessories.map((accessory, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-medium leading-relaxed">
                        {accessory}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  Esta edição não inclui acessórios adicionais de fábrica.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}