import Image from "next/image";
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
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/50 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#CCA146]/80 hover:bg-white hover:shadow-[0_22px_48px_-24px_rgba(40,35,30,0.2)]">
                  {/* Background photograph revealed smoothly on mouseover */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <Image
                      src={group.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover opacity-0 scale-100 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-[#F5F0E6]/65 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Yoga-pose SVG illustration watermark */}
                  <div
                    className="pointer-events-none absolute right-3 bottom-3 z-0 h-24 w-24 opacity-[0.09] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:opacity-[0.22]"
                    aria-hidden="true"
                  >
                    <Image
                      src={group.poseIcon}
                      alt=""
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#CF4520] shadow-xs ring-1 ring-[#E4DED4] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#CF4520] group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C6A1F]">
                        {group.accent}
                      </span>
                    </div>

                    <h3 className="font-editorial mt-6 text-xl font-medium text-[#00052F] transition-colors group-hover:text-[#CF4520]">
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
                    className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00052F] transition-colors duration-200 hover:text-[#CF4520]"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
