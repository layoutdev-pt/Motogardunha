"use client";

import { ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react";

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
  const colors = moto.rich_content?.colors || [];
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const allImages = moto.images?.length > 0 ? moto.images : [moto.cover_image];
  const [galleryIndex, setGalleryIndex] = useState(0);

  const prevImage = () => setGalleryIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const nextImage = () => setGalleryIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-white w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          <div className="flex-1 w-full relative">
            <div className="relative aspect-[4/3] bg-transparent">
              
              {/* Renderização condicional por array para forçar crossfade CSS */}
              {colors.length > 0 ? (
                colors.map((color: any, idx: number) => (
                  <Image
                    key={`color-${idx}`}
                    src={color.image}
                    alt={`${moto.name} - ${color.name}`}
                    fill
                    priority={idx === 0}
                    className={`object-contain transition-opacity duration-700 ease-in-out ${
                      activeColorIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ))
              ) : (
                allImages.map((img: string, idx: number) => (
                  <Image
                    key={`gallery-${idx}`}
                    src={img || "/images/placeholder.jpg"}
                    alt={`${moto.name} - Imagem ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    className={`object-contain transition-opacity duration-700 ease-in-out ${
                      galleryIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ))
              )}
              
              {colors.length === 0 && allImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-all shadow-sm z-20">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-all shadow-sm z-20">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {colors.length > 0 && (
              <div className="flex flex-col items-center mt-6">
                <div className="flex justify-center gap-4">
                  {colors.map((color: any, idx: number) => (
                    <div key={idx} className="relative group flex justify-center">
                      <div className="absolute bottom-full mb-3 px-3 py-1.5 bg-gray-100 text-zinc-900 text-[10px] font-black uppercase tracking-widest rounded opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none z-10 shadow-sm border border-gray-200 whitespace-nowrap">
                        {color.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-100"></div>
                      </div>

                      <button
                        onClick={() => setActiveColorIndex(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 z-20 relative ${
                          activeColorIndex === idx 
                            ? "border-primary scale-110 shadow-md ring-2 ring-primary/20 ring-offset-2" 
                            : "border-gray-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Selecionar cor ${color.name}`}
                      />
                    </div>
                  ))}
                </div>
                
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-4 transition-all duration-300">
                  {colors[activeColorIndex].name}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 w-full space-y-8">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                Sobre este modelo
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight">
                {moto.name}
              </h1>
              {moto.description && (
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {moto.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all">
                <p className="text-2xl font-black text-zinc-900">{moto.mileage?.toLocaleString("pt-PT") || 0}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Quilómetros</p>
              </div>
              {moto.segment && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all">
                  <p className="text-xl font-black text-zinc-900 truncate">{moto.segment}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Segmento</p>
                </div>
              )}
              {moto.horsepower && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all">
                  <p className="text-2xl font-black text-zinc-900">{moto.horsepower}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Cavalos (CV)</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              Possível a Partir de
            </p>
            <p className="text-4xl font-black text-white">
              {formatPrice(moto.price)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              IVA incluído · Garantia {moto.mileage === 0 ? "de fábrica" : "12 meses"}
            </p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="flex-1 md:flex-none bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-sm font-bold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Ligar Agora
            </a>
            <Link
              href="/contactos"
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Informação
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}