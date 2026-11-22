import { BUSINESS } from "./constants";
import type { ContactFormValues } from "./validation";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const message = customMessage?.trim() || BUSINESS.whatsappDefaultMessage;
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryWhatsAppUrl(values: ContactFormValues): string {
  const lines = [
    "Hello VJ PRANA,",
    "",
    `Name: ${values.fullName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Program Interested In: ${values.program}`,
    `Preferred Mode: ${values.preferredMode}`,
    "",
    `Message: ${values.message}`,
  ];
  return buildWhatsAppUrl(lines.join("\n"));
}

export function buildEnquiryMailtoUrl(values: ContactFormValues): string {
  const subject = `Website Enquiry – ${values.program} (${values.fullName})`;
  const body = [
    "Hello VJ PRANA Team,",
    "",
    `Full Name: ${values.fullName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Program Interested In: ${values.program}`,
    `Preferred Mode: ${values.preferredMode}`,
    "",
    "Message:",
    values.message,
  ].join("\n");

  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
