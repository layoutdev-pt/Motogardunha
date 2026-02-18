"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";
import { MOCK_MOTORCYCLES } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";

export default function AdminMotosPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = MOCK_MOTORCYCLES.filter((m) => {
    const matchSearch =
      `${m.brand} ${m.name}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Motociclos
          </h1>
          <p className="text-sm text-gray-500">
            Gerir inventário de motociclos
          </p>
        </div>
        <Link
          href="/admin/motos/novo"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Adicionar Moto
        </Link>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por marca ou modelo..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {["all", "available", "reserved", "sold"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-colors border",
                filterStatus === status
                  ? "bg-primary/20 border-primary/30 text-primary"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              )}
            >
              {status === "all"
                ? "Todos"
                : status === "available"
                ? "Disponível"
                : status === "reserved"
                ? "Reservado"
                : "Vendido"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="text-left py-4 px-6">Moto</th>
                <th className="text-left py-4 px-4">Tipo</th>
                <th className="text-left py-4 px-4">Ano</th>
                <th className="text-left py-4 px-4">Preço</th>
                <th className="text-left py-4 px-4">Estado</th>
                <th className="text-right py-4 px-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((moto) => (
                <tr
                  key={moto.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                        <img
                          alt={`${moto.brand} ${moto.name}`}
                          className="w-full h-full object-cover"
                          src={moto.cover_image}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {moto.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {moto.engine_cc} cc · {moto.status === "available" ? "Disponível" : moto.status === "reserved" ? "Reservado" : "Vendido"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-400 capitalize">
                      {moto.segment ?? "—"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-400">{moto.year}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-white">
                      {formatPrice(moto.price)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full",
                        moto.status === "available"
                          ? "bg-green-400/20 text-green-400"
                          : moto.status === "reserved"
                          ? "bg-yellow-400/20 text-yellow-400"
                          : "bg-gray-400/20 text-gray-400"
                      )}
                    >
                      {moto.status === "available"
                        ? "Disponível"
                        : moto.status === "reserved"
                        ? "Reservado"
                        : "Vendido"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/stand/${moto.slug}`}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Ver no site"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma moto encontrada</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          A mostrar {filtered.length} de {MOCK_MOTORCYCLES.length} motociclos
        </p>
      </div>
    </div>
  );
}
