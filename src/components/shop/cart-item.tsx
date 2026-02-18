"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, CartItem as CartItemType } from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-zinc-900 truncate">
          {item.title}
        </h4>
        <p className="text-sm font-semibold text-red-600 mt-1">
          €{item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center border border-zinc-300 rounded hover:bg-zinc-100 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center border border-zinc-300 rounded hover:bg-zinc-100 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Line Total & Remove */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm font-semibold text-zinc-900">
          €{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          aria-label="Remover item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
