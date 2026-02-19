"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const readFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - images.length;
    const toRead = Array.from(files).slice(0, remaining);
    toRead.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onChange([...images, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      readFiles(e.dataTransfer.files);
    },
    [images, onChange]
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
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer",
          dragging
            ? "border-primary bg-primary/5"
            : "border-white/10 hover:border-primary/40 hover:bg-white/5"
        )}
      >
        <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
        <p className="text-sm text-gray-400">
          Arraste imagens para aqui ou{" "}
          <span className="text-primary font-medium">clique para selecionar</span>
        </p>
        <p className="text-xs text-gray-600 mt-2">PNG, JPG ou WebP · Máximo 5MB por imagem</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => readFiles(e.target.files)}
        />
      </div>

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

      {images.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <ImageIcon className="w-3.5 h-3.5" />
          A primeira imagem será usada como capa
        </div>
      )}
    </div>
  );
}
