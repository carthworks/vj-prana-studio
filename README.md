# VJ PRANA – Health & Wellness Studio Website

Production-ready Next.js (App Router), React, TypeScript (strict mode), and Tailwind CSS website for **VJ PRANA – Yoga, Nutrition, Health & Wellness Studio** in Salem, Tamil Nadu.

> **Breathe Better. Move Better. Live Better.**

## Tech Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + custom brand palette & semantic CSS variables
- **Icons:** Lucide React
- **Animations:** Framer Motion (with `prefers-reduced-motion` support)
- **Forms & Validation:** React Hook Form + Zod + `@hookform/resolvers`
- **Image Optimization:** `next/image` (AVIF / WebP, responsive `sizes`, above-the-fold `priority`)
- **SEO:** Next.js Metadata API, Open Graph, dynamic `sitemap.xml`, `robots.txt`, and `HealthAndBeautyBusiness` JSON-LD structured data

## Project Structure

```text
src/
  app/
    api/contact/route.ts       # Validated server-side enquiry route (Resend or Webhook)
    about/page.tsx             # Brand story, leadership profiles & community outreach
    yoga-programs/page.tsx     # Traditional, therapeutic, pranayama, kids & senior yoga
    nutrition/page.tsx         # Diet consultation & Geetha Arunkumar profile
    fitness/page.tsx           # Strength, power yoga, weight management & foot reflexology
    special-programs/page.tsx  # Women's yoga, pre/post-marriage & yoga psychology counselling
    contact/page.tsx           # Salem studio address, map, WhatsApp, phone & enquiry form
    privacy-policy/page.tsx    # Privacy Policy
    terms/page.tsx             # Terms & Conditions
    layout.tsx                 # Root layout, fonts (Lora + Inter), metadata & JSON-LD
    page.tsx                   # Full editorial homepage
    globals.css                # Design tokens, semantic variables & accessible focus styles
    sitemap.ts                 # XML sitemap
    robots.ts                  # robots.txt
  components/
    layout/                    # Header, MobileMenu, Footer, PageBanner
    sections/                  # Hero, Audience, Programs, Nutrition, SpecialPrograms,
                               # ModesSection, About, WhyChooseUs, Gallery, FAQ, Contact, ContactForm
    seo/                       # StructuredData (LocalBusiness JSON-LD)
    ui/                        # Button, Logo, SectionHeading, ProgramCard, MotionPrimitives, WhatsAppButton
  lib/
    constants.ts               # Verified studio data, programs, team, gallery & FAQs
    validation.ts              # Zod schema for contact form
    utils.ts                   # Class merging, WhatsApp & mailto builders
public/
  images/                      # Original studio assets + editorial photography
```

## Quick Start (Fresh Scaffolding Reference)

If creating a fresh project from scratch:

```bash
npx create-next-app@latest vj-prana-website --typescript --tailwind --eslint --app --src-dir
cd vj-prana-website
npm install lucide-react framer-motion react-hook-form zod @hookform/resolvers
npm run dev
```

## Running This Project Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and configure your environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables (`.env.local`)

See `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://vjpranastudio.com

# Option 1: Resend Email API (recommended)
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL="VJ PRANA Website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=hello@vjpranastudio.com

# Option 2: Custom Webhook (Formspree / Make / Zapier / n8n / CRM)
CONTACT_WEBHOOK_URL=
CONTACT_WEBHOOK_SECRET=
```

### Contact Form Integration Behaviour

The contact form submits to `POST /api/contact` with strict Zod validation:
- When **`RESEND_API_KEY`** is configured, enquiries are delivered directly via the Resend Email API to `CONTACT_TO_EMAIL` (`hello@vjpranastudio.com`).
- Alternatively, when **`CONTACT_WEBHOOK_URL`** is configured, enquiries are forwarded as JSON to your webhook endpoint.
- If neither environment variable is configured yet, the API honestly returns HTTP `503` (`NOT_CONFIGURED`)—never showing a fake success message—and the UI immediately provides pre-filled **WhatsApp** (`+91 97917 85007`) and **Email** (`mailto:hello@vjpranastudio.com`) buttons containing the visitor's validated enquiry details.

### News & Events Ticker Admin Panel (`/admin/news`)

- Visit `/admin/news` (or click the **Manage** lock button in the homepage ticker bar) to add, edit, reorder, hide, or delete news & events with images.
- Set `NEWS_ADMIN_PASSWORD` in `.env.local` (and in Vercel Environment Variables before deploying). In local development only, if unset, the temporary default password is `vjprana2026`.
- Locally and on Node servers, items persist in `data/news.json` and uploaded photos save to `public/images/news/`.
- On serverless deployments (such as Vercel), add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or Vercel KV) so updates persist across deployments.

## Build & Production Commands

```bash
# TypeScript check
npm run typecheck

# Lint check
npm run lint

# Production build
npm run build

# Start production server
npm start
```

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Keep the default **Next.js** framework preset (`npm run build`).
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` (e.g., `https://vjpranastudio.com`)
   - `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` (or `CONTACT_WEBHOOK_URL`)
5. Click **Deploy**.
6. Once deployed, verify `/sitemap.xml`, `/robots.txt`, and submit a test enquiry on `/contact`.
