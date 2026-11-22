"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { PROGRAM_SUBMENU_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isProgramRoute = PROGRAM_SUBMENU_LINKS.some((item) =>
    pathname.startsWith(item.href)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close submenu when route changes, clicking outside, or pressing Escape
  useEffect(() => {
    setProgramsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!programsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProgramsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProgramsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [programsOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-[#E4DED4]/90 bg-white/95 shadow-[0_4px_24px_-12px_rgba(40,35,30,0.12)] backdrop-blur-md"
            : "border-b border-transparent bg-[#F5F0E6]/75 backdrop-blur-sm"
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#00052F] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Streamlined, uncluttered 4-item primary navigation with Programs submenu */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-2 lg:flex"
          >
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                pathname === "/"
                  ? "text-[#CF4520]"
                  : "text-[#28231E] hover:bg-[#F5F0E6] hover:text-[#CF4520]"
              )}
            >
              Home
              {pathname === "/" && (
                <span
                  className="absolute right-4 bottom-0.5 left-4 h-0.5 rounded-full bg-[#CF4520]"
                  aria-hidden="true"
                />
              )}
            </Link>

            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                pathname === "/about"
                  ? "text-[#CF4520]"
                  : "text-[#28231E] hover:bg-[#F5F0E6] hover:text-[#CF4520]"
              )}
            >
              About
              {pathname === "/about" && (
                <span
                  className="absolute right-4 bottom-0.5 left-4 h-0.5 rounded-full bg-[#CF4520]"
                  aria-hidden="true"
                />
              )}
            </Link>

            {/* Programs Dropdown Sub-Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProgramsOpen((prev) => !prev)}
                aria-expanded={programsOpen}
                aria-haspopup="menu"
                aria-controls="desktop-programs-submenu"
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
                  isProgramRoute || programsOpen
                    ? "text-[#CF4520]"
                    : "text-[#28231E] hover:bg-[#F5F0E6] hover:text-[#CF4520]"
                )}
              >
                <span>Programs</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    programsOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
                {isProgramRoute && (
                  <span
                    className="absolute right-4 bottom-0.5 left-4 h-0.5 rounded-full bg-[#CF4520]"
                    aria-hidden="true"
                  />
                )}
              </button>

              {programsOpen && (
                <div
                  id="desktop-programs-submenu"
                  role="menu"
                  aria-label="Wellness Programs"
                  className="absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 pt-2.5"
                >
                  <div className="overflow-hidden rounded-2xl border border-[#E4DED4] bg-white p-2 shadow-[0_20px_50px_-20px_rgba(0,5,47,0.2)]">
                    {PROGRAM_SUBMENU_LINKS.map((item) => {
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setProgramsOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-3 transition-colors",
                            active
                              ? "bg-[#F5F0E6] text-[#CF4520]"
                              : "hover:bg-[#F5F0E6]/75"
                          )}
                        >
                          <span
                            className={cn(
                              "block text-sm font-semibold",
                              active ? "text-[#CF4520]" : "text-[#00052F]"
                            )}
                          >
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 block text-xs leading-relaxed text-[#676055]">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                pathname === "/contact"
                  ? "text-[#CF4520]"
                  : "text-[#28231E] hover:bg-[#F5F0E6] hover:text-[#CF4520]"
              )}
            >
              Contact
              {pathname === "/contact" && (
                <span
                  className="absolute right-4 bottom-0.5 left-4 h-0.5 rounded-full bg-[#CF4520]"
                  aria-hidden="true"
                />
              )}
            </Link>
          </nav>

          {/* Clean single primary CTA on the right */}
          <div className="hidden items-center lg:flex">
            <LinkButton href="/contact#enquiry-form" size="sm">
              Book a Free Consultation
            </LinkButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E4DED4] bg-white text-[#28231E] transition-colors hover:border-[#CF4520] hover:text-[#CF4520] lg:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
