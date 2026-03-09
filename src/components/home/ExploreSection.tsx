"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import type { Motorcycle } from "@/types";

const CATEGORIES = ["Todos", "Scooters", "Naked", "Desportivas", "Trail", "Off-Road"];

interface ExploreSectionProps {
  motorcycles: Motorcycle[];
}

export default function ExploreSection({ motorcycles }: ExploreSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? motorcycles
    : motorcycles.filter((m) => m.segment === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8">
            Explore o Nosso Stand
          </h2>
          <div className="inline-flex bg-gray-200 rounded-full p-1 gap-1 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-secondary text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-secondary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((moto) => (
              <Link
                key={moto.id}
                href={`/stand/${moto.slug}`}
                className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
              >
                <Image
                  alt={moto.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src={moto.cover_image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white font-bold text-xl mb-1">{moto.name}</h3>
                  <p className="text-gray-300 text-xs">
                    {moto.engine_cc ? `${moto.engine_cc}cc` : moto.brand} · {formatPrice(moto.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma moto encontrada nesta categoria.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/stand"
            className="bg-secondary text-white hover:bg-black px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-all inline-block"
          >
            Continuar a Descoberta
          </Link>
        </div>
      </div>
    </section>
  );
}
