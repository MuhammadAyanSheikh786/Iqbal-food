import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  phone: text("phone"),
  address: text("address"),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  label: text("label").notNull(),
  emoji: text("emoji").notNull().default("🍽️"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Products ─────────────────────────────────────────────────────────────────
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: doublePrecision("price").notNull(),
  image: text("image").notNull().default(""),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  available: boolean("available").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Orders ───────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"       // new order, waiting admin approval
  | "approved"      // admin approved → preparation starts
  | "preparation"   // being prepared
  | "packing"       // being packed
  | "on_way"        // out for delivery
  | "delivered"     // delivered
  | "cancelled";    // cancelled

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("pending") as ReturnType<typeof text>,
  total: doublePrecision("total").notNull(),
  // Delivery details
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerHouse: text("customer_house").notNull().default(""),
  customerStreet: text("customer_street").notNull().default(""),
  customerLandmark: text("customer_landmark").notNull().default(""),
  customerArea: text("customer_area").notNull().default(""),
  customerPostalCode: text("customer_postal_code").notNull().default(""),
  customerCity: text("customer_city").notNull().default("Karachi"),
  customerFatherName: text("customer_father_name").notNull().default(""),
  customerEmail: text("customer_email").notNull().default(""),
  customerWhatsapp: text("customer_whatsapp").notNull().default(""),
  customerLat: doublePrecision("customer_lat"),
  customerLng: doublePrecision("customer_lng"),
  note: text("note").default(""),
  // Timestamps per stage
  approvedAt: timestamp("approved_at"),
  preparationAt: timestamp("preparation_at"),
  packingAt: timestamp("packing_at"),
  onWayAt: timestamp("on_way_at"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Order Items ──────────────────────────────────────────────────────────────
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id"), // nullable — static menu items may not exist in DB
  name: text("name").notNull(),  // snapshot at order time
  price: doublePrecision("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

// ─── Relations ────────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// ─── Types ────────────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
