"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Loader2,
  AlertTriangle,
  CheckCircle,
  SquarePen,
} from "lucide-react";
import { formatPriceDecimal, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { deleteGearProductAction } from "@/app/admin/actions";
import type { GearProduct } from "@/types";

function AdminProdutosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [produtos, setProdutos] = useState<GearProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<GearProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProdutos = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gear_products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProdutos((data as GearProduct[]) || []);
    } catch {
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProdutos(); }, [fetchProdutos]);

  useEffect(() => {
    if (searchParams.get("saved") === "1") {
      showToast("success", "Produto guardado com sucesso!");
      router.replace("/admin/produtos");
    }
  }, [searchParams]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteGearProductAction(deleteTarget.id);
      setProdutos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast("success", `"${deleteTarget.title}" eliminado com sucesso.`);
    } catch {
      showToast("error", "Erro ao eliminar. Tente novamente.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const categories = ["all", ...new Set(produtos.map((g) => g.category))];

  const filtered = produtos.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || g.category === filterCategory;
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={cn(
          "fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium",
          toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        )}>
          {toast.type === "success"
            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
            : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
          {toast.message}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f0f17] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Eliminar Produto</h3>
                <p className="text-gray-400 text-sm">
                  Tem a certeza que deseja eliminar{" "}
                  <span className="text-white font-semibold">{deleteTarget.title}</span>?
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {deleting ? "A eliminar..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Loja / Gear</h1>
          <p className="text-sm text-gray-500">Gerir inventário de equipamento e acessórios</p>
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
            placeholder="Pesquisar por nome..."
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

      {/* Table */}
      <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                <th className="text-left py-4 px-6">Produto</th>
                <th className="text-left py-4 px-4">Categoria</th>
                <th className="text-left py-4 px-4">Preço</th>
                <th className="text-left py-4 px-4">Estado</th>
                <th className="text-right py-4 px-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 flex items-center justify-center p-1">
                        <img
                          alt={product.title}
                          className="max-w-full max-h-full object-contain"
                          src={product.cover_image}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{product.title}</p>
                        {product.product_type && (
                          <p className="text-xs text-gray-500">{product.product_type}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-400 capitalize">{product.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      {product.compare_price && product.compare_price > product.price ? (
                        <div>
                          <span className="text-xs text-gray-500 line-through block">
                            {formatPriceDecimal(product.compare_price)}
                          </span>
                          <span className="text-sm font-bold text-primary">
                            {formatPriceDecimal(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {formatPriceDecimal(product.price)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      product.status === "active"
                        ? "bg-green-400/20 text-green-400"
                        : product.status === "draft"
                        ? "bg-yellow-400/20 text-yellow-400"
                        : "bg-gray-400/20 text-gray-400"
                    )}>
                      {product.status === "active" ? "Ativo" : product.status === "draft" ? "Rascunho" : "Arquivado"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/loja/${product.slug}`}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Ver no site"
                        target="_blank"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => router.push(`/admin/produtos/${product.id}/editar`)}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Editar"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
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
            <p className="text-gray-500">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        A mostrar {filtered.length} de {produtos.length} produtos
      </div>
    </div>
  );
}

export default function AdminProdutosPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-40"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>}>
      <AdminProdutosContent />
    </Suspense>
  );
}
