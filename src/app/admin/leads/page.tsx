"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  User,
  ArrowUpRight,
  Trash2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { deleteLeadAction, updateLeadStatusAction } from "@/app/admin/actions";
import type { Lead } from "@/types";
import CustomSelect from "@/components/ui/CustomSelect";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new_lead: { label: "Novo", color: "bg-green-400/20 text-green-400" },
  contacted: { label: "Contactado", color: "bg-blue-400/20 text-blue-400" },
  negotiation: { label: "Negociação", color: "bg-yellow-400/20 text-yellow-400" },
  test_ride: { label: "Test-Drive", color: "bg-purple-400/20 text-purple-400" },
  sold: { label: "Vendido", color: "bg-emerald-400/20 text-emerald-400" },
  lost: { label: "Perdido", color: "bg-red-400/20 text-red-400" },
};

const SOURCE_ICON: Record<string, typeof Phone> = {
  website: ArrowUpRight,
  referral: User,
  social_media: MessageCircle,
  walk_in: User,
  direct_mail: Mail,
};

export default function AdminLeadsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchLeads = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteLeadAction(deleteId);
      setLeads((prev) => prev.filter((l) => l.id !== deleteId));
      if (selectedLead === deleteId) setSelectedLead(null);
    } catch (e) {
      console.error("Error deleting lead:", e);
    }
    setDeleteId(null);
    setDeleting(false);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateLeadStatusAction(leadId, newStatus as Lead["status"]);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus as Lead["status"] } : l))
      );
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const filtered = leads.filter((l) => {
    const matchSearch =
      `${l.first_name} ${l.last_name} ${l.subject} ${l.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const lead = selectedLead
    ? leads.find((l) => l.id === selectedLead)
    : null;

  const statusCounts = leads.reduce<Record<string, number>>((acc, l) => {
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

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {!loading && (
        <>
      {/* Pipeline summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                          {l.first_name} {l.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{l.email}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">
                        {l.subject || l.interested_model || "-"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <SourceIcon className="w-3.5 h-3.5" />
                          <span className="text-xs capitalize">
                            {l.source.replace("_", " ")}
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

          {filtered.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum lead encontrado</p>
              <p className="text-xs text-gray-600 mt-2">Os leads aparecerão aqui quando os clientes preencherem formulários de contacto</p>
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
              <h3 className="font-bold text-white text-lg">{lead.first_name} {lead.last_name}</h3>
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
                Assunto
              </h4>
              <p className="text-sm text-white">{lead.subject}</p>
            </div>

            {lead.interested_model && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                  Modelo de Interesse
                </h4>
                <p className="text-sm text-white">{lead.interested_model}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                Mensagem
              </h4>
              <p className="text-sm text-gray-400">{lead.message}</p>
            </div>

            {lead.notes && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                  Notas Internas
                </h4>
                <p className="text-sm text-gray-400">{lead.notes}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                Alterar Estado
              </h4>
              <CustomSelect
                value={lead.status}
                onChange={(value) => handleStatusChange(lead.id, value)}
                options={Object.entries(STATUS_CONFIG).map(([key, config]) => ({
                  value: key,
                  label: config.label,
                }))}
                className="[&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:border-primary/50 [&>div]:border-primary [&>div]:bg-[#0f0f17] [&_div[role=option]]:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                {lead.phone && (
                  <>
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
                  </>
                )}
              </div>
              <button
                onClick={() => setDeleteId(lead.id)}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Eliminar Lead
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Total: {filtered.length} leads
      </div>
      </>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f17] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">Eliminar Lead?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Tem a certeza que deseja eliminar este lead? Esta ação não pode ser revertida.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    A eliminar...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
