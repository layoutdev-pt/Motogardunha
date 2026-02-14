"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Phone } from "lucide-react";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            <div className="relative hidden sm:block">
              <input
                className="bg-gray-100 border-none rounded-full py-1.5 px-4 text-sm focus:ring-2 focus:ring-primary w-40 text-foreground placeholder-gray-400"
                placeholder="Pesquisar..."
                type="text"
              />
              <Search className="absolute right-3 top-2 text-gray-400 w-4 h-4" />
            </div>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{CONTACT.phone}</span>
            </a>
            <Link
              href="/contactos"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-bold transition-transform transform hover:scale-105 shadow-lg shadow-red-500/30"
            >
              Marcação
            </Link>

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
  );
}
