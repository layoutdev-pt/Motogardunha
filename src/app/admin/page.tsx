import {
  Bike,
  ShoppingBag,
  Users,
  DollarSign,
} from "lucide-react";
import { getDashboardStats } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import type { Lead, Motorcycle } from "@/types";
import { formatPrice } from "@/lib/utils";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Há ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Há ${days}d`;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new_lead: { label: "Novo", color: "bg-green-400/20 text-green-400" },
  contacted: { label: "Contactado", color: "bg-blue-400/20 text-blue-400" },
  negotiation: { label: "Negociação", color: "bg-yellow-400/20 text-yellow-400" },
  test_ride: { label: "Test Ride", color: "bg-purple-400/20 text-purple-400" },
  sold: { label: "Vendido", color: "bg-primary/20 text-primary" },
  lost: { label: "Perdido", color: "bg-red-400/20 text-red-400" },
};

export default async function AdminDashboard() {
  let stats = { motosCount: 0, productsCount: 0, leadsCount: 0, monthlyLeads: 0 };
  let recentLeads: Lead[] = [];
  let recentMotos: Motorcycle[] = [];

  try {
    const supabase = await createClient();
    const [statsData, leadsRes, motosRes] = await Promise.all([
      getDashboardStats(),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("motorcycles").select("*").eq("status", "available").order("created_at", { ascending: false }).limit(4),
    ]);
    stats = statsData;
    recentLeads = (leadsRes.data as Lead[]) || [];
    recentMotos = (motosRes.data as Motorcycle[]) || [];
  } catch {
    // Supabase not configured yet
  }

  const STATS = [
    {
      label: "Motos em Stock",
      value: stats.motosCount.toString(),
      icon: Bike,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Produtos na Loja",
      value: stats.productsCount.toString(),
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Leads Este Mês",
      value: stats.monthlyLeads.toString(),
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Total de Leads",
      value: stats.leadsCount.toString(),
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Visão geral do negócio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="xl:col-span-2 bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Leads Recentes
            </h2>
            <a
              href="/admin/leads"
              className="text-xs text-primary hover:text-primary-light font-medium"
            >
              Ver Todos →
            </a>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Nenhum lead registado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                    <th className="text-left py-3 px-2">Nome</th>
                    <th className="text-left py-3 px-2">Assunto</th>
                    <th className="text-left py-3 px-2">Estado</th>
                    <th className="text-right py-3 px-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => {
                    const st = STATUS_MAP[lead.status] || { label: lead.status, color: "bg-gray-400/20 text-gray-400" };
                    return (
                      <tr
                        key={lead.id}
                        className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-2">
                          <p className="text-sm font-medium text-white">
                            {lead.first_name} {lead.last_name}
                          </p>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-400">
                          {lead.subject}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${st.color}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right text-xs text-gray-500">
                          {timeAgo(lead.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Motorcycles */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Bike className="w-5 h-5 text-primary" />
              Motos Recentes
            </h2>
          </div>
          {recentMotos.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Nenhuma moto adicionada ainda.</p>
          ) : (
            <div className="space-y-4">
              {recentMotos.map((moto, idx) => (
                <div
                  key={moto.id}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 font-bold w-5">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {moto.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {moto.year} · {moto.brand}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">
                    {formatPrice(moto.price)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/motos/novo", label: "Adicionar Moto", icon: Bike, color: "from-blue-600 to-blue-500" },
          { href: "/admin/produtos/novo", label: "Adicionar Produto", icon: ShoppingBag, color: "from-purple-600 to-purple-500" },
          { href: "/admin/leads", label: "Gerir Leads", icon: Users, color: "from-green-600 to-green-500" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 hover:opacity-90 transition-opacity group`}
            >
              <Icon className="w-8 h-8 text-white/80 mb-3" />
              <p className="font-bold text-white">{action.label}</p>
              <p className="text-xs text-white/60 mt-1">
                Clique para começar →
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
