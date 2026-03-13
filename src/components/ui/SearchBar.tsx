"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2, Bike, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatPrice, formatPriceDecimal, cn } from "@/lib/utils";
import type { Motorcycle, GearProduct } from "@/types";

interface SearchBarProps {
  variant?: "header" | "hero";
  placeholder?: string;
  className?: string;
}

type MotoResult = Pick<Motorcycle, "id" | "name" | "brand" | "year" | "engine_cc" | "mileage" | "price" | "cover_image" | "slug" | "segment"> & { _type: "moto" };
type GearResult = Pick<GearProduct, "id" | "title" | "category" | "product_type" | "price" | "cover_image" | "slug"> & { _type: "gear" };
type SearchResult = MotoResult | GearResult;

export default function SearchBar({
  variant = "header",
  placeholder = "Pesquisar...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) return;
      const { motos, gear } = await res.json();

      const combined: SearchResult[] = [
        ...(motos ?? []).map((m: MotoResult) => ({ ...m, _type: "moto" as const })),
        ...(gear ?? []).map((g: GearResult) => ({ ...g, _type: "gear" as const })),
      ];
      setResults(combined);
      setIsOpen(combined.length > 0 || searchQuery.length >= 2);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => search(query), 300);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [query, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  const isHero = variant === "hero";
  const motos = results.filter((r): r is MotoResult => r._type === "moto");
  const gear = results.filter((r): r is GearResult => r._type === "gear");

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div
        className={cn(
          "relative flex items-center",
          isHero
            ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden"
            : "bg-gray-100 rounded-full"
        )}
      >
        <Search
          className={cn(
            "absolute left-4",
            isHero ? "w-5 h-5 text-white/70" : "w-4 h-4 text-gray-400"
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full border-none focus:ring-0 focus:outline-none",
            isHero
              ? "bg-transparent text-white placeholder-gray-300 px-14 py-3 text-base"
              : "bg-gray-100 text-foreground placeholder-gray-400 py-1.5 px-10 text-sm focus:ring-2 focus:ring-primary rounded-full"
          )}
        />
        {loading && (
          <Loader2
            className={cn(
              "absolute right-4 animate-spin",
              isHero ? "w-5 h-5 text-white/70" : "w-4 h-4 text-gray-400"
            )}
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-w-[340px]">
          {results.length === 0 && !loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm">Nenhum resultado para &ldquo;{query}&rdquo;</p>
              <div className="flex gap-3 justify-center mt-3">
                <Link href="/stand" onClick={handleResultClick} className="text-primary text-sm font-medium hover:underline">Ver stand</Link>
                <span className="text-gray-300">•</span>
                <Link href="/loja" onClick={handleResultClick} className="text-primary text-sm font-medium hover:underline">Ver loja</Link>
              </div>
            </div>
          ) : (
            <div className="max-h-[480px] overflow-y-auto">
              {/* Motos section */}
              {motos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <Bike className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stand de Motos</span>
                  </div>
                  {motos.map((moto) => (
                    <Link
                      key={moto.id}
                      href={`/stand/${moto.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img src={moto.cover_image || "/placeholder-moto.jpg"} alt={moto.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-foreground text-sm truncate">{moto.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                          {moto.brand && <span className="bg-gray-100 px-2 py-0.5 rounded">{moto.brand}</span>}
                          {moto.year && <span className="bg-gray-100 px-2 py-0.5 rounded">{moto.year}</span>}
                          {moto.engine_cc && <span className="bg-gray-100 px-2 py-0.5 rounded">{moto.engine_cc}cc</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary text-sm">{formatPrice(moto.price)}</p>
                        {moto.mileage > 0 && <p className="text-xs text-gray-400">{moto.mileage} km</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Gear section */}
              {gear.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Loja de Equipamento</span>
                  </div>
                  {gear.map((product) => (
                    <Link
                      key={product.id}
                      href={`/loja/${product.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img src={product.cover_image} alt={product.title} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-foreground text-sm truncate">{product.title}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                          <span className="bg-gray-100 px-2 py-0.5 rounded capitalize">{product.category}</span>
                          {product.product_type && <span className="bg-gray-100 px-2 py-0.5 rounded">{product.product_type}</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary text-sm">{formatPriceDecimal(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer links */}
          {results.length > 0 && (
            <div className="flex border-t border-gray-100">
              <Link
                href={`/stand?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex-1 p-3 text-center text-xs font-medium text-primary hover:bg-primary/5 transition-colors border-r border-gray-100"
              >
                Ver motos ({motos.length})
              </Link>
              <Link
                href={`/loja?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex-1 p-3 text-center text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                Ver produtos ({gear.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
