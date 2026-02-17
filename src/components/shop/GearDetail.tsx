"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Truck,
} from "lucide-react";
import type { GearProduct } from "@/types";
import { formatPriceDecimal, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface Props {
  product: GearProduct;
}

export default function GearDetail({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<GearProduct[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("gear_products")
        .select("*")
        .neq("id", product.id)
        .eq("status", "active")
        .limit(4);
      setRelatedProducts((data as GearProduct[]) || []);
    };
    fetchRelated();
  }, [product.id]);

  const hasDiscount = product.compare_price && product.compare_price > product.price;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/loja" className="hover:text-primary">
            Loja
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 h-96 md:h-[500px] mb-4">
              {product.is_featured && (
                <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  DESTAQUE
                </span>
              )}
              {hasDiscount && (
                <span className="absolute top-4 right-14 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100)}%
                </span>
              )}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>
              <img
                alt={product.title}
                className="w-full h-full object-contain p-8"
                src={product.images[activeImage] || product.cover_image}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors bg-gray-50",
                      activeImage === idx
                        ? "border-primary"
                        : "border-gray-200 hover:border-gray-400"
                    )}
                  >
                    <img
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                      src={img}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              {product.product_type ? `${product.product_type} · ` : ''}{product.category}
            </p>
            <h1 className="font-display font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              {hasDiscount ? (
                <>
                  <p className="text-gray-400 line-through text-lg">
                    {formatPriceDecimal(product.compare_price!)}
                  </p>
                  <p className="text-primary font-bold text-2xl">
                    {formatPriceDecimal(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-primary font-bold text-2xl">
                  {formatPriceDecimal(product.price)}
                </p>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>
            </div>

            <p className="flex items-center gap-2 text-sm text-green-600 font-medium mb-8">
              <Truck className="w-4 h-4" />
              Portes grátis incluídos
            </p>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/loja/${item.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg h-44 mb-3 overflow-hidden flex items-center justify-center p-4">
                    <img
                      alt={item.title}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      src={item.cover_image}
                    />
                  </div>
                  <p className="text-xs text-primary uppercase font-bold tracking-wider">
                    {item.category}
                  </p>
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {formatPriceDecimal(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
