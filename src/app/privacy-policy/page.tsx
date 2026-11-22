import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for VJ PRANA Health & Wellness Studio in Salem, Tamil Nadu.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How VJ PRANA Health & Wellness Studio handles enquiry and contact details."
        breadcrumb="Privacy Policy"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-base leading-relaxed text-[#676055] sm:px-6">
          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              1. Information You Share With Us
            </h2>
            <p className="mt-3">
              When you submit an enquiry through our website, call our studio,
              or message us via WhatsApp or email, we collect only the details
              you voluntarily provide—such as your full name, phone number,
              email address, preferred program, preferred learning mode (online
              or offline), and your message.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your contact details solely to respond to your enquiry,
              share relevant class or consultation availability, and support
              your wellness, nutrition, or counselling sessions with{" "}
              {BUSINESS.fullName}. We never sell, rent, or trade your personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              3. Confidentiality of Consultations
            </h2>
            <p className="mt-3">
              Information shared during personalised nutrition consultations,
              therapeutic yoga assessments, or pre- and post-marriage
              counselling sessions is treated with discretion and respect.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-medium text-[#00052F]">
              4. Contact Us Regarding Privacy
            </h2>
            <p className="mt-3">
              If you would like to update or remove your contact details from
              our records, please email us at{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="font-medium text-[#CF4520] hover:underline"
              >
                {BUSINESS.email}
              </a>{" "}
              or call{" "}
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
