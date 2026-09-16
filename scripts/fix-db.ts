import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function fix() {
  console.log("🔧 Fixing DB schema...");

  // 1. Make customer_address nullable (so old rows still work, new inserts skip it)
  try {
    await sql`ALTER TABLE orders ALTER COLUMN customer_address SET DEFAULT ''`;
    await sql`ALTER TABLE orders ALTER COLUMN customer_address DROP NOT NULL`;
    console.log("✅ customer_address: now nullable");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("does not exist")) console.log("ℹ️  customer_address: already gone");
    else console.log("customer_address fix:", msg);
  }

  // 2. Add new address columns if they don't exist
  const newCols = [
    ["customer_house",       "TEXT NOT NULL DEFAULT ''"],
    ["customer_street",      "TEXT NOT NULL DEFAULT ''"],
    ["customer_landmark",    "TEXT NOT NULL DEFAULT ''"],
    ["customer_area",        "TEXT NOT NULL DEFAULT ''"],
    ["customer_postal_code", "TEXT NOT NULL DEFAULT ''"],
    ["customer_city",        "TEXT NOT NULL DEFAULT 'Karachi'"],
  ] as const;

  for (const [col, def] of newCols) {
    try {
      await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS ${sql.unsafe(col)} ${sql.unsafe(def)}`;
      console.log(`✅ ${col}: added`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`${col}: ${msg}`);
    }
  }

  console.log("🎉 DB fix complete!");
  process.exit(0);
}

fix().catch((e) => { console.error(e); process.exit(1); });
