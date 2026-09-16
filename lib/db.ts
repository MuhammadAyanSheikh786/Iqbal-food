import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof createDb> | null = null;
let _sql: ReturnType<typeof neon> | null = null;

function createDb() {
  _sql = neon(process.env.DATABASE_URL!);
  return drizzle(_sql, { schema });
}

function ensureDb() {
  if (!_db) _db = createDb();
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    return Reflect.get(ensureDb(), prop);
  },
});

export const sql = new Proxy({} as ReturnType<typeof neon>, {
  get(_target, prop) {
    ensureDb();
    return Reflect.get(_sql!, prop);
  },
});