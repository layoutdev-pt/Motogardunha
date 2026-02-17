"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom">
      <div className="container max-w-6xl">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-bold text-foreground">
                Este website utiliza cookies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Utilizamos cookies para melhorar a sua experiência de navegação,
                personalizar conteúdo e analisar o tráfego do website. Ao clicar
                em "Aceitar Todos", consente a utilização de todos os cookies.
                Pode gerir as suas preferências a qualquer momento.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link
                  href="/politica-cookies"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Cookies
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/politica-privacidade"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidade
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Rejeitar
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-colors whitespace-nowrap"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
