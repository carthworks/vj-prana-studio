import Link from "next/link";
import { BUSINESS, YOUTUBE_CHANNEL_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SocialPillsProps {
  heading?: string;
  theme?: "light" | "dark";
  className?: string;
}

function InstagramColorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="vj-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FD5949" />
          <stop offset="50%" stopColor="#D6249F" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#vj-ig-grad)" />
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        rx="4"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="16.2" cy="7.8" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

function FacebookColorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        d="M15.1 12.7l.4-2.6h-2.5V8.4c0-.7.3-1.4 1.5-1.4h1.1V4.8s-1-.2-2-.2c-2 0-3.3 1.2-3.3 3.4v2.1H8v2.6h2.3V19c.5.1 1 .1 1.5.1s1 0 1.5-.1v-6.3h1.8z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function YouTubeColorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#FF0000" />
      <path d="M10 8.8l6 3.2-6 3.2V8.8z" fill="#FFFFFF" />
    </svg>
  );
}

export function SocialPills({
  heading = "Follow Our Journey",
  theme = "light",
  className,
}: SocialPillsProps) {
  const isDark = theme === "dark";
  const instagramUrl =
    BUSINESS.socials.find((s) => s.name === "Instagram")?.url ??
    "https://www.instagram.com/vjprana/";
  const facebookUrl =
    BUSINESS.socials.find((s) => s.name === "Facebook")?.url ??
    "https://www.facebook.com/arun.kumar.772423";
  const youtubeHref = YOUTUBE_CHANNEL_URL || "/#videos";
  const isExternalYouTube = Boolean(YOUTUBE_CHANNEL_URL);

  const pillBase =
    "group inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";

  return (
    <div className={cn(className)}>
      {heading && (
        <p
          className={cn(
            "text-sm font-semibold tracking-wide",
            isDark ? "text-white" : "text-[#28231E]"
          )}
        >
          {heading}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow VJ PRANA on Instagram"
          className={cn(
            pillBase,
            "border-[#E7A3C0] bg-white text-[#9B2D5F] hover:border-[#D6249F] hover:bg-[#FFF5FA]"
          )}
        >
          <InstagramColorIcon />
          <span>Instagram</span>
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow VJ PRANA on Facebook"
          className={cn(
            pillBase,
            "border-[#E4DED4] bg-white text-[#28231E] hover:border-[#1877F2] hover:bg-[#F3F8FF] hover:text-[#1877F2]"
          )}
        >
          <FacebookColorIcon />
          <span>Facebook</span>
        </a>

        {isExternalYouTube ? (
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch VJ PRANA on YouTube"
            className={cn(
              pillBase,
              "border-[#E4DED4] bg-white text-[#28231E] hover:border-[#FF0000] hover:bg-[#FFF5F5] hover:text-[#CC0000]"
            )}
          >
            <YouTubeColorIcon />
            <span>YouTube</span>
          </a>
        ) : (
          <Link
            href={youtubeHref}
            aria-label="Watch VJ PRANA YouTube sessions"
            className={cn(
              pillBase,
              "border-[#E4DED4] bg-white text-[#28231E] hover:border-[#FF0000] hover:bg-[#FFF5F5] hover:text-[#CC0000]"
            )}
          >
            <YouTubeColorIcon />
            <span>YouTube</span>
          </Link>
        )}
      </div>
    </div>
  );
}
