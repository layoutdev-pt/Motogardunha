import { Award, Bike, CheckCircle, Gauge, Settings, Zap } from "lucide-react";

// Mapeamento de strings do JSON para componentes Lucide
const ICON_MAP: Record<string, any> = {
  settings: Settings,
  zap: Zap,
  gauge: Gauge,
  award: Award,
  bike: Bike,
  default: CheckCircle,
};

interface Highlight {
  label: string;
  value: string;
  icon: string;
}

interface Props {
  highlights?: Highlight[];
}

export default function QuickSpecs({ highlights }: Props) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="border-y border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center divide-x divide-gray-200">
          {highlights.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || ICON_MAP.default;

            return (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-6 sm:p-8 min-w-[160px] text-center flex-1"
              >
                <IconComponent className="w-8 h-8 text-primary mb-3 stroke-[1.5]" />
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                  {item.label}
                </span>
                {item.value && (
                  <span className="text-sm text-gray-500 mt-1">
                    {item.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}