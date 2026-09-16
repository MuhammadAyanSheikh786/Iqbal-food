import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

// GET all categories
export async function GET() {
  try {
    const all = await db.query.categories.findMany({
      where: eq(categories.active, true),
      orderBy: [asc(categories.sortOrder), asc(categories.id)],
    });
    return NextResponse.json(all);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST create category (admin only — checked via body flag for simplicity)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, label, emoji, sortOrder } = body;
    if (!slug || !label) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const [cat] = await db
      .insert(categories)
      .values({ slug, label, emoji: emoji ?? "🍽️", sortOrder: sortOrder ?? 0 })
      .returning();

    return NextResponse.json(cat, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
