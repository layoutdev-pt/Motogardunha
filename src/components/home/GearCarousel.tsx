"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { GearProduct } from "@/types";

interface GearCarouselProps {
  products: GearProduct[];
}

export default function GearCarousel({ products }: GearCarouselProps) {
  const [current, setCurrent] = useState(0);
  const isPausedRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + products.length) % products.length);
    },
    [products.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) next();
    }, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden h-72 sm:h-[400px] lg:h-[480px]"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      {products.map((product, idx) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
            {/* Neutral background for contain */}
          <div className="absolute inset-0 bg-white" />

          <Link href={`/loja/${product.slug}`} className="absolute inset-0 z-0">
            <Image
              src={product.cover_image}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={idx === 0}
            />
          </Link>

          {/* Gradient overlay only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Product name */}
          <div className="absolute bottom-0 left-0 p-5 pr-32 pointer-events-none">
            <p className="text-white font-display font-bold text-xl leading-tight drop-shadow-lg">
              {product.title}
            </p>
            {product.category && (
              <p className="text-gray-300 text-sm mt-1 capitalize">{product.category}</p>
            )}
          </div>

          {/* Price badge */}
          <Link
            href={`/loja/${product.slug}`}
            className="absolute bottom-4 right-4 z-20 bg-primary hover:bg-red-700 text-white rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-bold transition-colors shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            {formatPrice(product.price)}
          </Link>
        </div>
      ))}

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full transition-all"
        aria-label="Produto anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full transition-all"
        aria-label="Próximo produto"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "bg-white w-5" : "bg-white/40 w-2 hover:bg-white/70"
            }`}
            aria-label={`Ir para produto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
