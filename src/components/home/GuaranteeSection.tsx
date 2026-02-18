import { HeadphonesIcon, ShieldCheck, Timer } from "lucide-react";

const GUARANTEES = [
  {
    icon: HeadphonesIcon,
    title: "Apoio ao Cliente",
    description:
      "A nossa equipa está sempre disponível para ajudar antes, durante e após a compra.",
  },
  {
    icon: ShieldCheck,
    title: "Reconhecimento",
    description:
      "Saiba antes de comprar: avaliações honestas, classificações e vídeos de testes.",
    highlight: true,
  },
  {
    icon: Timer,
    title: "Reserva Rápida",
    description:
      "Não perca tempo. A nossa equipa garante que a sua moto está pronta para levantar em tempo recorde.",
  },
];

export default function GuaranteeSection() {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          alt="Oficina"
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-white mb-4 uppercase tracking-wide">
            A Nossa Garantia!
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`glass-panel p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 group cursor-pointer hover:bg-white/10 ${
                  item.highlight
                    ? "border-primary/50 shadow-[0_0_30px_rgba(220,38,38,0.15)]"
                    : ""
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
