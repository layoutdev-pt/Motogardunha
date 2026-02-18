"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
  };
  showQuantity?: boolean;
  className?: string;
}

export default function AddToCartButton({
  product,
  showQuantity = true,
  className = "",
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        slug: product.slug,
      });
    }

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {showQuantity && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-700">Quantidade:</span>
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center border border-zinc-300 rounded-l-lg hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0) setQuantity(val);
              }}
              className="w-14 h-10 text-center border-t border-b border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              min="1"
            />
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center border border-zinc-300 rounded-r-lg hover:bg-zinc-100 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          added
            ? "bg-green-600 text-white"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Adicionado ao Carrinho
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao Carrinho
          </>
        )}
      </button>
    </div>
  );
}
