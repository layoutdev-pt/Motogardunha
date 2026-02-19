import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-display font-black text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-3">Página não encontrada</h2>
        <p className="text-gray-500 mb-8">
          A página que procura não existe ou foi removida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <Link
            href="/stand"
            className="inline-flex items-center gap-2 border border-gray-200 text-foreground px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Ver Stand
          </Link>
        </div>
      </div>
    </div>
  );
}
