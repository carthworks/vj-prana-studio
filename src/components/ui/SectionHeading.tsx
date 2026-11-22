import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            isDark ? "text-[#CCA146]" : "text-[#8C6A1F]"
          )}
        >
          <span
            className="h-px w-8 bg-[#CCA146]"
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
          {isCenter && (
            <span
              className="h-px w-8 bg-[#CCA146]"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      <HeadingTag
        className={cn(
          "font-editorial font-medium leading-[1.18] tracking-tight",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-[3.35rem]"
            : "text-3xl sm:text-4xl lg:text-[2.65rem]",
          isDark ? "text-white" : "text-[#00052F]"
        )}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isDark ? "text-[#DBD4C6]" : "text-[#676055]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
