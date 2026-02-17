"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Todos", "Scooters", "Naked", "Desportivas", "Trail", "Off-road"];

interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  segment: string;
  horsepower: string;
  engine: string;
  cover_image: string;
  slug: string;
  price: number;
}

export default function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  async function fetchMotorcycles() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("motorcycles")
        .select("id, name, brand, segment, horsepower, engine, cover_image, slug, price")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setMotorcycles(data || []);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMotorcycles = activeCategory === "Todos" 
    ? motorcycles 
    : motorcycles.filter(moto => 
        moto.segment?.toLowerCase() === activeCategory.toLowerCase()
      );

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl h-64 bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : filteredMotorcycles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMotorcycles.map((moto) => (
              <Link
                key={moto.id}
                href={`/stand/${moto.slug}`}
                className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
              >
                <img
                  alt={moto.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={moto.cover_image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {moto.name}
                  </h3>
                  <p className="text-gray-300 text-xs">
                    {moto.horsepower} · {moto.engine}
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
