"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageCircle, Phone, X } from "lucide-react";
import { BUSINESS, PROGRAM_SUBMENU_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [programsExpanded, setProgramsExpanded] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div
        className="fixed inset-0 bg-[#00052F]/45 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-[#FFFFFF] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E4DED4] px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DED4] text-[#28231E] transition-colors hover:border-[#CF4520] hover:text-[#CF4520] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile Navigation"
          className="flex-1 overflow-y-auto px-5 py-6"
        >
          <ul className="space-y-1.5">
            <li>
              <Link
                href="/"
                onClick={onClose}
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  pathname === "/"
                    ? "bg-[#F5F0E6] text-[#CF4520]"
                    : "text-[#28231E] hover:bg-[#F5F0E6]/70 hover:text-[#CF4520]"
                )}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                onClick={onClose}
                aria-current={pathname === "/about" ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  pathname === "/about"
                    ? "bg-[#F5F0E6] text-[#CF4520]"
                    : "text-[#28231E] hover:bg-[#F5F0E6]/70 hover:text-[#CF4520]"
                )}
              >
                About
              </Link>
            </li>

            {/* Expandable Programs Sub-menu */}
            <li>
              <button
                type="button"
                onClick={() => setProgramsExpanded((prev) => !prev)}
                aria-expanded={programsExpanded}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-[#28231E] transition-colors hover:bg-[#F5F0E6]/70 hover:text-[#CF4520] cursor-pointer"
              >
                <span>Programs</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[#CF4520] transition-transform duration-200",
                    programsExpanded && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {programsExpanded && (
                <ul className="mt-1 ml-3 space-y-1 border-l-2 border-[#E4DED4] pl-3">
                  {PROGRAM_SUBMENU_LINKS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-[#F5F0E6] text-[#CF4520]"
                              : "text-[#676055] hover:bg-[#F5F0E6]/60 hover:text-[#CF4520]"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/contact"
                onClick={onClose}
                aria-current={pathname === "/contact" ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  pathname === "/contact"
                    ? "bg-[#F5F0E6] text-[#CF4520]"
                    : "text-[#28231E] hover:bg-[#F5F0E6]/70 hover:text-[#CF4520]"
                )}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-8 space-y-3 border-t border-[#E4DED4] pt-6">
            <LinkButton
              href="/contact#enquiry-form"
              onClick={onClose}
              className="w-full"
            >
              Book a Free Consultation
            </LinkButton>
            <LinkButton
              href={buildWhatsAppUrl()}
              variant="whatsapp"
              external
              className="w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Enquiry
            </LinkButton>
          </div>

          <div className="mt-6 rounded-2xl bg-[#F5F0E6] p-4 text-sm text-[#676055]">
            <p className="font-semibold text-[#00052F]">Direct Phone Support</p>
            <div className="mt-2 flex flex-col gap-1.5">
              {BUSINESS.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="inline-flex items-center gap-2 font-medium text-[#28231E] hover:text-[#CF4520]"
                >
                  <Phone
                    className="h-3.5 w-3.5 text-[#CF4520]"
                    aria-hidden="true"
                  />
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
