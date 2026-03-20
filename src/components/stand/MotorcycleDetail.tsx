"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react";

import { CONTACT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import type { Motorcycle } from "@/types";
import PremiumHero from "./premium/PremiumHero";
import QuickSpecs from "./premium/QuickSpecs";
import RichSectionRenderer from "./premium/RichSectionRenderer";
import TechnicalTable from "./premium/TechnicalTable";
import { formatPrice } from "@/lib/utils";
import { getAllMotorcycles } from "@/lib/data/motorcycles";
import { useState } from "react";

interface Props {
  motorcycle: Motorcycle;
}

export default function MotorcycleDetail({ motorcycle: moto }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  // 1. Lógica inteligente de recomendações (Família de Modelo)
  // Ex: "Piaggio MP3 310" -> "MP3" | "Piaggio Beverly 310" -> "Beverly"
  const modelFamily = moto.name.split(" ")[1]; 
  
  let similar = getAllMotorcycles()
    .filter(m => m.id !== moto.id && m.brand === moto.brand && m.name.includes(modelFamily));

  // Se não encontrar 3 da mesma família (ex: só há 2 MP3), preenche com a mesma marca
  if (similar.length < 3) {
    const fillers = getAllMotorcycles().filter(m => 
      m.id !== moto.id && m.brand === moto.brand && !similar.some(s => s.id === m.id)
    );
    similar = [...similar, ...fillers].slice(0, 3);
  } else {
    similar = similar.slice(0, 3);
  }

  const allImages = (moto.images?.length ? moto.images : [moto.cover_image]).filter(Boolean) as string[];
  const coverImage = allImages[0] || `https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80`;

  // ─── RENDERIZAÇÃO PREMIUM (Baseada no JSON) ─────────────────────
  if (moto.rich_content) {
    return (
      <div className="bg-white min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <nav className="text-sm text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <span>/</span>
            <Link href="/stand" className="hover:text-primary transition-colors">Stand</Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium">{moto.name}</span>
          </nav>
        </div>

        <PremiumHero moto={moto} />
        <QuickSpecs highlights={moto.rich_content.highlights} />

        {moto.rich_content.sections
          .filter((sec) => sec.type !== "slider")
          .map((sec) => (
            <RichSectionRenderer key={sec.id} section={sec} />
          ))}

        <TechnicalTable data={moto.rich_content.technical_data} />

        {moto.rich_content.sections
          .filter((sec) => sec.type === "slider")
          .map((sec) => (
            <RichSectionRenderer key={sec.id} section={sec} />
          ))}

        <RecommendedMotos similar={similar} />
        <CallToAction moto={moto} coverImage={coverImage} />
      </div>
    );
  }

  // ─── RENDERIZAÇÃO TRADICIONAL (Fallback para o stand normal) ────
  const techSpecs = [
    moto.engine       && { label: "Motor",             value: moto.engine },
    moto.engine_cc    && { label: "Cilindrada",        value: `${moto.engine_cc} cc` },
    moto.horsepower   && { label: "Potência",          value: `${moto.horsepower} cv` },
    moto.max_torque   && { label: "Binário Máximo",    value: `${moto.max_torque} Nm` },
    moto.fuel_type    && { label: "Combustível",       value: moto.fuel_type },
    moto.gearbox_type && { label: "Tipo de Caixa",     value: moto.gearbox_type },
    moto.transmission_type && { label: "Transmissão",  value: moto.transmission_type },
  ].filter(Boolean) as { label: string; value: string }[];

  const extraSpecs = [
    moto.avg_consumption && { label: "Consumo Médio",    value: moto.avg_consumption },
    moto.tank_capacity   && { label: "Capacidade Depósito", value: moto.tank_capacity },
    moto.seats           && { label: "Lugares",          value: String(moto.seats) },
    moto.primary_color   && { label: "Cor Principal",    value: moto.primary_color },
    moto.secondary_color && { label: "Cor Secundária",   value: moto.secondary_color },
                            { label: "Quilómetros",      value: `${moto.mileage?.toLocaleString("pt-PT") || 0} km` },
                            { label: "Ano de Fabrico",   value: String(moto.year || new Date().getFullYear()) },
    moto.segment         && { label: "Segmento",         value: moto.segment },
  ].filter(Boolean) as { label: string; value: string }[];

  const prev = () => setActiveImage((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveImage((i) => (i + 1) % allImages.length);

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-zinc-950 pt-20">
        <Image alt={moto.name} src={coverImage} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {moto.logo_url && (
          <div className="absolute top-28 right-6 sm:right-10">
            <Image src={moto.logo_url} alt={moto.brand} width={120} height={60} className="object-contain opacity-80 brightness-0 invert" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 sm:px-8 pb-10 sm:pb-14">
          <div className="flex flex-wrap gap-2 mb-4">
            {moto.segment && (
              <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/60 px-3 py-1 rounded-full">{moto.segment}</span>
            )}
            {moto.mileage === 0 && (
              <span className="text-xs font-bold uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full">Novo</span>
            )}
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none mb-6">
            {moto.name}
          </h1>
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {moto.horsepower && <div><p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.horsepower}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Potência (cv)</p></div>}
            {moto.engine_cc && <div><p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.engine_cc}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Cilindrada (cc)</p></div>}
            {moto.max_torque && <div><p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.max_torque}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Binário (Nm)</p></div>}
            <div><p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.mileage?.toLocaleString("pt-PT") || 0}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Quilómetros</p></div>
          </div>
        </div>
      </div>

      {/* ── PRICE + CTA BAR ───────────────────────────────────────── */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Possível a Partir de</p>
            <p className="text-3xl sm:text-4xl font-black text-white">{formatPrice(moto.price)}</p>
            <p className="text-xs text-gray-500 mt-1">IVA incluído · Garantia {moto.mileage === 0 ? "de fábrica" : "12 meses"}</p>
          </div>
          <div className="flex gap-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"><Phone className="w-4 h-4" />Ligar Agora</a>
            <Link href="/contactos" className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"><MessageCircle className="w-4 h-4" />Pedir Informação</Link>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 space-y-20">
        <nav className="text-sm text-gray-400 -mt-6">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link><span className="mx-2">/</span>
          <Link href="/stand" className="hover:text-primary transition-colors">Stand</Link><span className="mx-2">/</span>
          <span className="text-zinc-700 font-medium">{moto.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[4/3]">
              <Image alt={moto.name} fill src={allImages[activeImage] || coverImage} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-opacity duration-300" />
              {allImages.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">{activeImage + 1} / {allImages.length}</div>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {allImages.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-90"}`}>
                    <Image alt={`Vista ${idx + 1}`} fill src={img} sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Sobre este Modelo</p>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 leading-tight mb-5">{moto.description_title || moto.name}</h2>
              <p className="text-gray-500 leading-relaxed text-base">{moto.description || "Contacte-nos para mais informações sobre este modelo."}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div className="bg-zinc-50 rounded-xl p-4"><p className="text-2xl font-black text-zinc-900">{moto.year}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Ano</p></div>
              <div className="bg-zinc-50 rounded-xl p-4"><p className="text-2xl font-black text-zinc-900">{moto.mileage?.toLocaleString("pt-PT") || 0}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Quilómetros</p></div>
              {moto.segment && <div className="bg-zinc-50 rounded-xl p-4"><p className="text-2xl font-black text-zinc-900 capitalize">{moto.segment}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Segmento</p></div>}
              {moto.horsepower && <div className="bg-zinc-50 rounded-xl p-4"><p className="text-2xl font-black text-zinc-900">{moto.horsepower}</p><p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Potência (cv)</p></div>}
            </div>
          </div>
        </div>

        {/* ── SPECS SECTION ────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Conheça a Máquina ao Pormenor</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 mb-10">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techSpecs.length > 0 && (
              <div className="bg-zinc-950 rounded-2xl p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Características Técnicas</h3>
                <div className="space-y-0">
                  {techSpecs.map((spec, i) => (
                    <div key={i} className={`flex items-center justify-between py-4 ${i < techSpecs.length - 1 ? "border-b border-zinc-800" : ""}`}>
                      <span className="text-sm text-zinc-400">{spec.label}</span>
                      <span className="text-sm font-bold text-white text-right max-w-[55%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {extraSpecs.length > 0 && (
              <div className="bg-zinc-50 rounded-2xl p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Extras & Detalhes</h3>
                <div className="space-y-0">
                  {extraSpecs.map((spec, i) => (
                    <div key={i} className={`flex items-center justify-between py-4 ${i < extraSpecs.length - 1 ? "border-b border-zinc-200" : ""}`}>
                      <span className="text-sm text-zinc-500">{spec.label}</span>
                      <span className="text-sm font-bold text-zinc-900 text-right max-w-[55%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <RecommendedMotos similar={similar} />
        <CallToAction moto={moto} coverImage={coverImage} />
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTES (Criados para reduzir o tamanho e repetição de código)
// ============================================================================

function RecommendedMotos({ similar }: { similar: Motorcycle[] }) {
  if (similar.length === 0) return null;

  return (
    <div className="bg-white py-16 md:py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-900 mb-3">Modelos Similares</h2>
        <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide mb-16">
          Preço recomendado de venda ao público (IVA 23% incluído) ao qual acresce transportes e documentação
        </p>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {similar.map((item) => (
            <Link key={item.id} href={`/stand/${item.slug}`} className="group block w-72 text-center">
              <div className="relative h-48 mb-8">
                <Image alt={item.name} fill src={item.cover_image || "/images/placeholder.jpg"} className="object-contain group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 300px" />
              </div>
              {item.rich_content?.colors && item.rich_content.colors.length > 0 && (
                <div className="flex justify-center gap-2 mb-5">
                  {item.rich_content.colors.map((c, i) => (
                    <div key={i} title={c.name} className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">{item.name}</h3>
              <p className="text-base text-zinc-900">{formatPrice(item.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CallToAction({ moto, coverImage }: { moto: Motorcycle, coverImage: string }) {
  return (
    <div className="max-w-7xl mx-auto py-14">
      <div className="relative rounded-3xl overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <Image alt={moto.name} src={coverImage} fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative px-8 sm:px-14 py-16 sm:py-20 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Pronto para a Estrada?</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-4 leading-tight">
            Marque a sua Visita ao Stand
          </h2>
          <p className="text-gray-400 mb-8 text-base">
            Entre em contacto connosco para agendar um test drive ou obter mais informações sobre este modelo.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> {CONTACT.phone}
            </a>
            <Link href="/contactos" className="border border-zinc-700 hover:border-zinc-400 text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors">
              Enviar Mensagem
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/stand" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Stand
        </Link>
      </div>
    </div>
  );
}