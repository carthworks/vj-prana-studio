import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const viewport: Viewport = {
  themeColor: "#F5F0E6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "VJ PRANA – Health & Wellness Studio",
  title: {
    default: "VJ PRANA | Yoga, Nutrition & Wellness Studio in Salem",
    template: "%s | VJ PRANA Salem",
  },
  description:
    "Discover yoga, fitness, personalised nutrition, meditation and holistic wellness programs at VJ PRANA Health & Wellness Studio in Salem. Online and offline classes available.",
  keywords: [
    "Yoga classes in Salem",
    "Yoga studio in Salem",
    "Online yoga classes",
    "Women's yoga classes",
    "Diet consultation in Salem",
    "Nutrition consultant in Salem",
    "Meditation and pranayama",
    "Personalised fitness and wellness",
    "Foot reflexology Salem",
    "Pre-marriage counselling Salem",
  ],
  authors: [{ name: "VJ PRANA Health & Wellness Studio" }],
  creator: "VJ PRANA Health & Wellness Studio",
  publisher: "VJ PRANA Health & Wellness Studio",
  category: "Health & Wellness",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.svg"],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "VJ PRANA – Health & Wellness Studio",
    title: "VJ PRANA | Yoga, Nutrition & Wellness Studio in Salem",
    description:
      "Discover yoga, fitness, personalised nutrition, meditation and holistic wellness programs at VJ PRANA Health & Wellness Studio in Salem. Online and offline classes available.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VJ PRANA | Yoga, Nutrition & Wellness Studio in Salem",
    description:
      "Yoga, fitness, personalised nutrition, meditation, women's yoga & holistic wellness in Salem. Online & offline classes available.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-[#676055] antialiased selection:bg-[#CF4520]/15 selection:text-[#00052F]">
        <StructuredData />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
