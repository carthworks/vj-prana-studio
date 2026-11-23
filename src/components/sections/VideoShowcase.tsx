"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Play, Youtube } from "lucide-react";
import { YOUTUBE_CHANNEL_URL, YOUTUBE_VIDEOS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

export function VideoShowcase() {
  const [selectedId, setSelectedId] = useState(YOUTUBE_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeVideo =
    YOUTUBE_VIDEOS.find((v) => v.id === selectedId) ?? YOUTUBE_VIDEOS[0];

  const hasEmbedId = Boolean(activeVideo.youtubeId);

  const handleSelectVideo = (id: string) => {
    setSelectedId(id);
    setIsPlaying(false);
  };

  return (
    <section
      id="videos"
      className="border-y border-[#E4DED4] bg-[#F5F0E6]/45 py-16 sm:py-22"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="VJ PRANA on YouTube"
          title="Watch, Breathe & Experience Our Approach"
          subtitle="Explore guided pranayama demonstrations, studio posture insights, and everyday nutrition talks from our wellness team."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Featured YouTube Player Area (Lite-embed facade for fast LCP/Core Web Vitals) */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-[#E4DED4] bg-[#00052F] shadow-[0_24px_55px_-28px_rgba(0,5,47,0.3)]">
              <div className="relative aspect-video w-full overflow-hidden">
                {isPlaying && hasEmbedId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <>
                    <Image
                      src={activeVideo.poster}
                      alt={activeVideo.posterAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover opacity-85 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#00052F]/85 via-[#00052F]/30 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Center Play Trigger or Coming Soon Notice */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      {hasEmbedId ? (
                        <button
                          type="button"
                          onClick={() => setIsPlaying(true)}
                          aria-label={`Play YouTube video: ${activeVideo.title}`}
                          className="group inline-flex h-18 w-18 items-center justify-center rounded-full bg-[#CF4520] text-white shadow-xl ring-8 ring-white/20 transition-all duration-200 hover:scale-105 hover:bg-[#B13716] cursor-pointer"
                        >
                          <Play
                            className="ml-1 h-7 w-7 fill-current"
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <div className="max-w-md rounded-2xl border border-white/20 bg-[#00052F]/80 p-5 backdrop-blur-md">
                          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#CF4520] text-white">
                            <Youtube className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <p className="font-editorial mt-3 text-lg text-white">
                            YouTube Video Ready to Connect
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#DBD4C6]">
                            Add a VJ PRANA YouTube video ID in{" "}
                            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-[#CCA146]">
                              .env.local
                            </code>{" "}
                            or{" "}
                            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-[#CCA146]">
                              constants.ts
                            </code>{" "}
                            to stream directly here—or book a live interactive
                            demo session with our instructors today.
                          </p>
                          <div className="mt-4">
                            <LinkButton
                              href="/contact#enquiry-form"
                              size="sm"
                              variant="primary"
                            >
                              Book a Live Demo Session
                            </LinkButton>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Video Metadata Overlay */}
                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 p-5 sm:p-7">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CCA146] backdrop-blur-xs">
                        {activeVideo.category} &middot; {activeVideo.duration}
                      </span>
                      <h3 className="font-editorial mt-2.5 text-xl font-medium text-white sm:text-2xl">
                        {activeVideo.title}
                      </h3>
                      <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#DBD4C6] sm:text-sm">
                        {activeVideo.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Selector Sidebar */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A1F]">
                Featured Sessions
              </p>

              {YOUTUBE_VIDEOS.map((video) => {
                const isSelected = video.id === activeVideo.id;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(video.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "group flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-[#CF4520] bg-[#F5F0E6] shadow-xs"
                        : "border-[#E4DED4] bg-white hover:border-[#CCA146]/80 hover:bg-[#F5F0E6]/45"
                    )}
                  >
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl bg-[#00052F]">
                      <Image
                        src={video.poster}
                        alt={video.posterAlt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center bg-[#00052F]/35 transition-colors",
                          isSelected && "bg-[#CF4520]/40"
                        )}
                        aria-hidden="true"
                      >
                        <Play className="h-4 w-4 fill-white text-white" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6A1F]">
                        {video.category}
                      </p>
                      <p
                        className={cn(
                          "font-editorial mt-0.5 line-clamp-2 text-sm font-medium leading-snug",
                          isSelected ? "text-[#CF4520]" : "text-[#00052F]"
                        )}
                      >
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/65 p-5">
              <p className="font-editorial text-base font-medium text-[#00052F]">
                Prefer Live Guided Practice?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#676055]">
                Join our interactive online Zoom batches or visit our Salem
                studio for personal posture and nutrition guidance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {YOUTUBE_CHANNEL_URL ? (
                  <LinkButton
                    href={YOUTUBE_CHANNEL_URL}
                    size="sm"
                    variant="navy"
                    external
                  >
                    <Youtube className="h-4 w-4" aria-hidden="true" />
                    <span>Visit YouTube Channel</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </LinkButton>
                ) : (
                  <LinkButton
                    href="/contact#enquiry-form"
                    size="sm"
                    variant="primary"
                  >
                    <span>Join a Live Class</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
