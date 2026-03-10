import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  RotateCcw,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceStats from "@/components/services/ServiceStats";
import ServiceCards from "@/components/services/ServiceCards";

export const metadata: Metadata = {
  title: "Serviços - Restauro e Manutenção",
  description:
    "Serviços completos para a sua moto. Restauro, manutenção e muito mais na Motogardunha em Fundão.",
};

export const SERVICES = [
  {
    icon: "Wrench",
    title: "Manutenção & Revisão",
    description:
      "Revisões periódicas, mudanças de óleo, travões, pneus e manutenção preventiva completa. Equipa certificada com experiência em todas as marcas.",
    features: [
      "Revisão completa",
      "Mudança de óleo e filtros",
      "Sistema de travagem",
      "Pneus e suspensão",
      "Diagnóstico eletrónico",
    ],
    accent: "from-red-500 to-red-700",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    icon: "RotateCcw",
    title: "Restauro",
    description:
      "Damos nova vida à sua moto clássica. Restauro total ou parcial, respeitando sempre a autenticidade e a história de cada modelo.",
    features: [
      "Restauro de motor",
      "Pintura e carroçaria",
      "Cromagem e polimento",
      "Peças originais",
      "Documentação fotográfica",
    ],
    accent: "from-orange-500 to-orange-700",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: "ShieldCheck",
    title: "Garantia & Seguro",
    description:
      "Todas as motos novas com garantia de fábrica. Usados com garantia de 12 meses. Apoio na contratação de seguros.",
    features: [
      "Garantia de fábrica",
      "Garantia 12 meses (usados)",
      "Seguro automóvel",
      "Assistência em viagem",
      "Extensão de garantia",
    ],
    accent: "from-blue-500 to-blue-700",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Motos Vendidas" },
  { value: 12, suffix: " anos", label: "De Experiência" },
  { value: 100, suffix: "%", label: "Satisfação Garantida" },
];

const TIMELINE = [
  {
    step: "01",
    title: "Contacto Inicial",
    description: "Entre em contacto connosco por telefone, email ou visite-nos no stand.",
  },
  {
    step: "02",
    title: "Avaliação",
    description: "Avaliamos as suas necessidades e apresentamos as melhores soluções.",
  },
  {
    step: "03",
    title: "Orçamento",
    description: "Orçamento detalhado sem compromisso, transparente e competitivo.",
  },
  {
    step: "04",
    title: "Execução",
    description: "Realizamos o serviço com a máxima qualidade e no prazo acordado.",
  },
  {
    step: "05",
    title: "Entrega",
    description: "A sua moto é entregue pronta, testada e com toda a documentação.",
  },
];

export default function ServicosPage() {
  return (
    <div className="pt-20">
      {/* Animated Hero */}
      <ServicesHero />

      {/* Stats animated */}
      <ServiceStats stats={STATS} />

      {/* Service Cards animated */}
      <ServiceCards services={SERVICES} />

      {/* Process Timeline */}
      <ProcessTimeline items={TIMELINE} />

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            A sua moto merece o melhor cuidado. Entre em contacto connosco e
            agende o seu serviço hoje.
          </p>
          <Link
            href="/contactos"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-sm font-bold transition-colors inline-flex items-center gap-2"
          >
            Agendar Serviço
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
