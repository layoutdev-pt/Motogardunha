"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, cn } from "@/lib/utils";
import type { Motorcycle } from "@/types";

interface SearchBarProps {
  variant?: "header" | "hero";
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  variant = "header",
  placeholder = "Pesquisar...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Motorcycle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const searchMotorcycles = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("motorcycles")
        .select("*")
        .eq("status", "available")
        .or(
          `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,segment.ilike.%${searchQuery}%`
        )
        .limit(8);

      if (!error && data) {
        setResults(data as Motorcycle[]);
        setIsOpen(data.length > 0);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchMotorcycles(query);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, searchMotorcycles]);

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

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className={cn(
            "absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-primary overflow-hidden",
            isHero ? "max-w-2xl" : ""
          )}
        >
          <div className="max-h-96 overflow-y-auto">
            {results.map((moto) => (
              <Link
                key={moto.id}
                href={`/stand/${moto.slug}`}
                onClick={handleResultClick}
                className="flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {/* Motorcycle Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={moto.cover_image || "/placeholder-moto.jpg"}
                    alt={moto.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Motorcycle Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">
                    {moto.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    {moto.brand && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        {moto.brand}
                      </span>
                    )}
                    {moto.year && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        {moto.year}
                      </span>
                    )}
                    {moto.engine_cc && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        {moto.engine_cc}cc
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-primary text-sm">
                    {formatPrice(moto.price)}
                  </p>
                  {moto.mileage > 0 && (
                    <p className="text-xs text-gray-500">{moto.mileage} km</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* View All Results */}
          <Link
            href={`/stand?search=${encodeURIComponent(query)}`}
            onClick={handleResultClick}
            className="block p-3 text-center text-sm font-medium text-primary hover:bg-primary/5 transition-colors border-t border-gray-200"
          >
            Ver todos os resultados ({results.length})
          </Link>
        </div>
      )}

      {/* No Results */}
      {isOpen && !loading && query && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-6 text-center">
          <p className="text-gray-500 text-sm">
            Nenhuma moto encontrada para "{query}"
          </p>
          <Link
            href="/stand"
            onClick={handleResultClick}
            className="inline-block mt-3 text-primary text-sm font-medium hover:underline"
          >
            Ver todas as motos
          </Link>
        </div>
      )}
    </div>
  );
}
