import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, orderItems, users } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

// GET orders — admin gets all, user gets own
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const adminMode = searchParams.get("admin") === "1";

    if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });

    // Get DB user
    const dbUser = await db.query.users.findFirst({ where: eq(users.firebaseUid, uid) });
    if (!dbUser) return NextResponse.json([]);

    const allOrders = await db.query.orders.findMany({
      where: adminMode && dbUser.isAdmin ? undefined : eq(orders.userId, dbUser.id),
      with: { items: true, user: true },
      orderBy: [desc(orders.createdAt)],
    });

    return NextResponse.json(Array.isArray(allOrders) ? allOrders : []);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}

// POST create order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, items, customerName, customerFatherName, customerEmail, customerPhone, customerWhatsapp,
      customerHouse, customerStreet, customerLandmark, customerArea, customerPostalCode, customerCity,
      customerLat, customerLng, note } = body;

    if (!uid || !items?.length || !customerName || !customerPhone || !customerHouse || !customerStreet || !customerCity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get DB user
    const dbUser = await db.query.users.findFirst({ where: eq(users.firebaseUid, uid) });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const total = items.reduce(
      (s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity,
      0
    );

    const [order] = await db
      .insert(orders)
      .values({
        userId: dbUser.id,
        total,
        customerName,
        customerPhone,
        customerHouse: customerHouse ?? "",
        customerStreet: customerStreet ?? "",
        customerLandmark: customerLandmark ?? "",
        customerArea: customerArea ?? "",
        customerPostalCode: customerPostalCode ?? "",
        customerCity: customerCity ?? "Karachi",
        customerFatherName: customerFatherName ?? "",
        customerEmail: customerEmail ?? "",
        customerWhatsapp: customerWhatsapp ?? "",
        customerLat: customerLat ?? null,
        customerLng: customerLng ?? null,
        note: note ?? "",
        status: "pending",
      })
      .returning();

    await db.insert(orderItems).values(
      items.map((i: { id: number; name: string; price: number; quantity: number }) => ({
        orderId: order.id,
        productId: null, // static menu — no DB product record needed
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      }))
    );

    // Return the order with items directly (avoids relation query issues)
    return NextResponse.json(
      {
        ...order,
        items: items.map((i: { id: number; name: string; price: number; quantity: number }) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/orders error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
