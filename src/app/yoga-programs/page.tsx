import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { LinkButton } from "@/components/ui/Button";
import { ModesSection } from "@/components/sections/ModesSection";
import { FAQ } from "@/components/sections/FAQ";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Yoga Programs – Traditional, Therapeutic, Pranayama & Kids Yoga",
  description:
    "Explore yoga classes in Salem and online at VJ PRANA: traditional & therapeutic yoga, pranayama & meditation, women-only yoga, kids aerial yoga, and gentle senior sessions.",
  alternates: { canonical: "/yoga-programs" },
};

const YOGA_TRACKS = [
  {
    id: "traditional-therapeutic",
    eyebrow: "Foundational & Restorative",
    title: "Traditional & Therapeutic Yoga",
    description:
      "Mindful asana sequences guided with attentive posture alignment and individual adaptations—ideal for beginners, returning practitioners, and those seeking supportive therapeutic yoga routines.",
    points: [
      "Traditional yogic postures taught step by step",
      "Supportive therapeutic yoga adapted to comfort and mobility",
      "Beginner-friendly guidance with hands-on or live visual cues",
      "Personalised routines tailored to everyday posture and vitality",
    ],
    image: "/images/prana01.jpg",
    imageAlt:
      "VJ PRANA instructor guiding a student in Bow Pose (Dhanurasana) on a studio mat",
    fit: "cover" as const,
    ctaProgram: "Yoga & Therapeutic Yoga",
  },
  {
    id: "pranayama",
    eyebrow: "Breath & Stillness",
    title: "Pranayama & Guided Meditation",
    description:
      "Slow down the pace of daily life through structured breathing practices, guided relaxation, and calm mindfulness sessions designed to nurture clarity and composure.",
    points: [
      "Foundational and calming pranayama breathing techniques",
      "Guided meditation sessions for focus and stillness",
      "Deep relaxation practices to unwind everyday tension",
      "Accessible to complete beginners as well as regular practitioners",
    ],
    image: "/images/meditation-breath.jpg",
    imageAlt:
      "Calm pranayama and guided meditation practice in warm natural morning light",
    fit: "cover" as const,
    ctaProgram: "Pranayama & Meditation",
  },
  {
    id: "kids-yoga",
    eyebrow: "Children & Young Adults",
    title: "Kids Health, Wellness & Aerial Yoga",
    description:
      "Engaging, age-appropriate movement classes—including supervised aerial hammock yoga—that help children build coordination, balance, flexibility, and joyful confidence.",
    points: [
      "Playful age-appropriate asanas and mindful breathing",
      "Supervised aerial silk yoga supporting balance and core strength",
      "Encourages healthy posture, focus, and screen-free activity",
      "Supportive, joyful learning environment for kids and teens",
    ],
    image: "/images/hanging02.jpg",
    imageAlt:
      "Children enjoying supervised aerial silk yoga practice at VJ PRANA studio",
    fit: "cover" as const,
    ctaProgram: "Kids Health & Wellness Yoga",
  },
  {
    id: "seniors-yoga",
    eyebrow: "Gentle & Adaptive Care",
    title: "Seniors & Women-Only Yoga Batches",
    description:
      "Dedicated women's batches led by a female yoga instructor alongside gentle, unhurried adaptive sessions for seniors focused on mobility, balance, and peaceful breathing.",
    points: [
      "Gentle, joint-friendly movement paced for senior citizens",
      "Exclusive women-only batches online (Zoom) and offline in Salem",
      "Preparatory movements, gentle strengthening & pranayama",
      "Respectful, encouraging community atmosphere",
    ],
    image: "/images/prana02.jpg",
    imageAlt:
      "VJ PRANA women-only online and offline yoga classes led by a female yoga teacher",
    fit: "contain" as const,
    ctaProgram: "Women-Only Yoga",
  },
];

export default function YogaProgramsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Yoga & Breathwork"
        title="Mindful Yoga Programs for Every Stage of Life"
        subtitle="Experience traditional yoga, therapeutic guidance, pranayama, meditation, kids wellness yoga, and women-only batches—available online and at our Salem studio."
        breadcrumb="Yoga Programs"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {YOGA_TRACKS.map((track, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={track.id}
                id={track.id}
                className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/35 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={cn(
                    "lg:col-span-6",
                    isReversed && "lg:order-2"
                  )}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]">
                    <Image
                      src={track.image}
                      alt={track.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className={cn(
                        track.fit === "contain"
                          ? "object-contain p-3"
                          : "object-cover"
                      )}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "lg:col-span-6",
                    isReversed && "lg:order-1"
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                    {track.eyebrow}
                  </p>
                  <h2 className="font-editorial mt-2 text-3xl font-medium text-[#00052F]">
                    {track.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#676055]">
                    {track.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-[#28231E]">
                    {track.points.map((pt) => (
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
                      href={`/contact?program=${encodeURIComponent(track.ctaProgram)}#enquiry-form`}
                    >
                      <span>Enquire About This Program</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </LinkButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ModesSection />
      <FAQ />
    </>
  );
}
