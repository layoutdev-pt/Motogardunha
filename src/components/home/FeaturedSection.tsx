import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

const FEATURED_MOTOS = [
  {
    name: "Aprilia SR GT 200",
    category: "Sport Scooter",
    price: "€4,499",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
    badge: "NOVO",
    slug: "aprilia-sr-gt-200",
  },
  {
    name: "Vespa GTS 300",
    category: "Urban Iconic",
    price: "€6,999",
    image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80",
    badge: null,
    slug: "vespa-gts-300",
  },
  {
    name: "Zontes 703F",
    category: "Adventure Tourer",
    price: "€8,450",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
    badge: null,
    slug: "zontes-703f",
  },
  {
    name: "Segway AT5 LX",
    category: "Power Quad",
    price: "€7,200",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
    badge: null,
    slug: "segway-at5-lx",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              O Melhor do Nosso Stand
            </h2>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
          </div>
          <Link
            href="/stand"
            className="text-primary font-medium hover:text-primary-dark flex items-center gap-1 transition-colors"
          >
            Ver todo o catálogo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_MOTOS.map((moto) => (
            <Link
              key={moto.slug}
              href={`/stand/${moto.slug}`}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-48 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                <img
                  alt={moto.name}
                  className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
                  src={moto.image}
                />
                {moto.badge && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {moto.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                {moto.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{moto.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{moto.price}</span>
                <span className="p-2 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
