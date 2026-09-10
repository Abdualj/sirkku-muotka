import { NextResponse } from "next/server";
import { Resend } from "resend";

import { sanityFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

type ContactPage = { formRecipientEmail?: string; email?: string };

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const contactPage = await sanityFetch<ContactPage>(contactPageQuery);
  const recipient = contactPage?.formRecipientEmail || contactPage?.email;

  if (!recipient) {
    console.error("No form recipient email set on the Contact Page document.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Sirkku Muotka website <onboarding@resend.dev>",
    to: recipient,
    replyTo: email,
    subject: `New message from ${name} via sirkkumuotka.com`,
    text: message,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
