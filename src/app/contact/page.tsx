import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact Us – Book a Free Consultation",
  description:
    "Contact VJ PRANA Health & Wellness Studio in Sastha Nagar, Salem. Call 097917 85007 / 97902 38264, chat on WhatsApp, or book an online or offline consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us – Book a Free Consultation | VJ PRANA Salem",
    description:
      "Book a free yoga, fitness, or diet consultation online or at our studio in Sastha Nagar, Salem.",
    url: "/contact",
  },
};

interface ContactPageProps {
  searchParams: Promise<{
    program?: string;
    mode?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <>
      <PageBanner
        eyebrow="Contact VJ PRANA"
        title="Take the First Step Towards Better Living."
        subtitle="Visit our Salem wellness studio, call or WhatsApp our team, or send us your enquiry below to find the right yoga, fitness, nutrition, or counselling session."
        breadcrumb="Contact Us"
        canonicalPath="/contact"
      />
      <Contact
        defaultProgram={params.program}
        defaultMode={params.mode}
        compactHeading
      />
      <FAQ />
    </>
  );
}
