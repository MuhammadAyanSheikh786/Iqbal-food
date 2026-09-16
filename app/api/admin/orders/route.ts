import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { desc } from "drizzle-orm";

// Simple token validation — check if request has admin session token header
function isAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return !!token; // Trust presence of token (set from sessionStorage client-side)
}

export async function GET(req: NextRequest) {
  try {
    const allOrders = await db.query.orders.findMany({
      with: { items: true, user: true },
      orderBy: [desc(orders.createdAt)],
    });
    return NextResponse.json(Array.isArray(allOrders) ? allOrders : []);
  } catch (err) {
    console.error(err);
    // Return empty array so client .map() never crashes
    return NextResponse.json([]);
  }
}
