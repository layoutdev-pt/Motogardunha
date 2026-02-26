"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LogoSelectorProps {
  value?: string;
  onChange: (url: string) => void;
  selectedBrand?: string;
}

const BRAND_LOGOS = {
  "Aprilia": "/images/partners/aprilia.png",
  "BMW": "/images/partners/bmw.png",
  "Ducati": "/images/partners/ducati.png",
  "Harley-Davidson": "/images/partners/harley-davidson.png",
  "Honda": "/images/partners/honda.png",
  "Kawasaki": "/images/partners/kawasaki.png",
  "KTM": "/images/partners/ktm.png",
  "Piaggio": "/images/partners/piaggio.png",
  "Suzuki": "/images/partners/suzuki.png",
  "Triumph": "/images/partners/triumph.png",
  "Vespa": "/images/partners/vespa.png",
  "Yamaha": "/images/partners/yamaha.png",
  "Zontes": "/images/partners/zontes.png",
};

export default function LogoSelector({ value, onChange, selectedBrand }: LogoSelectorProps) {
  const [availableLogos, setAvailableLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-select logo when brand changes
    if (selectedBrand && BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS]) {
      onChange(BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS]);
    }
  }, [selectedBrand, onChange]);

  useEffect(() => {
    // Load available logos from partners folder
    const logos = Object.values(BRAND_LOGOS);
    setAvailableLogos(logos);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold">
        Logótipo da Marca
      </label>
      
      {/* Auto-selected logo info */}
      {selectedBrand && BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS] && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-400 text-sm">
          Logótipo automaticamente selecionado para: {selectedBrand}
        </div>
      )}

      {/* Logo grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 max-h-32 overflow-y-auto p-2 bg-white/5 border border-white/10 rounded-xl">
        {availableLogos.map((logo) => (
          <button
            key={logo}
            type="button"
            onClick={() => onChange(logo)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
              value === logo
                ? "border-primary ring-2 ring-primary/50"
                : "border-transparent hover:border-white/20"
            }`}
          >
            <div className="relative w-full h-12 bg-white/10">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain p-1"
                sizes="48px"
                onError={(e) => {
                  // Hide broken images
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Selected logo preview */}
      {value && (
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="relative w-12 h-12 bg-white/10 rounded">
            <Image
              src={value}
              alt="Selected logo"
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <span className="text-sm text-gray-400 truncate">{value}</span>
        </div>
      )}
    </div>
  );
}
