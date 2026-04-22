// src/components/stand/StandContent.tsx
"use client";

import { BRANDS, MOTORCYCLE_TYPES } from "@/lib/constants";
import { Bike, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useMemo, useState } from "react";

import CustomSelect from "@/components/ui/CustomSelect";
import Image from "next/image";
import Link from "next/link";
import type { Motorcycle } from "@/types";

const PAGE_SIZE = 12;

const KNOWN_FAMILIES = [
  "piaggio-mp3",
  "piaggio-beverly",
  "piaggio-medley",
  "piaggio-liberty"
];

const ENGINE_RANGES = [
  { label: "< 500cc", min: 0, max: 500 },
  { label: "500 - 900cc", min: 500, max: 900 },
  { label: "1000cc +", min: 1000, max: 99999 },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Mais Recentes" },
  { value: "price_asc", label: "Preço: Menor → Maior" },
  { value: "price_desc", label: "Preço: Maior → Menor" },
  { value: "year_desc", label: "Ano: Mais Recente" },
];

const CONDITION_TABS = [
  { value: "all", label: "Todas as Motos" },
  { value: "new", label: "Motos Novas" },
  { value: "used", label: "Motos Usadas" },
];

interface StandContentProps {
  initialMotos: Motorcycle[];
}

export default function StandContent({ initialMotos }: StandContentProps) {
  const allMotos = initialMotos;
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [conditionTab, setConditionTab] = useState("all");
  const [page, setPage] = useState(1);

  const toggleBrand = (brand: string) => {
    setPage(1);
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredMotos = useMemo(() => {
    let results = [...allMotos];

    if (conditionTab === "new") results = results.filter((m) => m.mileage === 0);
    else if (conditionTab === "used") results = results.filter((m) => m.mileage > 0);

    if (selectedBrands.length > 0) results = results.filter((m) => selectedBrands.includes(m.brand));
    if (selectedType !== "all") results = results.filter((m) => m.segment === selectedType);
    if (selectedEngine) {
      const range = ENGINE_RANGES.find((r) => r.label === selectedEngine);
      if (range) results = results.filter((m) => m.engine_cc >= range.min && m.engine_cc <= range.max);
    }

    switch (sortBy) {
      case "price_asc": results.sort((a, b) => a.price - b.price); break;
      case "price_desc": results.sort((a, b) => b.price - a.price); break;
      case "year_desc": results.sort((a, b) => b.year - a.year); break;
      default: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return results;
  }, [allMotos, selectedBrands, selectedType, selectedEngine, sortBy, conditionTab]);

  // ALGORITMO DE AGRUPAMENTO DE FAMÍLIAS
  const groupedFamilies = useMemo(() => {
    const groups = new Map<string, Motorcycle[]>();
    
    filteredMotos.forEach((m) => {
      // Extrai a família assumindo que é a 2ª palavra do nome (ex: Piaggio ->Beverly<- 400)
      const familyName = m.name.split(" ")[1] || "Modelo"; 
      const groupKey = `${m.brand}-${familyName}`;
      
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey)!.push(m);
    });

    return Array.from(groups.values());
  }, [filteredMotos]);

  const totalPages = Math.ceil(groupedFamilies.length / PAGE_SIZE);
  const pagedFamilies = useMemo(
    () => groupedFamilies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [groupedFamilies, page]
  );

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allMotos.forEach((m) => { counts[m.brand] = (counts[m.brand] || 0) + 1; });
    return counts;
  }, [allMotos]);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Stand</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground mb-3">
          O Nosso Stand
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Explore a nossa coleção premium de motociclos de alta performance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            {CONDITION_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setConditionTab(tab.value); setPage(1); }}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-bold transition-all",
                  conditionTab === tab.value ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:text-foreground hover:bg-gray-50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500 hidden sm:inline">Ordenar por:</span>
            <CustomSelect value={sortBy} onChange={(value) => { setSortBy(value); setPage(1); }} options={SORT_OPTIONS} className="w-48" />
          </div>
        </div>

        {showFilters && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setShowFilters(false)} />}

        <div className="flex gap-8">
          <aside className={cn("w-72 flex-shrink-0 space-y-8", "lg:block", showFilters ? "fixed top-0 left-0 h-full z-50 bg-white overflow-y-auto p-6 shadow-2xl transition-transform" : "hidden lg:block")}>
            <div className="flex items-center justify-between lg:hidden mb-2">
              <h2 className="font-bold text-foreground text-lg">Filtros</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Marcas</h3>
              <div className="space-y-3">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4 rounded border-gray-300 text-primary" />
                      <span className="text-sm text-gray-700 group-hover:text-foreground">{brand}</span>
                    </div>
                    <span className="text-xs text-gray-400">{brandCounts[brand] || 0}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Cilindrada (CC)</h3>
              <div className="flex flex-wrap gap-2">
                {ENGINE_RANGES.map((range) => (
                  <button key={range.label} onClick={() => setSelectedEngine(selectedEngine === range.label ? null : range.label)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-colors", selectedEngine === range.label ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary")}>
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {(selectedBrands.length > 0 || selectedType !== "all" || selectedEngine) && (
              <button onClick={() => { setSelectedBrands([]); setSelectedType("all"); setSelectedEngine(null); setPage(1); }} className="text-sm text-primary hover:text-primary-dark font-medium">Limpar filtros</button>
            )}
          </aside>

          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-6">
              A mostrar <span className="font-medium text-foreground">{groupedFamilies.length}</span> modelos
            </p>

            {groupedFamilies.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5"><Bike className="w-10 h-10 text-gray-300" /></div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Nenhum modelo encontrado</h3>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {pagedFamilies.map((familyGroup) => {
                  const baseMoto = familyGroup.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
                  const familyName = baseMoto.name.split(" ")[1] || "Modelo";
                  const title = `${baseMoto.brand} ${familyName}`;
                  
                  // Geração do Slug da Família
                  const familySlug = `${baseMoto.brand.toLowerCase().replace(/\s+/g, '-')}-${familyName.toLowerCase().replace(/\s+/g, '-')}`;                  
                  const availableEngines = Array.from(new Set(familyGroup.map(m => m.engine_cc))).sort((a, b) => a - b);

                  return (
                    <Link
                      key={baseMoto.id}
                      // LÓGICA DE FALLBACK: Verifica se o slug gerado existe na lista de Famílias conhecidas.
                      // Se Sim -> Manda para a página genérica da Família
                      // Se Não -> Manda direto para a página individual da mota base
                      href={KNOWN_FAMILIES.includes(familySlug) ? `/familia/${familySlug}` : `/stand/${baseMoto.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="relative h-40 sm:h-52 overflow-hidden bg-gray-50">
                        <Image
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          src={baseMoto.cover_image}
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                        {baseMoto.mileage === 0 && (
                          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">Novo</span>
                        )}
                      </div>
                      
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                          {title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4 mt-2">
                          {availableEngines.map(cc => (
                            <span key={cc} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded font-medium border border-zinc-200">
                              {cc} cc
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">A partir de</p>
                            <p className="text-primary font-black text-xl leading-none">
                              {formatPrice(baseMoto.price)}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors flex items-center gap-1">
                            {KNOWN_FAMILIES.includes(familySlug) ? "Ver Família" : "Ver Detalhes"} <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === 1} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={cn("w-9 h-9 rounded-lg text-sm font-medium", p === page ? "bg-primary text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50")}>{p}</button>
                ))}
                <button onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === totalPages} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}