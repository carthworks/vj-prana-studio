import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";

interface ContactProps {
  defaultProgram?: string;
  defaultMode?: string;
  compactHeading?: boolean;
}

export function Contact({
  defaultProgram,
  defaultMode,
  compactHeading = false,
}: ContactProps) {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!compactHeading && (
          <SectionHeading
            eyebrow="Connect With Us"
            title="Take the First Step Towards Better Living."
            subtitle="Reach out to book a free initial consultation, discuss online or offline batch timings, or schedule a personalised diet or counselling session."
          />
        )}

        <div
          className={
            compactHeading
              ? "grid grid-cols-1 gap-10 lg:grid-cols-12"
              : "mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12"
          }
        >
          {/* Left Column: Direct Contact Info + Map */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/65 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                Studio Contact Details
              </p>
              <h3 className="font-editorial mt-2 text-2xl font-medium text-[#00052F]">
                {BUSINESS.fullName}
              </h3>

              <div className="mt-6 space-y-5 text-sm text-[#28231E]">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#CF4520] ring-1 ring-[#E4DED4]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#00052F]">Studio Address</p>
                    <address className="mt-1 not-italic leading-relaxed text-[#676055]">
                      {BUSINESS.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={BUSINESS.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#CF4520] hover:underline"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#CF4520] ring-1 ring-[#E4DED4]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#00052F]">Call Us</p>
                    <div className="mt-1.5 flex flex-wrap gap-2.5">
                      {BUSINESS.phones.map((phone) => (
                        <a
                          key={phone.href}
                          href={phone.href}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DED4] bg-white px-3.5 py-1.5 text-sm font-medium text-[#28231E] transition-colors hover:border-[#CF4520] hover:text-[#CF4520]"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#CF4520] ring-1 ring-[#E4DED4]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#00052F]">Email</p>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="mt-1 block text-[#676055] transition-colors hover:text-[#CF4520]"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-[#E4DED4] pt-6">
                <LinkButton
                  href={buildWhatsAppUrl()}
                  variant="whatsapp"
                  external
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Chat on WhatsApp (+91 97917 85007)</span>
                </LinkButton>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]">
              <iframe
                title="VJ PRANA Health & Wellness Studio Location Map, Sastha Nagar, Salem"
                src={BUSINESS.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
          </div>

          {/* Right Column: Validated Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm
              defaultProgram={defaultProgram}
              defaultMode={defaultMode}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
