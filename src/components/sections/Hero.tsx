import { ArrowRight, Globe, MapPin, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/MotionPrimitives";
import { HeroSlider } from "./HeroSlider";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0E6] via-[#F5F0E6]/65 to-white pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Subtle organic background shapes */}
      <div
        className="organic-shape pointer-events-none absolute -top-24 right-[-6rem] h-[28rem] w-[28rem] bg-[#DBD4C6]/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="organic-shape pointer-events-none absolute bottom-0 left-[-8rem] h-[22rem] w-[22rem] bg-[#CCA146]/12 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#CCA146]/45 bg-white/85 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#8C6A1F] uppercase backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#CF4520]" aria-hidden="true" />
                <span>VJ PRANA &middot; Salem, Tamil Nadu</span>
              </div>

              <h1 className="font-editorial mt-6 text-4xl font-medium leading-[1.12] tracking-tight text-[#00052F] sm:text-5xl lg:text-[3.55rem]">
                Discover a Healthier, Stronger &amp; More Balanced You.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#676055] sm:text-lg">
                At VJ PRANA, we educate you on the simple, everyday power of
                movement, flexibility, and endurance—combining personalised
                yoga, mindful fitness, and nutrition to help you lead a happy,
                healthy lifestyle on a regular basis.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LinkButton href="#programs" size="lg" variant="primary">
                  <span>Explore Our Programs</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>

                <LinkButton href="/contact" size="lg" variant="outline">
                  Talk to Our Wellness Team
                </LinkButton>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#28231E]">
                <span className="inline-flex items-center gap-2 font-medium">
                  <Globe className="h-4 w-4 text-[#CF4520]" aria-hidden="true" />
                  Online (4:45–11 AM &amp; 5–8 PM) &middot; Mon–Fri &middot; ₹3,000/mo
                </span>
                <span className="inline-flex items-center gap-2 text-[#676055]">
                  <MapPin className="h-4 w-4 text-[#CCA146]" aria-hidden="true" />
                  Offline Studio in Salem
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right-Side Animated Wellness Slider */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.12}>
              <HeroSlider />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
