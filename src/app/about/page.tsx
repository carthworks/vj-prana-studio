import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Award, Check, Sparkles } from "lucide-react";
import { TEAM_PROFILES } from "@/lib/constants";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ModesSection } from "@/components/sections/ModesSection";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "About Us – Holistic Yoga & Wellness Studio",
  description:
    "Learn about VJ PRANA Health & Wellness Studio in Salem, our movement, flexibility & endurance philosophy, and mentors Mr. Arun Kumar and Geetha Arunkumar.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us – Holistic Yoga & Wellness Studio | VJ PRANA Salem",
    description:
      "Meet Mr. Arun Kumar and Geetha Arunkumar and discover the mindful wellness philosophy behind VJ PRANA in Salem.",
    url: "/about",
  },
};

export default function AboutPage() {
  const { arun, geetha } = TEAM_PROFILES;

  return (
    <>
      <PageBanner
        eyebrow="About VJ PRANA"
        title="Wellness Is More Than Exercise. It’s a Way of Life."
        subtitle="Rooted in mindful movement, balanced nutrition, and genuine human care, VJ PRANA is a welcoming studio in Salem offering online and offline holistic wellness."
        breadcrumb="About Us"
        canonicalPath="/about"
      />

      {/* Brand Story & Philosophy */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                align="left"
                eyebrow="Our Philosophy"
                title="Breathe Better. Move Better. Live Better."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#676055]">
                <p>
                  At VJ PRANA Health &amp; Wellness Studio, we focus on
                  educating people about the everyday importance of{" "}
                  <strong className="font-semibold text-[#00052F]">
                    movement, flexibility, and endurance
                  </strong>
                  —making it simple and enjoyable to lead a happy, healthy
                  lifestyle on a regular basis.
                </p>
                <p>
                  Our personalised programs focus on individual needs,
                  sustainable habits, and mindful living. Whether you join our
                  live weekday online batches (1 hr 15 min daily, Monday to
                  Friday) or visit our studio in Salem, we provide a welcoming
                  environment for every age and body.
                </p>
                <p>
                  Rather than one-size-fits-all workouts or short-lived diet
                  trends, we combine traditional yogic wisdom, behavioural yoga
                  therapy, structured conditioning, and personalised meal
                  planning so wellbeing becomes natural and lasting.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/70 p-6">
                <p className="font-editorial text-lg italic text-[#00052F]">
                  &ldquo;Yoga is the perfect opportunity to be curious about who
                  you are.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6] shadow-sm">
                <Image
                  src="/images/prana01.jpg"
                  alt="Attentive personal yoga instruction inside VJ PRANA Health & Wellness Studio in Salem"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Consultant Profiles */}
      <section className="border-y border-[#E4DED4] bg-[#F5F0E6]/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Mentors & Consultants"
            title="Guided by Experience, Care & Integrity"
            subtitle="Meet the dedicated wellness professionals guiding yoga, fitness, nutrition, and counselling at VJ PRANA."
          />

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Mr. Arun Kumar */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-[#E4DED4] bg-white shadow-xs">
              <div className="relative aspect-[16/10] w-full bg-[#F5F0E6]">
                <Image
                  src={arun.image}
                  alt={arun.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                  <Sparkles className="h-3.5 w-3.5 text-[#CF4520]" aria-hidden="true" />
                  {arun.role}
                </span>
                <h2 className="font-editorial mt-2 text-2xl font-medium text-[#00052F] sm:text-3xl">
                  {arun.name}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {arun.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="rounded-full border border-[#E4DED4] bg-[#F5F0E6] px-3 py-1 text-xs font-medium text-[#28231E]"
                    >
                      {cred}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#676055] sm:text-base">
                  {arun.bio}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[#E4DED4] pt-5 text-sm text-[#28231E]">
                  {arun.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Geetha Arunkumar */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-[#E4DED4] bg-white shadow-xs">
              <div className="relative aspect-[16/10] w-full bg-[#00052F]">
                <Image
                  src={geetha.image}
                  alt={geetha.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                  <Award className="h-3.5 w-3.5 text-[#CF4520]" aria-hidden="true" />
                  {geetha.role}
                </span>
                <h2 className="font-editorial mt-2 text-2xl font-medium text-[#00052F] sm:text-3xl">
                  {geetha.name}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {geetha.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="rounded-full border border-[#E4DED4] bg-[#F5F0E6] px-3 py-1 text-xs font-medium text-[#28231E]"
                    >
                      {cred}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#676055] sm:text-base">
                  {geetha.bio}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[#E4DED4] pt-5 text-sm text-[#28231E]">
                  {geetha.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Community & Institutional Outreach */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Community & Outreach"
            title="Sharing Holistic Wellness Beyond Studio Walls"
            subtitle="From International Yoga Day workshops in Salem to university faculty health lectures and community running groups."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <figure className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/40">
              <div className="relative aspect-[16/11] w-full bg-[#F5F0E6]">
                <Image
                  src="/images/events01.jpeg"
                  alt="VJ PRANA International Yoga Day community event in Salem in association with Techno Sport"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3"
                />
              </div>
              <figcaption className="bg-white p-6">
                <h3 className="font-editorial text-xl font-medium text-[#00052F]">
                  International Yoga Day in Salem
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#676055]">
                  Community strengthening and relaxation sessions led by Mr.
                  Arun Kumar and Mrs. R. Geetha in association with Techno
                  Sport, Salem.
                </p>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/40">
              <div className="relative aspect-[16/11] w-full bg-[#F5F0E6]">
                <Image
                  src="/images/runners.jpg"
                  alt="Mr. Arun Kumar celebrating active community fitness with marathon runners"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="bg-white p-6">
                <h3 className="font-editorial text-xl font-medium text-[#00052F]">
                  Active Living &amp; Community Fitness
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#676055]">
                  Supporting endurance athletes, educational institutions, and
                  local fitness communities across Tamil Nadu with mindful
                  strength and recovery practices.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Gallery />
      <ModesSection />

      <section className="bg-white py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-editorial text-3xl font-medium text-[#00052F]">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="mt-3 text-base text-[#676055]">
            Speak with our team to explore classes, timings, or a one-on-one
            consultation tailored to your needs.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact#enquiry-form" size="lg">
              <span>Book a Free Consultation</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/yoga-programs" variant="outline" size="lg">
              Explore Yoga Programs
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
