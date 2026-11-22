import { WELLNESS_PROGRAMS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { FadeIn } from "@/components/ui/MotionPrimitives";

export function Programs() {
  return (
    <section
      id="programs"
      className="border-y border-[#E4DED4] bg-[#F5F0E6]/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Wellness Programs"
            title="Mindful Movement, Breath & Restorative Care"
            subtitle="Thoughtfully structured yoga, breathwork, fitness, women's wellness, and relaxation programs—designed to support lasting strength, clarity, and daily vitality."
          />
        </FadeIn>

        {/* Bento Grid: 2 featured horizontal span-2 cards + 4 balanced editorial cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WELLNESS_PROGRAMS.map((program, idx) => (
            <FadeIn
              key={program.id}
              delay={idx * 0.06}
              className={program.featured ? "lg:col-span-2" : undefined}
            >
              <ProgramCard program={program} featured={program.featured} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
