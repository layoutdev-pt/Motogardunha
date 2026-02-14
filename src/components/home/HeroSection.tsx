"use client";

import { Search } from "lucide-react";
import { BRANDS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Motogardunha Stand"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-[#0F0F11]/60 to-[#0F0F11]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6 tracking-tight leading-tight uppercase text-glow">
          Onde a Paixão Pela
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
            Estrada Ganha Vida
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Descubra a moto perfeita para cada curva, cada destino, e cada
          aventura.
        </p>

        {/* Search bar */}
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full max-w-2xl mx-auto flex items-center shadow-2xl border border-white/10">
          <input
            className="bg-transparent border-none flex-grow text-white placeholder-gray-300 focus:ring-0 focus:outline-none px-6 py-3"
            placeholder="Pesquisar por Marca, Modelo ou Estilo..."
            type="text"
          />
          <button className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition-colors flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-400">
          <a
            className="hover:text-white border-b border-transparent hover:border-white transition-all pb-0.5"
            href="/stand"
          >
            Encontrar a Minha Moto
          </a>
          <span className="text-primary">•</span>
          <a
            className="hover:text-white border-b border-transparent hover:border-white transition-all pb-0.5"
            href="/contactos"
          >
            Agendar Test-Drive
          </a>
        </div>
      </div>

      {/* Brand bar */}
      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm border-t border-white/5 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500 gap-8 overflow-x-auto no-scrollbar">
          {BRANDS.slice(0, 6).map((brand) => (
            <span
              key={brand}
              className="font-display font-bold text-xl md:text-2xl text-white italic tracking-tighter whitespace-nowrap"
            >
              {brand.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
