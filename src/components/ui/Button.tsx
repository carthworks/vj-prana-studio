import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "navy" | "outline" | "outlineLight" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#CF4520] text-white hover:bg-[#B13716] shadow-sm hover:shadow-[0_12px_26px_-10px_rgba(207,69,32,0.5)] border border-transparent",
  navy:
    "bg-[#00052F] text-white hover:bg-[#11184d] shadow-sm hover:shadow-[0_12px_26px_-10px_rgba(0,5,47,0.45)] border border-transparent",
  outline:
    "bg-white/60 text-[#28231E] border border-[#28231E]/25 hover:border-[#CF4520] hover:text-[#CF4520] hover:bg-[#F5F0E6]/80 hover:shadow-sm",
  outlineLight:
    "bg-transparent text-white border border-white/35 hover:border-[#CCA146] hover:bg-white/12 hover:shadow-[0_10px_24px_-10px_rgba(204,161,70,0.35)]",
  ghost:
    "bg-transparent text-[#CF4520] hover:bg-[#F5F0E6] border border-transparent",
  whatsapp:
    "bg-[#1F7A4D] text-white hover:bg-[#17623D] shadow-sm hover:shadow-[0_12px_26px_-10px_rgba(31,122,77,0.5)] border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

const baseStyles =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:scale-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  children: ReactNode;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
