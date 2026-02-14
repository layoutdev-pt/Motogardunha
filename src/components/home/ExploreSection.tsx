"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Scooters", "Naked", "Desportivas", "Trail", "Off-road"];

const EXPLORE_ITEMS = [
  {
    name: "BMW C 400 X - A Aventura Urbana",
    specs: "34 hp · Monocilíndrico 4T",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    span: "",
  },
  {
    name: "Vespa GTS 300 - O Ícone Italiano",
    specs: "23.8 hp · Monocilíndrico HPE 4T",
    image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80",
    span: "",
  },
  {
    name: "Honda Forza 350 - Performance",
    specs: "29.2 hp · Monocilíndrico eSP+ 4T",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    span: "",
  },
  {
    name: "Honda PCX 125 - A Rainha da Cidade",
    specs: "12.5 hp · Monocilíndrico eSP+ 4T",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    span: "",
  },
  {
    name: "Yamaha TMAX 560 - O Desportivo das Maxiscooters",
    specs: "47 hp · Bicilíndrico 4T",
    image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&q=80",
    span: "md:col-span-2",
  },
];

export default function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState("Scooters");

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPLORE_ITEMS.map((item) => (
            <div
              key={item.name}
              className={cn(
                "relative group overflow-hidden rounded-2xl h-64 cursor-pointer",
                item.span
              )}
            >
              <img
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white font-bold text-xl mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-300 text-xs">{item.specs}</p>
              </div>
            </div>
          ))}
        </div>

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
