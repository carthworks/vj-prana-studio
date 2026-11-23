import { z } from "zod";

export const NEWS_CATEGORIES = [
  "Event",
  "New Batch",
  "Workshop",
  "Announcement",
  "Nutrition",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

const safeUrlSchema = z
  .string()
  .trim()
  .max(500, "URL is too long.")
  .refine(
    (val) =>
      val === "" ||
      val.startsWith("/") ||
      val.startsWith("https://") ||
      val.startsWith("http://"),
    "Link must start with '/', 'https://', or 'http://'."
  );

const safeImageSchema = z
  .string()
  .trim()
  .min(1, "Please choose or upload an image.")
  .max(500, "Image path or URL is too long.")
  .refine(
    (val) =>
      val.startsWith("/images/") ||
      val.startsWith("https://") ||
      val.startsWith("http://"),
    "Image must be a studio image path (/images/...) or a valid http(s) image URL."
  );

export const newsItemInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(140, "Title must be under 140 characters."),
  category: z.enum(NEWS_CATEGORIES),
  date: z
    .string()
    .trim()
    .min(2, "Please provide a date or timing label.")
    .max(60, "Date label is too long."),
  summary: z
    .string()
    .trim()
    .max(400, "Description must be under 400 characters.")
    .default(""),
  image: safeImageSchema,
  linkUrl: safeUrlSchema.default(""),
  linkLabel: z.string().trim().max(40, "Button label is too long.").default(""),
  active: z.boolean().default(true),
});

export type NewsItemInput = z.infer<typeof newsItemInputSchema>;

export interface NewsItem extends NewsItemInput {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export const NEWS_PRESET_IMAGES = [
  { label: "Studio Yoga", path: "/images/prana01.jpg" },
  { label: "Yoga Day Event", path: "/images/events01.jpeg" },
  { label: "Kids Aerial Yoga", path: "/images/hanging02.jpg" },
  { label: "Geetha Arunkumar", path: "/images/geetha-arunkumar.jpg" },
  { label: "Mr. Arun Kumar", path: "/images/arun-director.jpg" },
  { label: "Nutrition Bowls", path: "/images/nutrition-editorial.jpg" },
  { label: "Pranayama Calm", path: "/images/meditation-breath.jpg" },
  { label: "Community Runners", path: "/images/runners.jpg" },
] as const;
