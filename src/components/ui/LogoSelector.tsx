"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LogoSelectorProps {
  value?: string;
  onChange: (url: string) => void;
  selectedBrand?: string;
  onAddBrand?: () => void;
}

const BRAND_LOGOS = {
  "Aprilia": "/images/partners/aprilia.png",
  "Kawasaki": "/images/partners/Kawasaki-2024-Logo-Vector.svg- (1).png",
  "Piaggio": "/images/partners/Piaggio-Motorcycle-Logo.png",
  "Zontes": "/images/partners/Zontes_Brand_2019_white.png",
  "Vespa": "/images/partners/vespa-7-logo-black-and-white.png",
  "BMW": null,
  "Ducati": null,
  "Harley-Davidson": null,
  "Honda": null,
  "KTM": null,
  "Suzuki": null,
  "Triumph": null,
  "Yamaha": null,
};

const defaultLogos = Object.values(BRAND_LOGOS).filter(Boolean) as string[];

export default function LogoSelector({ value, onChange, selectedBrand, onAddBrand }: LogoSelectorProps) {
  const [customBrands, setCustomBrands] = useState<Array<{ id: string; name: string; logo_url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadCustomBrands() {
    try {
      const res = await fetch("/api/admin/brands");
      if (res.ok) setCustomBrands(await res.json());
    } catch (err) {
      console.error("Error loading brands:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadCustomBrands(); }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    const defaultLogo = BRAND_LOGOS[selectedBrand as keyof typeof BRAND_LOGOS];
    if (defaultLogo) { onChange(defaultLogo); return; }
    const custom = customBrands.find(b => b.name === selectedBrand);
    if (custom) onChange(custom.logo_url);
  }, [selectedBrand, customBrands, onChange]);

  const handleDelete = async (e: React.MouseEvent, brand: { id: string; logo_url: string }) => {
    e.stopPropagation();
    if (!confirm(`Eliminar esta marca?`)) return;
    setDeletingId(brand.id);
    try {
      const res = await fetch("/api/admin/brands", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: brand.id }),
      });
      if (res.ok) {
        if (value === brand.logo_url) onChange("");
        await loadCustomBrands();
      }
    } catch (err) {
      console.error("Error deleting brand:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="animate-pulse grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => <div key={i} className="h-12 bg-white/10 rounded" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold">
        Logótipo da Marca
      </label>

      {/* Logo grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-h-48 overflow-y-auto p-4 bg-white/5 border border-white/10 rounded-xl w-full">
        
        {/* Default brand logos */}
        {defaultLogos.map((logo) => (
          <button
            key={logo}
            type="button"
            onClick={() => onChange(logo)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all aspect-square ${
              value === logo ? "border-primary ring-2 ring-primary/50" : "border-transparent hover:border-white/20"
            }`}
          >
            <div className="relative w-full h-full bg-white/10">
              <Image src={logo} alt="Logo" fill className="object-contain p-2" sizes="100px"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </button>
        ))}

        {/* Custom brand logos with delete button */}
        {customBrands.map((brand) => (
          <div key={brand.id} className="relative group aspect-square">
            <button
              type="button"
              onClick={() => onChange(brand.logo_url)}
              className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all ${
                value === brand.logo_url ? "border-primary ring-2 ring-primary/50" : "border-transparent hover:border-white/20"
              }`}
            >
              <div className="relative w-full h-full bg-white/10">
                <Image src={brand.logo_url} alt={brand.name} fill className="object-contain p-2" sizes="100px" />
                <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] text-white/60 bg-black/40 py-0.5 truncate px-1">
                  {brand.name}
                </span>
              </div>
            </button>
            {/* Delete X button */}
            <button
              type="button"
              onClick={(e) => handleDelete(e, brand)}
              disabled={deletingId === brand.id}
              className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 shadow-md"
              aria-label={`Eliminar ${brand.name}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add Brand Button */}
        {onAddBrand && (
          <button
            type="button"
            onClick={onAddBrand}
            className="relative group rounded-lg overflow-hidden border-2 border-dashed border-primary/50 hover:border-primary transition-all aspect-square bg-primary/10 hover:bg-primary/20 flex flex-col items-center justify-center gap-1"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-bold text-primary">Outro</span>
          </button>
        )}
      </div>

      {/* Selected logo preview */}
      {value && (
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="relative w-12 h-12 bg-white/10 rounded">
            <Image src={value} alt="Selected logo" fill className="object-contain p-1" sizes="48px" />
          </div>
          <span className="text-sm text-gray-400 truncate">{value}</span>
        </div>
      )}
    </div>
  );
}
