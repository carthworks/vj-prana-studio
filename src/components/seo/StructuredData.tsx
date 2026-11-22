import { BUSINESS, SITE_URL } from "@/lib/constants";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: BUSINESS.fullName,
    description:
      "Discover yoga, fitness, personalised nutrition, meditation, women's yoga, foot reflexology, and holistic wellness programs at VJ PRANA Health & Wellness Studio in Salem. Online and offline classes available.",
    url: SITE_URL,
    telephone: ["+91-97917-85007", "+91-97902-38264"],
    email: BUSINESS.email,
    image: `${SITE_URL}/images/hero-wellness.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: [
      { "@type": "City", name: "Salem" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Place", name: "Online Worldwide" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Holistic Wellness Programs",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Yoga & Therapeutic Yoga" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pranayama & Meditation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strength, Power Yoga & Fitness" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personalised Nutrition & Diet Consultation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Women-Only Yoga Batches" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foot Reflexology" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Marriage & Post-Marriage Counselling" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
