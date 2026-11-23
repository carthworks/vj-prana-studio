import { Hero } from "@/components/sections/Hero";
import { NewsTicker } from "@/components/sections/NewsTicker";
import { Audience } from "@/components/sections/Audience";
import { Programs } from "@/components/sections/Programs";
import { Nutrition } from "@/components/sections/Nutrition";
import { ModesSection } from "@/components/sections/ModesSection";
import { About } from "@/components/sections/About";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { getPublishedNewsItems } from "@/lib/newsStore";

export default async function HomePage() {
  const initialNews = await getPublishedNewsItems();

  return (
    <>
      <Hero />
      <NewsTicker initialItems={initialNews} />
      <Audience />
      <Programs />
      <Nutrition />
      <ModesSection />
      <About />
      <VideoShowcase />
      <FAQ />
      <Contact />
    </>
  );
}
