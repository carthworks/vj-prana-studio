import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-primary",
        className
      )}
      aria-label="VJ PRANA – Health & Wellness Studio Home"
    >
      {/* Minimal emblem inspired by VJ PRANA's circular lotus-meditation crest */}
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105",
          isLight
            ? "border-[#CCA146]/60 bg-white/10"
            : "border-[#CCA146]/50 bg-[#F5F0E6]"
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
        >
          <circle
            cx="20"
            cy="20"
            r="17"
            stroke="#CCA146"
            strokeWidth="1.4"
            strokeOpacity="0.85"
          />
          {/* Subtle meditating lotus silhouette */}
          <circle
            cx="20"
            cy="13"
            r="2.4"
            fill={isLight ? "#FFFFFF" : "#CF4520"}
          />
          <path
            d="M20 7.5C15.5 11.2 14.5 16.5 17 21.2C18.1 23.2 19.2 24.4 20 25C20.8 24.4 21.9 23.2 23 21.2C25.5 16.5 24.5 11.2 20 7.5Z"
            stroke={isLight ? "#CCA146" : "#00052F"}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 27.5C13.8 24.8 17 24.2 20 25.4C23 24.2 26.2 24.8 28.5 27.5C25.8 29.4 22.9 30 20 29.4C17.1 30 14.2 29.4 11.5 27.5Z"
            fill={isLight ? "#CCA146" : "#CF4520"}
            fillOpacity={isLight ? "0.9" : "0.88"}
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-editorial text-lg font-semibold tracking-[0.14em] sm:text-xl",
            isLight ? "text-white" : "text-[#00052F]"
          )}
        >
          VJ PRANA
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium uppercase tracking-[0.2em]",
            isLight ? "text-[#DBD4C6]" : "text-[#676055]"
          )}
        >
          Health &amp; Wellness Studio
        </span>
      </span>
    </Link>
  );
}
