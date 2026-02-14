import { Search, Wallet, Wrench, Flag } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Descobrir & Visitar",
    description:
      "Veja no Site, sinta no Stand. Explore online e agende a sua visita presencial para testar.",
    side: "left" as const,
  },
  {
    icon: Wallet,
    title: "Financiamento Fácil",
    description:
      "Toda a Documentação Resolvida. Cuidamos da burocracia e da aprovação do financiamento de forma transparente.",
    side: "right" as const,
  },
  {
    icon: Wrench,
    title: "Vistoria Final",
    description:
      "Preparamos a Sua Moto. Realizamos a inspeção final e os últimos ajustes para garantir a máxima qualidade.",
    side: "left" as const,
  },
  {
    icon: Flag,
    title: "Partir à Aventura",
    description:
      "A Chave é Sua. Levantar a moto pronta a circular e começar a escrever a sua história na estrada.",
    side: "right" as const,
    isFinal: true,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-background-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
            A Sua Moto em 4 Etapas Simples
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
            Como Adquirir a Sua Moto.
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="relative hidden md:block">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLeft = step.side === "left";

            return (
              <div key={step.title} className="relative mb-12 last:mb-0">
                <div
                  className={`flex items-center justify-between w-full ${
                    !isLeft ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      isLeft ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>

                  {/* Center dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm ${
                      step.isFinal
                        ? "bg-primary border-4 border-red-200"
                        : "bg-white border-4 border-gray-100"
                    }`}
                  >
                    {step.isFinal ? (
                      <Flag className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    )}
                  </div>

                  <div
                    className={`w-5/12 ${
                      isLeft ? "pl-8" : "pr-8 flex justify-end"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg`}
                      style={{
                        backgroundColor: `hsl(210, 10%, ${30 + index * 10}%)`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.isFinal
                        ? "bg-primary"
                        : "bg-white border-4 border-gray-100"
                    }`}
                  >
                    {step.isFinal ? (
                      <Flag className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{
                        backgroundColor: `hsl(210, 10%, ${30 + index * 10}%)`,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
