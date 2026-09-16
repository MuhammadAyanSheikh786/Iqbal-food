import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import type { OrderStatus } from "@/lib/schema";

const STATUS_TIMESTAMPS: Record<OrderStatus, keyof typeof orders.$inferInsert> = {
  approved: "approvedAt",
  preparation: "preparationAt",
  packing: "packingAt",
  on_way: "onWayAt",
  delivered: "deliveredAt",
  pending: "updatedAt",
  cancelled: "updatedAt",
};

// GET single order
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, parseInt(id)),
      with: { items: true, user: true },
    });
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH update order status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json() as { status: OrderStatus };

    const tsField = STATUS_TIMESTAMPS[status];
    const updateData: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
    };
    if (tsField && tsField !== "updatedAt") {
      updateData[tsField] = new Date();
    }

    const [updated] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
