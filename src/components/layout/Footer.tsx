import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";
import { CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display font-extrabold text-2xl tracking-tighter italic block mb-6">
              MOTO<span className="text-primary">GARDUNHA</span>
            </span>
            <p className="text-gray-500 text-sm mb-6">
              {CONTACT.address}
            </p>
            <div className="flex space-x-4">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-6">Páginas Legais</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/termos-servico" className="hover:text-primary transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li className="pt-4">
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-white/20 px-3 py-1 rounded hover:bg-white/10 transition-colors text-xs"
                >
                  Livro de Reclamações
                </a>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-bold text-white mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/stand" className="hover:text-primary transition-colors">
                  Stand
                </Link>
              </li>
              <li>
                <Link href="/loja" className="hover:text-primary transition-colors">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="hover:text-primary transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className="font-bold text-white mb-6">Contacto</h4>
            <div className="space-y-3 text-sm text-gray-500 mb-6">
              <p>{CONTACT.hours.weekdays}</p>
              <p>{CONTACT.hours.saturday}</p>
              <p className="text-primary">{CONTACT.hours.sunday}</p>
            </div>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os Direitos Reservados.
          </p>
          <p className="text-gray-700 text-xs mt-2 md:mt-0">
            Covilhã · Fundão · Castelo Branco
          </p>
        </div>
      </div>
    </footer>
  );
}
