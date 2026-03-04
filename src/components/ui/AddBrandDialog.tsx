"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface AddBrandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandAdded: (brandName: string, logoUrl: string) => void;
}

export default function AddBrandDialog({ isOpen, onClose, onBrandAdded }: AddBrandDialogProps) {
  const [brandName, setBrandName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim()) {
      setError("Por favor, insira o nome da marca");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const brandRes = await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brandName.trim(),
          logo_url: "",
        }),
      });

      if (!brandRes.ok) {
        throw new Error("Erro ao guardar a marca");
      }

      onBrandAdded(brandName.trim(), "");

      setBrandName("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar marca");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      setBrandName("");
      setError("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0f0f17] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Adicionar Nova Marca</h2>
          <button
            onClick={handleClose}
            disabled={saving}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Nome da Marca *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ex: Custom Motors"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={saving}
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !brandName.trim()}
              className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A guardar...
                </>
              ) : (
                "Adicionar Marca"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
