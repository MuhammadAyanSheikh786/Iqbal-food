import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function fix() {
  console.log("Fixing customer_address column...");

  try {
    // Make customer_address nullable / give it a default so old rows still work
    // and new inserts without it don't fail
    await sql`ALTER TABLE orders ALTER COLUMN customer_address SET DEFAULT ''`;
    await sql`ALTER TABLE orders ALTER COLUMN customer_address DROP NOT NULL`;
    console.log("✅ customer_address is now nullable with default empty string");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("does not exist")) {
      console.log("ℹ️  customer_address column doesn't exist — nothing to fix");
    } else {
      console.error("Error:", msg);
    }
  }

  process.exit(0);
}

fix();
