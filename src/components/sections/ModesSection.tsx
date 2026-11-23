import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock,
  IndianRupee,
  Laptop,
  Sun,
} from "lucide-react";
import { CLASS_SCHEDULE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";

const ONLINE_FEATURES = [
  "Personalised weekday programs tailored to your individual pace and goals",
  "Morning slots from 4:45 AM – 11:00 AM & evening slots from 5:00 PM – 8:00 PM",
  "1 hour 15 minutes of live guided practice every weekday (Mon – Fri)",
  "No weekend classes — giving your body consistent rest and recovery",
];

const OFFLINE_FEATURES = [
  "In-person studio sessions in Sastha Nagar, Salem",
  "Direct instructor guidance and hands-on posture alignment",
  "Focus on movement, flexibility & endurance in a calm studio setting",
  "Supportive small-group and personalised learning environment",
];

export function ModesSection() {
  return (
    <section className="relative overflow-hidden bg-[#00052F] py-16 text-white sm:py-22">
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
            eyebrow="Personalised Online & Studio Programs"
            title="Your Wellness Journey. Your Place. Your Pace."
            subtitle="Simple, practical daily routines focused on movement, flexibility, and endurance—helping you lead a happy, healthy lifestyle on a regular basis."
          />
        </FadeIn>

        {/* Key Schedule & Fee Strip */}
        <FadeIn delay={0.05}>
          <div className="mt-10 grid grid-cols-1 gap-3.5 rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xs sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4">
              <Sun
                className="mt-0.5 h-5 w-5 shrink-0 text-[#CCA146]"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CCA146]">
                  Online Timings
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Morning: {CLASS_SCHEDULE.morningSlots}
                </p>
                <p className="text-xs text-[#DBD4C6]">
                  Evening: {CLASS_SCHEDULE.eveningSlots}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4">
              <Clock
                className="mt-0.5 h-5 w-5 shrink-0 text-[#CCA146]"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CCA146]">
                  Session Duration
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {CLASS_SCHEDULE.duration}
                </p>
                <p className="text-xs text-[#DBD4C6]">
                  75-minute guided personalised sessions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4">
              <CalendarDays
                className="mt-0.5 h-5 w-5 shrink-0 text-[#CCA146]"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CCA146]">
                  Weekly Rhythm
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Monday – Friday
                </p>
                <p className="text-xs text-[#DBD4C6]">
                  No weekend classes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#CCA146]/40 bg-[#CF4520]/20 p-4">
              <IndianRupee
                className="mt-0.5 h-5 w-5 shrink-0 text-[#F6AD55]"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F6AD55]">
                  Monthly Program Fee
                </p>
                <p className="font-editorial mt-1 text-xl font-semibold text-white">
                  {CLASS_SCHEDULE.monthlyFee}
                </p>
                <p className="text-xs text-[#DBD4C6]">
                  All personalised online programs
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
          {/* Online Card */}
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.05] p-7 backdrop-blur-xs transition-colors hover:border-[#CCA146]/60 sm:p-9">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCA146]/15 text-[#CCA146]">
                    <Laptop className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-[#CCA146]/50 bg-[#CCA146]/15 px-3.5 py-1 text-xs font-semibold text-[#CCA146]">
                    {CLASS_SCHEDULE.monthlyFee}
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCA146]">
                  Live Personalised Sessions
                </p>
                <h3 className="font-editorial mt-2 text-2xl font-medium text-white sm:text-3xl">
                  Online Classes
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#DBD4C6]">
                  Join from anywhere with flexible morning ({CLASS_SCHEDULE.morningSlots})
                  or evening ({CLASS_SCHEDULE.eveningSlots}) personalised weekday
                  batches.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/15 pt-5 text-sm text-white/90">
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

              <div className="mt-7 pt-3">
                <LinkButton
                  href="/contact?mode=Online#enquiry-form"
                  variant="primary"
                >
                  <span>Reserve Your Online Slot</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
          </FadeIn>

          {/* Offline Card */}
          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.05] p-7 backdrop-blur-xs transition-colors hover:border-[#CCA146]/60 sm:p-9">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CF4520]/25 text-[#F6AD55]">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCA146]">
                  Salem Wellness Studio
                </p>
                <h3 className="font-editorial mt-2 text-2xl font-medium text-white sm:text-3xl">
                  Offline Classes
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#DBD4C6]">
                  Experience attentive in-person sessions at our welcoming
                  studio near Iyyapan Koil, Bangalore Bypass Road, Salem.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/15 pt-5 text-sm text-white/90">
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

              <div className="mt-7 pt-3">
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
      </div>
    </section>
  );
}
