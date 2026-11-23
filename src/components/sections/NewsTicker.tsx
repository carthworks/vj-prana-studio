"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Lock,
  Megaphone,
  Pause,
  Play,
  X,
} from "lucide-react";
import type { NewsItem } from "@/lib/newsValidation";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

interface NewsTickerProps {
  initialItems: NewsItem[];
}

export function NewsTicker({ initialItems }: NewsTickerProps) {
  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [paused, setPaused] = useState(false);
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);

  // Sync latest published items so admin updates appear live immediately
  useEffect(() => {
    let cancelled = false;
    fetch("/api/news", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { items?: NewsItem[] } | null) => {
        if (!cancelled && data?.items && Array.isArray(data.items)) {
          setItems(data.items);
        }
      })
      .catch(() => {
        // Keep SSR initialItems silently on transient network error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  if (items.length === 0) {
    return null;
  }

  // Duplicate list when >=2 items so the marquee loops seamlessly
  const shouldAnimate = items.length >= 2;
  const displayItems = shouldAnimate ? [...items, ...items] : items;

  return (
    <section
      aria-label="Latest News and Events"
      className="border-y border-[#E4DED4] bg-[#00052F] text-white"
    >
      {/* Top Compact Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CF4520] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CF4520]" />
          </span>
          <Megaphone className="h-4 w-4 text-[#CCA146]" aria-hidden="true" />
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#CCA146]">
            Latest News &amp; Events
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          {shouldAnimate && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume news ticker" : "Pause news ticker"}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-[#DBD4C6] transition-colors hover:border-[#CCA146] hover:text-white cursor-pointer"
            >
              {paused ? (
                <>
                  <Play className="h-3 w-3" aria-hidden="true" />
                  <span>Play</span>
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3" aria-hidden="true" />
                  <span>Pause</span>
                </>
              )}
            </button>
          )}

          <Link
            href="/admin/news"
            title="Owner Login: Manage News & Events"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[#DBD4C6]/85 transition-colors hover:border-[#CCA146]/70 hover:text-[#CCA146]"
          >
            <Lock className="h-3 w-3" aria-hidden="true" />
            <span className="hidden sm:inline">Manage</span>
          </Link>
        </div>
      </div>

      {/* Horizontal Image News Ticker Track */}
      <div className="vj-ticker-viewport relative overflow-x-auto py-4 sm:overflow-hidden">
        <div
          className={cn(
            shouldAnimate ? "vj-ticker-track" : "mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8",
            paused && "vj-ticker-paused",
            "gap-4 px-4"
          )}
        >
          {displayItems.map((item, idx) => {
            const isDuplicate = shouldAnimate && idx >= items.length;
            return (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                tabIndex={isDuplicate ? -1 : 0}
                aria-hidden={isDuplicate ? true : undefined}
                onClick={() => setActiveItem(item)}
                className="group flex w-80 shrink-0 items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.06] p-2.5 text-left transition-all duration-200 hover:border-[#CCA146]/75 hover:bg-white/[0.11] sm:w-96 cursor-pointer"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#F5F0E6]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={64}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                    <span className="rounded-full bg-[#CF4520]/90 px-2 py-0.5 text-white">
                      {item.category}
                    </span>
                    <span className="truncate text-[#CCA146]">{item.date}</span>
                  </div>
                  <p className="font-editorial mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-white group-hover:text-[#F5F0E6]">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Event Detail Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00052F]/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#E4DED4] bg-white text-[#28231E] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#F5F0E6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close event details"
                className="absolute top-3.5 right-3.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#00052F] shadow-md transition-colors hover:bg-[#CF4520] hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="absolute bottom-3.5 left-4 rounded-full bg-[#00052F]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#CCA146]">
                {activeItem.category}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6A1F]">
                <Calendar className="h-3.5 w-3.5 text-[#CF4520]" aria-hidden="true" />
                <span>{activeItem.date}</span>
              </div>

              <h3 className="font-editorial mt-2 text-2xl font-medium text-[#00052F]">
                {activeItem.title}
              </h3>

              {activeItem.summary && (
                <p className="mt-3 text-sm leading-relaxed text-[#676055] sm:text-base">
                  {activeItem.summary}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4DED4] pt-5">
                {activeItem.linkUrl ? (
                  <LinkButton
                    href={activeItem.linkUrl}
                    external={activeItem.linkUrl.startsWith("http")}
                    onClick={() => setActiveItem(null)}
                  >
                    <span>{activeItem.linkLabel || "Learn More"}</span>
                    {activeItem.linkUrl.startsWith("http") ? (
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </LinkButton>
                ) : (
                  <LinkButton
                    href="/contact#enquiry-form"
                    onClick={() => setActiveItem(null)}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                )}

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="text-sm font-medium text-[#676055] hover:text-[#00052F] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
