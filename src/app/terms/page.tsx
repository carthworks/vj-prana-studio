import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using the VJ PRANA Health & Wellness Studio website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="General guidelines for visitors and participants of VJ PRANA Health & Wellness Studio."
        breadcrumb="Terms & Conditions"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-base leading-relaxed text-[#676055] sm:px-6">
          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              1. Wellness &amp; Educational Nature of Services
            </h2>
            <p className="mt-3">
              The yoga, pranayama, meditation, fitness, foot reflexology,
              nutrition consultation, and relationship counselling services
              offered by {BUSINESS.fullName} are designed to support general
              wellbeing, healthy lifestyle habits, and personal growth. They are
              not a substitute for emergency medical care or professional
              medical diagnosis. Participants with existing medical conditions
              or injuries are encouraged to consult their physician and inform
              our instructors prior to beginning a physical routine.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              2. Class Schedules &amp; Enrolment
            </h2>
            <p className="mt-3">
              Online and offline batch timings, consultation slots, and program
              details are confirmed directly with our studio team upon enquiry
              and may be updated as needed to maintain small, supportive group
              sizes.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              3. Intellectual Property
            </h2>
            <p className="mt-3">
              All original text, studio photography, branding, and visual design
              on this website belong to {BUSINESS.fullName} and may not be
              reproduced without prior permission.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              4. Contact Information
            </h2>
            <p className="mt-3">
              For questions regarding these terms or studio policies, please
              reach us at {BUSINESS.addressSingleLine}, email{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="font-medium text-[#CF4520] hover:underline"
              >
                {BUSINESS.email}
              </a>
              , or call{" "}
              <a
                href={BUSINESS.phones[0].href}
                className="font-medium text-[#CF4520] hover:underline"
              >
                {BUSINESS.phones[0].display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
