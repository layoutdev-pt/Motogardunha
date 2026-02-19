"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Bell, CheckCircle, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

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

function PasswordInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "••••••••"}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
      setPwError("Preencha todos os campos.");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("A nova password e a confirmação não coincidem.");
      return;
    }
    if (pwForm.next.length < 6) {
      setPwError("A nova password deve ter pelo menos 6 caracteres.");
      return;
    }

    setPwSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setPwError(data.error || "Erro ao alterar a password.");
      } else {
        setPwSuccess(true);
        setPwForm({ current: "", next: "", confirm: "" });
        setTimeout(() => setPwSuccess(false), 4000);
      }
    } catch {
      setPwError("Erro de ligação. Tente novamente.");
    } finally {
      setPwSaving(false);
    }
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

      {/* Security */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Segurança
        </h2>
        <p className="text-xs text-gray-500 -mt-2">
          Altere a password de acesso ao painel de administração.
        </p>

        {pwError && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {pwError}
          </div>
        )}
        {pwSuccess && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Password alterada com sucesso!
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Password Atual
            </label>
            <PasswordInput
              value={pwForm.current}
              onChange={(v) => setPwForm((p) => ({ ...p, current: v }))}
              placeholder="Introduza a password atual"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Nova Password
            </label>
            <PasswordInput
              value={pwForm.next}
              onChange={(v) => setPwForm((p) => ({ ...p, next: v }))}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Confirmar Nova Password
            </label>
            <PasswordInput
              value={pwForm.confirm}
              onChange={(v) => setPwForm((p) => ({ ...p, confirm: v }))}
              placeholder="Repita a nova password"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={pwSaving}
              className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2"
            >
              {pwSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> A guardar...</>
              ) : (
                <><Lock className="w-4 h-4" /> Alterar Password</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Save general settings */}
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
