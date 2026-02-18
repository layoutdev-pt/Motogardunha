"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { MOCK_GEAR } from "@/lib/mock-data";
import { formatPriceDecimal, cn } from "@/lib/utils";

export default function AdminProdutosPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(MOCK_GEAR.map((g) => g.category))];

  const filtered = MOCK_GEAR.filter((g) => {
    const matchSearch =
      g.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "all" || g.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Loja / Gear
          </h1>
          <p className="text-sm text-gray-500">
            Gerir inventário de equipamento e acessórios
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Adicionar Produto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por marca ou nome..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-colors border whitespace-nowrap capitalize",
                filterCategory === cat
                  ? "bg-primary/20 border-primary/30 text-primary"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              )}
            >
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-colors group"
          >
            <div className="relative h-44 bg-white/5 flex items-center justify-center p-4">
              <img
                alt={product.title}
                className="max-h-full object-contain"
                src={product.cover_image}
              />
              {product.status === "active" && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ATIVO
                </span>
              )}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/loja/${product.slug}`}
                  className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <button className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg bg-black/60 text-red-400 hover:bg-black/80 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  {product.category}
                </p>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 truncate">
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {product.compare_price ? (
                    <>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPriceDecimal(product.compare_price)}
                      </span>
                      <span className="text-primary font-bold text-sm">
                        {formatPriceDecimal(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-sm text-white">
                      {formatPriceDecimal(product.price)}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 rounded-full",
                    product.status === "active"
                      ? "bg-green-400/20 text-green-400"
                      : product.status === "draft"
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "bg-red-400/20 text-red-400"
                  )}
                >
                  {product.status === "active"
                    ? "Ativo"
                    : product.status === "draft"
                    ? "Rascunho"
                    : "Arquivado"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-2xl">
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      )}

      <div className="text-sm text-gray-500">
        A mostrar {filtered.length} de {MOCK_GEAR.length} produtos
      </div>
    </div>
  );
}
