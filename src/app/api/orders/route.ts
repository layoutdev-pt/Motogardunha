import { NextRequest, NextResponse } from "next/server";
import { getResend, MOTOGARDUNHA_EMAIL } from "@/lib/email/resend";
import OrderNotificationEmail from "@/lib/email/templates/order-notification";
import OrderConfirmationEmail from "@/lib/email/templates/order-confirmation";
import { createAdminClient } from "@/lib/supabase/admin";
import { orderRequestSchema } from "@/lib/validations/order-schema";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = orderRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: result.error.issues.map(i => i.message) },
        { status: 400 }
      );
    }

    const { name, email, phone, address, notes, items } = result.data;

    // Recalculate total server-side to prevent price manipulation
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderDate = new Date().toLocaleString("pt-PT", {
      timeZone: "Europe/Lisbon",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Persist order to Supabase
    const supabase = createAdminClient();
    const { error: dbErr } = await supabase.from("orders").insert({
      customer_name: name,
      customer_email: email || null,
      customer_phone: phone,
      customer_address: address || "Levantamento em Loja",
      notes: notes || null,
      items,
      total,
      status: "pending",
    });
    if (dbErr) {
      console.error("Failed to save order to DB:", dbErr);
      return NextResponse.json(
        { error: "Erro ao guardar encomenda.", details: dbErr.message },
        { status: 500 }
      );
    }

    // Send emails — non-fatal: order is already saved to DB
    try {
      const resend = getResend();

      const emailPromises = [];

      emailPromises.push(
        resend.emails.send({
          from: "Motogardunha <onboarding@resend.dev>",
          to: [MOTOGARDUNHA_EMAIL],
          subject: `Nova Encomenda - ${name}`,
          react: OrderNotificationEmail({
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            customerAddress: address || "Levantamento em Loja",
            customerNotes: notes,
            items,
            total,
            orderDate,
          }),
        })
      );

      if (email) {
        emailPromises.push(
          resend.emails.send({
            from: "Motogardunha <onboarding@resend.dev>",
            to: [email],
            subject: "Encomenda Recebida - Motogardunha",
            react: OrderConfirmationEmail({
              customerName: name,
              customerPhone: phone,
              customerAddress: address || "Levantamento em Loja",
              items,
              total,
            }),
          })
        );
      }

      await Promise.all(emailPromises);
    } catch (emailErr) {
      console.error("Email sending failed (non-fatal):", emailErr);
    }

    return NextResponse.json(
      { success: true, message: "Order submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit order" },
      { status: 500 }
    );
  }
}
