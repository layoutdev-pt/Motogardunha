import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contactos - Fale Connosco",
  description:
    "Entre em contacto com a Motogardunha. Visite-nos no Fundão ou contacte-nos por telefone, email ou WhatsApp.",
};

export default function ContactPage() {
  return <ContactContent />;
}
