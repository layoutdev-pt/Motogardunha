import {
  Bike,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  DollarSign,
  BarChart3,
} from "lucide-react";

const STATS = [
  {
    label: "Motos em Stock",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Bike,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Produtos na Loja",
    value: "156",
    change: "+12",
    trend: "up",
    icon: ShoppingBag,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    label: "Leads Este Mês",
    value: "38",
    change: "+8",
    trend: "up",
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    label: "Receita Mensal",
    value: "€47.2K",
    change: "-2.1%",
    trend: "down",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const RECENT_LEADS = [
  {
    name: "João Silva",
    interest: "Vespa GTS 300",
    status: "Novo",
    date: "Há 2h",
    statusColor: "bg-green-400/20 text-green-400",
  },
  {
    name: "Maria Santos",
    interest: "Financiamento",
    status: "Contactado",
    date: "Há 5h",
    statusColor: "bg-blue-400/20 text-blue-400",
  },
  {
    name: "Pedro Costa",
    interest: "Zontes 703F",
    status: "Novo",
    date: "Há 1d",
    statusColor: "bg-green-400/20 text-green-400",
  },
  {
    name: "Ana Ferreira",
    interest: "Serviço Oficina",
    status: "Em Progresso",
    date: "Há 2d",
    statusColor: "bg-yellow-400/20 text-yellow-400",
  },
  {
    name: "Rui Oliveira",
    interest: "Honda PCX 125",
    status: "Convertido",
    date: "Há 3d",
    statusColor: "bg-purple-400/20 text-purple-400",
  },
];

const TOP_MOTOS = [
  { name: "Vespa GTS 300", views: 342, leads: 12 },
  { name: "Aprilia SR GT 200", views: 289, leads: 8 },
  { name: "Zontes 703F", views: 267, leads: 15 },
  { name: "Honda PCX 125", views: 234, leads: 6 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Visão geral do negócio · Última atualização há 5 min
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
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                  <th className="text-left py-3 px-2">Nome</th>
                  <th className="text-left py-3 px-2">Interesse</th>
                  <th className="text-left py-3 px-2">Estado</th>
                  <th className="text-right py-3 px-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_LEADS.map((lead, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <p className="text-sm font-medium text-white">
                        {lead.name}
                      </p>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-400">
                      {lead.interest}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${lead.statusColor}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-xs text-gray-500">
                      {lead.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Motorcycles */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Motos Populares
            </h2>
          </div>
          <div className="space-y-4">
            {TOP_MOTOS.map((moto, idx) => (
              <div
                key={moto.name}
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
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {moto.views}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {moto.leads}
                      </span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/motos", label: "Adicionar Moto", icon: Bike, color: "from-blue-600 to-blue-500" },
          { href: "/admin/produtos", label: "Adicionar Produto", icon: ShoppingBag, color: "from-purple-600 to-purple-500" },
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
