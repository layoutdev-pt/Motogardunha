"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  bucket?: string;
  folder?: string;
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 10,
  bucket = "product-images",
  folder = "uploads",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const remaining = maxImages - images.length;
      const toUpload = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, remaining);
      if (toUpload.length === 0) return;

      setUploading(true);
      setUploadError(null);

      try {
        const supabase = createClient();
        const uploaded: string[] = [];

        for (const file of toUpload) {
          const ext = file.name.split(".").pop() ?? "jpg";
          const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

          const { error } = await supabase.storage
            .from(bucket)
            .upload(path, file, { upsert: false });

          if (error) {
            // Fallback: store as base64 if storage bucket doesn't exist yet
            if (error.message.includes("Bucket not found") || error.message.includes("bucket")) {
              const url = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
              });
              uploaded.push(url);
            } else {
              throw error;
            }
          } else {
            const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
            uploaded.push(urlData.publicUrl);
          }
        }

        onChange([...images, ...uploaded]);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao fazer upload das imagens.";
        setUploadError(msg);
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, bucket, folder, maxImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 text-center transition-colors",
          uploading ? "cursor-wait opacity-60" : "cursor-pointer",
          dragging
            ? "border-primary bg-primary/5"
            : "border-white/10 hover:border-primary/40 hover:bg-white/5"
        )}
      >
        {uploading ? (
          <>
            <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
            <p className="text-sm text-gray-400">A fazer upload...</p>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              Arraste imagens para aqui ou{" "}
              <span className="text-primary font-medium">clique para selecionar</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">PNG, JPG ou WebP · Máximo 5MB por imagem</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => uploadFiles(e.target.files)}
        />
      </div>

      {uploadError && (
        <p className="text-xs text-red-400">{uploadError}</p>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-white/5">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">
                  Capa
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <ImageIcon className="w-3.5 h-3.5" />
          A primeira imagem será usada como capa
        </div>
      )}
    </div>
  );
}
