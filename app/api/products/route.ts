import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const all = await db.query.products.findMany({
      where: categoryId
        ? eq(products.categoryId, parseInt(categoryId))
        : eq(products.available, true),
      with: { category: true },
      orderBy: [asc(products.categoryId), asc(products.id)],
    });
    return NextResponse.json(all);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, image, categoryId, featured } = body;
    if (!name || !price || !categoryId)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const [product] = await db
      .insert(products)
      .values({ name, description: description ?? "", price, image: image ?? "", categoryId, featured: featured ?? false })
      .returning();
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
