import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminAuthConfig,
  getSessionCookieOptions,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  const { password, usingDevFallback } = getAdminAuthConfig();

  return NextResponse.json({
    authenticated,
    configured: Boolean(password),
    usingDevFallback,
  });
}

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const candidate = typeof body.password === "string" ? body.password : "";
  if (!candidate) {
    return NextResponse.json(
      { message: "Please enter the admin password." },
      { status: 400 }
    );
  }

  const result = verifyAdminPassword(candidate);
  if (!result.configured) {
    return NextResponse.json(
      {
        message:
          "Admin login is disabled until NEWS_ADMIN_PASSWORD is set in your deployment environment variables.",
      },
      { status: 503 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { message: "Incorrect password. Please try again." },
      { status: 401 }
    );
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { message: "Unable to initialize admin session." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
