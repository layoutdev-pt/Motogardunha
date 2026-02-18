"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { X, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cart-store";
import { orderSchema, OrderFormData } from "@/lib/validations/order-schema";

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OrderForm({ open, onClose, onSuccess }: OrderFormProps) {
  const { items, getTotalPrice } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total: getTotalPrice(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      setShowSuccess(true);
      reset();

      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Erro ao submeter encomenda. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  if (showSuccess) {
    return (
      <Fragment>
        <div className="fixed inset-0 bg-black/50 z-[60]" />
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">
              Encomenda Recebida!
            </h3>
            <p className="text-zinc-600 mb-6">
              Obrigado pela sua encomenda. Entraremos em contacto consigo o mais
              brevemente possível para confirmar os detalhes e entrega.
            </p>
            <button
              onClick={onSuccess}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Continuar a Comprar
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* Form Panel */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200">
            <h2 className="text-lg font-semibold text-zinc-900">
              Finalizar Encomenda
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Order Summary */}
            <div className="bg-zinc-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-zinc-700 mb-3">
                Resumo da Encomenda
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-zinc-200 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-zinc-900">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-200 mt-3 pt-3 flex justify-between">
                <span className="font-medium text-zinc-900">Subtotal</span>
                <span className="font-semibold text-red-600">
                  €{getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-700">
                Os Seus Dados
              </h3>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="O seu nome completo"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors ${
                    errors.name ? "border-red-500" : "border-zinc-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="seu.email@exemplo.com"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-500" : "border-zinc-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  placeholder="+351 XXX XXX XXX"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors ${
                    errors.phone ? "border-red-500" : "border-zinc-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Morada *
                </label>
                <textarea
                  id="address"
                  {...register("address")}
                  placeholder="Rua, número, código postal, cidade"
                  rows={3}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors resize-none ${
                    errors.address ? "border-red-500" : "border-zinc-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Notas
                </label>
                <textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Notas adicionais ou pedidos especiais"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors resize-none"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-200 p-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-zinc-300 rounded-lg font-medium text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A enviar...
                </>
              ) : (
                "Submeter Encomenda"
              )}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
