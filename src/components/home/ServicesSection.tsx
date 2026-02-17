import Link from "next/link";
import { Wrench } from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="py-20 bg-secondary text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Restoration */}
          <div className="relative group rounded-2xl overflow-hidden h-[450px] lg:h-[500px] border border-gray-800">
            <img
              alt="Centro de Restauro"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
              <div className="glass-panel p-8 rounded-xl max-w-md backdrop-blur-md">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/40">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">
                  O Nosso Centro de Restauro
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Vamos além da simples reparação. Mais do que arranjar, o nosso
                  objetivo é o restauro total, garantindo que cada componente
                  honra a história original. Preserve a alma e o valor da sua
                  moto clássica com a nossa oficina altamente especializada.
                </p>
                <Link
                  href="/servicos"
                  className="inline-block border border-white/30 hover:border-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Saber Mais
                </Link>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="relative group rounded-2xl overflow-hidden h-[450px] lg:h-[500px] border border-gray-800">
            <img
              alt="Oficina de Manutenção"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
            <div className="absolute bottom-0 left-0 w-full p-8 z-10">
              <div className="glass-panel p-8 rounded-xl backdrop-blur-md">
                <h3 className="text-2xl font-display font-bold mb-4">
                  O Seu Parceiro na Manutenção
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Desfrute da sua moto sem preocupações. Conte com a{" "}
                  <span className="text-white font-bold">
                    nossa oficina especializada
                  </span>{" "}
                  e uma equipa de mecânicos dedicados para cuidar da sua
                  máquina. Oferecemos todos os serviços de rotina e um apoio
                  técnico detalhado.
                </p>
                <Link
                  href="/contactos"
                  className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Agendar Serviço
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
