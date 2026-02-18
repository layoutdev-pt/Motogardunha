"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Loader2, Truck, RotateCcw, Lock, MessageCircle } from "lucide-react";
import BannerCarousel from "@/components/shop/BannerCarousel";
import { GEAR_CATEGORIES } from "@/lib/constants";
import { formatPriceDecimal, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { GearProduct } from "@/types";
import CustomSelect from "@/components/ui/CustomSelect";

const SORT_OPTIONS = [
  { value: "newest", label: "Mais Recentes" },
  { value: "price_asc", label: "Preço: Menor → Maior" },
  { value: "price_desc", label: "Preço: Maior → Menor" },
  { value: "rating", label: "Melhor Avaliação" },
];

export default function ShopContent() {
  const [allGear, setAllGear] = useState<GearProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchGear = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("gear_products")
      .select("*")
      .order("created_at", { ascending: false });
    setAllGear((data as GearProduct[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGear();
  }, [fetchGear]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const GEAR_BRANDS = useMemo(() => [...new Set(allGear.map((g) => g.product_type).filter((v): v is string => Boolean(v)))], [allGear]);

  const filteredGear = useMemo(() => {
    let results = [...allGear];

    if (activeCategory !== "all") {
      results = results.filter((g) => g.category === activeCategory);
    }
    if (selectedBrands.length > 0) {
      results = results.filter((g) => g.product_type && selectedBrands.includes(g.product_type));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          (g.product_type && g.product_type.toLowerCase().includes(q))
      );
    }
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      results = results.filter((g) => g.price >= min && (max ? g.price <= max : true));
    }
    if (selectedCategory !== "all") {
      results = results.filter((g) => g.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    switch (sortBy) {
      case "price_asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        break;
      default:
        results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
    return results;
  }, [allGear, activeCategory, selectedBrands, sortBy, searchQuery]);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
        PORTES GRÁTIS EM ENCOMENDAS ACIMA DE €150 — EQUIPE-SE AGORA!
      </div>

      {/* Hero Carousel */}
      <BannerCarousel />

      {/* Search bar below carousel */}
      <div className="bg-zinc-900 py-4">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-full w-full flex items-center border border-white/10">
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
            de {allGear.length} produtos
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ordenar:</span>
            <CustomSelect
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              options={SORT_OPTIONS}
              className="w-48"
            />
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

            {/* Price filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Preço
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "Todos os Preços" },
                  { value: "0-50", label: "Até €50" },
                  { value: "50-100", label: "€50 - €100" },
                  { value: "100-200", label: "€100 - €200" },
                  { value: "200-500", label: "€200 - €500" },
                  { value: "500-99999", label: "Acima de €500" },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === range.value}
                      onChange={() => setPriceRange(range.value)}
                      className="w-4 h-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-foreground">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Categoria
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "Todas as Categorias" },
                  { value: "offroad", label: "Offroad" },
                  { value: "estrada", label: "Estrada" },
                ].map((cat) => (
                  <label
                    key={cat.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.value}
                      onChange={() => setSelectedCategory(cat.value)}
                      className="w-4 h-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-foreground">
                      {cat.label}
                    </span>
                  </label>
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
                        alt={product.title}
                        className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        src={product.cover_image}
                      />
                      {product.is_featured && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          DESTAQUE
                        </span>
                      )}
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.compare_price && product.compare_price > product.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400 line-through">
                                {formatPriceDecimal(product.compare_price)}
                              </span>
                              <span className="text-primary font-bold text-lg">
                                {formatPriceDecimal(product.price)}
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
            { Icon: Truck, title: "Portes Grátis", desc: "Em encomendas acima de €150" },
            { Icon: RotateCcw, title: "Devoluções 30 Dias", desc: "Política de devolução fácil" },
            { Icon: Lock, title: "Pagamento Seguro", desc: "100% protegido" },
            { Icon: MessageCircle, title: "Suporte Especializado", desc: "Fale com motociclistas reais" },
          ].map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.Icon className="w-6 h-6 text-primary" />
              </div>
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
