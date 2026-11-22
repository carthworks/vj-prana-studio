"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5200;

export function HeroSlider() {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[activeIndex] ?? HERO_SLIDES[0];

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReduced, goNext]);

  return (
    <div
      className="relative mx-auto max-w-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="VJ PRANA Wellness Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Subtle golden editorial frame */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-[2.25rem] border border-[#CCA146]/35"
        aria-hidden="true"
      />

      {/* Image Slider Viewport */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] border border-[#E4DED4] bg-[#DBD4C6] shadow-[0_28px_60px_-28px_rgba(0,5,47,0.28)]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeSlide.id}
            custom={direction}
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, x: direction * 36, scale: 1.03 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, x: direction * -36, scale: 0.99 }
            }
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "object-cover",
                activeSlide.objectPosition ?? "object-center"
              )}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00052F]/40 via-transparent to-transparent"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Prev / Next Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/85 text-[#00052F] shadow-sm backdrop-blur-xs transition-all hover:bg-[#CF4520] hover:text-white cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/85 text-[#00052F] shadow-sm backdrop-blur-xs transition-all hover:bg-[#CF4520] hover:text-white cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom-Left Slide Progress Dots */}
        <div
          className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-[#00052F]/45 px-3 py-1.5 backdrop-blur-xs"
          role="tablist"
          aria-label="Select hero slide"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                onClick={() => goTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  isActive
                    ? "w-6 bg-[#CCA146]"
                    : "w-2 bg-white/65 hover:bg-white"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Synchronised Editorial Caption Card */}
      <div
        aria-live="polite"
        className="mt-4 rounded-2xl border border-[#E4DED4] bg-white/95 p-4 shadow-md backdrop-blur-sm sm:absolute sm:right-6 sm:-bottom-8 sm:mt-0 sm:w-80 sm:p-5"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
              {activeSlide.eyebrow}
            </p>
            <p className="font-editorial mt-1 text-base leading-snug text-[#00052F]">
              {activeSlide.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#676055]">
              {activeSlide.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
