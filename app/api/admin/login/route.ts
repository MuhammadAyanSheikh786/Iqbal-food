import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Simple token — just a signed string. For production use JWT.
    const token = Buffer.from(`${adminEmail}:${Date.now()}`).toString("base64");

    return NextResponse.json({ token, email });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
