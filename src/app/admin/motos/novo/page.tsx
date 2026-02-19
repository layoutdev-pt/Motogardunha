"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { BRANDS, MOTORCYCLE_TYPES } from "@/lib/constants";
import CustomSelect from "@/components/ui/CustomSelect";
import ImageUpload from "@/components/ui/ImageUpload";
import { insertMotorcycleAction } from "@/app/admin/actions";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminAddMotoPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    segment: "",
    description: "",
    engine_cc: "",
    horsepower: "",
    max_torque: "",
    primary_color: "",
    mileage: "0",
    price: "",
    status: "available",
    is_featured: false,
  });

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.brand || !form.model || !form.year || !form.engine_cc || !form.price) {
      setError("Preencha os campos obrigatórios: Marca, Modelo, Ano, Cilindrada e Preço.");
      return;
    }

    setSaving(true);
    try {
      const name = `${form.brand} ${form.model}`;
      const slug = slugify(name) + "-" + Date.now();

      await insertMotorcycleAction({
        name,
        brand: form.brand,
        year: parseInt(form.year),
        segment: form.segment || undefined,
        description: form.description || undefined,
        engine_cc: parseInt(form.engine_cc),
        horsepower: form.horsepower || undefined,
        max_torque: form.max_torque || undefined,
        primary_color: form.primary_color || undefined,
        mileage: parseInt(form.mileage) || 0,
        price: parseFloat(form.price),
        status: form.status as "available" | "reserved" | "sold",
        is_featured: form.is_featured,
        images,
        cover_image: images[0] || "",
        slug,
      });

      router.push("/admin/motos?saved=1");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao guardar motociclo.";
      setError(msg);
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary";
  const selectCls = "[&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:border-primary/50 [&>div]:border-primary [&>div]:bg-[#0f0f17] [&_div[role=option]]:text-white";

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
          <h1 className="text-2xl font-display font-bold text-white">Adicionar Motociclo</h1>
          <p className="text-sm text-gray-500">Preencha os detalhes do novo motociclo</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
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
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Marca *
              </label>
              <CustomSelect
                value={form.brand}
                onChange={(v) => set("brand", v)}
                placeholder="Selecionar marca"
                options={BRANDS.map((b) => ({ value: b, label: b }))}
                className={selectCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Modelo *
              </label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                placeholder="Ex: GTS 300"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Ano *
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="2024"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Tipo
              </label>
              <CustomSelect
                value={form.segment}
                onChange={(v) => set("segment", v)}
                options={MOTORCYCLE_TYPES.filter((t) => t.value !== "all")}
                className={selectCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Descrição
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Descreva o motociclo..."
              className={`${inputCls} resize-none`}
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
                value={form.engine_cc}
                onChange={(e) => set("engine_cc", e.target.value)}
                placeholder="300"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Potência (hp)
              </label>
              <input
                type="text"
                value={form.horsepower}
                onChange={(e) => set("horsepower", e.target.value)}
                placeholder="24 hp"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Binário
              </label>
              <input
                type="text"
                value={form.max_torque}
                onChange={(e) => set("max_torque", e.target.value)}
                placeholder="26 Nm"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Cor
              </label>
              <input
                type="text"
                value={form.primary_color}
                onChange={(e) => set("primary_color", e.target.value)}
                placeholder="Preto Mate"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Quilometragem
              </label>
              <input
                type="number"
                value={form.mileage}
                onChange={(e) => set("mileage", e.target.value)}
                placeholder="0"
                className={inputCls}
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
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="6999"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                Estado
              </label>
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
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              className="w-4 h-4 rounded-md border-gray-600 accent-red-600 cursor-pointer"
            />
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
          <Link
            href="/admin/motos"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                A guardar...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Motociclo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
