"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Calendar,
  User,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_LEADS = [
  {
    id: "l1",
    name: "João Silva",
    email: "joao.silva@email.pt",
    phone: "+351 912 345 678",
    interest: "Vespa GTS 300",
    source: "website",
    status: "new",
    notes: "Interessado em financiamento",
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: "l2",
    name: "Maria Santos",
    email: "maria.santos@email.pt",
    phone: "+351 923 456 789",
    interest: "Financiamento Geral",
    source: "phone",
    status: "contacted",
    notes: "Aguarda callback para simulação",
    created_at: "2024-03-15T08:15:00Z",
  },
  {
    id: "l3",
    name: "Pedro Costa",
    email: "pedro.costa@email.pt",
    phone: "+351 934 567 890",
    interest: "Zontes 703F",
    source: "website",
    status: "new",
    notes: "Quer agendar test-drive",
    created_at: "2024-03-14T14:00:00Z",
  },
  {
    id: "l4",
    name: "Ana Ferreira",
    email: "ana.ferreira@email.pt",
    phone: "+351 945 678 901",
    interest: "Serviço de Oficina",
    source: "whatsapp",
    status: "in_progress",
    notes: "Revisão dos 10.000 km para Honda PCX",
    created_at: "2024-03-13T09:45:00Z",
  },
  {
    id: "l5",
    name: "Rui Oliveira",
    email: "rui.oliveira@email.pt",
    phone: "+351 956 789 012",
    interest: "Honda PCX 125",
    source: "website",
    status: "converted",
    notes: "Venda concretizada - financiamento aprovado",
    created_at: "2024-03-12T16:20:00Z",
  },
  {
    id: "l6",
    name: "Sofia Mendes",
    email: "sofia.mendes@email.pt",
    phone: "+351 967 890 123",
    interest: "Aprilia SR GT 200",
    source: "phone",
    status: "contacted",
    notes: "Visita ao stand agendada para sábado",
    created_at: "2024-03-11T11:00:00Z",
  },
  {
    id: "l7",
    name: "Carlos Dias",
    email: "carlos.dias@email.pt",
    phone: "+351 978 901 234",
    interest: "Capacete AGV",
    source: "website",
    status: "lost",
    notes: "Desistiu - encontrou mais barato",
    created_at: "2024-03-10T13:30:00Z",
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-green-400/20 text-green-400" },
  contacted: { label: "Contactado", color: "bg-blue-400/20 text-blue-400" },
  in_progress: { label: "Em Progresso", color: "bg-yellow-400/20 text-yellow-400" },
  converted: { label: "Convertido", color: "bg-purple-400/20 text-purple-400" },
  lost: { label: "Perdido", color: "bg-red-400/20 text-red-400" },
};

const SOURCE_ICON: Record<string, typeof Phone> = {
  website: ArrowUpRight,
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

export default function AdminLeadsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const filtered = MOCK_LEADS.filter((l) => {
    const matchSearch =
      `${l.name} ${l.interest} ${l.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const lead = selectedLead
    ? MOCK_LEADS.find((l) => l.id === selectedLead)
    : null;

  const statusCounts = MOCK_LEADS.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          CRM / Leads
        </h1>
        <p className="text-sm text-gray-500">
          Gerir contactos e oportunidades de negócio
        </p>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
            className={cn(
              "bg-white/5 border rounded-xl p-4 text-center transition-colors",
              filterStatus === key
                ? "border-primary/30 bg-primary/5"
                : "border-white/5 hover:bg-white/[0.07]"
            )}
          >
            <p className="text-2xl font-bold text-white">
              {statusCounts[key] || 0}
            </p>
            <p className={`text-xs font-medium mt-1 ${config.color.split(" ")[1]}`}>
              {config.label}
            </p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por nome, interesse ou email..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex gap-6">
        {/* Lead list */}
        <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                  <th className="text-left py-4 px-6">Contacto</th>
                  <th className="text-left py-4 px-4">Interesse</th>
                  <th className="text-left py-4 px-4">Origem</th>
                  <th className="text-left py-4 px-4">Estado</th>
                  <th className="text-right py-4 px-6">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => {
                  const SourceIcon =
                    SOURCE_ICON[l.source] || ArrowUpRight;
                  return (
                    <tr
                      key={l.id}
                      onClick={() => setSelectedLead(l.id)}
                      className={cn(
                        "border-b border-white/5 last:border-0 cursor-pointer transition-colors",
                        selectedLead === l.id
                          ? "bg-primary/5"
                          : "hover:bg-white/5"
                      )}
                    >
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-white">
                          {l.name}
                        </p>
                        <p className="text-xs text-gray-500">{l.email}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">
                        {l.interest}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <SourceIcon className="w-3.5 h-3.5" />
                          <span className="text-xs capitalize">
                            {l.source}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "text-xs font-medium px-2.5 py-1 rounded-full",
                            STATUS_CONFIG[l.status]?.color
                          )}
                        >
                          {STATUS_CONFIG[l.status]?.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-gray-500">
                        {new Date(l.created_at).toLocaleDateString("pt-PT")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum lead encontrado</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {lead && (
          <div className="w-80 flex-shrink-0 bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6 hidden xl:block">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-white text-lg">{lead.name}</h3>
              <span
                className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-full inline-block mt-2",
                  STATUS_CONFIG[lead.status]?.color
                )}
              >
                {STATUS_CONFIG[lead.status]?.label}
              </span>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${lead.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">{lead.phone}</span>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">{lead.email}</span>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">
                  {new Date(lead.created_at).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                Interesse
              </h4>
              <p className="text-sm text-white">{lead.interest}</p>
            </div>

            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                Notas
              </h4>
              <p className="text-sm text-gray-400">{lead.notes}</p>
            </div>

            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                Alterar Estado
              </h4>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${lead.phone.replace(/\s/g, "")}`}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Ligar
              </a>
              <a
                href={`https://wa.me/${lead.phone.replace(/[+\s]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-xs font-bold text-center transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Total: {filtered.length} leads
      </div>
    </div>
  );
}
