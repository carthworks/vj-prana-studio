import { BUSINESS, SITE_URL, TEAM_PROFILES } from "@/lib/constants";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.fullName,
        description:
          "Holistic yoga, fitness, personalised nutrition, pranayama, meditation, and counselling at VJ PRANA Health & Wellness Studio in Salem.",
        inLanguage: "en-IN",
        publisher: {
          "@id": `${SITE_URL}/#business`,
        },
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS.fullName,
        alternateName: BUSINESS.name,
        slogan: BUSINESS.tagline,
        description:
          "Discover personalised yoga, movement, flexibility, endurance, nutrition, and holistic wellness programs at VJ PRANA Health & Wellness Studio in Salem. Weekday online classes (4:45 AM – 11:00 AM & 5:00 PM – 8:00 PM, 1 hr 15 min Mon–Fri, ₹3,000/month) and offline Salem studio sessions available.",
        priceRange: "₹3,000/month",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: [
          `${SITE_URL}/images/hero-wellness.jpg`,
          `${SITE_URL}/images/prana01.jpg`,
          `${SITE_URL}/images/nutricion.jpg`,
        ],
        telephone: "+91-97917-85007",
        email: BUSINESS.email,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-97917-85007",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["English", "Tamil"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-97902-38264",
            contactType: "reservations",
            areaServed: "IN",
            availableLanguage: ["English", "Tamil"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.streetAddress,
          addressLocality: BUSINESS.city,
          addressRegion: BUSINESS.state,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.country,
        },
        hasMap: BUSINESS.mapsDirectionsUrl,
        areaServed: [
          { "@type": "City", name: "Salem" },
          { "@type": "State", name: "Tamil Nadu" },
          { "@type": "Country", name: "India" },
        ],
        employee: [
          {
            "@type": "Person",
            name: TEAM_PROFILES.arun.name,
            jobTitle: TEAM_PROFILES.arun.role,
          },
          {
            "@type": "Person",
            name: TEAM_PROFILES.geetha.name,
            jobTitle: TEAM_PROFILES.geetha.role,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Holistic Wellness Programs",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Yoga & Therapeutic Yoga",
                url: `${SITE_URL}/yoga-programs`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pranayama & Guided Meditation",
                url: `${SITE_URL}/yoga-programs#pranayama`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Strength Training, Power Yoga & Weight Management",
                url: `${SITE_URL}/fitness`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Personalised Nutrition & Diet Consultation",
                url: `${SITE_URL}/nutrition`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Women-Only Yoga Batches",
                url: `${SITE_URL}/special-programs#womens-yoga`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Foot Reflexology",
                url: `${SITE_URL}/fitness#foot-reflexology`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pre-Marriage & Post-Marriage Counselling",
                url: `${SITE_URL}/special-programs#pre-marriage-counselling`,
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
