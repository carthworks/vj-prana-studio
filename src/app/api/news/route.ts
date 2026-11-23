import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  createNewsItem,
  getAllNewsItems,
  getPublishedNewsItems,
} from "@/lib/newsStore";
import { newsItemInputSchema } from "@/lib/newsValidation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "1";

  if (includeAll) {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }
    const items = await getAllNewsItems();
    return NextResponse.json({ items });
  }

  const items = await getPublishedNewsItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { message: "Please sign in with the admin password." },
      { status: 401 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = newsItemInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please review the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const item = await createNewsItem(parsed.data);
    revalidatePath("/");
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Could not save news item.",
      },
      { status: 500 }
    );
  }
}
