"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { MOCK_MOTORCYCLES } from "@/lib/mock-data";
import { BRANDS, MOTORCYCLE_TYPES } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";

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

export default function StandContent() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredMotos = useMemo(() => {
    let results = [...MOCK_MOTORCYCLES];

    if (selectedBrands.length > 0) {
      results = results.filter((m) => selectedBrands.includes(m.brand));
    }
    if (selectedType !== "all") {
      results = results.filter((m) => m.type === selectedType);
    }
    if (selectedEngine) {
      const range = ENGINE_RANGES.find((r) => r.label === selectedEngine);
      if (range) {
        results = results.filter(
          (m) => m.engine_cc >= range.min && m.engine_cc <= range.max
        );
      }
    }

    switch (sortBy) {
      case "price_asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "year_desc":
        results.sort((a, b) => b.year - a.year);
        break;
      default:
        results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    }

    return results;
  }, [selectedBrands, selectedType, selectedEngine, sortBy]);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_MOTORCYCLES.forEach((m) => {
      counts[m.brand] = (counts[m.brand] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Stand</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-3">
          O Nosso Stand
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Explore a nossa coleção premium de motociclos de alta performance.
          Cada modelo escolhido a pensar na melhor experiência de condução.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Mobile filter toggle + sort */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500 hidden sm:inline">
              Ordenar por:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={cn(
              "w-64 flex-shrink-0 space-y-8",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            {/* Brands */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Marcas</h3>
              <div className="space-y-3">
                {BRANDS.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-foreground transition-colors">
                        {brand}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {brandCounts[brand] || 0}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Tipo</h3>
              <div className="space-y-3">
                {MOTORCYCLE_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type.value}
                      onChange={() => setSelectedType(type.value)}
                      className="w-4 h-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-foreground transition-colors">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Engine CC */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Cilindrada (CC)</h3>
              <div className="flex flex-wrap gap-2">
                {ENGINE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      setSelectedEngine(
                        selectedEngine === range.label ? null : range.label
                      )
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      selectedEngine === range.label
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {(selectedBrands.length > 0 ||
              selectedType !== "all" ||
              selectedEngine) && (
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedType("all");
                  setSelectedEngine(null);
                }}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Limpar filtros
              </button>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-6">
              A mostrar{" "}
              <span className="font-medium text-foreground">
                {filteredMotos.length}
              </span>{" "}
              motociclos
            </p>

            {filteredMotos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">
                  Nenhuma moto encontrada
                </p>
                <p className="text-gray-400 text-sm">
                  Tente ajustar os filtros para ver mais resultados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMotos.map((moto) => (
                  <Link
                    key={moto.id}
                    href={`/stand/${moto.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-52 overflow-hidden bg-gray-50">
                      <img
                        alt={`${moto.brand} ${moto.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={moto.cover_image}
                      />
                      {moto.condition === "new" && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          Novo
                        </span>
                      )}
                      {moto.condition === "used" && (
                        <span className="absolute top-3 left-3 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">
                          Usado
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg text-foreground mb-1">
                        {moto.brand} {moto.model}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {moto.type.charAt(0).toUpperCase() +
                          moto.type.slice(1)}{" "}
                        · {moto.engine_cc} cc
                      </p>
                      <p className="text-primary font-bold text-xl">
                        {formatPrice(moto.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load more */}
            {filteredMotos.length > 0 && (
              <div className="mt-12 text-center">
                <button className="bg-secondary text-white hover:bg-black px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
                  Carregar Mais
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
