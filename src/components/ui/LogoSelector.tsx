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
  "Kawasaki": "/images/partners/Kawasaki-2024-Logo-Vector.svg- (1).png",
  "Piaggio": "/images/partners/Piaggio-Motorcycle-Logo.png",
  "Zontes": "/images/partners/Zontes_Brand_2019_white.png",
  "Vespa": "/images/partners/vespa-7-logo-black-and-white.png",
  // These brands don't have logos yet, will show as broken images
  "BMW": null,
  "Ducati": null,
  "Harley-Davidson": null,
  "Honda": null,
  "KTM": null,
  "Suzuki": null,
  "Triumph": null,
  "Yamaha": null,
};

export default function LogoSelector({ value, onChange, selectedBrand }: LogoSelectorProps) {
  const [availableLogos, setAvailableLogos] = useState<string[]>([]);
  const [customBrands, setCustomBrands] = useState<Array<{ name: string; logo_url: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogos() {
      try {
        // Load custom brands from database
        const res = await fetch("/api/admin/brands");
        if (res.ok) {
          const brands = await res.json();
          setCustomBrands(brands);
          
          // Combine default logos with custom brand logos
          const defaultLogos = Object.values(BRAND_LOGOS).filter(Boolean) as string[];
          const customLogos = brands.map((b: any) => b.logo_url);
          setAvailableLogos([...defaultLogos, ...customLogos]);
        } else {
          // Fallback to default logos only
          const logos = Object.values(BRAND_LOGOS).filter(Boolean) as string[];
          setAvailableLogos(logos);
        }
      } catch (err) {
        console.error("Error loading logos:", err);
        const logos = Object.values(BRAND_LOGOS).filter(Boolean) as string[];
        setAvailableLogos(logos);
      } finally {
        setLoading(false);
      }
    }
    loadLogos();
  }, []);

  useEffect(() => {
    // Auto-select logo when brand changes
    if (!selectedBrand) return;
    
    // Check default brand logos
    if (BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS]) {
      const logoUrl = BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS];
      if (logoUrl) onChange(logoUrl);
      return;
    }
    
    // Check custom brands
    const customBrand = customBrands.find(b => b.name === selectedBrand);
    if (customBrand) {
      onChange(customBrand.logo_url);
    }
  }, [selectedBrand, customBrands, onChange]);

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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-h-48 overflow-y-auto p-4 bg-white/5 border border-white/10 rounded-xl w-full">
        {availableLogos.map((logo) => (
          <button
            key={logo}
            type="button"
            onClick={() => onChange(logo)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all aspect-square ${
              value === logo
                ? "border-primary ring-2 ring-primary/50"
                : "border-transparent hover:border-white/20"
            }`}
          >
            <div className="relative w-full h-full bg-white/10">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain p-2"
                sizes="100px"
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
