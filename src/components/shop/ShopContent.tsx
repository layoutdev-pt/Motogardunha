"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Star, ShoppingCart } from "lucide-react";
import { MOCK_GEAR } from "@/lib/mock-data";
import { GEAR_CATEGORIES } from "@/lib/constants";
import { formatPriceDecimal, cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Mais Recentes" },
  { value: "price_asc", label: "Preço: Menor → Maior" },
  { value: "price_desc", label: "Preço: Maior → Menor" },
  { value: "rating", label: "Melhor Avaliação" },
];

const GEAR_BRANDS = [...new Set(MOCK_GEAR.map((g) => g.brand))];

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredGear = useMemo(() => {
    let results = [...MOCK_GEAR];

    if (activeCategory !== "all") {
      results = results.filter((g) => g.category === activeCategory);
    }
    if (selectedBrands.length > 0) {
      results = results.filter((g) => selectedBrands.includes(g.brand));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.brand.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price_asc":
        results.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
        break;
      case "price_desc":
        results.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
        break;
      case "rating":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
    return results;
  }, [activeCategory, selectedBrands, sortBy, searchQuery]);

  return (
    <div className="pt-20">
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
        PORTES GRÁTIS EM ENCOMENDAS ACIMA DE €150 — EQUIPE-SE AGORA!
      </div>

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          alt="Gear Shop"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3 uppercase">
            Gear Up & Ride Out
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Equipamento premium para velocidade, segurança e estilo.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-full max-w-lg w-full flex items-center border border-white/10">
            <input
              className="bg-transparent border-none flex-grow text-white placeholder-gray-300 focus:ring-0 focus:outline-none px-4 py-2 text-sm"
              placeholder="Pesquisar capacetes, casacos, marcas..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-1">
              <Search className="w-4 h-4" />
              Procurar
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {GEAR_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                  activeCategory === cat.value
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <p className="text-sm text-gray-500">
            A mostrar{" "}
            <span className="font-medium text-foreground">
              {filteredGear.length}
            </span>{" "}
            de {MOCK_GEAR.length} produtos
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ordenar:</span>
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
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0 hidden lg:block space-y-8">
            {/* Brand filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Marca
              </h3>
              <div className="space-y-3">
                {GEAR_BRANDS.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-foreground">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size quick select */}
            <div>
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Tamanho
              </h3>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="w-10 h-10 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredGear.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">
                  Nenhum produto encontrado
                </p>
                <p className="text-gray-400 text-sm">
                  Tente ajustar os filtros ou pesquise por outro termo.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGear.map((product) => (
                  <Link
                    key={product.id}
                    href={`/loja/${product.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
                      <img
                        alt={product.name}
                        className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        src={product.cover_image}
                      />
                      {product.is_new && (
                        <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                          NOVO
                        </span>
                      )}
                      {product.sale_price && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          -{Math.round(((product.price - product.sale_price) / product.price) * 100)}% SALE
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                          {product.brand}
                        </p>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-gray-500">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.sale_price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400 line-through">
                                {formatPriceDecimal(product.price)}
                              </span>
                              <span className="text-primary font-bold text-lg">
                                {formatPriceDecimal(product.sale_price)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg text-foreground">
                              {formatPriceDecimal(product.price)}
                            </span>
                          )}
                        </div>
                        <span className="bg-primary text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShoppingCart className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load more */}
            {filteredGear.length > 0 && (
              <div className="mt-12 text-center">
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all">
                  Carregar Mais Equipamento
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 py-10 border-t border-gray-100">
          {[
            { icon: "🚚", title: "Portes Grátis", desc: "Em encomendas acima de €150" },
            { icon: "↩️", title: "Devoluções 30 Dias", desc: "Política de devolução fácil" },
            { icon: "🔒", title: "Pagamento Seguro", desc: "100% protegido" },
            { icon: "💬", title: "Suporte Especializado", desc: "Fale com motociclistas reais" },
          ].map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="font-bold text-sm text-foreground">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
