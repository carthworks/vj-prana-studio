import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Award, CheckCircle2, MessageCircle } from "lucide-react";
import { NUTRITION_SERVICES, TEAM_PROFILES } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/utils";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "Diet & Nutrition Consultation – Geetha Arunkumar",
  description:
    "Personalised diet plans, weight management nutrition, and lifestyle meal planning in Salem & online with Geetha Arunkumar (Ph.D., PGDFS New Zealand).",
  path: "/nutrition",
});

const CONSULTATION_STEPS = [
  {
    step: "01",
    title: "Understand Your Routine & Goals",
    description:
      "Your consultation begins with a supportive conversation about your daily routine, food preferences, activity level, and personal wellness goals.",
  },
  {
    step: "02",
    title: "Receive a Practical, Customised Plan",
    description:
      "We design realistic, sustainable meal planning rooted in familiar, nourishing foods rather than rigid or unsustainable crash diets.",
  },
  {
    step: "03",
    title: "Build Lasting Food Habits",
    description:
      "Ongoing guidance helps you refine portion balance, mindful eating habits, and long-term confidence around everyday nutrition.",
  },
];

export default function NutritionPage() {
  const consultant = TEAM_PROFILES.geetha;

  return (
    <>
      <PageBanner
        eyebrow="Nutrition & Diet Consultation"
        title="Eat Better. Feel Better. Live Better."
        subtitle="Healthy living starts with understanding your body and making better food choices. Our personalised nutrition consultation helps you build practical, sustainable eating habits aligned with your lifestyle and goals."
        breadcrumb="Nutrition"
        canonicalPath="/nutrition"
      />

      {/* Services & Visual */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6] shadow-sm">
                <Image
                  src="/images/nutrition-editorial.jpg"
                  alt="Wholesome seasonal fruits, millets, leafy greens, almonds, and herbal tea representing balanced nutrition"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                align="left"
                eyebrow="What We Offer"
                title="Practical Nutrition Tailored to Real Life"
                subtitle="Available both online and in person at our Salem studio, our nutrition services complement your yoga and fitness practice."
              />

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {NUTRITION_SERVICES.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/45 p-5"
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
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Profile & VIT Recognition */}
      <section className="border-y border-[#E4DED4] bg-[#F5F0E6]/55 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="rounded-3xl border border-[#E4DED4] bg-white p-7 shadow-xs sm:p-10 lg:col-span-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#CCA146]/50 bg-[#00052F] shadow-sm sm:h-32 sm:w-32">
                  <Image
                    src={consultant.image}
                    alt={consultant.imageAlt}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                    <Award className="h-4 w-4 text-[#CF4520]" aria-hidden="true" />
                    Meet Your Nutrition Consultant
                  </span>
                  <h2 className="font-editorial mt-2 text-3xl font-medium text-[#00052F] sm:text-4xl">
                    {consultant.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#676055]">
                    {consultant.role}
                  </p>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {consultant.credentials.map((cred) => (
                  <li
                    key={cred}
                    className="flex items-center gap-2 rounded-xl border border-[#E4DED4] bg-[#F5F0E6]/60 px-4 py-2.5 text-sm font-medium text-[#28231E]"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-[#CCA146]"
                      aria-hidden="true"
                    />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-base leading-relaxed text-[#676055]">
                {consultant.bio}
              </p>

              <div className="mt-6 rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/50 p-5 text-sm text-[#28231E]">
                <p className="font-semibold text-[#00052F]">
                  Academic &amp; Wellness Outreach
                </p>
                <p className="mt-1.5 leading-relaxed text-[#676055]">
                  {consultant.highlights[0]}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton
                  href="/contact?program=Nutrition%20%26%20Diet%20Consultation#enquiry-form"
                  size="lg"
                >
                  <span>Book a Diet Consultation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href={buildWhatsAppUrl(
                    "Hello VJ PRANA, I would like to book a Diet & Nutrition Consultation with Geetha Arunkumar. Please share the details."
                  )}
                  variant="whatsapp"
                  size="lg"
                  external
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp for Consultation
                </LinkButton>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-white p-4 shadow-xs">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F5F0E6]">
                  <Image
                    src="/images/nutricion.jpg"
                    alt="VJ PRANA personalised diet consultation overview by Geetha Arunkumar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain p-2"
                  />
                </div>
                <figcaption className="mt-3 px-2 text-xs text-[#676055]">
                  Personalised diet planning available both online and offline
                  at VJ PRANA, Salem.
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-white p-4 shadow-xs">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#F5F0E6]">
                  <Image
                    src={consultant.certificateImage}
                    alt={consultant.certificateCaption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain p-2"
                  />
                </div>
                <figcaption className="mt-3 px-2 text-xs text-[#676055]">
                  {consultant.certificateCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Flow */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple, Supportive Consultation Experience"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CONSULTATION_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/40 p-8"
              >
                <span className="font-editorial text-3xl font-medium text-[#CF4520]">
                  {item.step}
                </span>
                <h3 className="font-editorial mt-4 text-xl font-medium text-[#00052F]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#676055]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
