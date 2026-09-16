import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { uid, name, email, image } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim());
    const isAdmin = adminEmails.includes(email);

    // Check if user exists
    const existing = await db.query.users.findFirst({
      where: eq(users.firebaseUid, uid),
    });

    if (existing) {
      // Update name/image if changed
      await db
        .update(users)
        .set({ name: name ?? existing.name, image: image ?? existing.image })
        .where(eq(users.firebaseUid, uid));
      return NextResponse.json({ id: existing.id, isAdmin: existing.isAdmin });
    }

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({ firebaseUid: uid, name: name ?? "User", email, image, isAdmin })
      .returning();

    return NextResponse.json({ id: newUser.id, isAdmin: newUser.isAdmin });
  } catch (err) {
    console.error("upsert-user error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
