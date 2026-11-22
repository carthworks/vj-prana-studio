import { z } from "zod";
import { PROGRAM_OPTIONS } from "./constants";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .regex(/^[+\d\s()-]+$/, "Phone number may only contain digits, +, spaces, or hyphens."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  program: z.enum(PROGRAM_OPTIONS, {
    errorMap: () => ({ message: "Please select a program you are interested in." }),
  }),
  preferredMode: z.enum(["Online", "Offline", "Either / Not Sure"], {
    errorMap: () => ({ message: "Please choose your preferred mode." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please share a brief note about your goals or enquiry (at least 10 characters).")
    .max(1500, "Message must be under 1500 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
