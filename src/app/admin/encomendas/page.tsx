"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ShoppingBag, Loader2, Phone, Mail, MapPin, FileText, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import CustomSelect from "@/components/ui/CustomSelect";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  customer_address: string;
  notes: string | null;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending:    { label: "Pendente",   color: "bg-yellow-400/20 text-yellow-400" },
  confirmed:  { label: "Confirmada", color: "bg-blue-400/20 text-blue-400" },
  shipped:    { label: "Enviada",    color: "bg-purple-400/20 text-purple-400" },
  delivered:  { label: "Entregue",   color: "bg-emerald-400/20 text-emerald-400" },
  cancelled:  { label: "Cancelada",  color: "bg-red-400/20 text-red-400" },
};

const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({ value, label }));

export default function AdminEncomendasPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchOrders = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (!error) {
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("orders").delete().eq("id", deleteId);
    if (!error) {
      setOrders((prev) => prev.filter((o) => o.id !== deleteId));
      if (selected === deleteId) setSelected(null);
    }
    setDeleteId(null);
    setDeleting(false);
  };

  const filtered = orders.filter((o) => {
    const matchSearch = `${o.customer_name} ${o.customer_email ?? ""} ${o.customer_phone}`
      .toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const order = selected ? orders.find((o) => o.id === selected) : null;

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Encomendas</h1>
        <p className="text-sm text-gray-500">Gerir encomendas da loja online</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Status summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
                className={cn(
                  "bg-white/5 border rounded-xl p-4 text-center transition-colors",
                  filterStatus === key ? "border-primary/30 bg-primary/5" : "border-white/5 hover:bg-white/[0.07]"
                )}
              >
                <p className="text-2xl font-bold text-white">{statusCounts[key] || 0}</p>
                <p className={`text-xs font-medium mt-1 ${config.color.split(" ")[1]}`}>{config.label}</p>
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
              placeholder="Pesquisar por nome, email ou telefone..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-6">
            {/* Orders list */}
            <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
              {filtered.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center gap-3">
                  <ShoppingBag className="w-12 h-12 text-gray-600" />
                  <p className="text-gray-500">Nenhuma encomenda encontrada</p>
                  <p className="text-xs text-gray-600">As encomendas aparecerão aqui quando os clientes finalizarem o carrinho</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
                        <th className="text-left py-4 px-6">Cliente</th>
                        <th className="text-left py-4 px-4 hidden sm:table-cell">Produtos</th>
                        <th className="text-left py-4 px-4">Total</th>
                        <th className="text-left py-4 px-4">Estado</th>
                        <th className="text-right py-4 px-6">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((o) => {
                        const cfg = STATUS_CONFIG[o.status] || { label: o.status, color: "bg-gray-400/20 text-gray-400" };
                        return (
                          <tr
                            key={o.id}
                            onClick={() => setSelected(selected === o.id ? null : o.id)}
                            className={cn(
                              "border-b border-white/5 last:border-0 cursor-pointer transition-colors",
                              selected === o.id ? "bg-primary/5" : "hover:bg-white/5"
                            )}
                          >
                            <td className="py-4 px-6">
                              <p className="text-sm font-medium text-white">{o.customer_name}</p>
                              <p className="text-xs text-gray-500">{o.customer_phone}</p>
                            </td>
                            <td className="py-4 px-4 text-xs text-gray-400 hidden sm:table-cell">
                              {o.items?.length ?? 0} {o.items?.length === 1 ? "item" : "itens"}
                            </td>
                            <td className="py-4 px-4 text-sm font-bold text-primary">
                              €{Number(o.total).toFixed(2)}
                            </td>
                            <td className="py-4 px-4">
                              <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", cfg.color)}>
                                {cfg.label}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right text-xs text-gray-500">
                              {new Date(o.created_at).toLocaleDateString("pt-PT")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Detail panel */}
            {order && (
              <div className="w-80 flex-shrink-0 bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6 hidden xl:flex xl:flex-col">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Cliente</p>
                  <h3 className="font-bold text-white text-lg">{order.customer_name}</h3>
                </div>

                <div className="space-y-2">
                  <a href={`tel:${order.customer_phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-gray-300">{order.customer_phone}</span>
                  </a>
                  {order.customer_email && (
                    <a href={`mailto:${order.customer_email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-300 truncate">{order.customer_email}</span>
                    </a>
                  )}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{order.customer_address}</span>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">Produtos</p>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 truncate flex-1 mr-2">{item.title}</span>
                        <span className="text-gray-500 text-xs">×{item.quantity}</span>
                        <span className="text-white font-medium ml-3">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                      <span className="text-gray-400 text-sm">Total</span>
                      <span className="text-primary">€{Number(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Notas
                    </p>
                    <p className="text-sm text-gray-400">{order.notes}</p>
                  </div>
                )}

                {/* Status change */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Alterar Estado</p>
                  <CustomSelect
                    value={order.status}
                    onChange={(v) => handleStatusChange(order.id, v)}
                    options={STATUS_OPTIONS}
                    className="[&_button]:bg-white/5 [&_button]:border-white/10 [&_button]:text-white [&_button]:hover:border-primary/50 [&>div]:border-primary [&>div]:bg-[#0f0f17] [&_div[role=option]]:text-white"
                  />
                </div>

                <button
                  onClick={() => setDeleteId(order.id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar Encomenda
                </button>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500">Total: {filtered.length} encomendas</p>
        </>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f17] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">Eliminar Encomenda?</h3>
            <p className="text-sm text-gray-400 mb-6">Esta ação não pode ser revertida.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} disabled={deleting}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
