import type { Metadata } from "next";
import { ArrowRight, Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Explore VJ PRANA yoga, nutrition, fitness, and wellness programs.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="bg-[#F5F0E6]/45 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00052F] text-[#CCA146]">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </span>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#8C6A1F]">
          404 &middot; Page Not Found
        </p>
        <h1 className="font-editorial mt-3 text-4xl font-medium text-[#00052F] sm:text-5xl">
          Let&rsquo;s Guide You Back to Balance
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#676055]">
          The page you requested may have moved or is no longer available.
          Explore our yoga, personalised nutrition, and holistic wellness
          programs below.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <LinkButton href="/" size="lg" variant="primary">
            <span>Return to Homepage</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href="/yoga-programs" size="lg" variant="outline">
            Yoga Programs
          </LinkButton>
          <LinkButton href="/nutrition" size="lg" variant="outline">
            Diet Consultation
          </LinkButton>
          <LinkButton href="/contact" size="lg" variant="outline">
            Contact Us
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
