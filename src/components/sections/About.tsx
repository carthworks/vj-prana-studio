import Image from "next/image";
import { ArrowRight, Compass, HeartHandshake, Users } from "lucide-react";
import { TEAM_PROFILES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";

export function About() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Photo Collage */}
          <div className="lg:col-span-6">
            <FadeIn>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/images/prana01.jpg"
                      alt="Personalised posture alignment at VJ PRANA Health and Wellness Studio in Salem"
                      fill
                      sizes="(max-width: 1024px) 60vw, 28vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="col-span-5 flex flex-col gap-4">
                  <div className="relative aspect-[4/4] w-full overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]">
                    <Image
                      src="/images/arun-director.jpg"
                      alt={TEAM_PROFILES.arun.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center rounded-3xl border border-[#E4DED4] bg-[#F5F0E6] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                      Our Guiding Motto
                    </p>
                    <p className="font-editorial mt-2 text-lg leading-snug text-[#00052F]">
                      &ldquo;Do Not Drive Life, Start Living Life.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Editorial Copy Column */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <SectionHeading
                align="left"
                eyebrow="About VJ PRANA"
                title="Wellness Is More Than Exercise. It’s a Way of Life."
              />

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#676055]">
                <p>
                  VJ PRANA Health &amp; Wellness Studio is dedicated to helping
                  individuals develop healthier lifestyles through yoga,
                  fitness, nutrition and holistic wellness practices.
                </p>
                <p>
                  Our approach focuses on individual needs, sustainable habits
                  and mindful living. Whether you are beginning your wellness
                  journey or looking to improve your existing routine, we aim to
                  provide a welcoming environment for everyone.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 border-y border-[#E4DED4] py-6 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <Compass
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#CF4520]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-editorial text-sm font-semibold text-[#00052F]">
                      Personalised Guidance
                    </p>
                    <p className="mt-0.5 text-xs text-[#676055]">
                      Adapted to age, ability &amp; pace
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HeartHandshake
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#CF4520]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-editorial text-sm font-semibold text-[#00052F]">
                      Holistic Care
                    </p>
                    <p className="mt-0.5 text-xs text-[#676055]">
                      Yoga, diet, fitness &amp; counselling
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#CF4520]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-editorial text-sm font-semibold text-[#00052F]">
                      Experienced Mentors
                    </p>
                    <p className="mt-0.5 text-xs text-[#676055]">
                      Led by Mr. Arun Kumar &amp; Geetha Arunkumar
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LinkButton href="/about" size="lg" variant="navy">
                  <span>Meet Our Team &amp; Story</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="/contact" size="lg" variant="outline">
                  Visit Our Salem Studio
                </LinkButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
