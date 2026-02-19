"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadImageAction(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "uploads";
  const bucket = (formData.get("bucket") as string) || "product-images";

  if (!file) return { error: "No file provided." };

  try {
    const supabase = createAdminClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) return { error: error.message };

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return { url: urlData.publicUrl };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Upload failed." };
  }
}
