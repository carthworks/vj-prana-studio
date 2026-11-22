import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { TEAM_PROFILES } from "@/lib/constants";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ModesSection } from "@/components/sections/ModesSection";

export const metadata: Metadata = {
  title: "Fitness, Weight Management & Foot Reflexology in Salem",
  description:
    "Build strength, flexibility, and balanced vitality at VJ PRANA Salem: strength training, power yoga, bodyweight cardio, weight management, and relaxation-focused foot reflexology.",
  alternates: { canonical: "/fitness" },
  openGraph: {
    title: "Strength, Power Yoga, Weight Management & Foot Reflexology | VJ PRANA",
    description:
      "Personalised strength conditioning, power yoga, healthy weight management, and foot reflexology in Salem & online.",
    url: "/fitness",
  },
};

const FITNESS_PROGRAMS = [
  {
    id: "strength-conditioning",
    eyebrow: "Strength & Mobility",
    title: "Strength Training, Power Yoga & Conditioning",
    description:
      "Tailor-made sessions blending functional strength training, bodyweight cardio, power yoga, and structured flexibility work so your body feels strong, agile, and resilient.",
    points: [
      "Strength training and bodyweight cardio conditioning",
      "Power yoga sequences for stamina and core stability",
      "Progressive flexibility and joint mobility development",
      "Scaled thoughtfully for beginners and active enthusiasts alike",
    ],
    image: "/images/pose01.jpg",
    imageAlt:
      "VJ PRANA strength training, flexibility benefits, and power yoga program showcase",
    fit: "contain" as const,
    programName: "Strength & Fitness / Power Yoga",
  },
  {
    id: "weight-management",
    eyebrow: "Sustainable Lifestyle",
    title: "Weight Management (Healthy Loss & Gain)",
    description:
      "Long-term body toning and healthy weight management guided through consistent movement, active conditioning, and lifestyle-aligned nutrition guidance.",
    points: [
      "Structured weight loss routines focused on sustainable progress",
      "Healthy weight gain programs pairing strength with nourishment",
      "Full-body toning and posture support",
      "Optional pairing with personalised diet consultations",
    ],
    image: "/images/arun-director.jpg",
    imageAlt: TEAM_PROFILES.arun.imageAlt,
    fit: "cover" as const,
    programName: "Weight Management",
  },
  {
    id: "foot-reflexology",
    eyebrow: "Restorative Wellness",
    title: "Foot Reflexology",
    description:
      "Unwind tired feet and restore calm through individual, relaxation-focused foot reflexology sessions offered by appointment at our Salem studio.",
    points: [
      "Relaxation-focused foot reflexology sessions",
      "Individual pre-session consultation",
      "Calm, unhurried restorative environment",
      "A gentle complement to active yoga and fitness routines",
    ],
    image: "/images/footcure.jpg",
    imageAlt:
      "VJ PRANA Health & Wellness Studio Foot Reflexology relaxation care",
    fit: "contain" as const,
    programName: "Foot Reflexology",
  },
];

export default function FitnessPage() {
  return (
    <>
      <PageBanner
        eyebrow="Fitness & Restorative Wellness"
        title="Move With Strength. Recover With Calm."
        subtitle="Combining bodyweight conditioning, power yoga, healthy weight management, and foot reflexology for complete physical wellbeing."
        breadcrumb="Fitness & Wellness"
        canonicalPath="/fitness"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          {FITNESS_PROGRAMS.map((prog, index) => (
            <article
              key={prog.id}
              id={prog.id}
              className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/35 p-6 sm:p-10 lg:grid-cols-12"
            >
              <div
                className={
                  index % 2 === 1 ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"
                }
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]">
                  <Image
                    src={prog.image}
                    alt={prog.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className={
                      prog.fit === "contain"
                        ? "object-contain p-3"
                        : "object-cover object-top"
                    }
                  />
                </div>
              </div>

              <div
                className={
                  index % 2 === 1 ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                  {prog.eyebrow}
                </p>
                <h2 className="font-editorial mt-2 text-3xl font-medium text-[#00052F]">
                  {prog.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#676055]">
                  {prog.description}
                </p>

                <ul className="mt-6 space-y-2.5 text-sm text-[#28231E]">
                  {prog.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <LinkButton
                    href={`/contact?program=${encodeURIComponent(prog.programName)}#enquiry-form`}
                  >
                    <span>Book a Session</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Active Community Feature */}
      <section className="border-t border-[#E4DED4] bg-[#F5F0E6]/45 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Community Fitness"
                title="Built for Everyday Stamina & Longevity"
                subtitle="Led by Health & Wellness Coach Mr. Arun Kumar, our conditioning philosophy focuses on sustainable movement, joint care, and consistent daily vitality."
              />
              <div className="mt-7">
                <LinkButton href="/contact#enquiry-form" variant="navy">
                  Talk to Our Fitness Team
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#E4DED4] bg-white shadow-xs">
                <Image
                  src="/images/runners.jpg"
                  alt="Mr. Arun Kumar with regional marathon runners celebrating community endurance and active living"
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModesSection />
    </>
  );
}
