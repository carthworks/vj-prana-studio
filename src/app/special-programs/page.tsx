import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Lock, MessageCircle } from "lucide-react";
import { SPECIAL_PROGRAMS_LIST } from "@/lib/constants";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import { PageBanner } from "@/components/layout/PageBanner";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Special Programs – Women's Yoga & Marriage Counselling in Salem",
  description:
    "Explore specialised programs at VJ PRANA Salem: dedicated women-only yoga batches with a female instructor, pre-marriage counselling, post-marriage counselling, and individualised yoga psychology.",
  alternates: { canonical: "/special-programs" },
  openGraph: {
    title: "Women's Yoga & Pre/Post-Marriage Counselling in Salem | VJ PRANA",
    description:
      "Dedicated women-only yoga batches, pre-marriage counselling, post-marriage counselling, and individualised yoga psychology.",
    url: "/special-programs",
  },
};

export default function SpecialProgramsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Specialised Services"
        title="Thoughtful Programs for Women’s Wellbeing & Relationship Care"
        subtitle="Dedicated women-only yoga sessions alongside private, compassionate pre-marriage, post-marriage, and individualised yoga psychology counselling."
        breadcrumb="Special Programs"
        canonicalPath="/special-programs"
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          {SPECIAL_PROGRAMS_LIST.map((item, idx) => (
            <article
              key={item.id}
              id={item.id}
              className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/35 p-6 sm:p-10 lg:grid-cols-12"
            >
              <div
                className={
                  idx % 2 === 1 ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"
                }
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className={cn(
                      item.imageFit === "contain"
                        ? "object-contain p-3"
                        : "object-cover"
                    )}
                  />
                </div>
              </div>

              <div
                className={
                  idx % 2 === 1 ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                  {item.badge}
                </p>
                <h2 className="font-editorial mt-2 text-3xl font-medium text-[#00052F]">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#676055]">
                  {item.description}
                </p>

                <ul className="mt-6 space-y-2.5 text-sm text-[#28231E]">
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

                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton
                    href={`/contact?program=${encodeURIComponent(
                      item.id === "womens-yoga"
                        ? "Women-Only Yoga"
                        : item.id === "pre-marriage-counselling"
                        ? "Pre-Marriage Counselling"
                        : item.id === "post-marriage-counselling"
                        ? "Post-Marriage Counselling"
                        : "Yoga Psychology & Individual Counselling"
                    )}#enquiry-form`}
                  >
                    <span>Enquire Confidentially</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Privacy & Respectful Care Banner */}
      <section className="border-t border-[#E4DED4] bg-[#00052F] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#CCA146]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="font-editorial mt-5 text-3xl font-medium text-white">
            Private, Respectful &amp; Supportive Conversations
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#DBD4C6]">
            Every counselling and specialised wellness enquiry is handled with
            strict respect and discretion. Reach out by phone, WhatsApp, or our
            contact form to schedule an appointment online or in person.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact#enquiry-form" size="lg" variant="primary">
              Enquire About Special Programs
            </LinkButton>
            <LinkButton
              href={buildWhatsAppUrl(
                "Hello VJ PRANA, I would like to enquire confidentially about your special programs and counselling sessions."
              )}
              variant="whatsapp"
              size="lg"
              external
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Enquiry
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
