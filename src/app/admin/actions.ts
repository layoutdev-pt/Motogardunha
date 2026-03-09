"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResend, MOTOGARDUNHA_EMAIL } from "@/lib/email/resend";
import { escapeHtml } from "@/lib/auth";
import type { Motorcycle, GearProduct } from "@/types";

// ─── Motorcycles ───────────────────────────────────────────────

export async function insertMotorcycleAction(
  data: Omit<Motorcycle, "id" | "created_at" | "updated_at">
) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("motorcycles").insert({
    ...data,
    created_at: now,
    updated_at: now,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

export async function updateMotorcycleAction(
  id: string,
  data: Partial<Omit<Motorcycle, "id" | "created_at">>
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("motorcycles")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
  revalidatePath(`/stand/${data.slug ?? ""}`);
}

export async function deleteMotorcycleAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("motorcycles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/motos");
  revalidatePath("/stand");
}

// ─── Gear Products ─────────────────────────────────────────────

export async function insertGearProductAction(
  data: Omit<GearProduct, "id" | "created_at" | "updated_at">
) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("gear_products").insert({
    ...data,
    created_at: now,
    updated_at: now,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

export async function updateGearProductAction(
  id: string,
  data: Partial<Omit<GearProduct, "id" | "created_at">>
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("gear_products")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath(`/loja/${data.slug ?? ""}`);
}

export async function deleteGearProductAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("gear_products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
}

// ─── Leads (admin operations) ──────────────────────────────────

export async function deleteLeadAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function updateLeadStatusAction(id: string, status: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

// ─── Contact Form (public — uses admin client to bypass RLS) ──

export async function submitContactForm(formData: FormData) {
  const supabase = createAdminClient();

  const firstName = formData.get("first_name") as string;
  const lastName  = formData.get("last_name") as string;
  const email     = formData.get("email") as string;
  const phone     = (formData.get("phone") as string) || null;
  const subject   = formData.get("subject") as string;
  const message   = formData.get("message") as string;
  const model     = (formData.get("interested_model") as string) || null;

  const { error } = await supabase.from("leads").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    subject,
    message,
    interested_model: model,
    source: "website",
    status: "new_lead",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");

  // Send email notification
  try {
    const resend = getResend();
    await resend.emails.send({
      from: "Motogardunha <onboarding@resend.dev>",
      to: [MOTOGARDUNHA_EMAIL],
      subject: `Novo Contacto: ${escapeHtml(subject)} — ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <h2>Novo contacto recebido no site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${phone ? `<p><strong>Telefone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>` : ""}
        ${model ? `<p><strong>Modelo de interesse:</strong> ${escapeHtml(model)}</p>` : ""}
        <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
        <hr/>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Enviado através do formulário de contacto em motogardunha.pt</p>
      `,
    });
  } catch {
    // Email failure should not block form submission
  }
}
