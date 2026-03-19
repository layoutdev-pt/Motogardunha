"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

export default function SliderGallery({ items }: { items: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Garantir que items é sempre um array para não quebrar os Hooks
  const safeItems = items || [];

  const prev = useCallback(() => setCurrentIndex((i) => (i === 0 ? safeItems.length - 1 : i - 1)), [safeItems.length]);
  const next = useCallback(() => setCurrentIndex((i) => (i === safeItems.length - 1 ? 0 : i + 1)), [safeItems.length]);

  // Auto-play: Muda de foto a cada 5 segundos apenas se houver mais de 1 foto
  useEffect(() => {
    if (safeItems.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, safeItems.length]);

  // 1. Situação: Não existir
  if (safeItems.length === 0) return null;

  // 2. Situação: Determinar qual o efeito a aplicar (Crossfade para <= 2, Coverflow para >= 3)
  const isCoverflow = safeItems.length >= 3;

  return (
    <div className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[100vw] mx-auto">
        
        {/* Indicador Numérico Topo (Oculto se for só 1 foto) */}
        {safeItems.length > 1 && (
          <div className="text-center text-xs font-bold text-zinc-400 mb-8 tracking-widest uppercase">
            {currentIndex + 1} / {safeItems.length}
          </div>
        )}

        {/* Contentor do Slider */}
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center">
          
          {safeItems.map((src, idx) => {
            let zIndex = "z-0";
            let transform = "opacity-0 scale-90 pointer-events-none"; // Estado base (escondido)

            if (isCoverflow) {
              // Lógica "Coverflow" (Exige 3 ou mais imagens)
              let offset = idx - currentIndex;
              
              if (offset < -1) offset += safeItems.length;
              if (offset > 1) offset -= safeItems.length;

              if (offset === 0) {
                zIndex = "z-30";
                transform = "opacity-100 scale-100 translate-x-0 shadow-2xl";
              } else if (offset === -1) {
                zIndex = "z-20";
                transform = "opacity-50 scale-90 -translate-x-[35%] md:-translate-x-[40%] cursor-pointer hover:opacity-75 blur-[2px]";
              } else if (offset === 1) {
                zIndex = "z-20";
                transform = "opacity-50 scale-90 translate-x-[35%] md:translate-x-[40%] cursor-pointer hover:opacity-75 blur-[2px]";
              }
            } else {
              // Lógica "Crossfade / Fade" (Para 1 ou 2 imagens)
              if (idx === currentIndex) {
                zIndex = "z-30";
                transform = "opacity-100 scale-100 translate-x-0 shadow-2xl";
              }
            }

            return (
              <div 
                key={idx} 
                onClick={() => {
                  if (isCoverflow) {
                    let offset = idx - currentIndex;
                    if (offset < -1) offset += safeItems.length;
                    if (offset > 1) offset -= safeItems.length;
                    if (offset === -1) prev();
                    if (offset === 1) next();
                  }
                }}
                className={`absolute w-[85%] sm:w-[75%] md:w-[65%] h-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${zIndex} ${transform}`}
              >
                <Image 
                  src={src} 
                  alt={`Galeria Lifestyle ${idx + 1}`} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
            );
          })}

          {/* Botões de Navegação (Apenas se houver 2+ fotos) */}
          {safeItems.length > 1 && (
            <>
              <button 
                onClick={prev} 
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-zinc-900 rounded-full flex items-center justify-center transition-all shadow-xl z-40 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next} 
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-zinc-900 rounded-full flex items-center justify-center transition-all shadow-xl z-40 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bolinhas de Navegação (Apenas se houver 2+ fotos) */}
        {safeItems.length > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {safeItems.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  currentIndex === idx ? "bg-primary w-10" : "bg-gray-300 w-2.5 hover:bg-gray-400"
                }`} 
                aria-label={`Ir para a imagem ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}