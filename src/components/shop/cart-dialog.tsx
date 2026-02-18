"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { X, ShoppingCart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import CartItem from "./cart-item";
import OrderForm from "./order-form";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDialog({ open, onClose }: CartDialogProps) {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrderSuccess = () => {
    setShowOrderForm(false);
    clearCart();
    onClose();
  };

  if (!open) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[100] shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-zinc-700" />
            <h2 className="text-lg font-semibold text-zinc-900">
              Carrinho de Compras
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 mb-2">
                O seu carrinho está vazio
              </h3>
              <p className="text-sm text-zinc-500 mb-6">
                Explore a nossa loja e adicione produtos
              </p>
              <Link
                href="/loja"
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Ir para a Loja
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200 p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"}
                </p>
                <p className="text-lg font-semibold text-zinc-900">
                  Subtotal: €{getTotalPrice().toFixed(2)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-zinc-300 rounded-lg font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Continuar a Comprar
              </button>
              <button
                onClick={() => setShowOrderForm(true)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Encomendar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Form Dialog */}
      {showOrderForm && (
        <OrderForm
          open={showOrderForm}
          onClose={() => setShowOrderForm(false)}
          onSuccess={handleOrderSuccess}
        />
      )}
    </Fragment>
  );
}
