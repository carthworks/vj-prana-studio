import { NextResponse } from "next/server";
import { z } from "zod";
import {
  extractClientIp,
  isIpExcluded,
  normalizePath,
  parseUserAgent,
  recordAnalyticsEvent,
} from "@/lib/analyticsStore";

const trackEventSchema = z.object({
  type: z.enum([
    "pageview",
    "whatsapp_click",
    "phone_click",
    "email_click",
    "social_click",
    "contact_cta",
    "contact_submit",
  ]),
  path: z.string().min(1).max(300),
  visitorId: z.string().min(4).max(64),
  sessionId: z.string().min(4).max(64),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(80).optional(),
  label: z.string().max(120).optional(),
  leadFrom: z.string().max(140).optional(),
});

export async function POST(request: Request) {
  const host = request.headers.get("host");
  const clientIp = extractClientIp(request.headers);

  // Exclude localhost and configured/saved laptop IPs
  if (await isIpExcluded(clientIp, host)) {
    return new NextResponse(null, { status: 204 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  const { device, browser, os, isBot } = parseUserAgent(ua);
  if (isBot) {
    return new NextResponse(null, { status: 204 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = trackEventSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const cleanPath = normalizePath(parsed.data.path);
  // Never track internal admin/analytics pages
  if (cleanPath.startsWith("/analytics") || cleanPath.startsWith("/admin")) {
    return new NextResponse(null, { status: 204 });
  }

  // Vercel automatically provides geo headers in production
  const country = request.headers.get("x-vercel-ip-country") ?? undefined;
  const rawCity = request.headers.get("x-vercel-ip-city");
  let city: string | undefined;
  if (rawCity) {
    try {
      city = decodeURIComponent(rawCity);
    } catch {
      city = rawCity;
    }
  }

  // Strip internal self-referrals
  let referrer = parsed.data.referrer;
  if (referrer && host) {
    try {
      const refHost = new URL(referrer).host;
      if (refHost === host) {
        referrer = undefined;
      }
    } catch {
      // ignore invalid referrer
    }
  }

  await recordAnalyticsEvent({
    ...parsed.data,
    path: cleanPath,
    referrer,
    device,
    browser,
    os,
    country,
    city,
    ip: clientIp ?? undefined,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
