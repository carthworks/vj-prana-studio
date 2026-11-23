import Link from "next/link";
import { ArrowRight, Briefcase, Flame, Heart, Smile } from "lucide-react";
import { AUDIENCE_GROUPS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/MotionPrimitives";

const ICONS = [Smile, Briefcase, Heart, Flame];

export function Audience() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Who We Serve"
            title="Wellness for Every Age. Every Body. Every Journey."
            subtitle="Every program at VJ PRANA is thoughtfully adapted to your age, mobility, comfort level, and personal experience—whether you are stepping onto a yoga mat for the first time or deepening an established routine."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE_GROUPS.map((group, index) => {
            const Icon = ICONS[index] ?? Heart;
            return (
              <FadeIn key={group.id} delay={index * 0.08}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/45 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#CCA146]/70 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(40,35,30,0.16)]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#CF4520] shadow-xs ring-1 ring-[#E4DED4]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C6A1F]">
                        {group.accent}
                      </span>
                    </div>

                    <h3 className="font-editorial mt-6 text-xl font-medium text-[#00052F]">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#676055]">
                      {group.subtitle}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-[#E4DED4]/80 pt-5 text-sm text-[#28231E]">
                      {group.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CF4520]"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={group.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00052F] transition-colors group-hover:text-[#CF4520]"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
