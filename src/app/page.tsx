import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { Programs } from "@/components/sections/Programs";
import { Nutrition } from "@/components/sections/Nutrition";
import { SpecialPrograms } from "@/components/sections/SpecialPrograms";
import { ModesSection } from "@/components/sections/ModesSection";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Audience />
      <Programs />
      <Nutrition />
      <SpecialPrograms />
      <ModesSection />
      <About />
      <WhyChooseUs />
      <VideoShowcase />
      <Gallery />
      <FAQ />
      <Contact />
    </>
  );
}
