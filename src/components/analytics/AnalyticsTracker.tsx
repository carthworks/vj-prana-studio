"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsEventType } from "@/lib/analyticsStore";

const VISITOR_STORAGE_KEY = "vjprana_vid";
const SESSION_STORAGE_KEY = "vjprana_sid";
export const IGNORE_ANALYTICS_KEY = "vjprana_ignore_analytics";

function shouldIgnoreClient(): boolean {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host === "[::1]" ||
    host.endsWith(".localhost")
  ) {
    return true;
  }
  try {
    if (window.localStorage.getItem(IGNORE_ANALYTICS_KEY) === "1") {
      return true;
    }
  } catch {
    // ignore storage access errors
  }
  return false;
}

function generateId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`;
}

function getIds(): { visitorId: string; sessionId: string } {
  try {
    let visitorId = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!visitorId) {
      visitorId = generateId("v");
      window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
    }

    let sessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = generateId("s");
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }

    return { visitorId, sessionId };
  } catch {
    return {
      visitorId: generateId("v"),
      sessionId: generateId("s"),
    };
  }
}

function getUtmParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

function sendEvent(
  type: AnalyticsEventType,
  path: string,
  extra?: { label?: string; leadFrom?: string; includeReferrer?: boolean }
) {
  if (
    shouldIgnoreClient() ||
    !path ||
    path.startsWith("/analytics") ||
    path.startsWith("/admin")
  ) {
    return;
  }

  const { visitorId, sessionId } = getIds();
  const utm = extra?.includeReferrer ? getUtmParams() : {};

  const payload = JSON.stringify({
    type,
    path,
    visitorId,
    sessionId,
    referrer: extra?.includeReferrer ? document.referrer || undefined : undefined,
    ...utm,
    label: extra?.label,
    leadFrom: extra?.leadFrom,
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/track", blob);
      return;
    }
  } catch {
    // Fall through to fetch
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Never disrupt UX for analytics errors
  });
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedRef = useRef<string>("");

  // Track route pageviews
  useEffect(() => {
    if (!pathname || pathname.startsWith("/analytics") || pathname.startsWith("/admin")) {
      return;
    }

    const trackKey = `${pathname}${window.location.search}`;
    if (lastTrackedRef.current === trackKey) return;
    lastTrackedRef.current = trackKey;

    sendEvent("pageview", pathname, { includeReferrer: true });
  }, [pathname]);

  // Track key studio conversion clicks (WhatsApp, Phone, Email, Social, Contact CTA)
  useEffect(() => {
    if (!pathname || pathname.startsWith("/analytics") || pathname.startsWith("/admin")) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href) return;

      const lower = href.toLowerCase();
      const label = (anchor.textContent || anchor.getAttribute("aria-label") || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);

      // Detect which area/section of the page the lead click originated from
      let placement = "Page Content";
      if (anchor.closest("header")) {
        placement = "Header";
      } else if (anchor.closest("footer")) {
        placement = "Footer";
      } else if (
        window.getComputedStyle(anchor).position === "fixed" ||
        anchor.closest("[class*='fixed']")
      ) {
        placement = "Floating Button";
      } else {
        const section = anchor.closest("section");
        const heading = section?.querySelector("h1, h2")?.textContent?.trim();
        if (heading) {
          placement = heading.replace(/\s+/g, " ").slice(0, 50);
        } else if (section?.id) {
          placement = section.id;
        }
      }

      if (lower.includes("wa.me") || lower.includes("whatsapp.com")) {
        sendEvent("whatsapp_click", pathname, {
          label: label || "WhatsApp",
          leadFrom: `WhatsApp · ${placement}`,
        });
      } else if (lower.startsWith("tel:")) {
        sendEvent("phone_click", pathname, {
          label: label || href,
          leadFrom: `Phone · ${placement}`,
        });
      } else if (lower.startsWith("mailto:")) {
        sendEvent("email_click", pathname, {
          label: label || href,
          leadFrom: `Email · ${placement}`,
        });
      } else if (
        lower.includes("youtube.com") ||
        lower.includes("youtu.be") ||
        lower.includes("instagram.com") ||
        lower.includes("facebook.com")
      ) {
        const network = lower.includes("instagram.com")
          ? "Instagram"
          : lower.includes("facebook.com")
            ? "Facebook"
            : "YouTube";
        sendEvent("social_click", pathname, {
          label: label || href,
          leadFrom: `${network} · ${placement}`,
        });
      } else if (lower === "/contact" || lower.startsWith("/contact#")) {
        sendEvent("contact_cta", pathname, {
          label: label || "Contact CTA",
          leadFrom: `Contact CTA · ${placement}`,
        });
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
