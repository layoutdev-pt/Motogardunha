"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Truck,
  ChevronDown,
  ChevronUp,
  Shield,
  Wind,
} from "lucide-react";
import type { GearProduct } from "@/types";
import { formatPriceDecimal, cn } from "@/lib/utils";
import { MOCK_GEAR } from "@/lib/mock-data";

interface Props {
  product: GearProduct;
}

export default function GearDetail({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);

  const relatedProducts = MOCK_GEAR.filter(
    (g) => g.id !== product.id && g.category !== product.category
  ).slice(0, 4);

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
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 h-96 md:h-[500px] mb-4">
              {product.is_new && (
                <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  NOVIDADE
                </span>
              )}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-400 hover:text-primary" />
              </button>
              <img
                alt={product.name}
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
            <h1 className="font-display font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-primary font-bold text-2xl">
                {formatPriceDecimal(product.sale_price || product.price)}
              </p>
              {product.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.review_count} avaliações)
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">
                  Selecionar Cor
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === color
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-gray-200"
                      )}
                      style={{
                        backgroundColor:
                          color === "Preto"
                            ? "#000"
                            : color === "Branco"
                            ? "#fff"
                            : color === "Vermelho"
                            ? "#DC2626"
                            : color === "Castanho"
                            ? "#8B4513"
                            : color === "Azul"
                            ? "#2563EB"
                            : "#6B7280",
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                    Selecionar Tamanho
                  </h3>
                  <button className="text-xs text-primary hover:text-primary-dark font-medium">
                    Guia de Tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feature badges */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Impact Pro
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Wind className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Aero Flow
                </span>
              </div>
            </div>

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

            {/* Accordion sections */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full flex items-center justify-between py-4 text-sm font-bold text-foreground"
              >
                Especificações Técnicas
                {showSpecs ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showSpecs && (
                <div className="pb-4 text-sm text-gray-600 space-y-2">
                  <p>Material: Fibra de carbono / Policarbonato</p>
                  <p>Forro: Removível e lavável</p>
                  <p>Fecho: Fivela micrométrica</p>
                  <p>Peso: ~1400g</p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100">
              <button
                onClick={() => setShowCertifications(!showCertifications)}
                className="w-full flex items-center justify-between py-4 text-sm font-bold text-foreground"
              >
                Certificações de Segurança
                {showCertifications ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showCertifications && (
                <div className="pb-4 text-sm text-gray-600 space-y-2">
                  <p>ECE 22.06 Homologado</p>
                  <p>FIM Approved</p>
                  <p>SHARP 5 Star Rating</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Complete o Look
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
                      alt={item.name}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      src={item.cover_image}
                    />
                  </div>
                  <p className="text-xs text-primary uppercase font-bold tracking-wider">
                    {item.category}
                  </p>
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {formatPriceDecimal(item.sale_price || item.price)}
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
