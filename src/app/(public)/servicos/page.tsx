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

export const metadata: Metadata = {
  title: "Serviços - Restauro e Manutenção",
  description:
    "Serviços completos para a sua moto. Restauro, manutenção e muito mais na Motogardunha em Fundão.",
};

const SERVICES = [
  {
    icon: Wrench,
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
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: RotateCcw,
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
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: ShieldCheck,
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
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
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
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-900">
        <img
          alt="Oficina Motogardunha"
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-3">
            Serviços Premium
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4 uppercase">
            Os Nossos Serviços
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Da manutenção ao restauro completo, cuidamos da sua moto como se
            fosse nossa.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
