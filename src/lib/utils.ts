
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  if (!price) return ""; // Proteção caso venha vazio

  const priceString = String(price);

  // Se o valor NÃO contiver nenhum dígito numérico (ex: "Sob Consulta"), retorna o texto puro
  if (!/\d/.test(priceString)) {
    return priceString;
  }

  const isApproximate = priceString.includes("~");
  const cleanNumber = Number(priceString.replace(/[^0-9.-]+/g, ""));

  const formattedPrice = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cleanNumber);

  return isApproximate ? `~ ${formattedPrice}` : formattedPrice;
}

export function formatPriceDecimal(price: number | string): string {
  if (!price) return "";

  const priceString = String(price);

  // Se o valor NÃO contiver nenhum dígito numérico, retorna o texto puro
  if (!/\d/.test(priceString)) {
    return priceString;
  }

  const isApproximate = priceString.includes("~");
  const cleanNumber = Number(priceString.replace(/[^0-9.-]+/g, ""));

  const formattedPrice = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(cleanNumber);

  return isApproximate ? `~ ${formattedPrice}` : formattedPrice;
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}