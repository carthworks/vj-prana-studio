import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.fullName,
    short_name: BUSINESS.name,
    description:
      "Holistic yoga, fitness, personalised nutrition, meditation, women's yoga, and counselling in Salem, Tamil Nadu. Online and offline classes available.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0E6",
    theme_color: "#00052F",
    lang: "en-IN",
    categories: ["health", "fitness", "lifestyle", "wellness"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
