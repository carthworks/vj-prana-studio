import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  clearAnalyticsEvents,
  extractClientIp,
  getAnalyticsSummary,
  type AnalyticsEventType,
  type AnalyticsRange,
} from "@/lib/analyticsStore";

const VALID_RANGES: AnalyticsRange[] = ["24h", "7d", "30d", "90d", "all"];
const VALID_EVENT_TYPES: (AnalyticsEventType | "all")[] = [
  "all",
  "pageview",
  "whatsapp_click",
  "phone_click",
  "email_click",
  "social_click",
  "contact_cta",
  "contact_submit",
];

export async function GET(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawRange = searchParams.get("range") ?? "30d";
  const range: AnalyticsRange = VALID_RANGES.includes(rawRange as AnalyticsRange)
    ? (rawRange as AnalyticsRange)
    : "30d";

  const rawEventType = searchParams.get("eventType") ?? "all";
  const eventType: AnalyticsEventType | "all" = VALID_EVENT_TYPES.includes(
    rawEventType as AnalyticsEventType | "all"
  )
    ? (rawEventType as AnalyticsEventType | "all")
    : "all";

  const search = searchParams.get("q") ?? "";
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
  const pageSize =
    Number.parseInt(searchParams.get("pageSize") ?? "15", 10) || 15;

  const viewerIp = extractClientIp(request.headers);

  const summary = await getAnalyticsSummary({
    range,
    search,
    eventType,
    page,
    pageSize,
    viewerIp,
  });

  return NextResponse.json(summary, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function DELETE() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await clearAnalyticsEvents();
  return NextResponse.json({ ok: true });
}
