"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertTriangle } from "lucide-react";
import { BRANDS, MOTORCYCLE_SEGMENTS } from "@/lib/constants";
import CustomSelect from "@/components/ui/CustomSelect";
import ImageUpload from "@/components/ui/ImageUpload";
import AddBrandDialog from "@/components/ui/AddBrandDialog";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface MotorcycleFormData {
  name: string;
  brand: string;
  model: string;
  year: number | string;
  logo_url: string;
  segment: string;
  description_title: string;
  description: string;
  engine_cc: number | string;
  horsepower: string;
  max_torque: string;
  engine: string;
  gearbox_type: string;
  transmission_type: string;
  fuel_type: string;
  avg_consumption: string;
  tank_capacity: string;
  seats: number | string;
  primary_color: string;
  secondary_color: string;
  mileage: number | string;
  price: number | string;
  status: string;
  is_featured: boolean;
  slug: string;
}

interface MotorcycleFormProps {
  mode: "create" | "edit";
  initialData?: MotorcycleFormData;
  initialImages?: string[];
  motoId?: string;
  title: string;
  subtitle: string;
}

const DEFAULT_FORM: MotorcycleFormData = {
  name: "",
  brand: "",
  model: "",
  year: "",
  logo_url: "",
  segment: "",
  description_title: "",
  description: "",
  engine_cc: "",
  horsepower: "",
  max_torque: "",
  engine: "",
  gearbox_type: "",
  transmission_type: "",
  fuel_type: "",
  avg_consumption: "",
  tank_capacity: "",
  seats: "",
  primary_color: "",
  secondary_color: "",
  mileage: "0",
  price: "",
  status: "available",
  is_featured: false,
  slug: "",
};

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary";
const selectCls = "[&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:border-primary/50 [&>div]:border-primary [&>div]:bg-[#0f0f17] [&_div[role=option]]:text-white";

export default function MotorcycleForm({
  mode,
  initialData,
  initialImages,
  motoId,
  title,
  subtitle,
}: MotorcycleFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<MotorcycleFormData>(initialData ?? DEFAULT_FORM);
  const [images, setImages] = useState<string[]>(initialImages ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [customBrands, setCustomBrands] = useState<Array<{ name: string; logo_url: string }>>([]);
  const [brandOptions, setBrandOptions] = useState<Array<{ value: string; label: string }>>(
    BRANDS.map((b) => ({ value: b, label: b }))
  );

  const set = (k: string, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    async function loadCustomBrands() {
      try {
        const res = await fetch("/api/admin/brands");
        if (res.ok) {
          const brands = await res.json();
          setCustomBrands(brands);
          const baseBrands = BRANDS.map((b) => ({ value: b, label: b }));
          const custom = brands.map((b: { name: string }) => ({ value: b.name, label: b.name }));
          setBrandOptions([...baseBrands, ...custom, { value: "other", label: "+ Adicionar Nova Marca" }]);
        }
      } catch (err) {
        console.error("Error loading custom brands:", err);
      }
    }
    loadCustomBrands();
  }, []);

  const handleBrandChange = (value: string) => {
    if (value === "other") {
      setShowAddBrandDialog(true);
    } else {
      set("brand", value);
    }
  };

  const handleBrandAdded = (brandName: string, logoUrl: string) => {
    const newBrand = { name: brandName, logo_url: logoUrl };
    const updated = [...customBrands, newBrand];
    setCustomBrands(updated);
    const baseBrands = BRANDS.map((b) => ({ value: b, label: b }));
    const custom = updated.map((b) => ({ value: b.name, label: b.name }));
    setBrandOptions([...baseBrands, ...custom, { value: "other", label: "+ Adicionar Nova Marca" }]);
    set("brand", brandName);
    set("logo_url", logoUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.brand || !form.price) {
      setError("Preencha os campos obrigatórios: Marca e Preço.");
      return;
    }
    if (mode === "create" && (!form.model || !form.year || !form.engine_cc)) {
      setError("Preencha os campos obrigatórios: Modelo, Ano e Cilindrada.");
      return;
    }

    setSaving(true);
    try {
      const name = mode === "create" ? `${form.brand} ${form.model}` : form.name;
      const slug = mode === "create" ? slugify(name) + "-" + Date.now() : form.slug;

      const payload = {
        name,
        brand: form.brand,
        year: typeof form.year === "string" ? parseInt(form.year) : form.year,
        logo_url: form.logo_url || null,
        segment: form.segment || null,
        description_title: form.description_title || null,
        description: form.description || null,
        engine_cc: typeof form.engine_cc === "string" ? parseInt(form.engine_cc) : form.engine_cc,
        horsepower: form.horsepower || null,
        max_torque: form.max_torque || null,
        engine: form.engine || null,
        gearbox_type: form.gearbox_type || null,
        transmission_type: form.transmission_type || null,
        fuel_type: form.fuel_type || null,
        avg_consumption: form.avg_consumption || null,
        tank_capacity: form.tank_capacity || null,
        seats: form.seats ? (typeof form.seats === "string" ? parseInt(form.seats) : form.seats) : null,
        primary_color: form.primary_color || null,
        secondary_color: form.secondary_color || null,
        mileage: typeof form.mileage === "string" ? parseInt(form.mileage) || 0 : form.mileage,
        price: typeof form.price === "string" ? parseFloat(form.price) : form.price,
        status: form.status,
        is_featured: form.is_featured,
        images,
        cover_image: images[0] || "",
        slug,
      };

      const res = await fetch("/api/admin/motorcycles", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "edit" ? { id: motoId, ...payload } : payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro ao guardar.");

      router.push("/admin/motos?saved=1");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao guardar motociclo.");
      setSaving(false);
    }
  };

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
          <h1 className="text-2xl font-display font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
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
              <CustomSelect
                value={form.brand}
                onChange={handleBrandChange}
                placeholder="Selecionar marca"
                options={brandOptions}
                className={selectCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
                {mode === "create" ? "Modelo *" : "Nome / Modelo *"}
              </label>
              <input
                type="text"
                value={mode === "create" ? form.model : form.name}
                onChange={(e) => set(mode === "create" ? "model" : "name", e.target.value)}
                placeholder={mode === "create" ? "Ex: GTS 300" : ""}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Ano *</label>
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
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo / Segmento</label>
              <CustomSelect
                value={form.segment}
                onChange={(v) => set("segment", v)}
                options={MOTORCYCLE_SEGMENTS.map((s) => ({ value: s, label: s }))}
                className={selectCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Descrição</label>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Cilindrada (cc) *</label>
              <input type="number" value={form.engine_cc} onChange={(e) => set("engine_cc", e.target.value)} placeholder="300" className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Potência</label>
              <input type="text" value={form.horsepower} onChange={(e) => set("horsepower", e.target.value)} placeholder="24 cv" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Binário Máximo</label>
              <input type="text" value={form.max_torque} onChange={(e) => set("max_torque", e.target.value)} placeholder="26 Nm" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Motor</label>
              <input type="text" value={form.engine} onChange={(e) => set("engine", e.target.value)} placeholder="1 cilindro, 4 tempos" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo de Caixa</label>
              <input type="text" value={form.gearbox_type} onChange={(e) => set("gearbox_type", e.target.value)} placeholder="Manual de 6 velocidades" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo de Transmissão</label>
              <input type="text" value={form.transmission_type} onChange={(e) => set("transmission_type", e.target.value)} placeholder="Corrente" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Tipo de Combustível</label>
              <input type="text" value={form.fuel_type} onChange={(e) => set("fuel_type", e.target.value)} placeholder="Gasolina" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Consumo Médio</label>
              <input type="text" value={form.avg_consumption} onChange={(e) => set("avg_consumption", e.target.value)} placeholder="3.5 L/100km" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Capacidade do Depósito</label>
              <input type="text" value={form.tank_capacity} onChange={(e) => set("tank_capacity", e.target.value)} placeholder="12 L" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Lugares</label>
              <input type="number" value={form.seats} onChange={(e) => set("seats", e.target.value)} placeholder="2" min="1" max="5" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Cor Principal</label>
              <input type="text" value={form.primary_color} onChange={(e) => set("primary_color", e.target.value)} placeholder="Preto Mate" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Cor Secundária</label>
              <input type="text" value={form.secondary_color} onChange={(e) => set("secondary_color", e.target.value)} placeholder="Vermelho" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Quilometragem</label>
            <input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} placeholder="0" className={inputCls} />
          </div>
          {mode === "edit" && (
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} />
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Preço & Disponibilidade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Preço (€) *</label>
              <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="6999" className={inputCls} required />
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
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "A guardar..." : mode === "create" ? "Guardar Motociclo" : "Guardar Alterações"}
          </button>
        </div>
      </form>

      <AddBrandDialog
        isOpen={showAddBrandDialog}
        onClose={() => setShowAddBrandDialog(false)}
        onBrandAdded={handleBrandAdded}
      />
    </div>
  );
}
