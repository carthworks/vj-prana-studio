"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_ITEMS, type GalleryAsset } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CATEGORIES = [
  "All",
  "Studio Life",
  "Programs",
  "Nutrition & Care",
  "Community",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems: GalleryAsset[] =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem =
    selectedIndex !== null ? visibleItems[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, visibleItems.length]);

  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inside VJ PRANA"
          title="Moments, Programs & Community Wellness"
          subtitle="A glimpse into our Salem studio sessions, specialised programs, nutrition consultations, kids aerial yoga, and community wellness outreach."
        />

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(null);
                }}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-[#00052F] text-white shadow-xs"
                    : "border border-[#E4DED4] bg-[#F5F0E6]/60 text-[#28231E] hover:border-[#CF4520] hover:text-[#CF4520]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Editorial Responsive Masonry-Inspired Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#F5F0E6]/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#CCA146]/80 hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View larger image: ${item.title}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F0E6] text-left cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-[1.03]",
                    item.fit === "contain" ? "object-contain p-2.5" : "object-cover"
                  )}
                />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#00052F] backdrop-blur-xs">
                  {item.category}
                </span>
                <span
                  className="absolute right-3.5 bottom-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#00052F]/80 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <Expand className="h-4 w-4" />
                </span>
              </button>

              <figcaption className="flex flex-1 flex-col justify-between bg-white p-5">
                <div>
                  <h3 className="font-editorial text-lg font-medium text-[#00052F]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#676055]">
                    {item.caption}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00052F]/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DED4] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C6A1F]">
                  {selectedItem.category}
                </p>
                <h3 className="font-editorial text-lg font-medium text-[#00052F] sm:text-xl">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close image preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DED4] text-[#28231E] transition-colors hover:border-[#CF4520] hover:text-[#CF4520] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative h-[55vh] w-full bg-[#F5F0E6] sm:h-[65vh]">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain p-4"
              />

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + visibleItems.length) %
                          visibleItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#00052F] shadow-md transition-colors hover:bg-[#CF4520] hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % visibleItems.length)
                    }
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#00052F] shadow-md transition-colors hover:bg-[#CF4520] hover:text-white cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-[#E4DED4] px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-sm text-[#676055]">{selectedItem.caption}</p>
              <span className="shrink-0 text-xs font-medium text-[#707070]">
                {selectedIndex + 1} / {visibleItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
