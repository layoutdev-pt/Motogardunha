"use client";

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface AddBrandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandAdded: (brandName: string, logoUrl: string) => void;
}

export default function AddBrandDialog({ isOpen, onClose, onBrandAdded }: AddBrandDialogProps) {
  const [brandName, setBrandName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Por favor, selecione uma imagem válida");
        return;
      }
      setLogoFile(file);
      setError("");
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brandName.trim()) {
      setError("Por favor, insira o nome da marca");
      return;
    }
    
    if (!logoFile) {
      setError("Por favor, selecione um logótipo");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", logoFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      let uploadData: { url?: string; error?: string } = {};
      try {
        uploadData = await uploadRes.json();
      } catch {
        const text = await uploadRes.text().catch(() => "");
        if (uploadRes.status === 413 || text.toLowerCase().includes("too large") || text.toLowerCase().includes("entity")) {
          throw new Error("Ficheiro demasiado grande. Use uma imagem com menos de 50MB.");
        }
        throw new Error(`Erro ao fazer upload do logótipo (${uploadRes.status})`);
      }
      if (!uploadRes.ok) {
        throw new Error(uploadData.error ?? "Erro ao fazer upload do logótipo");
      }

      const url = uploadData.url;
      if (!url) throw new Error("Erro ao fazer upload do logótipo");

      const brandRes = await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brandName.trim(),
          logo_url: url,
        }),
      });

      if (!brandRes.ok) {
        throw new Error("Erro ao guardar a marca");
      }

      onBrandAdded(brandName.trim(), url);
      
      setBrandName("");
      setLogoFile(null);
      setLogoPreview("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar marca");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setBrandName("");
      setLogoFile(null);
      setLogoPreview("");
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
            disabled={uploading}
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
              disabled={uploading}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">
              Logótipo da Marca *
            </label>
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-xs text-gray-400">
                    {logoFile ? logoFile.name : "Clique para fazer upload"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>

              {logoPreview && (
                <div className="relative w-full h-24 bg-white/10 rounded-lg overflow-hidden">
                  <Image
                    src={logoPreview}
                    alt="Preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
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
              disabled={uploading}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading || !brandName.trim() || !logoFile}
              className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {uploading ? (
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
