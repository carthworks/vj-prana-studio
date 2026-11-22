import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { BUSINESS } from "@/lib/constants";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please review the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  // Option 1: Deliver via Resend API when configured
  if (resendApiKey) {
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || BUSINESS.email;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "VJ PRANA Website <onboarding@resend.dev>";

    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: data.email,
          subject: `New Enquiry: ${data.program} – ${data.fullName}`,
          text: [
            "New Website Enquiry – VJ PRANA Health & Wellness Studio",
            "--------------------------------------------------------",
            `Full Name: ${data.fullName}`,
            `Phone: ${data.phone}`,
            `Email: ${data.email}`,
            `Program Interested In: ${data.program}`,
            `Preferred Mode: ${data.preferredMode}`,
            "",
            "Message:",
            data.message,
          ].join("\n"),
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            message:
              "Our email service temporarily returned an error. Please try again or reach us via WhatsApp or phone.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          message:
            "Thank you for contacting VJ PRANA. Your enquiry has been sent to our wellness team, and we will respond shortly.",
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        {
          message:
            "Could not reach our email service right now. Please try again or contact us via WhatsApp.",
        },
        { status: 502 }
      );
    }
  }

  // Option 2: Deliver via custom Webhook (e.g. Formspree, Make, Zapier, n8n, CRM)
  if (webhookUrl) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (process.env.CONTACT_WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = process.env.CONTACT_WEBHOOK_SECRET;
      }

      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          source: "vj-prana-website",
          submittedAt: new Date().toISOString(),
          ...data,
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          {
            message:
              "Unable to forward your enquiry right now. Please try again or reach us directly on WhatsApp.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          message:
            "Thank you for contacting VJ PRANA. Your enquiry has been received and our team will reach out shortly.",
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        {
          message:
            "Network error forwarding your enquiry. Please reach us directly via WhatsApp or phone.",
        },
        { status: 502 }
      );
    }
  }

  // Transparently report unconfigured backend instead of faking a successful submission
  return NextResponse.json(
    {
      code: "NOT_CONFIGURED",
      message:
        "Contact form backend delivery (RESEND_API_KEY or CONTACT_WEBHOOK_URL) is not configured in this environment.",
    },
    { status: 503 }
  );
}
