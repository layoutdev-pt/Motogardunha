// src/components/stand/premium/PremiumHero.tsx
"use client";

import { MessageCircle, Phone } from "lucide-react";

import { CONTACT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface Props {
  moto: Motorcycle;
}

export default function PremiumHero({ moto }: Props) {
  const heroData = moto.rich_content?.hero;
  
  // Apanha as cores do JSON
  const colors = moto.rich_content?.colors || [];
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  // Se houver cores definidas, mostra a imagem dessa cor. Se não, mostra a imagem de capa padrão.
  const currentImage = colors.length > 0 
    ? colors[activeColorIndex].image 
    : (moto.cover_image || "/images/placeholder.jpg");

  return (
    <div className="bg-white">
      {/* Imagem Principal */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] bg-zinc-100 flex items-center justify-center overflow-hidden">
        <Image
          key={currentImage} // Esta key força o Next.js a re-renderizar a imagem ao mudar de cor (evita bugs)
          src={currentImage}
          alt={`${moto.name} em ${colors[activeColorIndex]?.name || "Default"}`}
          fill
          priority
          className="object-contain p-10 lg:p-20 animate-in fade-in duration-500"
          sizes="100vw"
        />
      </div>

      {/* Barra de Informação e Preço */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Lado Esquerdo: Título e Cores */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight">
              {moto.name}
            </h1>
            {heroData?.tagline && (
              <p className="text-lg text-gray-500 mt-2 font-medium">
                {heroData.tagline}
              </p>
            )}

            {/* SELETOR DE CORES */}
            {colors.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-3">
                  Cor: <span className="text-gray-500 ml-1">{colors[activeColorIndex].name}</span>
                </p>
                <div className="flex gap-3">
                  {colors.map((color: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveColorIndex(idx)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 ${
                        activeColorIndex === idx 
                          ? "border-primary scale-110 shadow-md ring-2 ring-primary/20 ring-offset-2" 
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Selecionar cor ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lado Direito: Preço e Botões */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">A partir de</p>
            <p className="text-3xl font-black text-primary mb-4">{formatPrice(moto.price)}</p>
            
            <div className="flex w-full sm:w-auto gap-3">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </a>
              <Link
                href="/contactos"
                className="flex-1 sm:flex-none border border-zinc-200 hover:border-zinc-800 text-zinc-900 px-6 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Mensagem
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}