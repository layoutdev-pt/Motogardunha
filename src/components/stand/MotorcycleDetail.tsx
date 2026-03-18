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

  // 1. Procurar motas similares localmente
  const similar = getAllMotorcycles()
    .filter(m => m.id !== moto.id && m.segment === moto.segment)
    .slice(0, 4);

  const allImages = (moto.images?.length ? moto.images : [moto.cover_image]).filter(Boolean) as string[];
  const coverImage = allImages[0] || `https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80`;

// ─── RENDERIZAÇÃO PREMIUM (Baseada no JSON) ─────────────────────
  if (moto.rich_content) {
    return (
      <div className="bg-white min-h-screen pt-20">
        {/* Navegação de Topo */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <nav className="text-sm text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <span>/</span>
            <Link href="/stand" className="hover:text-primary transition-colors">Stand</Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium">{moto.name}</span>
          </nav>
        </div>

        {/* Hero e Ícones Rápidos */}
        <PremiumHero moto={moto} />
        <QuickSpecs highlights={moto.rich_content.highlights} />

        {/* O MOTOR DE RENDERIZAÇÃO (Desenha as secções de texto, imagem, galeria e hotspots) */}
        {moto.rich_content.sections.map((sec) => (
          <RichSectionRenderer key={sec.id} section={sec} />
        ))}

        {/* Tabela Técnica Motogardunha */}
        <TechnicalTable data={moto.rich_content.technical_data} />

        {/* MOTOS RECOMENDADAS / OUTROS MODELOS */}
        {similar.length > 0 && (
          <div className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="text-center mb-12">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900">
                  Modelos da Gama
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {similar.map((item) => (
                  <Link key={item.id} href={`/stand/${item.slug}`} className="group block w-48 text-center">
                    <div className="relative h-32 mb-4">
                      <Image
                        alt={item.name}
                        fill
                        src={item.cover_image || "/images/placeholder.jpg"}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="200px"
                      />
                    </div>
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{item.brand}</p>
                    <p className="text-sm font-bold text-zinc-900 group-hover:text-primary transition-colors">{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CTA PREMIUM (Pronto para a Estrada?) ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-950">
            <div className="absolute inset-0">
              <Image
                alt={moto.name}
                src={coverImage}
                fill
                sizes="100vw"
                className="object-cover opacity-20"
              />
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
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT.phone}
                </a>
                <Link
                  href="/contactos"
                  className="border border-zinc-700 hover:border-zinc-400 text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors"
                >
                  Enviar Mensagem
                </Link>
              </div>
            </div>
          </div>

          {/* Botão de Voltar */}
          <div className="mt-8">
            <Link
              href="/stand"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Stand
            </Link>
          </div>
        </div>

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
        <Image
          alt={moto.name}
          src={coverImage}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Brand logo top-right */}
        {moto.logo_url && (
          <div className="absolute top-28 right-6 sm:right-10">
            <Image
              src={moto.logo_url}
              alt={moto.brand}
              width={120}
              height={60}
              className="object-contain opacity-80 brightness-0 invert"
            />
          </div>
        )}

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 sm:px-8 pb-10 sm:pb-14">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {moto.segment && (
              <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/60 px-3 py-1 rounded-full">
                {moto.segment}
              </span>
            )}
            {moto.mileage === 0 && (
              <span className="text-xs font-bold uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full">
                Novo
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none mb-6">
            {moto.name}
          </h1>

          {/* Key stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {moto.horsepower && (
              <div>
                <p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.horsepower}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Potência (cv)</p>
              </div>
            )}
            {moto.engine_cc && (
              <div>
                <p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.engine_cc}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Cilindrada (cc)</p>
              </div>
            )}
            {moto.max_torque && (
              <div>
                <p className="text-4xl sm:text-5xl font-black text-white leading-none">{moto.max_torque}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Binário (Nm)</p>
              </div>
            )}
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white leading-none">
                {moto.mileage?.toLocaleString("pt-PT") || 0}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Quilómetros</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICE + CTA BAR ───────────────────────────────────────── */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
              Possível a Partir de
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {formatPrice(moto.price)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              IVA incluído · Garantia {moto.mileage === 0 ? "de fábrica" : "12 meses"}
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Ligar Agora
            </a>
            <Link
              href="/contactos"
              className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir Informação
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 space-y-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 -mt-6">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/stand" className="hover:text-primary transition-colors">Stand</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 font-medium">{moto.name}</span>
        </nav>

        {/* ── IMAGE GALLERY + DESCRIPTION ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 aspect-[4/3]">
              <Image
                alt={moto.name}
                fill
                src={allImages[activeImage] || coverImage}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-opacity duration-300"
              />
              {allImages.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} aria-label="Próxima"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {activeImage + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {allImages.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === idx ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                    }`}>
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
              <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 leading-tight mb-5">
                {moto.description_title || moto.name}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base">
                {moto.description || "Contacte-nos para mais informações sobre este modelo."}
              </p>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-2xl font-black text-zinc-900">{moto.year}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Ano</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-2xl font-black text-zinc-900">{moto.mileage?.toLocaleString("pt-PT") || 0}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Quilómetros</p>
              </div>
              {moto.segment && (
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-2xl font-black text-zinc-900 capitalize">{moto.segment}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Segmento</p>
                </div>
              )}
              {moto.horsepower && (
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-2xl font-black text-zinc-900">{moto.horsepower}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Potência (cv)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SPECS SECTION ────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Conheça a Máquina ao Pormenor</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 mb-10">Especificações Técnicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical */}
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

            {/* Extras */}
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

        {/* ── MOTOS RECOMENDADAS ───────────────────────────────────── */}
        {similar.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Pode Também Gostar</p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 mb-10">Motos Recomendadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((item) => (
                <Link key={item.id} href={`/stand/${item.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden bg-zinc-100 aspect-[4/3] mb-3">
                    <Image
                      alt={item.name}
                      fill
                      src={item.cover_image || `https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.segment && (
                      <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-widest text-primary border border-primary/60 bg-white/90 px-2 py-0.5 rounded-full">
                        {item.segment}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{item.brand} · {item.year}</p>
                  <p className="text-sm font-black text-zinc-900 group-hover:text-primary transition-colors leading-tight mb-1">{item.name}</p>
                  <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── FULL-WIDTH CTA ───────────────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950">
          <div className="absolute inset-0">
            <Image
              alt={moto.name}
              src={coverImage}
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
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
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {CONTACT.phone}
              </a>
              <Link
                href="/contactos"
                className="border border-zinc-700 hover:border-zinc-400 text-white px-8 py-4 rounded-xl font-bold text-sm transition-colors"
              >
                Enviar Mensagem
              </Link>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/stand"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Stand
          </Link>
        </div>
      </div>
    </div>
  );
}