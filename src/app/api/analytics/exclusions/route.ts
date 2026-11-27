import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  addExcludedIp,
  extractClientIp,
  normalizeIp,
  removeExcludedIp,
} from "@/lib/analyticsStore";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: { ip?: unknown; current?: unknown } = {};
  try {
    body = (await request.json()) as { ip?: unknown; current?: unknown };
  } catch {
    // Allow empty body to mean exclude current IP
  }

  const targetIp =
    body.current === true || !body.ip
      ? extractClientIp(request.headers)
      : normalizeIp(typeof body.ip === "string" ? body.ip : null);

  if (!targetIp) {
    return NextResponse.json(
      { message: "Could not detect an IP address to exclude." },
      { status: 400 }
    );
  }

  const excludedIps = await addExcludedIp(targetIp);
  return NextResponse.json({ ok: true, ip: targetIp, excludedIps });
}

export async function DELETE(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const ip = normalizeIp(searchParams.get("ip"));
  if (!ip) {
    return NextResponse.json(
      { message: "Missing IP parameter." },
      { status: 400 }
    );
  }

  const excludedIps = await removeExcludedIp(ip);
  return NextResponse.json({ ok: true, excludedIps });
}
