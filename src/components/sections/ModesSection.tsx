import { ArrowRight, Building2, Check, Laptop } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";

const ONLINE_FEATURES = [
  "Join from anywhere across India or abroad",
  "Live guided interactive sessions via Zoom",
  "Convenient scheduling around home and work",
  "Personal attention and interaction with instructors",
];

const OFFLINE_FEATURES = [
  "In-person studio sessions in Sastha Nagar, Salem",
  "Direct instructor guidance and posture alignment",
  "Encouraging group learning experience",
  "Calm, supportive holistic wellness environment",
];

export function ModesSection() {
  return (
    <section className="relative overflow-hidden bg-[#00052F] py-20 text-white sm:py-28">
      {/* Subtle warm radial glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#CF4520]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-[#CCA146]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            theme="dark"
            eyebrow="Flexible Learning Modes"
            title="Your Wellness Journey. Your Place. Your Pace."
            subtitle="Choose live online classes from home or join us in person at our Salem studio. Reach out to our team to find the right batch and timing for your schedule."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Online Card */}
          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-xs transition-colors hover:border-[#CCA146]/60 sm:p-10">
              <div>
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[#CCA146]/15 text-[#CCA146]">
                  <Laptop className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCA146]">
                  Live Interactive Sessions
                </p>
                <h3 className="font-editorial mt-2 text-2xl font-medium text-white sm:text-3xl">
                  Online Classes
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#DBD4C6]">
                  Stay consistent with your yoga, pranayama, fitness, or
                  nutrition consultations from wherever you are.
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm text-white/90">
                  {ONLINE_FEATURES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CCA146]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <LinkButton
                  href="/contact?mode=Online#enquiry-form"
                  variant="primary"
                >
                  <span>Enquire for Online Classes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
          </FadeIn>

          {/* Offline Card */}
          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-xs transition-colors hover:border-[#CCA146]/60 sm:p-10">
              <div>
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[#CF4520]/25 text-[#F6AD55]">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCA146]">
                  Salem Wellness Studio
                </p>
                <h3 className="font-editorial mt-2 text-2xl font-medium text-white sm:text-3xl">
                  Offline Classes
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#DBD4C6]">
                  Experience focused, attentive in-person sessions at our
                  welcoming studio near Iyyapan Koil, Bangalore Bypass Road,
                  Salem.
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm text-white/90">
                  {OFFLINE_FEATURES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CCA146]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <LinkButton
                  href="/contact?mode=Offline#enquiry-form"
                  variant="outlineLight"
                >
                  <span>Enquire for Studio Classes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.16}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#DBD4C6]">
              Batch availability and timings are shared directly upon enquiry so
              we can recommend the best fit for your goals.
            </p>
            <div className="mt-5">
              <LinkButton href="/contact#enquiry-form" size="lg" variant="primary">
                <span>Find Your Class</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
