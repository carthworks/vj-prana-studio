"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  NEWS_CATEGORIES,
  NEWS_PRESET_IMAGES,
  type NewsCategory,
  type NewsItem,
} from "@/lib/newsValidation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FormState {
  title: string;
  category: NewsCategory;
  date: string;
  summary: string;
  image: string;
  linkUrl: string;
  linkLabel: string;
  active: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  category: "Event",
  date: "",
  summary: "",
  image: "/images/prana01.jpg",
  linkUrl: "/contact#enquiry-form",
  linkLabel: "Enquire Now",
  active: true,
};

export function NewsAdminManager() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [usingDevFallback, setUsingDevFallback] = useState(false);

  // Login form state
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard state
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const res = await fetch("/api/news?all=1", { cache: "no-store" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = (await res.json()) as { items?: NewsItem[] };
      setItems(data.items ?? []);
    } catch {
      setFeedback({
        type: "error",
        text: "Failed to load news items. Please refresh.",
      });
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((res) => res.json())
      .then(
        (data: {
          authenticated?: boolean;
          configured?: boolean;
          usingDevFallback?: boolean;
        }) => {
          setAuthenticated(Boolean(data.authenticated));
          setConfigured(Boolean(data.configured));
          setUsingDevFallback(Boolean(data.usingDevFallback));
          setAuthChecked(true);
          if (data.authenticated) {
            void loadItems();
          }
        }
      )
      .catch(() => setAuthChecked(true));
  }, [loadItems]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

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

      if (!res.ok) {
        setLoginError(data.message || "Sign in failed.");
        return;
      }

      setPassword("");
      setAuthenticated(true);
      await loadItems();
    } catch {
      setLoginError("Network error while signing in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setItems([]);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFeedback(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFeedback(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/news/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok || !data.url) {
        setFeedback({
          type: "error",
          text: data.message || "Could not upload image.",
        });
        return;
      }

      setForm((prev) => ({ ...prev, image: data.url! }));
      setFeedback({
        type: "success",
        text: "Image uploaded and attached to this item.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Network error uploading image.",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const url = editingId ? `/api/news/${editingId}` : "/api/news";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        item?: NewsItem;
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (!res.ok) {
        const firstFieldErr = data.errors
          ? Object.values(data.errors).flat()[0]
          : null;
        setFeedback({
          type: "error",
          text: firstFieldErr || data.message || "Could not save item.",
        });
        return;
      }

      await loadItems();
      setEditingId(null);
      setForm(EMPTY_FORM);
      setFeedback({
        type: "success",
        text: editingId
          ? "News item updated on the homepage ticker."
          : "New event added to the homepage ticker.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Network error while saving item.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      summary: item.summary,
      image: item.image,
      linkUrl: item.linkUrl,
      linkLabel: item.linkLabel,
      active: item.active,
    });
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleActive = async (item: NewsItem) => {
    setFeedback(null);
    const res = await fetch(`/api/news/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.title,
        category: item.category,
        date: item.date,
        summary: item.summary,
        image: item.image,
        linkUrl: item.linkUrl,
        linkLabel: item.linkLabel,
        active: !item.active,
      }),
    });
    if (res.ok) {
      await loadItems();
      setFeedback({
        type: "success",
        text: item.active
          ? "Item hidden from homepage ticker."
          : "Item published to homepage ticker.",
      });
    } else {
      const data = (await res.json()) as { message?: string };
      setFeedback({
        type: "error",
        text: data.message || "Could not update visibility.",
      });
    }
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const res = await fetch(`/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "move", direction }),
    });
    if (res.ok) {
      await loadItems();
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!window.confirm(`Delete "${item.title}" from the news ticker?`)) {
      return;
    }

    setFeedback(null);
    const res = await fetch(`/api/news/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === item.id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
      await loadItems();
      setFeedback({
        type: "success",
        text: "News item deleted.",
      });
    } else {
      const data = (await res.json()) as { message?: string };
      setFeedback({
        type: "error",
        text: data.message || "Could not delete item.",
      });
    }
  };

  const inputBase =
    "mt-1.5 block w-full rounded-xl border border-[#DBD4C6] bg-white px-3.5 py-2.5 text-sm text-[#28231E] placeholder:text-[#707070]/80 focus:border-[#CF4520] focus:ring-2 focus:ring-[#CF4520]/20 focus:outline-none";

  if (!authChecked) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center bg-[#F5F0E6]/40">
        <Loader2 className="h-7 w-7 animate-spin text-[#CF4520]" aria-label="Loading" />
      </div>
    );
  }

  // Password Login View
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
                  Owner Access
                </p>
                <h1 className="font-editorial text-2xl font-medium text-[#00052F]">
                  News &amp; Events Manager
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#676055]">
              Sign in with your studio password to add, edit, reorder, or remove
              news &amp; events shown on the VJ PRANA homepage ticker.
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
                <strong>Local development mode:</strong>{" "}
                <code className="font-mono">NEWS_ADMIN_PASSWORD</code> is not
                set yet, so the temporary local password is{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono font-semibold text-[#CF4520]">
                  vjprana2026
                </code>
                . Set a strong password in <code className="font-mono">.env.local</code>{" "}
                before deploying.
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-[#28231E]"
                >
                  Admin Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="admin-password"
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
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#676055] hover:text-[#00052F] cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-[#CF4520]/40 bg-[#CF4520]/8 p-3 text-xs font-medium text-[#992C10]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{loginError}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loginLoading || !configured}
                className="w-full"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In to Manage News</span>
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#E4DED4] pt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#676055] hover:text-[#CF4520]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Authenticated Dashboard View
  return (
    <section className="bg-[#F5F0E6]/45 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CF4520] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>View Live Homepage Ticker</span>
            </Link>
            <h1 className="font-editorial mt-1.5 text-2xl font-medium text-[#00052F] sm:text-3xl">
              News &amp; Events Ticker Manager
            </h1>
            <p className="mt-1 text-sm text-[#676055]">
              Add, edit, hide, reorder, or delete events displayed in the
              homepage news ticker.
            </p>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Sign Out</span>
          </Button>
        </div>

        {usingDevFallback && (
          <div className="mt-5 rounded-2xl border border-[#CCA146]/60 bg-[#F5F0E6] px-5 py-3.5 text-xs text-[#28231E]">
            <strong>Security reminder:</strong> You are signed in using the
            temporary local development password. Set{" "}
            <code className="font-mono font-semibold">NEWS_ADMIN_PASSWORD</code>{" "}
            in <code className="font-mono">.env.local</code> / Vercel before
            publishing.
          </div>
        )}

        {feedback && (
          <div
            role="status"
            className={cn(
              "mt-5 flex items-start gap-2.5 rounded-2xl border px-5 py-3.5 text-sm",
              feedback.type === "success"
                ? "border-[#1F7A4D]/30 bg-[#1F7A4D]/10 text-[#155736]"
                : "border-[#CF4520]/40 bg-[#CF4520]/10 text-[#992C10]"
            )}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Add / Edit Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSave}
              className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs sm:p-7"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-editorial text-xl font-medium text-[#00052F]">
                  {editingId ? "Edit News / Event" : "Add New Event or News"}
                </h2>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(EMPTY_FORM);
                      setFeedback(null);
                    }}
                    className="text-xs font-semibold text-[#CF4520] hover:underline cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="news-title"
                    className="block text-sm font-medium text-[#28231E]"
                  >
                    Headline / Event Title <span className="text-[#CF4520]">*</span>
                  </label>
                  <input
                    id="news-title"
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="e.g., New Morning Yoga Batch Starting Monday"
                    className={inputBase}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="news-category"
                      className="block text-sm font-medium text-[#28231E]"
                    >
                      Category
                    </label>
                    <select
                      id="news-category"
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: e.target.value as NewsCategory,
                        }))
                      }
                      className={inputBase}
                    >
                      {NEWS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="news-date"
                      className="block text-sm font-medium text-[#28231E]"
                    >
                      Date / Timing Label <span className="text-[#CF4520]">*</span>
                    </label>
                    <input
                      id="news-date"
                      type="text"
                      required
                      value={form.date}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, date: e.target.value }))
                      }
                      placeholder="e.g., 21 June 2026 · 6 AM"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="news-summary"
                    className="block text-sm font-medium text-[#28231E]"
                  >
                    Short Details (shown when clicked)
                  </label>
                  <textarea
                    id="news-summary"
                    rows={3}
                    value={form.summary}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, summary: e.target.value }))
                    }
                    placeholder="Share venue, highlights, or registration notes..."
                    className={inputBase}
                  />
                </div>

                {/* Image Picker + Upload + URL */}
                <div className="rounded-2xl border border-[#E4DED4] bg-[#F5F0E6]/45 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#28231E]">
                      Event Image <span className="text-[#CF4520]">*</span>
                    </span>
                    <label className="inline-flex items-center gap-1.5 rounded-full border border-[#CF4520]/40 bg-white px-3 py-1 text-xs font-semibold text-[#CF4520] transition-colors hover:bg-[#CF4520] hover:text-white cursor-pointer">
                      {uploading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Upload Photo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {/* Live Thumbnail Preview */}
                  {form.image && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E4DED4] bg-white p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.image}
                        alt="Selected preview"
                        width={64}
                        height={48}
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <input
                        type="text"
                        aria-label="Image path or URL"
                        value={form.image}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, image: e.target.value }))
                        }
                        placeholder="/images/prana01.jpg or https://..."
                        className="w-full border-0 bg-transparent text-xs text-[#28231E] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Quick Studio Presets */}
                  <p className="mt-3 text-[11px] font-medium text-[#676055]">
                    Or pick a studio image:
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {NEWS_PRESET_IMAGES.map((preset) => {
                      const selected = form.image === preset.path;
                      return (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, image: preset.path }))
                          }
                          title={preset.label}
                          className={cn(
                            "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                            selected
                              ? "border-[#CF4520] ring-2 ring-[#CF4520]/30"
                              : "border-transparent opacity-80 hover:opacity-100"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={preset.path}
                            alt={preset.label}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional CTA Link */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="news-link-url"
                      className="block text-sm font-medium text-[#28231E]"
                    >
                      Action Link (Optional)
                    </label>
                    <input
                      id="news-link-url"
                      type="text"
                      value={form.linkUrl}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, linkUrl: e.target.value }))
                      }
                      placeholder="/contact#enquiry-form"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="news-link-label"
                      className="block text-sm font-medium text-[#28231E]"
                    >
                      Button Text
                    </label>
                    <input
                      id="news-link-label"
                      type="text"
                      value={form.linkLabel}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          linkLabel: e.target.value,
                        }))
                      }
                      placeholder="Register Now"
                      className={inputBase}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm font-medium text-[#28231E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-[#DBD4C6] accent-[#CF4520]"
                  />
                  <span>Show immediately on homepage ticker</span>
                </label>
              </div>

              <div className="mt-6">
                <Button type="submit" size="lg" disabled={saving} className="w-full">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Saving...</span>
                    </>
                  ) : editingId ? (
                    <span>Save Changes</span>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      <span>Add to News Ticker</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Existing Items List */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-xl font-medium text-[#00052F]">
                  Current Ticker Items ({items.length})
                </h2>
                <span className="text-xs text-[#676055]">
                  {items.filter((i) => i.active).length} visible on homepage
                </span>
              </div>

              {loadingItems ? (
                <div className="flex py-16 justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#CF4520]" />
                </div>
              ) : items.length === 0 ? (
                <p className="mt-6 rounded-2xl bg-[#F5F0E6]/60 p-6 text-center text-sm text-[#676055]">
                  No news or events yet. Use the form on the left to add your
                  first update.
                </p>
              ) : (
                <ul className="mt-5 space-y-3.5">
                  {items.map((item, idx) => (
                    <li
                      key={item.id}
                      className={cn(
                        "flex flex-col gap-4 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center",
                        editingId === item.id
                          ? "border-[#CF4520] bg-[#F5F0E6]/65"
                          : "border-[#E4DED4] bg-[#F5F0E6]/25"
                      )}
                    >
                      <div className="relative h-18 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E4DED4] bg-[#F5F0E6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                          <span className="rounded-full bg-[#00052F] px-2.5 py-0.5 text-[#CCA146]">
                            {item.category}
                          </span>
                          <span className="text-[#8C6A1F]">{item.date}</span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5",
                              item.active
                                ? "bg-[#1F7A4D]/15 text-[#155736]"
                                : "bg-[#707070]/15 text-[#676055]"
                            )}
                          >
                            {item.active ? "Visible" : "Hidden"}
                          </span>
                        </div>
                        <p className="font-editorial mt-1.5 text-base font-medium text-[#00052F]">
                          {item.title}
                        </p>
                        {item.summary && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-[#676055]">
                            {item.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 sm:shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMove(item.id, "up")}
                          aria-label="Move item up"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DED4] bg-white text-[#28231E] hover:border-[#CF4520] hover:text-[#CF4520] disabled:opacity-35 cursor-pointer"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === items.length - 1}
                          onClick={() => handleMove(item.id, "down")}
                          aria-label="Move item down"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DED4] bg-white text-[#28231E] hover:border-[#CF4520] hover:text-[#CF4520] disabled:opacity-35 cursor-pointer"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item)}
                          aria-label={
                            item.active
                              ? "Hide item from homepage"
                              : "Show item on homepage"
                          }
                          title={item.active ? "Hide" : "Show"}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DED4] bg-white text-[#28231E] hover:border-[#CF4520] hover:text-[#CF4520] cursor-pointer"
                        >
                          {item.active ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          aria-label={`Edit ${item.title}`}
                          title="Edit"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DED4] bg-white text-[#00052F] hover:border-[#CF4520] hover:text-[#CF4520] cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          aria-label={`Delete ${item.title}`}
                          title="Delete"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DED4] bg-white text-[#CF4520] hover:bg-[#CF4520] hover:text-white cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
