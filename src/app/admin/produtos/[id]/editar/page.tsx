"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertTriangle } from "lucide-react";
import { GEAR_CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import CustomSelect from "@/components/ui/CustomSelect";
import ImageUpload from "@/components/ui/ImageUpload";
import type { GearProduct } from "@/types";

export default function AdminEditProdutoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    product_type: "",
    category: "",
    price: 0,
    compare_price: 0,
    slug: "",
    status: "active" as "active" | "draft" | "archived",
    is_featured: false,
  });

  useEffect(() => {
    async function fetchProduto() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("gear_products")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        const p = data as GearProduct;
        setForm({
          title: p.title ?? "",
          description: p.description ?? "",
          product_type: p.product_type ?? "",
          category: p.category ?? "",
          price: p.price ?? 0,
          compare_price: p.compare_price ?? 0,
          slug: p.slug ?? "",
          status: p.status,
          is_featured: p.is_featured,
        });
        setImages(p.images?.length ? p.images : p.cover_image ? [p.cover_image] : []);
      } catch {
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduto();
  }, [id]);

  const set = (field: string, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("gear_products")
        .update({
          ...form,
          compare_price: form.compare_price > 0 ? form.compare_price : null,
          images,
          cover_image: images[0] || "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
      router.push("/admin/produtos?saved=1");
    } catch {
      setError("Erro ao guardar. Verifique os dados e tente novamente.");
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary";
  const selectCls = "[&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:border-primary/50 [&>div]:border-primary [&>div]:bg-[#0f0f17] [&_div[role=option]]:text-white";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/produtos" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Editar Produto</h1>
          <p className="text-sm text-gray-500">{form.title}</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Informação Básica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Título *</label>
              <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Categoria *</label>
              <CustomSelect value={form.category} onChange={(v) => set("category", v)} options={GEAR_CATEGORIES.filter((c) => c.value !== "all")} className={selectCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo de Produto</label>
              <input type="text" value={form.product_type} onChange={(e) => set("product_type", e.target.value)} placeholder="Ex: Capacete, Casaco..." className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Descrição</label>
            <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </div>

        {/* Pricing & Status */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Preço & Disponibilidade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Preço (€) *</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => set("price", Number(e.target.value))} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Preço Anterior (€)</label>
              <input type="number" step="0.01" value={form.compare_price} onChange={(e) => set("compare_price", Number(e.target.value))} placeholder="0" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Estado</label>
              <CustomSelect
                value={form.status}
                onChange={(v) => set("status", v)}
                options={[
                  { value: "active", label: "Ativo" },
                  { value: "draft", label: "Rascunho" },
                  { value: "archived", label: "Arquivado" },
                ]}
                className={selectCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 rounded-md border-gray-600 accent-red-600 cursor-pointer" />
            <span className="text-sm text-gray-300">Marcar como Destaque na Loja</span>
          </label>
        </div>

        {/* Images */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Imagens
          </h2>
          <ImageUpload images={images} onChange={setImages} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/produtos" className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors">
            Cancelar
          </Link>
          <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "A guardar..." : "Guardar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
