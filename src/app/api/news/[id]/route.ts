import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  deleteNewsItem,
  reorderNewsItem,
  updateNewsItem,
} from "@/lib/newsStore";
import { newsItemInputSchema } from "@/lib/newsValidation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Support lightweight reorder action { action: "move", direction: "up" | "down" }
  if (
    typeof payload === "object" &&
    payload !== null &&
    "action" in payload &&
    (payload as { action?: unknown }).action === "move"
  ) {
    const direction = (payload as { direction?: unknown }).direction;
    if (direction !== "up" && direction !== "down") {
      return NextResponse.json(
        { message: "Direction must be 'up' or 'down'." },
        { status: 400 }
      );
    }

    try {
      const items = await reorderNewsItem(id, direction);
      if (!items) {
        return NextResponse.json(
          { message: "News item not found." },
          { status: 404 }
        );
      }
      revalidatePath("/");
      return NextResponse.json({ items });
    } catch (error) {
      return NextResponse.json(
        {
          message:
            error instanceof Error
              ? error.message
              : "Could not reorder items.",
        },
        { status: 500 }
      );
    }
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
    const item = await updateNewsItem(id, parsed.data);
    if (!item) {
      return NextResponse.json(
        { message: "News item not found." },
        { status: 404 }
      );
    }
    revalidatePath("/");
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Could not update item.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteNewsItem(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "News item not found." },
        { status: 404 }
      );
    }
    revalidatePath("/");
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Could not delete item.",
      },
      { status: 500 }
    );
  }
}
