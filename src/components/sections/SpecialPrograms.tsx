import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SPECIAL_PROGRAMS_LIST } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";
import { cn } from "@/lib/utils";

export function SpecialPrograms() {
  // Show the 3 core special programs on homepage (Women's Yoga, Pre-Marriage, Post-Marriage)
  const featuredSpecials = SPECIAL_PROGRAMS_LIST.slice(0, 3);

  return (
    <section className="border-t border-[#E4DED4] bg-[#F5F0E6]/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Specialised Care & Guidance"
            title="Special Programs for Life’s Important Seasons"
            subtitle="Compassionate, private, and thoughtfully guided services—from dedicated women's yoga batches to supportive pre-marriage and post-marriage counselling."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {featuredSpecials.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#E4DED4] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#CCA146]/70 hover:shadow-lg">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F5F0E6]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={cn(
                      item.imageFit === "contain"
                        ? "object-contain p-2"
                        : "object-cover"
                    )}
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wider text-[#00052F] uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-editorial text-2xl font-medium text-[#00052F]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#676055]">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-[#E4DED4]/80 pt-5 text-sm text-[#28231E]">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                          aria-hidden="true"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/contact?program=Pre-Marriage%20Counselling#enquiry-form" size="lg">
              <span>Enquire About Special Programs</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/special-programs" variant="outline" size="lg">
              View All Special Programs
            </LinkButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
