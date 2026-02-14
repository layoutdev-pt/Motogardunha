"use client";

import { Save, User, Lock, Globe, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          Definições
        </h1>
        <p className="text-sm text-gray-500">
          Configurações do painel de administração
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Perfil do Administrador
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Nome
            </label>
            <input
              type="text"
              defaultValue="Administrador"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@motogardunha.pt"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Segurança
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Password Atual
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Nova Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Configurações do Site
        </h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-sm font-medium text-white">Modo de Manutenção</p>
              <p className="text-xs text-gray-500">Desativa o site público temporariamente</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-sm font-medium text-white">Mostrar Preços</p>
              <p className="text-xs text-gray-500">Exibir preços no site público</p>
            </div>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </div>
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notificações
        </h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-white">Novos Leads</p>
              <p className="text-xs text-gray-500">Receber email quando houver novo lead</p>
            </div>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-white">Stock Baixo</p>
              <p className="text-xs text-gray-500">Alerta quando stock de produto estiver baixo</p>
            </div>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </div>
          </label>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Alterações
        </button>
      </div>
    </div>
  );
}
