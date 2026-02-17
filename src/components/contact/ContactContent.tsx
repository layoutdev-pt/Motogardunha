"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Store,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { submitContactForm } from "@/app/admin/actions";
import CustomSelect from "@/components/ui/CustomSelect";

export default function ContactContent() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      await submitContactForm(formData);
      setSubmitted(true);
      setSubmitting(false);
      form.reset();
      setTimeout(() => {
        setSubmitted(false);
        router.refresh();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem. Tente novamente.");
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[280px] overflow-hidden bg-gray-900">
        <img
          alt="Contactos Motogardunha"
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3 uppercase">
            Fale Connosco
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Estamos aqui para ajudar. Entre em contacto ou visite-nos no stand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Informação de Contacto
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Morada</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {CONTACT.address}
                    </p>
                    <a
                      href={CONTACT.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm font-medium mt-2 inline-flex items-center gap-1 hover:text-primary-dark"
                    >
                      <Navigation className="w-3 h-3" />
                      Ver no Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Telefone</h3>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-sm text-gray-500 mt-1 block hover:text-primary"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm text-gray-500 mt-1 block hover:text-primary"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Horário</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {CONTACT.hours.weekdays}
                    </p>
                    <p className="text-sm text-gray-500">
                      {CONTACT.hours.saturday}
                    </p>
                    <p className="text-sm text-gray-500">
                      {CONTACT.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${CONTACT.phone.replace(/[+\s]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-50 border border-green-100 rounded-xl p-5 hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground group-hover:text-green-700">
                  Contactar por WhatsApp
                </p>
                <p className="text-sm text-gray-500">
                  Resposta rápida em horário laboral
                </p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Envie-nos uma Mensagem
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Preencha o formulário abaixo e entraremos em contacto consigo o
                mais brevemente possível.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-gray-500">
                    Entraremos em contacto consigo brevemente.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="João"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Apelido *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="Silva"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="email@exemplo.pt"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="+351 9XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Assunto *
                    </label>
                    <CustomSelect
                      name="subject"
                      required
                      defaultValue="Informação Geral"
                      placeholder="Selecione o assunto"
                      options={[
                        { value: "Informação Geral", label: "Informação Geral" },
                        { value: "Sobre uma Moto", label: "Sobre uma Moto" },
                        { value: "Agendar Test-Drive", label: "Agendar Test-Drive" },
                        { value: "Financiamento", label: "Financiamento" },
                        { value: "Serviço / Oficina", label: "Serviço / Oficina" },
                        { value: "Equipamento / Loja", label: "Equipamento / Loja" },
                        { value: "Outro", label: "Outro" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                      placeholder="Como podemos ajudá-lo?"
                    />
                  </div>

                  {/* GDPR Consent */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="consent_data_processing"
                        id="consent_data_processing"
                        required
                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label
                        htmlFor="consent_data_processing"
                        className="text-xs text-gray-700 leading-relaxed"
                      >
                        Autorizo o tratamento dos meus dados pessoais pela
                        Motogardunha para responder ao meu pedido de contacto. *
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="consent_terms"
                        id="consent_terms"
                        required
                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label
                        htmlFor="consent_terms"
                        className="text-xs text-gray-700 leading-relaxed"
                      >
                        Li e aceito a{" "}
                        <Link
                          href="/politica-privacidade"
                          target="_blank"
                          className="text-primary hover:underline font-medium"
                        >
                          Política de Privacidade
                        </Link>{" "}
                        e os{" "}
                        <Link
                          href="/termos-servico"
                          target="_blank"
                          className="text-primary hover:underline font-medium"
                        >
                          Termos de Serviço
                        </Link>
                        . *
                      </label>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      Os seus dados serão tratados de acordo com a nossa Política
                      de Privacidade e o RGPD. Pode exercer os seus direitos de
                      acesso, retificação e eliminação a qualquer momento.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        A enviar...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.5!2d-7.5!3d40.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzI0LjAiTiA3wrAzMCcwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Motogardunha"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
