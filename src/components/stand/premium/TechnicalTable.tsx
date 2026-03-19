import { TechCategory } from "@/types";

interface Props {
  data: TechCategory[];
}

export default function TechnicalTable({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título alinhado ao centro conforme especificado */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Conheça a Máquina ao Pormenor
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900">
            Especificações Técnicas
          </h2>
        </div>

        {/* Lógica Flex corrigida: justificação ao centro, wrapping e comportamento elástico */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {data.map((category, idx) => (
            <div 
              key={idx} 
              className="flex-1 min-w-[100%] md:min-w-[45%] lg:min-w-[30%] bg-zinc-950 rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                {category.title || category.category}
              </h3>
              <div className="space-y-0">
                {Object.entries(category.items).map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 ${
                      i < Object.keys(category.items).length - 1 ? "border-b border-zinc-800/60" : ""
                    }`}
                  >
                    <span className="text-sm text-zinc-400 mb-1 sm:mb-0">{label}</span>
                    <span className="text-sm font-bold text-white sm:text-right max-w-[80%] sm:max-w-[55%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}