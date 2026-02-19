"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ShoppingCart, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/ui/SearchBar";
import CartDialog from "@/components/shop/cart-dialog";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      router.push(`/stand?q=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileMenuOpen(false);
      setMobileSearch("");
    }
  };

  return (
    <>
    <nav ref={menuRef} className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200">
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
              <SearchBar variant="header" placeholder="Pesquisar..." />
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
                  {totalItems > 99 ? "99+" : totalItems}
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
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 py-4 space-y-2">
          {/* Mobile search */}
          <form onSubmit={handleMobileSearch} className="flex items-center gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder="Pesquisar motos, equipamento..."
                className="bg-transparent text-sm text-foreground placeholder-gray-400 focus:outline-none flex-1"
              />
            </div>
            {mobileSearch && (
              <button
                type="submit"
                className="bg-primary text-white px-3 py-2.5 rounded-xl text-sm font-bold"
              >
                Ir
              </button>
            )}
          </form>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-red-50 text-primary font-bold"
                  : "text-foreground hover:bg-gray-50 hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 px-4 py-3 text-primary font-medium rounded-xl hover:bg-red-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </nav>

    {/* Backdrop for mobile menu */}
    {mobileMenuOpen && (
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={() => setMobileMenuOpen(false)}
      />
    )}

    {/* Cart Dialog - rendered outside nav to avoid stacking context issues */}
    <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
