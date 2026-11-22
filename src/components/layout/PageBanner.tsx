import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageBannerProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
  canonicalPath?: string;
}

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  canonicalPath,
}: PageBannerProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumb,
        ...(canonicalPath ? { item: `${SITE_URL}${canonicalPath}` } : {}),
      },
    ],
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E4DED4] bg-[#F5F0E6] py-16 sm:py-22">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#CCA146]/12 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#CF4520]/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium text-[#676055]"
        >
          <Link href="/" className="transition-colors hover:text-[#CF4520]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[#00052F]" aria-current="page">
            {breadcrumb}
          </span>
        </nav>

        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
        />
      </div>
    </section>
  );
}
