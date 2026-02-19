"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertTriangle } from "lucide-react";
import { BRANDS, MOTORCYCLE_TYPES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import CustomSelect from "@/components/ui/CustomSelect";
import ImageUpload from "@/components/ui/ImageUpload";
import type { Motorcycle } from "@/types";

export default function AdminEditMotoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    engine_cc: 0,
    horsepower: "",
    max_torque: "",
    primary_color: "",
    segment: "",
    description: "",
    status: "available" as "available" | "reserved" | "sold",
    is_featured: false,
    slug: "",
  });

  useEffect(() => {
    async function fetchMoto() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("motorcycles")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        const m = data as Motorcycle;
        setForm({
          name: m.name ?? "",
          brand: m.brand ?? "",
          year: m.year ?? new Date().getFullYear(),
          price: m.price ?? 0,
          mileage: m.mileage ?? 0,
          engine_cc: m.engine_cc ?? 0,
          horsepower: m.horsepower ?? "",
          max_torque: m.max_torque ?? "",
          primary_color: m.primary_color ?? "",
          segment: m.segment ?? "",
          description: m.description ?? "",
          status: m.status,
          is_featured: m.is_featured,
          slug: m.slug ?? "",
        });
        setImages(m.images?.length ? m.images : m.cover_image ? [m.cover_image] : []);
      } catch {
        setError("Não foi possível carregar os dados da moto.");
      } finally {
        setLoading(false);
      }
    }
    fetchMoto();
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
        .from("motorcycles")
        .update({
          ...form,
          images,
          cover_image: images[0] || "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
      router.push("/admin/motos?saved=1");
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
        <Link href="/admin/motos" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Editar Motociclo</h1>
          <p className="text-sm text-gray-500">{form.name}</p>
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
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Marca *</label>
              <CustomSelect value={form.brand} onChange={(v) => set("brand", v)} options={BRANDS.map((b) => ({ value: b, label: b }))} className={selectCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Nome / Modelo *</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Ano *</label>
              <input type="number" value={form.year} onChange={(e) => set("year", Number(e.target.value))} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo / Segmento</label>
              <CustomSelect value={form.segment} onChange={(v) => set("segment", v)} options={MOTORCYCLE_TYPES.filter((t) => t.value !== "all")} className={selectCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Descrição</label>
            <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={`${inputCls} resize-none`} />
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
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Cilindrada (cc) *</label>
              <input type="number" value={form.engine_cc} onChange={(e) => set("engine_cc", Number(e.target.value))} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Potência</label>
              <input type="text" value={form.horsepower} onChange={(e) => set("horsepower", e.target.value)} placeholder="Ex: 24 cv" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Binário</label>
              <input type="text" value={form.max_torque} onChange={(e) => set("max_torque", e.target.value)} placeholder="Ex: 26 Nm" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Cor Principal</label>
              <input type="text" value={form.primary_color} onChange={(e) => set("primary_color", e.target.value)} placeholder="Ex: Preto Mate" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Quilometragem</label>
              <input type="number" value={form.mileage} onChange={(e) => set("mileage", Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Pricing & Status */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Preço & Disponibilidade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Preço (€) *</label>
              <input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Estado</label>
              <CustomSelect
                value={form.status}
                onChange={(v) => set("status", v)}
                options={[
                  { value: "available", label: "Disponível" },
                  { value: "reserved", label: "Reservado" },
                  { value: "sold", label: "Vendido" },
                ]}
                className={selectCls}
              />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 rounded-md border-gray-600 accent-red-600 cursor-pointer" />
            <span className="text-sm text-gray-300">Marcar como Destaque na Homepage</span>
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
          <Link href="/admin/motos" className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors">
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
