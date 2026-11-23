import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { SocialPills } from "@/components/ui/SocialPills";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Yoga Programs", href: "/yoga-programs" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Fitness", href: "/fitness" },
];

const PROGRAM_LINKS = [
  { label: "Women's Yoga", href: "/special-programs#womens-yoga" },
  { label: "Meditation & Pranayama", href: "/yoga-programs#pranayama" },
  { label: "Foot Reflexology", href: "/fitness#foot-reflexology" },
  { label: "Weight Management", href: "/fitness#weight-management" },
  { label: "Marriage Counselling", href: "/special-programs#pre-marriage-counselling" },
];

export function Footer() {
  return (
    <footer className="bg-[#00052F] text-[#DBD4C6]">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#DBD4C6]/90">
              Holistic yoga, mindful fitness, personalised nutrition, and
              supportive counselling in Salem—helping individuals of every age
              build calm, healthy, sustainable lives.
            </p>
            <p className="font-editorial mt-5 text-base italic text-[#CCA146]">
              &ldquo;{BUSINESS.tagline}&rdquo;
            </p>

            {/* Follow Our Journey – Instagram, Facebook & YouTube */}
            <SocialPills
              heading="Follow Our Journey"
              theme="dark"
              className="mt-6"
            />
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2">
            <p className="font-editorial text-lg font-medium text-white">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#DBD4C6] transition-colors hover:text-[#CCA146]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="lg:col-span-3">
            <p className="font-editorial text-lg font-medium text-white">
              Programs
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PROGRAM_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#DBD4C6] transition-colors hover:text-[#CCA146]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <p className="font-editorial text-lg font-medium text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#CCA146]"
                  aria-hidden="true"
                />
                <a
                  href={BUSINESS.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed text-[#DBD4C6] transition-colors hover:text-white"
                >
                  {BUSINESS.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#CCA146]"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  {BUSINESS.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="text-[#DBD4C6] transition-colors hover:text-white"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 shrink-0 text-[#CCA146]"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-[#DBD4C6] transition-colors hover:text-white"
                >
                  {BUSINESS.email}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-[#CCA146]"
                  aria-hidden="true"
                />
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DBD4C6] transition-colors hover:text-[#CCA146]"
                >
                  WhatsApp: +91 97917 85007
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#DBD4C6]/80 sm:flex-row">
            <div className="flex flex-col items-center gap-1.5 sm:items-start">
              <p>
                &copy; 2026 VJ PRANA Health &amp; Wellness Studio. All Rights
                Reserved.
              </p>
              <p className="text-[#DBD4C6]/75">
                Crafted and digitally managed by{" "}
                <a
                  href="https://www.minmurasu.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#CCA146] underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  minmurasu.digital
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
