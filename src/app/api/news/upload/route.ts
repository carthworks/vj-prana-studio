import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB

export async function POST(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Invalid multipart form upload." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Please select an image file to upload." },
      { status: 400 }
    );
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { message: "Only JPG, PNG, and WebP images are supported." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "Image must be smaller than 3 MB." },
      { status: 400 }
    );
  }

  const safeSlug =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "event";

  const filename = `${Date.now()}-${safeSlug}-${crypto.randomBytes(3).toString("hex")}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "news");
  const targetPath = path.join(uploadDir, filename);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(targetPath, buffer);
    return NextResponse.json(
      { url: `/images/news/${filename}` },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "File upload to local disk is unavailable on read-only serverless hosting. Please choose a studio preset or paste a hosted image URL (https://...).",
      },
      { status: 500 }
    );
  }
}
