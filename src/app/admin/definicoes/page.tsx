"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Bell, CheckCircle } from "lucide-react";

const STORAGE_KEY = "admin_settings";

const DEFAULTS = {
  maintenanceMode: false,
  showPrices: true,
  notifyLeads: true,
  notifyLowStock: true,
};

type Settings = typeof DEFAULTS;

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0f0f17] ${
        checked ? "bg-primary" : "bg-white/10"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
      }
    } catch {}
    setMounted(true);
  }, []);

  const set = (key: keyof Settings, value: boolean) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Definições</h1>
        <p className="text-sm text-gray-500">Configurações do painel de administração</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Definições guardadas com sucesso!
        </div>
      )}

      {/* Site Settings */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Configurações do Site
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Modo de Manutenção</p>
              <p className="text-xs text-gray-500 mt-0.5">Desativa o site público temporariamente</p>
            </div>
            <Toggle checked={settings.maintenanceMode} onChange={(v) => set("maintenanceMode", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Mostrar Preços</p>
              <p className="text-xs text-gray-500 mt-0.5">Exibir preços no site público</p>
            </div>
            <Toggle checked={settings.showPrices} onChange={(v) => set("showPrices", v)} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notificações
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Novos Leads</p>
              <p className="text-xs text-gray-500 mt-0.5">Receber email quando houver novo lead</p>
            </div>
            <Toggle checked={settings.notifyLeads} onChange={(v) => set("notifyLeads", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Stock Baixo</p>
              <p className="text-xs text-gray-500 mt-0.5">Alerta quando stock de produto estiver baixo</p>
            </div>
            <Toggle checked={settings.notifyLowStock} onChange={(v) => set("notifyLowStock", v)} />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Guardar Alterações
        </button>
      </div>
    </div>
  );
}
