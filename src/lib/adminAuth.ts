import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "vjprana_news_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours
const DEV_FALLBACK_PASSWORD = "vjprana2026";

export function getAdminAuthConfig(): {
  password: string | null;
  secret: string;
  usingDevFallback: boolean;
} {
  const envPassword = process.env.NEWS_ADMIN_PASSWORD?.trim();
  const isProd = process.env.NODE_ENV === "production";

  if (envPassword && envPassword.length > 0) {
    const secret =
      process.env.NEWS_ADMIN_SECRET?.trim() ||
      crypto
        .createHash("sha256")
        .update(`vjprana-session-key:${envPassword}`)
        .digest("hex");
    return { password: envPassword, secret, usingDevFallback: false };
  }

  if (isProd) {
    return { password: null, secret: "", usingDevFallback: false };
  }

  const secret = crypto
    .createHash("sha256")
    .update(`vjprana-dev-session:${DEV_FALLBACK_PASSWORD}`)
    .digest("hex");

  return {
    password: DEV_FALLBACK_PASSWORD,
    secret,
    usingDevFallback: true,
  };
}

export function verifyAdminPassword(candidate: string): {
  ok: boolean;
  configured: boolean;
} {
  const { password } = getAdminAuthConfig();
  if (!password) {
    return { ok: false, configured: false };
  }

  const expectedBuf = crypto.createHash("sha256").update(password).digest();
  const candidateBuf = crypto.createHash("sha256").update(candidate).digest();
  return {
    ok: crypto.timingSafeEqual(expectedBuf, candidateBuf),
    configured: true,
  };
}

function signPayload(payloadB64: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
}

export function createSessionToken(): string | null {
  const { secret, password } = getAdminAuthConfig();
  if (!password || !secret) return null;

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payloadB64 = Buffer.from(JSON.stringify({ role: "admin", exp })).toString(
    "base64url"
  );
  const signature = signPayload(payloadB64, secret);
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const { secret, password } = getAdminAuthConfig();
  if (!password || !secret) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;

  const expectedSig = signPayload(payloadB64, secret);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    ) as { exp?: number; role?: string };
    if (parsed.role !== "admin" || typeof parsed.exp !== "number") {
      return false;
    }
    return parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
