"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { GEAR_CATEGORIES } from "@/lib/constants";

export default function AdminAddProductPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/produtos"
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Adicionar Produto
          </h1>
          <p className="text-sm text-gray-500">
            Preencha os detalhes do novo produto
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Informação do Produto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                placeholder="Ex: Pista GP RR Carbon"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Marca *
              </label>
              <input
                type="text"
                placeholder="Ex: AGV"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Categoria *
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                {GEAR_CATEGORIES.filter((c) => c.value !== "all").map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                SKU
              </label>
              <input
                type="text"
                placeholder="Ex: AGV-PISTA-BLK-L"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Descrição
            </label>
            <textarea
              rows={4}
              placeholder="Descreva o produto..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Preço & Stock
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Preço (€) *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="599.95"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Preço Promoção (€)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder=""
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Stock *
              </label>
              <input
                type="number"
                placeholder="10"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Variantes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Tamanhos (separados por vírgula)
              </label>
              <input
                type="text"
                placeholder="S, M, L, XL"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Cores (separadas por vírgula)
              </label>
              <input
                type="text"
                placeholder="Preto, Branco, Vermelho"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm text-gray-300">Marcar como Novo</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm text-gray-300">Destaque</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Imagens
          </h2>

          <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              Arraste imagens para aqui ou{" "}
              <span className="text-primary font-medium">
                clique para selecionar
              </span>
            </p>
            <p className="text-xs text-gray-600 mt-2">
              PNG, JPG ou WebP · Máximo 5MB por imagem
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/produtos"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
