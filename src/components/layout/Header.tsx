"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/ui/SearchBar";
import CartDialog from "@/components/shop/cart-dialog";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
            <span className="font-display font-extrabold text-2xl tracking-tighter italic">
              MOTO<span className="text-primary">GARDUNHA</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary font-bold"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block w-48">
              <SearchBar
                variant="header"
                placeholder="Pesquisar..."
              />
            </div>
            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg text-foreground hover:text-primary hover:bg-zinc-100 transition-colors"
              aria-label={`Carrinho de compras, ${totalItems} itens`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full border-2 border-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{CONTACT.phone}</span>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-red-50 text-primary font-bold"
                    : "text-foreground hover:bg-gray-50 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-4 py-3 text-primary font-medium"
              >
                <Phone className="w-5 h-5" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      )}

    </nav>

    {/* Cart Dialog - rendered outside nav to avoid stacking context issues */}
    <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
