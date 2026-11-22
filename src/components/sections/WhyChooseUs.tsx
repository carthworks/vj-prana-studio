import {
  Flame,
  Globe,
  HeartHandshake,
  Salad,
  Sparkles,
  Users,
} from "lucide-react";
import { WHY_CHOOSE_ITEMS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/MotionPrimitives";

const ICON_MAP = {
  HeartHandshake,
  Globe,
  Users,
  Flame,
  Salad,
  Sparkles,
} as const;

export function WhyChooseUs() {
  return (
    <section className="border-y border-[#E4DED4] bg-[#F5F0E6]/55 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose VJ PRANA"
            title="A Thoughtful, Human-Centred Path to Everyday Wellbeing"
            subtitle="Everything we teach is rooted in sustainable habits, respectful instruction, and practical care you can carry beyond the mat."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <FadeIn key={item.title} delay={idx * 0.06}>
                <div className="h-full rounded-3xl border border-[#E4DED4] bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CCA146]/70 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F0E6] text-[#CF4520]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="font-editorial mt-5 text-xl font-medium text-[#00052F]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#676055]">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
