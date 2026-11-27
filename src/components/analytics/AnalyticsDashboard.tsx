"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Monitor,
  MousePointerClick,
  Newspaper,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Tablet,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type {
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsRange,
  AnalyticsSummary,
  BreakdownItem,
} from "@/lib/analyticsStore";
import { IGNORE_ANALYTICS_KEY } from "./AnalyticsTracker";

const RANGES: { value: AnalyticsRange; label: string }[] = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
];

const PAGE_LABELS: Record<string, string> = {
  "/": "Homepage",
  "/about": "About & Founders",
  "/yoga-programs": "Yoga Programs",
  "/nutrition": "Nutrition & Diet",
  "/fitness": "Fitness & Reflexology",
  "/special-programs": "Special Programs",
  "/contact": "Contact & Booking",
  "/privacy-policy": "Privacy Policy",
  "/terms": "Terms & Conditions",
};

const EVENT_BADGE_MAP: Record<
  AnalyticsEventType,
  { label: string; className: string }
> = {
  pageview: {
    label: "Pageview",
    className: "bg-[#00052F]/8 text-[#00052F]",
  },
  whatsapp_click: {
    label: "WhatsApp",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  phone_click: {
    label: "Phone Call",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  email_click: {
    label: "Email",
    className: "bg-amber-50 text-amber-800 border border-amber-200",
  },
  contact_submit: {
    label: "Enquiry Sent",
    className: "bg-[#CF4520]/12 text-[#CF4520] border border-[#CF4520]/30",
  },
  contact_cta: {
    label: "Contact CTA",
    className: "bg-[#F5F0E6] text-[#8C6A1F] border border-[#CCA146]/40",
  },
  social_click: {
    label: "Social / Video",
    className: "bg-purple-50 text-purple-700 border border-purple-200",
  },
};

function getLeadOrigin(ev: AnalyticsEvent): string | null {
  if (ev.type === "pageview") return null;
  if (ev.leadFrom) return ev.leadFrom;
  const pageName = PAGE_LABELS[ev.path] ?? ev.path;
  switch (ev.type) {
    case "whatsapp_click":
      return `WhatsApp · ${pageName}`;
    case "phone_click":
      return `Phone · ${pageName}`;
    case "email_click":
      return `Email · ${pageName}`;
    case "contact_submit":
      return ev.label ? `Contact Form · ${ev.label}` : "Contact Form";
    case "contact_cta":
      return `Contact CTA · ${pageName}`;
    case "social_click":
      return `Social · ${pageName}`;
  }
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

function BreakdownCard({
  title,
  subtitle,
  items,
  emptyText,
}: {
  title: string;
  subtitle?: string;
  items: BreakdownItem[];
  emptyText: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-editorial text-lg font-medium text-[#00052F]">
          {title}
        </h2>
        {subtitle && <span className="text-xs text-[#676055]">{subtitle}</span>}
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-[#676055]/80">{emptyText}</p>
      ) : (
        <div className="mt-5 space-y-3.5">
          {items.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium text-[#28231E]">
                  {item.name}
                </span>
                <span className="shrink-0 tabular-nums text-xs text-[#676055]">
                  <strong className="font-semibold text-[#00052F]">
                    {formatNumber(item.count)}
                  </strong>{" "}
                  ({item.share}%)
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F5F0E6]">
                <div
                  className="h-full rounded-full bg-[#00052F] transition-all duration-300"
                  style={{ width: `${Math.max(item.share, 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AnalyticsDashboard() {
  // Auth state (reuses /api/admin/auth)
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [usingDevFallback, setUsingDevFallback] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard state
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [chartMetric, setChartMetric] = useState<
    "pageviews" | "visitors" | "conversions"
  >("pageviews");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  // Recent Activity search + filter + pagination
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<
    AnalyticsEventType | "all"
  >("all");
  const [activityPage, setActivityPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // IP & browser exclusion controls
  const [customIpInput, setCustomIpInput] = useState("");
  const [savingExclusion, setSavingExclusion] = useState(false);
  const [browserIgnored, setBrowserIgnored] = useState(false);

  useEffect(() => {
    try {
      setBrowserIgnored(
        window.localStorage.getItem(IGNORE_ANALYTICS_KEY) === "1"
      );
    } catch {
      setBrowserIgnored(false);
    }
  }, []);

  // Debounce search input and reset to page 1
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setActivityPage(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth", { cache: "no-store" });
      const data = (await res.json()) as {
        authenticated?: boolean;
        configured?: boolean;
        usingDevFallback?: boolean;
      };
      setAuthenticated(Boolean(data.authenticated));
      setConfigured(data.configured !== false);
      setUsingDevFallback(Boolean(data.usingDevFallback));
    } catch {
      setAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        range,
        eventType: eventTypeFilter,
        page: String(activityPage),
        pageSize: String(pageSize),
      });
      if (debouncedSearch) {
        params.set("q", debouncedSearch);
      }

      const res = await fetch(`/api/analytics/stats?${params.toString()}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        throw new Error("Could not load analytics data.");
      }
      const data = (await res.json()) as AnalyticsSummary;
      setSummary(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }, [range, eventTypeFilter, activityPage, pageSize, debouncedSearch]);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authenticated) {
      void fetchStats();
    }
  }, [authenticated, fetchStats]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as {
        authenticated?: boolean;
        message?: string;
      };
      if (!res.ok || !data.authenticated) {
        setAuthError(data.message || "Incorrect password.");
        return;
      }
      setPassword("");
      setAuthenticated(true);
      // Automatically exclude this owner browser on sign-in so laptop visits aren't counted
      try {
        window.localStorage.setItem(IGNORE_ANALYTICS_KEY, "1");
        setBrowserIgnored(true);
      } catch {
        // ignore storage errors
      }
    } catch {
      setAuthError("Unable to reach the server. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setSummary(null);
  };

  const handleExcludeCurrentIp = async () => {
    setSavingExclusion(true);
    try {
      const res = await fetch("/api/analytics/exclusions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: true }),
      });
      if (res.ok) {
        try {
          window.localStorage.setItem(IGNORE_ANALYTICS_KEY, "1");
          setBrowserIgnored(true);
        } catch {
          // ignore
        }
        await fetchStats();
      }
    } finally {
      setSavingExclusion(false);
    }
  };

  const handleAddCustomIp = async (e: FormEvent) => {
    e.preventDefault();
    const ip = customIpInput.trim();
    if (!ip) return;
    setSavingExclusion(true);
    try {
      const res = await fetch("/api/analytics/exclusions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      if (res.ok) {
        setCustomIpInput("");
        await fetchStats();
      }
    } finally {
      setSavingExclusion(false);
    }
  };

  const handleRemoveExcludedIp = async (ip: string) => {
    setSavingExclusion(true);
    try {
      const res = await fetch(
        `/api/analytics/exclusions?ip=${encodeURIComponent(ip)}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        await fetchStats();
      }
    } finally {
      setSavingExclusion(false);
    }
  };

  const handleToggleBrowserIgnore = () => {
    try {
      if (browserIgnored) {
        window.localStorage.removeItem(IGNORE_ANALYTICS_KEY);
        setBrowserIgnored(false);
      } else {
        window.localStorage.setItem(IGNORE_ANALYTICS_KEY, "1");
        setBrowserIgnored(true);
      }
    } catch {
      // ignore
    }
  };

  const handleClearData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently clear all recorded analytics events?"
      )
    ) {
      return;
    }
    setClearing(true);
    try {
      const res = await fetch("/api/analytics/stats", { method: "DELETE" });
      if (res.ok) {
        setActivityPage(1);
        await fetchStats();
      }
    } finally {
      setClearing(false);
    }
  };

  const handleExportCsv = () => {
    if (!summary) return;
    const rows = [
      ["Date / Period", "Pageviews", "Unique Visitors", "Conversions"],
      ...summary.timeline.map((pt) => [
        pt.key,
        String(pt.pageviews),
        String(pt.visitors),
        String(pt.conversions),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vj-prana-analytics-${summary.range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartMax = useMemo(() => {
    if (!summary || summary.timeline.length === 0) return 1;
    return Math.max(1, ...summary.timeline.map((pt) => pt[chartMetric]));
  }, [summary, chartMetric]);

  if (!authChecked) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center bg-[#F5F0E6]/40">
        <Loader2
          className="h-7 w-7 animate-spin text-[#CF4520]"
          aria-label="Loading"
        />
      </div>
    );
  }

  // Owner Sign-In Gate
  if (!authenticated) {
    return (
      <section className="bg-[#F5F0E6]/50 py-16 sm:py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-3xl border border-[#E4DED4] bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00052F] text-[#CCA146]">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6A1F]">
                  Private Dashboard
                </p>
                <h1 className="font-editorial text-2xl font-medium text-[#00052F]">
                  Web Analytics
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#676055]">
              Sign in with your VJ PRANA studio admin password to view website
              traffic, top pages, visitor devices, and lead conversions.
            </p>

            {!configured && (
              <div className="mt-5 rounded-2xl border border-[#CF4520]/35 bg-[#CF4520]/8 p-4 text-xs leading-relaxed text-[#992C10]">
                <strong>Setup needed:</strong> Set{" "}
                <code className="font-mono">NEWS_ADMIN_PASSWORD</code> in your
                environment variables to enable owner sign-in in production.
              </div>
            )}

            {usingDevFallback && (
              <div className="mt-5 rounded-2xl border border-[#CCA146]/60 bg-[#F5F0E6] p-4 text-xs leading-relaxed text-[#28231E]">
                <strong>Local development mode:</strong> Temporary local
                password is{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono font-semibold text-[#CF4520]">
                  vjprana2026
                </code>
                .
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="analytics-password"
                  className="block text-sm font-medium text-[#28231E]"
                >
                  Admin Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="analytics-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter studio admin password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-xl border border-[#DBD4C6] bg-white py-3 pr-11 pl-4 text-sm text-[#28231E] focus:border-[#CF4520] focus:ring-2 focus:ring-[#CF4520]/20 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#676055] hover:text-[#00052F]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {authError && (
                <p className="rounded-xl bg-[#CF4520]/10 px-3.5 py-2.5 text-xs font-medium text-[#992C10]">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn || !configured}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#CF4520] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#B33918] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Open Analytics Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  const activity = summary?.activity;
  const rangeStart =
    activity && activity.total > 0
      ? (activity.page - 1) * activity.pageSize + 1
      : 0;
  const rangeEnd = activity
    ? Math.min(activity.page * activity.pageSize, activity.total)
    : 0;

  return (
    <section className="min-h-screen bg-[#F5F0E6]/45 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col gap-5 rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00052F] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#CCA146]">
                <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
                Hidden Analytics
              </span>
              {summary && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DED4] bg-[#F5F0E6]/70 px-2.5 py-0.5 text-[11px] font-medium text-[#676055]">
                  Storage:{" "}
                  <strong className="text-[#00052F]">
                    {summary.storageMode === "kv"
                      ? "Upstash / KV"
                      : summary.storageMode === "file"
                        ? "Local JSON"
                        : "In-Memory"}
                  </strong>
                </span>
              )}
            </div>
            <h1 className="mt-2 font-editorial text-2xl font-medium text-[#00052F] sm:text-3xl">
              VJ PRANA Web Analytics
            </h1>
            <p className="mt-1 text-sm text-[#676055]">
              First-party traffic, page performance, and studio lead conversions
              (no cookies, no third-party trackers).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Time Range Pills */}
            <div className="inline-flex rounded-full border border-[#DBD4C6] bg-[#F5F0E6]/60 p-1">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => {
                    setRange(r.value);
                    setActivityPage(1);
                  }}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    range === r.value
                      ? "bg-[#00052F] text-white shadow-xs"
                      : "text-[#676055] hover:text-[#00052F]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void fetchStats()}
              disabled={loading}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#DBD4C6] bg-white px-3.5 py-2 text-xs font-medium text-[#28231E] transition-colors hover:border-[#00052F] hover:text-[#00052F] disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              disabled={!summary}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#DBD4C6] bg-white px-3.5 py-2 text-xs font-medium text-[#28231E] transition-colors hover:border-[#00052F] hover:text-[#00052F] disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>

            <Link
              href="/admin/news"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#DBD4C6] bg-white px-3.5 py-2 text-xs font-medium text-[#28231E] transition-colors hover:border-[#00052F] hover:text-[#00052F]"
            >
              <Newspaper className="h-3.5 w-3.5" />
              News Admin
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#DBD4C6] bg-white px-3.5 py-2 text-xs font-medium text-[#CF4520] transition-colors hover:bg-[#CF4520]/8"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Localhost & Current Laptop IP Exclusion Bar */}
        {summary && (
          <div className="mt-4 rounded-2xl border border-[#E4DED4] bg-white px-5 py-4 shadow-xs">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#676055]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#00052F]">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Traffic Filters:
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 border border-emerald-200">
                  localhost / 127.0.0.1 excluded
                </span>
                <button
                  type="button"
                  onClick={handleToggleBrowserIgnore}
                  className={`cursor-pointer rounded-full px-2.5 py-0.5 font-medium border transition-colors ${
                    browserIgnored
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-[#F5F0E6] text-[#676055] border-[#DBD4C6] hover:text-[#00052F]"
                  }`}
                >
                  {browserIgnored
                    ? "This browser excluded ✓"
                    : "Exclude this browser"}
                </button>
                {summary.viewerIp && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DED4] bg-[#F5F0E6]/60 px-2.5 py-0.5 font-mono text-[11px] text-[#28231E]">
                    Your IP: {summary.viewerIp}
                  </span>
                )}
                {summary.viewerIp && !summary.viewerIpExcluded && (
                  <button
                    type="button"
                    onClick={handleExcludeCurrentIp}
                    disabled={savingExclusion}
                    className="cursor-pointer rounded-full bg-[#00052F] px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-[#1a2260] disabled:opacity-50"
                  >
                    Exclude My Current IP
                  </button>
                )}
                {summary.viewerIp && summary.viewerIpExcluded && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 border border-emerald-200">
                    Your IP excluded ✓
                  </span>
                )}
              </div>

              <form
                onSubmit={handleAddCustomIp}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={customIpInput}
                  onChange={(e) => setCustomIpInput(e.target.value)}
                  placeholder="Exclude another IP..."
                  className="w-44 rounded-full border border-[#DBD4C6] bg-[#F5F0E6]/35 px-3 py-1.5 font-mono text-xs text-[#28231E] placeholder:font-sans placeholder:text-[#676055]/75 focus:border-[#CF4520] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={savingExclusion || !customIpInput.trim()}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#DBD4C6] bg-white px-3 py-1.5 text-xs font-medium text-[#00052F] hover:border-[#00052F] disabled:opacity-45"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Exclude IP
                </button>
              </form>
            </div>

            {(summary.excludedIps.length > 0 ||
              summary.envExcludedIps.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#E4DED4]/70 pt-3 text-[11px]">
                <span className="mr-1 font-medium text-[#676055]">
                  Excluded IPs:
                </span>
                {summary.envExcludedIps.map((ip) => (
                  <span
                    key={`env-${ip}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F5F0E6] px-2.5 py-0.5 font-mono text-[#28231E]"
                    title="Configured via ANALYTICS_EXCLUDED_IPS"
                  >
                    {ip}
                    <span className="font-sans text-[10px] text-[#8C6A1F]">
                      (env)
                    </span>
                  </span>
                ))}
                {summary.excludedIps.map((ip) => (
                  <span
                    key={`saved-${ip}`}
                    className="inline-flex items-center gap-1 rounded-full border border-[#DBD4C6] bg-white px-2.5 py-0.5 font-mono text-[#28231E]"
                  >
                    {ip}
                    <button
                      type="button"
                      onClick={() => void handleRemoveExcludedIp(ip)}
                      aria-label={`Remove ${ip} from excluded IPs`}
                      className="cursor-pointer text-[#676055] hover:text-[#CF4520]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Serverless Persistence Notice */}
        {summary?.storageMode === "memory" && (
          <div className="mt-5 rounded-2xl border border-[#CCA146]/60 bg-[#F5F0E6] px-5 py-3.5 text-xs leading-relaxed text-[#28231E]">
            <strong>Persistence tip:</strong> This serverless deployment is
            currently using temporary in-memory storage. Add{" "}
            <code className="font-mono font-semibold">
              UPSTASH_REDIS_REST_URL
            </code>{" "}
            and{" "}
            <code className="font-mono font-semibold">
              UPSTASH_REDIS_REST_TOKEN
            </code>{" "}
            in Vercel Environment Variables to persist analytics history across
            deployments.
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-[#CF4520]/30 bg-[#CF4520]/8 px-5 py-3.5 text-sm text-[#992C10]">
            {error}
          </div>
        )}

        {!summary ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <Loader2 className="h-7 w-7 animate-spin text-[#CF4520]" />
          </div>
        ) : (
          <>
            {/* KPI Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Pageviews</span>
                  <Eye className="h-4 w-4 text-[#CF4520]" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {formatNumber(summary.kpis.pageviews)}
                </p>
                <p className="mt-1 text-[11px] text-[#676055]">
                  Total pages viewed
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Unique Visitors</span>
                  <Users className="h-4 w-4 text-[#00052F]" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {formatNumber(summary.kpis.uniqueVisitors)}
                </p>
                <p className="mt-1 text-[11px] text-[#676055]">
                  Distinct browsers
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Sessions</span>
                  <Activity className="h-4 w-4 text-[#8C6A1F]" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {formatNumber(summary.kpis.sessions)}
                </p>
                <p className="mt-1 text-[11px] text-[#676055]">
                  Active site visits
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Lead Actions</span>
                  <MousePointerClick className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {formatNumber(summary.kpis.conversions)}
                </p>
                <p className="mt-1 text-[11px] font-medium text-emerald-700">
                  {summary.kpis.conversionRate}% visitor conv. rate
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Pages / Session</span>
                  <TrendingUp className="h-4 w-4 text-[#00052F]" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {summary.kpis.avgPagesPerSession}
                </p>
                <p className="mt-1 text-[11px] text-[#676055]">
                  Avg. browsing depth
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DED4] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#676055]">
                  <span>Bounce Rate</span>
                  <Clock className="h-4 w-4 text-[#676055]" />
                </div>
                <p className="mt-3 font-editorial text-3xl font-semibold text-[#00052F] tabular-nums">
                  {summary.kpis.bounceRate}%
                </p>
                <p className="mt-1 text-[11px] text-[#676055]">
                  Single-page sessions
                </p>
              </div>
            </div>

            {/* Traffic Over Time Chart + Conversions Breakdown */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Bar Chart */}
              <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs lg:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-editorial text-lg font-medium text-[#00052F]">
                      Traffic Trend
                    </h2>
                    <p className="text-xs text-[#676055]">
                      {range === "24h"
                        ? "Hourly activity (IST)"
                        : "Daily activity over selected range"}
                    </p>
                  </div>
                  <div className="inline-flex rounded-full border border-[#E4DED4] bg-[#F5F0E6]/60 p-1">
                    {(
                      [
                        { id: "pageviews", label: "Pageviews" },
                        { id: "visitors", label: "Visitors" },
                        { id: "conversions", label: "Leads" },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setChartMetric(m.id)}
                        className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          chartMetric === m.id
                            ? "bg-[#CF4520] text-white"
                            : "text-[#676055] hover:text-[#00052F]"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex h-56 items-end gap-1.5 border-b border-[#E4DED4] pb-2">
                  {summary.timeline.map((pt) => {
                    const val = pt[chartMetric];
                    const heightPct =
                      val > 0
                        ? Math.max(6, Math.round((val / chartMax) * 100))
                        : 2;
                    return (
                      <div
                        key={pt.key}
                        className="group relative flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div
                          className={`w-full max-w-[28px] rounded-t-md transition-all ${
                            val > 0
                              ? chartMetric === "conversions"
                                ? "bg-emerald-600 group-hover:bg-emerald-700"
                                : chartMetric === "visitors"
                                  ? "bg-[#00052F] group-hover:bg-[#1a2260]"
                                  : "bg-[#CF4520] group-hover:bg-[#B33918]"
                              : "bg-[#E4DED4]/60"
                          }`}
                          style={{ height: `${heightPct}%` }}
                        />
                        {/* Hover Tooltip */}
                        <div className="pointer-events-none absolute -top-16 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#00052F] px-3 py-1.5 text-[11px] text-white shadow-lg group-hover:block">
                          <div className="font-semibold text-[#CCA146]">
                            {pt.label}
                          </div>
                          <div>
                            {pt.pageviews} views · {pt.visitors} visitors ·{" "}
                            {pt.conversions} actions
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Labels */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#676055]">
                  <span>{summary.timeline[0]?.label ?? ""}</span>
                  <span>
                    {summary.timeline[Math.floor(summary.timeline.length / 2)]
                      ?.label ?? ""}
                  </span>
                  <span>
                    {summary.timeline[summary.timeline.length - 1]?.label ?? ""}
                  </span>
                </div>
              </div>

              {/* Lead & Conversion Breakdown */}
              <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs">
                <h2 className="font-editorial text-lg font-medium text-[#00052F]">
                  Studio Lead Actions
                </h2>
                <p className="text-xs text-[#676055]">
                  Tracked clicks &amp; form submissions
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      label: "WhatsApp Clicks",
                      value: summary.conversionsBreakdown.whatsapp,
                      icon: MessageCircle,
                      color: "text-emerald-700 bg-emerald-50",
                    },
                    {
                      label: "Contact Form Enquiries",
                      value: summary.conversionsBreakdown.contactSubmit,
                      icon: Send,
                      color: "text-[#CF4520] bg-[#CF4520]/10",
                    },
                    {
                      label: "Phone Call Clicks",
                      value: summary.conversionsBreakdown.phone,
                      icon: Phone,
                      color: "text-blue-700 bg-blue-50",
                    },
                    {
                      label: "Email Clicks",
                      value: summary.conversionsBreakdown.email,
                      icon: Mail,
                      color: "text-amber-800 bg-amber-50",
                    },
                    {
                      label: "Book / Contact CTA Clicks",
                      value: summary.conversionsBreakdown.contactCta,
                      icon: ArrowUpRight,
                      color: "text-[#8C6A1F] bg-[#F5F0E6]",
                    },
                    {
                      label: "YouTube & Social Clicks",
                      value: summary.conversionsBreakdown.social,
                      icon: Globe,
                      color: "text-purple-700 bg-purple-50",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-2xl border border-[#E4DED4]/70 px-3.5 py-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${item.color}`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="text-sm font-medium text-[#28231E]">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-editorial text-lg font-semibold text-[#00052F] tabular-nums">
                          {formatNumber(item.value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Pages + Traffic Sources */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Top Pages */}
              <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs lg:col-span-2">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-editorial text-lg font-medium text-[#00052F]">
                    Top Pages
                  </h2>
                  <span className="text-xs text-[#676055]">
                    By total pageviews
                  </span>
                </div>

                {summary.topPages.length === 0 ? (
                  <p className="mt-6 text-sm text-[#676055]/80">
                    No pageviews recorded in this timeframe yet.
                  </p>
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#E4DED4] text-xs uppercase tracking-wider text-[#676055]">
                          <th className="py-2.5 pr-4 font-semibold">Page</th>
                          <th className="py-2.5 px-3 text-right font-semibold">
                            Views
                          </th>
                          <th className="py-2.5 px-3 text-right font-semibold">
                            Visitors
                          </th>
                          <th className="py-2.5 pl-3 text-right font-semibold">
                            Share
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4DED4]/60">
                        {summary.topPages.map((pg) => (
                          <tr key={pg.path} className="hover:bg-[#F5F0E6]/35">
                            <td className="py-3 pr-4">
                              <div className="font-medium text-[#00052F]">
                                {PAGE_LABELS[pg.path] ?? pg.path}
                              </div>
                              <div className="font-mono text-xs text-[#676055]">
                                {pg.path}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right font-semibold text-[#00052F] tabular-nums">
                              {formatNumber(pg.views)}
                            </td>
                            <td className="py-3 px-3 text-right text-[#676055] tabular-nums">
                              {formatNumber(pg.visitors)}
                            </td>
                            <td className="py-3 pl-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <div className="hidden h-2 w-16 overflow-hidden rounded-full bg-[#F5F0E6] sm:block">
                                  <div
                                    className="h-full rounded-full bg-[#CF4520]"
                                    style={{
                                      width: `${Math.max(pg.share, 4)}%`,
                                    }}
                                  />
                                </div>
                                <span className="w-9 text-xs text-[#676055] tabular-nums">
                                  {pg.share}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Referrers & UTM */}
              <div className="space-y-6">
                <BreakdownCard
                  title="Traffic Sources"
                  subtitle="Referrers"
                  items={summary.referrers}
                  emptyText="No referrer data recorded yet."
                />
                {summary.utmSources.length > 0 && (
                  <BreakdownCard
                    title="UTM Campaigns"
                    subtitle="utm_source / campaign"
                    items={summary.utmSources}
                    emptyText="No UTM campaign visits yet."
                  />
                )}
              </div>
            </div>

            {/* Devices, Browsers, OS, Locations */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Devices with Icons */}
              <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs">
                <h2 className="font-editorial text-lg font-medium text-[#00052F]">
                  Devices
                </h2>
                {summary.devices.length === 0 ? (
                  <p className="mt-6 text-sm text-[#676055]/80">
                    No device data yet.
                  </p>
                ) : (
                  <div className="mt-5 space-y-3.5">
                    {summary.devices.map((d) => {
                      const DeviceIcon =
                        d.name === "Mobile"
                          ? Smartphone
                          : d.name === "Tablet"
                            ? Tablet
                            : Monitor;
                      return (
                        <div key={d.name}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="inline-flex items-center gap-2 font-medium text-[#28231E]">
                              <DeviceIcon className="h-4 w-4 text-[#8C6A1F]" />
                              {d.name}
                            </span>
                            <span className="text-xs text-[#676055] tabular-nums">
                              <strong className="text-[#00052F]">
                                {formatNumber(d.count)}
                              </strong>{" "}
                              ({d.share}%)
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F5F0E6]">
                            <div
                              className="h-full rounded-full bg-[#CF4520]"
                              style={{ width: `${Math.max(d.share, 3)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <BreakdownCard
                title="Browsers"
                items={summary.browsers}
                emptyText="No browser data yet."
              />

              <BreakdownCard
                title="Operating Systems"
                items={summary.operatingSystems}
                emptyText="No OS data yet."
              />

              <BreakdownCard
                title="Locations"
                subtitle="Via Vercel Geo"
                items={summary.locations}
                emptyText="Location data populates automatically on Vercel production deployments."
              />
            </div>

            {/* Recent Activity Feed with Search, Event Filter & Pagination */}
            <div className="mt-6 rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-editorial text-lg font-medium text-[#00052F]">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-[#676055]">
                    {formatNumber(activity?.total ?? 0)} matching events (
                    {formatNumber(summary.totalEventsStored)} total stored,
                    excluding localhost &amp; ignored IPs)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Search Input */}
                  <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#676055]"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search path, source, device, city..."
                      aria-label="Search recent activity"
                      className="w-full rounded-full border border-[#DBD4C6] bg-[#F5F0E6]/35 py-1.5 pr-8 pl-8.5 text-xs text-[#28231E] placeholder:text-[#676055]/75 focus:border-[#CF4520] focus:bg-white focus:outline-none sm:w-64"
                    />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => setSearchInput("")}
                        aria-label="Clear search"
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-[#676055] hover:text-[#00052F]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Event Type Filter */}
                  <select
                    value={eventTypeFilter}
                    onChange={(e) => {
                      setEventTypeFilter(
                        e.target.value as AnalyticsEventType | "all"
                      );
                      setActivityPage(1);
                    }}
                    aria-label="Filter by event type"
                    className="cursor-pointer rounded-full border border-[#DBD4C6] bg-white px-3 py-1.5 text-xs font-medium text-[#28231E] focus:border-[#CF4520] focus:outline-none"
                  >
                    <option value="all">All Events</option>
                    <option value="pageview">Pageviews</option>
                    <option value="whatsapp_click">WhatsApp Clicks</option>
                    <option value="contact_submit">Enquiries Sent</option>
                    <option value="phone_click">Phone Calls</option>
                    <option value="email_click">Email Clicks</option>
                    <option value="contact_cta">Contact CTAs</option>
                    <option value="social_click">Social / Video</option>
                  </select>

                  {/* Page Size Selector */}
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setActivityPage(1);
                    }}
                    aria-label="Rows per page"
                    className="cursor-pointer rounded-full border border-[#DBD4C6] bg-white px-3 py-1.5 text-xs font-medium text-[#28231E] focus:border-[#CF4520] focus:outline-none"
                  >
                    <option value={10}>10 / page</option>
                    <option value={15}>15 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleClearData}
                    disabled={clearing || summary.totalEventsStored === 0}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#CF4520]/30 px-3.5 py-1.5 text-xs font-medium text-[#CF4520] transition-colors hover:bg-[#CF4520]/8 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {clearing ? "Clearing..." : "Reset Data"}
                  </button>
                </div>
              </div>

              {!activity || activity.items.length === 0 ? (
                <p className="mt-6 text-sm text-[#676055]/80">
                  {debouncedSearch || eventTypeFilter !== "all"
                    ? "No events match your current search or filter."
                    : "No activity recorded yet."}
                </p>
              ) : (
                <>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-[#E4DED4] text-[11px] uppercase tracking-wider text-[#676055]">
                          <th className="py-2.5 pr-3 font-semibold">Event</th>
                          <th className="py-2.5 px-3 font-semibold">
                            Lead From
                          </th>
                          <th className="py-2.5 px-3 font-semibold">
                            Page / Detail
                          </th>
                          <th className="py-2.5 px-3 font-semibold">Source</th>
                          <th className="py-2.5 px-3 font-semibold">Device</th>
                          <th className="py-2.5 pl-3 text-right font-semibold">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4DED4]/60">
                        {activity.items.map((ev: AnalyticsEvent) => {
                          const badge = EVENT_BADGE_MAP[ev.type];
                          const leadOrigin = getLeadOrigin(ev);
                          return (
                            <tr key={ev.id} className="hover:bg-[#F5F0E6]/30">
                              <td className="py-2.5 pr-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badge.className}`}
                                >
                                  {badge.label}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-xs whitespace-nowrap">
                                {leadOrigin ? (
                                  <span className="font-medium text-[#00052F]">
                                    {leadOrigin}
                                  </span>
                                ) : (
                                  <span className="text-[#676055]/50">—</span>
                                )}
                              </td>
                              <td className="py-2.5 px-3">
                                <span className="font-mono text-xs text-[#00052F]">
                                  {ev.path}
                                </span>
                                {ev.label && (
                                  <span className="ml-2 text-xs text-[#676055]">
                                    — {ev.label}
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-xs text-[#676055] whitespace-nowrap">
                                {ev.utmSource
                                  ? `UTM: ${ev.utmSource}`
                                  : ev.referrer || "Direct"}
                              </td>
                              <td className="py-2.5 px-3 text-xs text-[#676055] whitespace-nowrap">
                                {ev.device} · {ev.browser}
                                {ev.city
                                  ? ` · ${ev.city}`
                                  : ev.country
                                    ? ` · ${ev.country}`
                                    : ""}
                              </td>
                              <td className="py-2.5 pl-3 text-right text-xs text-[#676055] whitespace-nowrap tabular-nums">
                                {formatTime(ev.timestamp)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div className="mt-4 flex flex-col gap-3 border-t border-[#E4DED4]/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#676055] tabular-nums">
                      Showing{" "}
                      <strong className="text-[#00052F]">
                        {formatNumber(rangeStart)}–{formatNumber(rangeEnd)}
                      </strong>{" "}
                      of{" "}
                      <strong className="text-[#00052F]">
                        {formatNumber(activity.total)}
                      </strong>{" "}
                      events
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActivityPage(1)}
                        disabled={activity.page <= 1 || loading}
                        className="cursor-pointer rounded-full border border-[#DBD4C6] bg-white px-2.5 py-1 text-xs font-medium text-[#28231E] hover:border-[#00052F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        First
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivityPage((p) => Math.max(1, p - 1))
                        }
                        disabled={activity.page <= 1 || loading}
                        aria-label="Previous page"
                        className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#DBD4C6] bg-white px-3 py-1 text-xs font-medium text-[#28231E] hover:border-[#00052F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Prev
                      </button>
                      <span className="px-2.5 text-xs font-medium text-[#00052F] tabular-nums">
                        Page {activity.page} of {activity.totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActivityPage((p) =>
                            Math.min(activity.totalPages, p + 1)
                          )
                        }
                        disabled={
                          activity.page >= activity.totalPages || loading
                        }
                        aria-label="Next page"
                        className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#DBD4C6] bg-white px-3 py-1 text-xs font-medium text-[#28231E] hover:border-[#00052F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivityPage(activity.totalPages)}
                        disabled={
                          activity.page >= activity.totalPages || loading
                        }
                        className="cursor-pointer rounded-full border border-[#DBD4C6] bg-white px-2.5 py-1 text-xs font-medium text-[#28231E] hover:border-[#00052F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Last
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
