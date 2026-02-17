"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gauge,
  Zap,
  Calendar,
  Palette,
  Fuel,
  Check,
  Phone,
  MessageCircle,
} from "lucide-react";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";

interface Props {
  motorcycle: Motorcycle;
}

const DETAIL_TABS = [
  { id: "description", label: "Descrição" },
  { id: "specs", label: "Especificações" },
  { id: "features", label: "Características" },
];

export default function MotorcycleDetail({ motorcycle: moto }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const specs = [
    { icon: Fuel, label: "Cilindrada", value: `${moto.engine_cc} cc` },
    { icon: Zap, label: "Potência", value: moto.horsepower || "—" },
    { icon: Gauge, label: "Binário Máximo", value: moto.max_torque || "—" },
    { icon: Calendar, label: "Ano", value: moto.year.toString() },
    { icon: Palette, label: "Cor", value: moto.primary_color || "—" },
    { icon: Gauge, label: "KMs", value: `${moto.mileage.toLocaleString("pt-PT")} km` },
    moto.engine ? { icon: Fuel, label: "Motor", value: moto.engine } : null,
    moto.fuel_type ? { icon: Fuel, label: "Combustível", value: moto.fuel_type } : null,
    moto.gearbox_type ? { icon: Gauge, label: "Caixa", value: moto.gearbox_type } : null,
    moto.transmission_type ? { icon: Gauge, label: "Transmissão", value: moto.transmission_type } : null,
    moto.avg_consumption ? { icon: Fuel, label: "Consumo Médio", value: moto.avg_consumption } : null,
    moto.tank_capacity ? { icon: Fuel, label: "Depósito", value: moto.tank_capacity } : null,
    moto.seats ? { icon: Calendar, label: "Lugares", value: moto.seats.toString() } : null,
  ].filter(Boolean) as { icon: typeof Fuel; label: string; value: string }[];

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-gray-900">
        <img
          alt={moto.name}
          className="w-full h-full object-cover opacity-60"
          src={moto.cover_image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {moto.mileage === 0 && (
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                NOVO
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
              {moto.year}
            </span>
            {moto.segment && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                {moto.segment}
              </span>
            )}
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-2 tracking-tight">
            {moto.name}
          </h1>
          <div className="flex items-center gap-6 mt-4">
            {moto.horsepower && (
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Potência</p>
                <p className="text-white font-bold text-xl">{moto.horsepower}</p>
              </div>
            )}
            {moto.max_torque && (
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Binário</p>
                <p className="text-white font-bold text-xl">{moto.max_torque}</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Cilindrada</p>
              <p className="text-white font-bold text-xl">{moto.engine_cc} <span className="text-sm font-normal">cc</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/stand" className="hover:text-primary">Stand</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">
            {moto.name}
          </span>
        </nav>

        {/* Price + CTA bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-10">
          <div>
            <p className="text-sm text-gray-500 line-through">
              {moto.price > 5000 ? formatPrice(Math.round(moto.price * 1.05)) : ""}
            </p>
            <p className="text-primary font-bold text-3xl">
              {formatPrice(moto.price)}
            </p>
            <p className="text-xs text-gray-400 mt-1">IVA incluído · Garantia {moto.mileage === 0 ? "de fábrica" : "12 meses"}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Ligar Agora
            </a>
            <Link
              href="/contactos"
              className="bg-white border border-gray-200 hover:bg-gray-50 text-foreground px-6 py-3 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir Informação
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Description + Gallery */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden h-80 md:h-[450px] bg-gray-100 mb-4">
                <img
                  alt={moto.name}
                  className="w-full h-full object-cover"
                  src={moto.images[activeImage] || moto.cover_image}
                />
              </div>
              {moto.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {moto.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        activeImage === idx
                          ? "border-primary"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                        src={img}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                {moto.description_title || 'Sobre este Modelo'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {moto.description}
              </p>
            </div>
          </div>

          {/* Right: Technical Specs */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-foreground mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Especificações Técnicas
              </h3>
              <div className="space-y-4">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 uppercase tracking-wider">
                          {spec.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {spec.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financing CTA */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-2">
                Financiamento Disponível
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Personalize o seu plano de pagamento. Simulações sem compromisso.
              </p>
              <div className="bg-white rounded-lg p-4 text-center mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Estimativa Mensal
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {formatPrice(Math.round(moto.price / 60))}
                  <span className="text-sm font-normal text-gray-400">
                    /mês
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  60 meses · TAEG 4.9%
                </p>
              </div>
              <Link
                href="/contactos"
                className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg text-sm font-bold transition-colors"
              >
                Simular Financiamento
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/stand"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Stand
          </Link>
        </div>
      </div>
    </div>
  );
}
