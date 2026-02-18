import { NextRequest, NextResponse } from "next/server";
import { resend, MOTOGARDUNHA_EMAIL } from "@/lib/email/resend";
import OrderNotificationEmail from "@/lib/email/templates/order-notification";
import OrderConfirmationEmail from "@/lib/email/templates/order-confirmation";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderRequest {
  name: string;
  email?: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();

    const { name, email, phone, address, notes, items, total } = body;

    if (!name || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderDate = new Date().toLocaleString("pt-PT", {
      timeZone: "Europe/Lisbon",
      dateStyle: "full",
      timeStyle: "short",
    });

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
          customerAddress: address,
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
            customerAddress: address,
            items,
            total,
          }),
        })
      );
    }

    await Promise.all(emailPromises);

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
