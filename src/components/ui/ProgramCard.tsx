import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { WellnessProgram } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LinkButton } from "./Button";

interface ProgramCardProps {
  program: WellnessProgram;
  featured?: boolean;
}

export function ProgramCard({ program, featured = false }: ProgramCardProps) {
  const isContain = program.imageFit === "contain";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E4DED4] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#CCA146]/70 hover:shadow-[0_20px_50px_-24px_rgba(40,35,30,0.18)]",
        featured && "lg:col-span-2 lg:flex-row"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#F5F0E6]",
          featured
            ? "aspect-[16/11] lg:aspect-auto lg:w-[48%] lg:shrink-0"
            : "aspect-[16/11] w-full"
        )}
      >
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 45vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className={cn(
            "transition-transform duration-500 group-hover:scale-[1.03]",
            isContain ? "object-contain p-3" : "object-cover"
          )}
        />
        <span className="absolute top-4 left-4 rounded-full border border-[#E4DED4]/80 bg-white/95 px-3 py-1 text-xs font-semibold tracking-wider text-[#00052F] uppercase backdrop-blur-xs">
          {program.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-6 sm:p-7">
        {/* Mild yoga-pose SVG watermark from /images/yoga-poses */}
        {program.poseIcon && (
          <div
            className="pointer-events-none absolute right-4 bottom-16 z-0 h-24 w-24 opacity-[0.06] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:opacity-[0.13]"
            aria-hidden="true"
          >
            <Image
              src={program.poseIcon}
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="relative z-10">
          <h3 className="font-editorial text-2xl font-medium text-[#00052F] transition-colors group-hover:text-[#CF4520]">
            {program.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#676055] sm:text-base">
            {program.shortDescription}
          </p>

          <ul className="mt-5 space-y-2">
            {program.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[#28231E]"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#CF4520]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4DED4]/80 pt-5">
          <Link
            href={program.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00052F] transition-colors hover:text-[#CF4520]"
          >
            <span>Explore {program.title}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <LinkButton
            href={`/contact?program=${encodeURIComponent(program.title)}#enquiry-form`}
            size="sm"
            variant="primary"
            aria-label={`Book a session for ${program.title}`}
          >
            Book a Session
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
