import Image from "next/image";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { NUTRITION_SERVICES, TEAM_PROFILES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";

export function Nutrition() {
  const consultant = TEAM_PROFILES.geetha;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6">
            <FadeIn>
              <SectionHeading
                align="left"
                eyebrow="Nutrition & Diet Consultation"
                title="Eat Better. Feel Better. Live Better."
                subtitle="Healthy living starts with understanding your body and making better food choices. Our personalised nutrition consultation helps you build practical, sustainable eating habits aligned with your lifestyle and goals."
              />

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {NUTRITION_SERVICES.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/45 p-5 transition-colors hover:border-[#CCA146]/70"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-editorial text-base font-medium text-[#00052F]">
                          {service.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#676055]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <LinkButton
                  href="/contact?program=Nutrition%20%26%20Diet%20Consultation#enquiry-form"
                  size="lg"
                >
                  <span>Book a Diet Consultation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>

                <LinkButton href="/nutrition" variant="outline" size="lg">
                  Explore Nutrition Services
                </LinkButton>
              </div>
            </FadeIn>
          </div>

          {/* Right Visual & Consultant Profile Column */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                {/* Editorial Nutrition Photograph */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6] shadow-sm">
                  <Image
                    src="/images/nutrition-editorial.jpg"
                    alt="Wholesome natural foods, millets, fruits, leafy greens, and herbal infusion representing personalised nutrition"
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>

                {/* Consultant Profile Card */}
                <div className="rounded-3xl border border-[#E4DED4] bg-[#F5F0E6] p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-[#E4DED4] bg-white sm:w-44">
                      <Image
                        src="/images/nutricion.jpg"
                        alt="Diet Consultation services by Geetha Arunkumar at VJ PRANA Health and Wellness Studio"
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="flex-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6A1F]">
                        <Award className="h-3.5 w-3.5 text-[#CF4520]" aria-hidden="true" />
                        Lead Nutrition Consultant
                      </span>
                      <h3 className="font-editorial mt-2 text-2xl font-medium text-[#00052F]">
                        {consultant.name}
                      </h3>

                      <ul className="mt-3 space-y-1.5 text-sm text-[#28231E]">
                        {consultant.credentials.map((cred) => (
                          <li key={cred} className="flex items-center gap-2">
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#CCA146]"
                              aria-hidden="true"
                            />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 text-xs leading-relaxed text-[#676055]">
                        Online &amp; in-person diet consultations available in
                        Salem and remotely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
