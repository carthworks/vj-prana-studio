import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { NewsItem, NewsItemInput } from "./newsValidation";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "news.json");
const KV_KEY = "vjprana:news:items";

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

async function readLocalSeedFile(): Promise<NewsItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as NewsItem[]) : [];
  } catch {
    return [];
  }
}

async function readFromKv(url: string, token: string): Promise<NewsItem[] | null> {
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(KV_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | null };
    if (!data.result) return null;
    const parsed = JSON.parse(data.result) as unknown;
    return Array.isArray(parsed) ? (parsed as NewsItem[]) : null;
  } catch {
    return null;
  }
}

async function writeToKv(
  url: string,
  token: string,
  items: NewsItem[]
): Promise<void> {
  const res = await fetch(`${url}/set/${encodeURIComponent(KV_KEY)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(items)),
  });

  if (!res.ok) {
    throw new Error("Failed to persist news items to remote KV store.");
  }
}

export async function getAllNewsItems(): Promise<NewsItem[]> {
  const kv = getKvConfig();
  if (kv) {
    const kvItems = await readFromKv(kv.url, kv.token);
    if (kvItems !== null) {
      return kvItems;
    }
  }
  return readLocalSeedFile();
}

export async function getPublishedNewsItems(): Promise<NewsItem[]> {
  const all = await getAllNewsItems();
  return all.filter((item) => item.active);
}

export async function saveAllNewsItems(items: NewsItem[]): Promise<void> {
  const kv = getKvConfig();
  if (kv) {
    await writeToKv(kv.url, kv.token, items);
    return;
  }

  try {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(
      DATA_FILE_PATH,
      `${JSON.stringify(items, null, 2)}\n`,
      "utf8"
    );
  } catch {
    throw new Error(
      "Storage is read-only on this serverless deployment. Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or Vercel KV) in environment variables to save news changes in production."
    );
  }
}

export async function createNewsItem(input: NewsItemInput): Promise<NewsItem> {
  const items = await getAllNewsItems();
  const newItem: NewsItem = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await saveAllNewsItems([newItem, ...items]);
  return newItem;
}

export async function updateNewsItem(
  id: string,
  input: NewsItemInput
): Promise<NewsItem | null> {
  const items = await getAllNewsItems();
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  const updated: NewsItem = {
    ...items[idx],
    ...input,
    id: items[idx].id,
    createdAt: items[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  items[idx] = updated;
  await saveAllNewsItems(items);
  return updated;
}

export async function reorderNewsItem(
  id: string,
  direction: "up" | "down"
): Promise<NewsItem[] | null> {
  const items = await getAllNewsItems();
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= items.length) {
    return items;
  }

  const copy = [...items];
  const [moved] = copy.splice(idx, 1);
  copy.splice(targetIdx, 0, moved);
  await saveAllNewsItems(copy);
  return copy;
}

export async function deleteNewsItem(id: string): Promise<boolean> {
  const items = await getAllNewsItems();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await saveAllNewsItems(next);
  return true;
}
