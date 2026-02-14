"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X, Save } from "lucide-react";
import { BRANDS, MOTORCYCLE_TYPES } from "@/lib/constants";

export default function AdminAddMotoPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/motos"
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Adicionar Motociclo
          </h1>
          <p className="text-sm text-gray-500">
            Preencha os detalhes do novo motociclo
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Informação Básica
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Marca *
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                <option value="">Selecionar marca</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Modelo *
              </label>
              <input
                type="text"
                placeholder="Ex: GTS 300"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Ano *
              </label>
              <input
                type="number"
                placeholder="2024"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Tipo *
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                {MOTORCYCLE_TYPES.filter((t) => t.value !== "all").map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Descrição
            </label>
            <textarea
              rows={4}
              placeholder="Descreva o motociclo..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Especificações Técnicas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Cilindrada (cc) *
              </label>
              <input
                type="number"
                placeholder="300"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Potência (hp)
              </label>
              <input
                type="number"
                placeholder="24"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Binário
              </label>
              <input
                type="text"
                placeholder="26 Nm"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Cor *
              </label>
              <input
                type="text"
                placeholder="Preto Mate"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Condição *
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                <option value="new">Novo</option>
                <option value="used">Usado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Quilometragem
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Preço & Disponibilidade
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Preço (€) *
              </label>
              <input
                type="number"
                placeholder="6999"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Estado
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                <option value="available">Disponível</option>
                <option value="reserved">Reservado</option>
                <option value="sold">Vendido</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary cursor-pointer"
            />
            <span className="text-sm text-gray-300">
              Marcar como Destaque na Homepage
            </span>
          </label>
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
              <span className="text-primary font-medium">clique para selecionar</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">
              PNG, JPG ou WebP · Máximo 5MB por imagem
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/motos"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Motociclo
          </button>
        </div>
      </form>
    </div>
  );
}
