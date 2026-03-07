import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export const maxDuration = 30;

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";
    const bucket = (formData.get("bucket") as string) || "product-images";

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Ficheiro demasiado grande. Máximo 10MB." }, { status: 400 });
    }

    const ext = (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "Tipo de ficheiro não permitido." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const MIME_MAP: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      avif: "image/avif",
    };
    const contentType =
      file.type && file.type !== "application/octet-stream"
        ? file.type
        : (MIME_MAP[ext] ?? "image/jpeg");

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 500 }
    );
  }
}
