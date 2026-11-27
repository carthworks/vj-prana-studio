import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export type AnalyticsEventType =
  | "pageview"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "social_click"
  | "contact_cta"
  | "contact_submit";

export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  path: string;
  timestamp: string;
  visitorId: string;
  sessionId: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  device: DeviceType;
  browser: string;
  os: string;
  country?: string;
  city?: string;
  label?: string;
  leadFrom?: string;
  ip?: string;
}

export interface AnalyticsEventInput {
  type: AnalyticsEventType;
  path: string;
  visitorId: string;
  sessionId: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  device: DeviceType;
  browser: string;
  os: string;
  country?: string;
  city?: string;
  label?: string;
  leadFrom?: string;
  ip?: string;
}

export type AnalyticsRange = "24h" | "7d" | "30d" | "90d" | "all";
export type StorageMode = "kv" | "file" | "memory";

export interface TimeSeriesPoint {
  key: string;
  label: string;
  pageviews: number;
  visitors: number;
  conversions: number;
}

export interface BreakdownItem {
  name: string;
  count: number;
  share: number;
}

export interface TopPageItem {
  path: string;
  views: number;
  visitors: number;
  share: number;
}

export interface ActivityPageResult {
  items: AnalyticsEvent[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AnalyticsSummaryOptions {
  range?: AnalyticsRange;
  search?: string;
  eventType?: AnalyticsEventType | "all";
  page?: number;
  pageSize?: number;
  viewerIp?: string | null;
}

export interface AnalyticsSummary {
  range: AnalyticsRange;
  storageMode: StorageMode;
  generatedAt: string;
  totalEventsStored: number;
  viewerIp: string | null;
  viewerIpExcluded: boolean;
  excludedIps: string[];
  envExcludedIps: string[];
  kpis: {
    pageviews: number;
    uniqueVisitors: number;
    sessions: number;
    conversions: number;
    conversionRate: number;
    avgPagesPerSession: number;
    bounceRate: number;
  };
  conversionsBreakdown: {
    whatsapp: number;
    phone: number;
    email: number;
    contactSubmit: number;
    contactCta: number;
    social: number;
  };
  timeline: TimeSeriesPoint[];
  topPages: TopPageItem[];
  referrers: BreakdownItem[];
  utmSources: BreakdownItem[];
  devices: BreakdownItem[];
  browsers: BreakdownItem[];
  operatingSystems: BreakdownItem[];
  locations: BreakdownItem[];
  activity: ActivityPageResult;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "analytics.json");
const CONFIG_FILE_PATH = path.join(process.cwd(), "data", "analytics-config.json");
const KV_KEY = "vjprana:analytics:events";
const KV_CONFIG_KEY = "vjprana:analytics:config";
const MAX_STORED_EVENTS = 5000;

interface AnalyticsConfig {
  excludedIps: string[];
}

// In-memory fallbacks for read-only serverless environments when KV is not configured yet
let memoryEvents: AnalyticsEvent[] = [];
let memoryConfig: AnalyticsConfig = { excludedIps: [] };
let forceMemoryFallback = false;

function getKvConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

export function getAnalyticsStorageMode(): StorageMode {
  if (getKvConfig()) return "kv";
  if (forceMemoryFallback) return "memory";
  return "file";
}

export function normalizeIp(rawIp?: string | null): string | null {
  if (!rawIp) return null;
  // x-forwarded-for can contain comma-separated chain; first entry is original client
  const first = rawIp.split(",")[0]?.trim() ?? "";
  if (!first) return null;
  // Strip IPv4-mapped IPv6 prefix
  const cleaned = first.replace(/^::ffff:/i, "").trim();
  return cleaned || null;
}

export function extractClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
  ];
  for (const candidate of candidates) {
    const ip = normalizeIp(candidate);
    if (ip) return ip;
  }
  return null;
}

export function isLocalhostHost(host?: string | null): boolean {
  if (!host) return false;
  const lower = host.toLowerCase().trim();
  return (
    lower === "localhost" ||
    lower.startsWith("localhost:") ||
    lower === "127.0.0.1" ||
    lower.startsWith("127.0.0.1:") ||
    lower === "[::1]" ||
    lower.startsWith("[::1]:") ||
    lower === "::1"
  );
}

export function isLocalhostIp(ip?: string | null): boolean {
  const norm = normalizeIp(ip);
  if (!norm) return false;
  const lower = norm.toLowerCase();
  return (
    lower === "127.0.0.1" ||
    lower === "::1" ||
    lower === "0.0.0.0" ||
    lower === "localhost" ||
    lower.startsWith("127.")
  );
}

export function getEnvExcludedIps(): string[] {
  const raw = process.env.ANALYTICS_EXCLUDED_IPS?.trim();
  if (!raw) return [];
  return Array.from(
    new Set(
      raw
        .split(",")
        .map((s) => normalizeIp(s))
        .filter((s): s is string => Boolean(s))
    )
  );
}

async function readConfigFromKv(
  url: string,
  token: string
): Promise<AnalyticsConfig | null> {
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(KV_CONFIG_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | null };
    if (!data.result) return { excludedIps: [] };
    const parsed = JSON.parse(data.result) as Partial<AnalyticsConfig>;
    return {
      excludedIps: Array.isArray(parsed.excludedIps)
        ? parsed.excludedIps.filter((v): v is string => typeof v === "string")
        : [],
    };
  } catch {
    return null;
  }
}

async function writeConfigToKv(
  url: string,
  token: string,
  config: AnalyticsConfig
): Promise<boolean> {
  try {
    const res = await fetch(`${url}/set/${encodeURIComponent(KV_CONFIG_KEY)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(config)),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getAnalyticsConfig(): Promise<AnalyticsConfig> {
  const kv = getKvConfig();
  if (kv) {
    const kvConfig = await readConfigFromKv(kv.url, kv.token);
    if (kvConfig !== null) return kvConfig;
  }
  if (forceMemoryFallback) {
    return memoryConfig;
  }
  try {
    const raw = await fs.readFile(CONFIG_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AnalyticsConfig>;
    return {
      excludedIps: Array.isArray(parsed.excludedIps)
        ? parsed.excludedIps.filter((v): v is string => typeof v === "string")
        : [],
    };
  } catch {
    return memoryConfig;
  }
}

async function saveAnalyticsConfig(config: AnalyticsConfig): Promise<void> {
  const deduped: AnalyticsConfig = {
    excludedIps: Array.from(
      new Set(
        config.excludedIps
          .map((ip) => normalizeIp(ip))
          .filter((ip): ip is string => Boolean(ip))
      )
    ),
  };

  const kv = getKvConfig();
  if (kv) {
    const ok = await writeConfigToKv(kv.url, kv.token, deduped);
    if (ok) return;
  }

  try {
    await fs.mkdir(path.dirname(CONFIG_FILE_PATH), { recursive: true });
    await fs.writeFile(
      CONFIG_FILE_PATH,
      `${JSON.stringify(deduped, null, 2)}\n`,
      "utf8"
    );
    memoryConfig = deduped;
  } catch {
    forceMemoryFallback = true;
    memoryConfig = deduped;
  }
}

export async function addExcludedIp(ip: string): Promise<string[]> {
  const norm = normalizeIp(ip);
  if (!norm) return (await getAnalyticsConfig()).excludedIps;
  const cfg = await getAnalyticsConfig();
  if (!cfg.excludedIps.includes(norm)) {
    cfg.excludedIps.push(norm);
    await saveAnalyticsConfig(cfg);
  }
  return cfg.excludedIps;
}

export async function removeExcludedIp(ip: string): Promise<string[]> {
  const norm = normalizeIp(ip);
  const cfg = await getAnalyticsConfig();
  const next = cfg.excludedIps.filter((item) => item !== norm);
  await saveAnalyticsConfig({ excludedIps: next });
  return next;
}

export async function getAllExcludedIps(): Promise<{
  saved: string[];
  env: string[];
  combined: Set<string>;
}> {
  const cfg = await getAnalyticsConfig();
  const env = getEnvExcludedIps();
  return {
    saved: cfg.excludedIps,
    env,
    combined: new Set([...cfg.excludedIps, ...env]),
  };
}

export async function isIpExcluded(
  ip?: string | null,
  host?: string | null
): Promise<boolean> {
  if (isLocalhostHost(host) || isLocalhostIp(ip)) {
    return true;
  }
  const norm = normalizeIp(ip);
  if (!norm) return false;
  const { combined } = await getAllExcludedIps();
  return combined.has(norm);
}

async function readLocalEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as AnalyticsEvent[]) : [];
  } catch {
    return memoryEvents;
  }
}

async function readFromKv(
  url: string,
  token: string
): Promise<AnalyticsEvent[] | null> {
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(KV_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | null };
    if (!data.result) return [];
    const parsed = JSON.parse(data.result) as unknown;
    return Array.isArray(parsed) ? (parsed as AnalyticsEvent[]) : [];
  } catch {
    return null;
  }
}

async function writeToKv(
  url: string,
  token: string,
  events: AnalyticsEvent[]
): Promise<boolean> {
  try {
    const res = await fetch(`${url}/set/${encodeURIComponent(KV_KEY)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(events)),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const kv = getKvConfig();
  if (kv) {
    const kvEvents = await readFromKv(kv.url, kv.token);
    if (kvEvents !== null) return kvEvents;
  }
  if (forceMemoryFallback) {
    return memoryEvents;
  }
  return readLocalEvents();
}

async function persistEvents(events: AnalyticsEvent[]): Promise<void> {
  const trimmed = events.slice(-MAX_STORED_EVENTS);
  const kv = getKvConfig();
  if (kv) {
    const ok = await writeToKv(kv.url, kv.token, trimmed);
    if (ok) return;
  }

  try {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(
      DATA_FILE_PATH,
      `${JSON.stringify(trimmed)}\n`,
      "utf8"
    );
    memoryEvents = trimmed;
  } catch {
    forceMemoryFallback = true;
    memoryEvents = trimmed;
  }
}

export async function recordAnalyticsEvent(
  input: AnalyticsEventInput
): Promise<AnalyticsEvent> {
  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    type: input.type,
    path: normalizePath(input.path),
    timestamp: new Date().toISOString(),
    visitorId: input.visitorId.slice(0, 64),
    sessionId: input.sessionId.slice(0, 64),
    referrer: normalizeReferrer(input.referrer),
    utmSource: input.utmSource?.trim().slice(0, 80) || undefined,
    utmMedium: input.utmMedium?.trim().slice(0, 80) || undefined,
    utmCampaign: input.utmCampaign?.trim().slice(0, 80) || undefined,
    device: input.device,
    browser: input.browser.slice(0, 40),
    os: input.os.slice(0, 40),
    country: input.country?.trim().slice(0, 40) || undefined,
    city: input.city?.trim().slice(0, 60) || undefined,
    label: input.label?.trim().slice(0, 120) || undefined,
    leadFrom: input.leadFrom?.trim().slice(0, 140) || undefined,
    ip: normalizeIp(input.ip) ?? undefined,
  };

  const events = await getAllAnalyticsEvents();
  events.push(event);
  await persistEvents(events);
  return event;
}

export async function clearAnalyticsEvents(): Promise<void> {
  memoryEvents = [];
  await persistEvents([]);
}

export function normalizePath(rawPath: string): string {
  const cleaned = rawPath.split("?")[0]?.split("#")[0]?.trim() || "/";
  if (!cleaned.startsWith("/")) return `/${cleaned}`;
  if (cleaned.length > 1 && cleaned.endsWith("/")) {
    return cleaned.slice(0, -1);
  }
  return cleaned.slice(0, 200);
}

export function normalizeReferrer(rawRef?: string): string {
  if (!rawRef) return "Direct";
  const trimmed = rawRef.trim();
  if (!trimmed) return "Direct";
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    if (!host || host === "localhost" || host === "127.0.0.1") {
      return "Direct";
    }
    if (host.includes("google.")) return "Google";
    if (host.includes("bing.")) return "Bing";
    if (host.includes("duckduckgo.")) return "DuckDuckGo";
    if (host.includes("instagram.") || host === "l.instagram.com")
      return "Instagram";
    if (
      host.includes("facebook.") ||
      host === "l.facebook.com" ||
      host === "m.facebook.com"
    )
      return "Facebook";
    if (host.includes("youtube.") || host === "youtu.be") return "YouTube";
    if (host.includes("whatsapp.") || host === "wa.me") return "WhatsApp";
    if (host.includes("linkedin.")) return "LinkedIn";
    if (host === "t.co" || host.includes("twitter.") || host === "x.com")
      return "X / Twitter";
    return host;
  } catch {
    return "Direct";
  }
}

export function parseUserAgent(ua: string): {
  device: DeviceType;
  browser: string;
  os: string;
  isBot: boolean;
} {
  const lower = ua.toLowerCase();
  const isBot =
    /bot|crawler|spider|slurp|headless|lighthouse|pingdom|uptimerobot|vercel-screenshot|facebookexternalhit|whatsapp/i.test(
      ua
    );

  let device: DeviceType = "Desktop";
  if (/ipad|tablet|playbook|silk|(android(?!.*mobi))/i.test(ua)) {
    device = "Tablet";
  } else if (
    /mobile|iphone|ipod|android.*mobile|blackberry|opera mini|iemobile/i.test(
      ua
    )
  ) {
    device = "Mobile";
  }

  let browser = "Other";
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("opr/") || lower.includes("opera")) browser = "Opera";
  else if (lower.includes("chrome/") && !lower.includes("edg/"))
    browser = "Chrome";
  else if (lower.includes("safari/") && !lower.includes("chrome/"))
    browser = "Safari";
  else if (lower.includes("firefox/")) browser = "Firefox";

  let os = "Other";
  if (
    lower.includes("iphone") ||
    lower.includes("ipad") ||
    lower.includes("ios")
  ) {
    os = "iOS";
  } else if (lower.includes("android")) {
    os = "Android";
  } else if (lower.includes("windows")) {
    os = "Windows";
  } else if (lower.includes("mac os") || lower.includes("macintosh")) {
    os = "macOS";
  } else if (lower.includes("linux")) {
    os = "Linux";
  }

  return { device, browser, os, isBot };
}

function getRangeCutoff(range: AnalyticsRange, now: Date): number {
  const ms = now.getTime();
  switch (range) {
    case "24h":
      return ms - 24 * 60 * 60 * 1000;
    case "7d":
      return ms - 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return ms - 30 * 24 * 60 * 60 * 1000;
    case "90d":
      return ms - 90 * 24 * 60 * 60 * 1000;
    case "all":
      return 0;
  }
}

function toBreakdown(counts: Map<string, number>, limit = 8): BreakdownItem[] {
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      count,
      share: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
}

function buildTimeline(
  events: AnalyticsEvent[],
  range: AnalyticsRange,
  now: Date
): TimeSeriesPoint[] {
  const buckets = new Map<
    string,
    {
      label: string;
      pageviews: number;
      visitors: Set<string>;
      conversions: number;
    }
  >();

  if (range === "24h") {
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getUTCDate()).padStart(2, "0")}-${String(
        d.getUTCHours()
      ).padStart(2, "0")}`;
      const label = d.toLocaleTimeString("en-IN", {
        hour: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      buckets.set(key, {
        label,
        pageviews: 0,
        visitors: new Set(),
        conversions: 0,
      });
    }

    for (const ev of events) {
      const d = new Date(ev.timestamp);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getUTCDate()).padStart(2, "0")}-${String(
        d.getUTCHours()
      ).padStart(2, "0")}`;
      const bucket = buckets.get(key);
      if (!bucket) continue;
      if (ev.type === "pageview") {
        bucket.pageviews += 1;
        bucket.visitors.add(ev.visitorId);
      } else {
        bucket.conversions += 1;
      }
    }
  } else {
    const days =
      range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 30;

    if (range === "all" && events.length > 0) {
      const firstTs = Math.min(
        ...events.map((e) => new Date(e.timestamp).getTime())
      );
      const spanDays = Math.min(
        90,
        Math.max(
          7,
          Math.ceil((now.getTime() - firstTs) / (24 * 60 * 60 * 1000)) + 1
        )
      );
      for (let i = spanDays - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        });
        buckets.set(key, {
          label,
          pageviews: 0,
          visitors: new Set(),
          conversions: 0,
        });
      }
    } else {
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        });
        buckets.set(key, {
          label,
          pageviews: 0,
          visitors: new Set(),
          conversions: 0,
        });
      }
    }

    for (const ev of events) {
      const key = ev.timestamp.slice(0, 10);
      const bucket = buckets.get(key);
      if (!bucket) continue;
      if (ev.type === "pageview") {
        bucket.pageviews += 1;
        bucket.visitors.add(ev.visitorId);
      } else {
        bucket.conversions += 1;
      }
    }
  }

  return Array.from(buckets.entries()).map(([key, b]) => ({
    key,
    label: b.label,
    pageviews: b.pageviews,
    visitors: b.visitors.size,
    conversions: b.conversions,
  }));
}

export async function getAnalyticsSummary(
  options: AnalyticsSummaryOptions = {}
): Promise<AnalyticsSummary> {
  const range = options.range ?? "30d";
  const search = (options.search ?? "").trim().toLowerCase();
  const eventType = options.eventType ?? "all";
  const pageSize = Math.min(50, Math.max(5, options.pageSize ?? 15));
  const requestedPage = Math.max(1, options.page ?? 1);
  const viewerIp = normalizeIp(options.viewerIp);

  const [allEvents, exclusions] = await Promise.all([
    getAllAnalyticsEvents(),
    getAllExcludedIps(),
  ]);

  const now = new Date();
  const cutoff = getRangeCutoff(range, now);

  // Exclude localhost & any excluded IPs from all analytics metrics and activity
  const validEvents = allEvents.filter((ev) => {
    if (ev.ip && (isLocalhostIp(ev.ip) || exclusions.combined.has(ev.ip))) {
      return false;
    }
    return true;
  });

  const filtered = validEvents.filter(
    (ev) => new Date(ev.timestamp).getTime() >= cutoff
  );

  const pageviews = filtered.filter((ev) => ev.type === "pageview");
  const conversionEvents = filtered.filter((ev) => ev.type !== "pageview");

  const uniqueVisitorSet = new Set<string>();
  const sessionPageCount = new Map<string, number>();
  const pageStats = new Map<string, { views: number; visitors: Set<string> }>();
  const referrerCounts = new Map<string, number>();
  const utmCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const browserCounts = new Map<string, number>();
  const osCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();

  for (const ev of pageviews) {
    uniqueVisitorSet.add(ev.visitorId);
    sessionPageCount.set(
      ev.sessionId,
      (sessionPageCount.get(ev.sessionId) ?? 0) + 1
    );

    const existing = pageStats.get(ev.path) ?? { views: 0, visitors: new Set() };
    existing.views += 1;
    existing.visitors.add(ev.visitorId);
    pageStats.set(ev.path, existing);

    referrerCounts.set(
      ev.referrer || "Direct",
      (referrerCounts.get(ev.referrer || "Direct") ?? 0) + 1
    );
    if (ev.utmSource) {
      const utmLabel = ev.utmCampaign
        ? `${ev.utmSource} / ${ev.utmCampaign}`
        : ev.utmSource;
      utmCounts.set(utmLabel, (utmCounts.get(utmLabel) ?? 0) + 1);
    }

    deviceCounts.set(ev.device, (deviceCounts.get(ev.device) ?? 0) + 1);
    browserCounts.set(ev.browser, (browserCounts.get(ev.browser) ?? 0) + 1);
    osCounts.set(ev.os, (osCounts.get(ev.os) ?? 0) + 1);

    if (ev.country) {
      const loc = ev.city ? `${ev.city}, ${ev.country}` : ev.country;
      locationCounts.set(loc, (locationCounts.get(loc) ?? 0) + 1);
    }
  }

  const conversionsBreakdown = {
    whatsapp: 0,
    phone: 0,
    email: 0,
    contactSubmit: 0,
    contactCta: 0,
    social: 0,
  };

  for (const ev of conversionEvents) {
    uniqueVisitorSet.add(ev.visitorId);
    switch (ev.type) {
      case "whatsapp_click":
        conversionsBreakdown.whatsapp += 1;
        break;
      case "phone_click":
        conversionsBreakdown.phone += 1;
        break;
      case "email_click":
        conversionsBreakdown.email += 1;
        break;
      case "contact_submit":
        conversionsBreakdown.contactSubmit += 1;
        break;
      case "contact_cta":
        conversionsBreakdown.contactCta += 1;
        break;
      case "social_click":
        conversionsBreakdown.social += 1;
        break;
    }
  }

  const totalSessions = sessionPageCount.size;
  const singlePageSessions = Array.from(sessionPageCount.values()).filter(
    (c) => c === 1
  ).length;
  const bounceRate =
    totalSessions > 0
      ? Math.round((singlePageSessions / totalSessions) * 100)
      : 0;
  const avgPagesPerSession =
    totalSessions > 0
      ? Number((pageviews.length / totalSessions).toFixed(1))
      : 0;

  const leadConversions =
    conversionsBreakdown.whatsapp +
    conversionsBreakdown.phone +
    conversionsBreakdown.email +
    conversionsBreakdown.contactSubmit;

  const conversionRate =
    uniqueVisitorSet.size > 0
      ? Number(((leadConversions / uniqueVisitorSet.size) * 100).toFixed(1))
      : 0;

  const totalViews = pageviews.length;
  const topPages: TopPageItem[] = Array.from(pageStats.entries())
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 12)
    .map(([p, stats]) => ({
      path: p,
      views: stats.views,
      visitors: stats.visitors.size,
      share: totalViews > 0 ? Math.round((stats.views / totalViews) * 100) : 0,
    }));

  // Filter & paginate Recent Activity (newest first)
  let activityMatches = [...filtered].reverse();
  if (eventType !== "all") {
    activityMatches = activityMatches.filter((ev) => ev.type === eventType);
  }
  if (search) {
    activityMatches = activityMatches.filter((ev) => {
      const haystack = [
        ev.type,
        ev.path,
        ev.label ?? "",
        ev.leadFrom ?? "",
        ev.referrer ?? "",
        ev.utmSource ?? "",
        ev.utmCampaign ?? "",
        ev.device,
        ev.browser,
        ev.os,
        ev.city ?? "",
        ev.country ?? "",
        ev.ip ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }

  const activityTotal = activityMatches.length;
  const totalPages = Math.max(1, Math.ceil(activityTotal / pageSize));
  const safePage = Math.min(requestedPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const activityItems = activityMatches.slice(startIdx, startIdx + pageSize);

  const viewerIpExcluded = viewerIp
    ? isLocalhostIp(viewerIp) || exclusions.combined.has(viewerIp)
    : false;

  return {
    range,
    storageMode: getAnalyticsStorageMode(),
    generatedAt: now.toISOString(),
    totalEventsStored: validEvents.length,
    viewerIp,
    viewerIpExcluded,
    excludedIps: exclusions.saved,
    envExcludedIps: exclusions.env,
    kpis: {
      pageviews: totalViews,
      uniqueVisitors: uniqueVisitorSet.size,
      sessions: totalSessions,
      conversions: leadConversions,
      conversionRate,
      avgPagesPerSession,
      bounceRate,
    },
    conversionsBreakdown,
    timeline: buildTimeline(filtered, range, now),
    topPages,
    referrers: toBreakdown(referrerCounts, 8),
    utmSources: toBreakdown(utmCounts, 8),
    devices: toBreakdown(deviceCounts, 4),
    browsers: toBreakdown(browserCounts, 6),
    operatingSystems: toBreakdown(osCounts, 6),
    locations: toBreakdown(locationCounts, 8),
    activity: {
      items: activityItems,
      total: activityTotal,
      page: safePage,
      pageSize,
      totalPages,
    },
  };
}
