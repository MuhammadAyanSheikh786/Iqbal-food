import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const categoriesData = [
  { slug: "bar-bq",        label: "Bar B.Q.",                  emoji: "🍖", sortOrder: 1 },
  { slug: "bar-bq-roll",   label: "Bar B.Q. Roll",             emoji: "🌯", sortOrder: 2 },
  { slug: "fastfood",      label: "Fast Food",                 emoji: "🍟", sortOrder: 3 },
  { slug: "beef-burger",   label: "Beef Burger",               emoji: "🍔", sortOrder: 4 },
  { slug: "crispy-burger", label: "Crispy Burger",             emoji: "🍔", sortOrder: 5 },
  { slug: "chicken-burger",label: "Chicken Burger",            emoji: "🍗", sortOrder: 6 },
  { slug: "fish-burger",   label: "Fish Burger",               emoji: "🐟", sortOrder: 7 },
  { slug: "wings-nuggets", label: "Wings & Nuggets",           emoji: "🍗", sortOrder: 8 },
  { slug: "chinese",       label: "Chinese",                   emoji: "🥡", sortOrder: 9 },
  { slug: "soup",          label: "Soup",                      emoji: "🍜", sortOrder: 10 },
  { slug: "biryani",       label: "Biryani",                   emoji: "🍚", sortOrder: 11 },
  { slug: "pizza",         label: "Pizza",                     emoji: "🍕", sortOrder: 12 },
  { slug: "partha-roti",   label: "Paratha, Roti & Beverages", emoji: "🫓", sortOrder: 13 },
];

// placeholder image — replace with ImageKit URLs from admin panel
const IMG = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80";
const IMG_BBQ = "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80";
const IMG_ROLL = "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80";
const IMG_FF = "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80";
const IMG_FRIES = "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80";
const IMG_BURGER = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80";
const IMG_FISH = "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&q=80";
const IMG_WINGS = "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80";
const IMG_CHINESE = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80";
const IMG_SOUP = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80";
const IMG_BIRYANI = "https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&q=80";
const IMG_PIZZA = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80";
const IMG_BREAD = "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80";
const IMG_DRINK = "https://images.unsplash.com/photo-1507281549113-040fcfef650e?w=400&q=80";

const productsData: { name: string; description: string; price: number; image: string; categorySlug: string; }[] = [
  // BAR B.Q.
  { name: "Chicken Tikka Leg",           description: "Tender chicken tikka leg, grilled to perfection.", price: 400,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Chicken Tikka Chest",         description: "Juicy chicken tikka chest with smoky flavour.",    price: 420,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Chicken Malai Boti (Plate)",  description: "Creamy malai boti on a sizzling plate.",           price: 680,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Chicken Behari Boti (Plate)", description: "Classic Behari boti with rich spice blend.",       price: 650,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Chicken Reshmi Kabab (Plate)",description: "Silky reshmi kabab with tender chicken mince.",    price: 600,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Chanda Kabab (Plate)",        description: "Special chanda kabab with unique spices.",         price: 650,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Fry Kabab",                   description: "Crispy fried kabab with golden crust.",            price: 750,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Beef Boti (Plate)",           description: "Tender beef boti grilled with traditional spices.",price: 650,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Beef Gola Kabab (Plate)",     description: "Juicy beef gola kabab with aromatic herbs.",       price: 600,  image: IMG_BBQ, categorySlug: "bar-bq" },
  { name: "Beef Dhaga Kabab (Plate)",    description: "Classic beef dhaga kabab on sizzling platter.",    price: 600,  image: IMG_BBQ, categorySlug: "bar-bq" },
  // BAR B.Q. ROLL
  { name: "Chicken Kabab Chatni Roll",   description: "Chicken kabab with green chatni in soft roll.",    price: 250,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Chicken Kabab Mayo Roll",     description: "Chicken kabab roll with creamy mayo.",             price: 280,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Chicken Kabab Cheese Roll",   description: "Chicken kabab with melted cheese in a roll.",      price: 300,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Chicken Behari Boti Roll",    description: "Behari boti wrapped in a soft roll.",              price: 250,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Chicken Behari Boti Mayo Roll",description:"Behari boti with mayo in a soft roll.",            price: 280,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Chicken Malai Boti Roll",     description: "Creamy malai boti in a fresh roll.",               price: 300,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Beef Boti Chanti Roll",       description: "Beef boti with tangy chatni in a roll.",           price: 250,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Beef Boti Mayo Roll",         description: "Beef boti with mayo in a soft roll.",              price: 280,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Beef Kabab Chatni Roll",      description: "Beef kabab with chatni in a fresh roll.",          price: 250,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  { name: "Beef Kabab Mayo Roll",        description: "Beef kabab with creamy mayo in a roll.",           price: 280,  image: IMG_ROLL, categorySlug: "bar-bq-roll" },
  // FAST FOOD
  { name: "Chicken Broast Qtr. Leg",    description: "Quarter leg broast chicken, crispy and juicy.",    price: 430,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "Chicken Broast Qtr. Chest",  description: "Quarter chest broast chicken, golden and crispy.", price: 450,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "French Fries",               description: "Crispy golden french fries with sea salt.",        price: 100,  image: IMG_FRIES, categorySlug: "fastfood" },
  { name: "French Fries Mayo Garlic",   description: "French fries topped with garlic mayo sauce.",      price: 150,  image: IMG_FRIES, categorySlug: "fastfood" },
  { name: "French Fries Garlic Cheese", description: "French fries with garlic mayo and melted cheese.", price: 200,  image: IMG_FRIES, categorySlug: "fastfood" },
  { name: "Pizza Roll",                 description: "Pizza flavoured roll, crispy outside.",            price: 400,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "Chipotle Fries",             description: "Fries tossed in smoky chipotle seasoning.",        price: 500,  image: IMG_FRIES, categorySlug: "fastfood" },
  { name: "Special Club",               description: "Club sandwich with chicken, veggies & sauces.",    price: 460,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "Chicken Sandwich",           description: "Crispy chicken fillet sandwich.",                  price: 350,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "Chicken Cheese Sandwich",    description: "Chicken sandwich loaded with melted cheese.",      price: 400,  image: IMG_FF, categorySlug: "fastfood" },
  { name: "Chicken Club Sandwich",      description: "Triple-decker chicken club sandwich.",             price: 400,  image: IMG_FF, categorySlug: "fastfood" },
  // BEEF BURGER
  { name: "Beef Burger",                description: "Classic beef patty burger.",                       price: 350,  image: IMG_BURGER, categorySlug: "beef-burger" },
  { name: "Beef Cheese Burger",         description: "Beef burger loaded with melted cheese.",           price: 400,  image: IMG_BURGER, categorySlug: "beef-burger" },
  { name: "Beef Egg Burger",            description: "Beef burger topped with fried egg.",               price: 400,  image: IMG_BURGER, categorySlug: "beef-burger" },
  { name: "Beef Egg Cheese Burger",     description: "Beef burger with fried egg and cheese.",           price: 450,  image: IMG_BURGER, categorySlug: "beef-burger" },
  { name: "Double Decker Beef Burger",  description: "Two beef patties stacked high.",                   price: 670,  image: IMG_BURGER, categorySlug: "beef-burger" },
  { name: "Double Decker Beef Cheese",  description: "Double beef patties with double cheese.",          price: 720,  image: IMG_BURGER, categorySlug: "beef-burger" },
  // CRISPY BURGER
  { name: "Zinger Burger",              description: "Classic crispy zinger fillet burger.",             price: 400,  image: IMG_FF, categorySlug: "crispy-burger" },
  { name: "Zinger Cheese Burger",       description: "Crispy zinger fillet with melted cheese.",         price: 450,  image: IMG_FF, categorySlug: "crispy-burger" },
  { name: "Hot Zinger Burger",          description: "Spicy crispy zinger fillet burger.",               price: 350,  image: IMG_FF, categorySlug: "crispy-burger" },
  { name: "Hot Zinger Cheese Burger",   description: "Spicy zinger with melted cheese.",                 price: 400,  image: IMG_FF, categorySlug: "crispy-burger" },
  { name: "Mega Zinger Burger",         description: "Extra large crispy zinger burger.",                price: 790,  image: IMG_FF, categorySlug: "crispy-burger" },
  { name: "Mega Zinger Cheese Burger",  description: "Extra large zinger with double cheese.",           price: 840,  image: IMG_FF, categorySlug: "crispy-burger" },
  // CHICKEN BURGER
  { name: "Chicken Burger",             description: "Tender chicken fillet burger.",                    price: 350,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Chicken Cheese Burger",      description: "Chicken fillet burger with melted cheese.",        price: 400,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Chicken Egg Burger",         description: "Chicken burger topped with fried egg.",            price: 400,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Chicken Egg Cheese Burger",  description: "Chicken, fried egg and melted cheese burger.",     price: 450,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Double Decker Chicken",      description: "Two chicken fillets stacked in one burger.",       price: 680,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Jalapino Burger",            description: "Spicy jalapeño chicken burger.",                   price: 490,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "American Burger",            description: "Classic American style chicken burger.",           price: 590,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Staff Burger",               description: "Chef's special loaded burger.",                    price: 640,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  { name: "Classic Burger",             description: "Simple classic chicken burger done right.",        price: 390,  image: IMG_BURGER, categorySlug: "chicken-burger" },
  // FISH BURGER
  { name: "Fish Burger",                description: "Crispy fish fillet burger with tartar sauce.",     price: 390,  image: IMG_FISH, categorySlug: "fish-burger" },
  { name: "Fish Grill Burger",          description: "Grilled fish fillet burger with fresh veggies.",   price: 420,  image: IMG_FISH, categorySlug: "fish-burger" },
  // WINGS & NUGGETS
  { name: "Honey Wings 4 Pcs",          description: "4 pcs sweet and sticky honey glazed wings.",       price: 400,  image: IMG_WINGS, categorySlug: "wings-nuggets" },
  { name: "Nuggets 6 Pcs",              description: "6 crispy golden chicken nuggets.",                 price: 350,  image: IMG_WINGS, categorySlug: "wings-nuggets" },
  { name: "Chicken Strips 5 Pcs",       description: "5 crispy chicken strips with dipping sauce.",      price: 480,  image: IMG_WINGS, categorySlug: "wings-nuggets" },
  // CHINESE
  { name: "Chicken Shashlik with Rice", description: "Grilled chicken shashlik with steamed rice.",      price: 590,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Chicken Manchurian with Rice",description:"Classic chicken manchurian with steamed rice.",    price: 560,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Chicken Chilli Dry with Rice",description:"Spicy dry chilli chicken with rice.",              price: 590,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Chicken Jalfrezi with Rice", description: "Jalfrezi style chicken stir fry with rice.",       price: 660,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Garlic Chicken with Rice",   description: "Sizzling garlic chicken served with rice.",        price: 560,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Chicken Fried Rice",         description: "Classic egg fried rice with chicken.",             price: 380,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Vegetable Fried Rice",       description: "Stir fried rice with fresh vegetables.",           price: 250,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Beef Fried Rice",            description: "Fried rice tossed with tender beef.",              price: 380,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Beef Chilli with Rice",      description: "Spicy beef chilli dry served with rice.",          price: 590,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Chicken Chowmein",           description: "Classic stir fried noodles with chicken.",        price: 490,  image: IMG_CHINESE, categorySlug: "chinese" },
  { name: "Beef Chowmein",              description: "Stir fried noodles with tender beef.",             price: 490,  image: IMG_CHINESE, categorySlug: "chinese" },
  // SOUP
  { name: "Chicken Corn Soup",          description: "Classic creamy chicken corn soup.",                price: 180,  image: IMG_SOUP, categorySlug: "soup" },
  { name: "Hot & Sour Soup",            description: "Spicy and tangy hot & sour soup.",                 price: 200,  image: IMG_SOUP, categorySlug: "soup" },
  { name: "Hot & Sour Soup (White)",    description: "Creamy white hot & sour soup.",                    price: 180,  image: IMG_SOUP, categorySlug: "soup" },
  { name: "Vegetable Soup",             description: "Light and healthy vegetable soup.",                price: 150,  image: IMG_SOUP, categorySlug: "soup" },
  { name: "Thai Soup",                  description: "Fragrant Thai style soup with herbs.",             price: 150,  image: IMG_SOUP, categorySlug: "soup" },
  // BIRYANI
  { name: "Chicken Biryani (Plate)",    description: "Aromatic chicken biryani with whole spices.",      price: 150,  image: IMG_BIRYANI, categorySlug: "biryani" },
  { name: "Beef Pulao (Plate)",         description: "Slow cooked beef pulao with fragrant rice.",       price: 150,  image: IMG_BIRYANI, categorySlug: "biryani" },
  // PIZZA
  { name: "Tikka Flavour Pizza (Small)",description: "Tandoori tikka pizza, small.",                     price: 500,  image: IMG_PIZZA, categorySlug: "pizza" },
  { name: "Tikka Flavour Pizza (Medium)",description:"Tandoori tikka pizza, medium.",                    price: 700,  image: IMG_PIZZA, categorySlug: "pizza" },
  { name: "Tikka Flavour Pizza (Large)", description:"Tandoori tikka pizza, large.",                     price: 1000, image: IMG_PIZZA, categorySlug: "pizza" },
  { name: "Fajita Flavour Pizza (Small)",description:"Fajita style pizza, small.",                       price: 500,  image: IMG_PIZZA, categorySlug: "pizza" },
  { name: "Macroni Flavour Pizza (Medium)",description:"Macaroni topped pizza, medium.",                 price: 700,  image: IMG_PIZZA, categorySlug: "pizza" },
  { name: "Afghani Flavour Pizza (Large)",description:"Afghani spiced pizza, large.",                    price: 1000, image: IMG_PIZZA, categorySlug: "pizza" },
  // PARATHA, ROTI & BEVERAGES
  { name: "Fry Puri Paratha (Large)",   description: "Large crispy fried puri paratha.",                 price: 150,  image: IMG_BREAD, categorySlug: "partha-roti" },
  { name: "Chota Tawa Paratha",         description: "Small tawa paratha, soft and flaky.",              price: 70,   image: IMG_BREAD, categorySlug: "partha-roti" },
  { name: "Chapati",                    description: "Fresh soft chapati.",                              price: 20,   image: IMG_BREAD, categorySlug: "partha-roti" },
  { name: "Soft Drinks",                description: "Chilled soft drink (Pepsi/7UP/Mirinda).",          price: 60,   image: IMG_DRINK, categorySlug: "partha-roti" },
  { name: "Water Small",                description: "Small bottle of mineral water.",                   price: 40,   image: IMG_DRINK, categorySlug: "partha-roti" },
  { name: "Water Large",                description: "Large bottle of mineral water.",                   price: 120,  image: IMG_DRINK, categorySlug: "partha-roti" },
];

async function seed() {
  console.log("🌱 Seeding categories...");

  // Insert categories
  const insertedCats = await db
    .insert(schema.categories)
    .values(categoriesData)
    .onConflictDoUpdate({
      target: schema.categories.slug,
      set: { label: schema.categories.label, emoji: schema.categories.emoji, sortOrder: schema.categories.sortOrder },
    })
    .returning();

  const catMap: Record<string, number> = {};
  insertedCats.forEach((c) => { catMap[c.slug] = c.id; });
  console.log(`✅ ${insertedCats.length} categories done`);

  console.log("🌱 Seeding products...");
  let count = 0;
  for (const p of productsData) {
    const categoryId = catMap[p.categorySlug];
    if (!categoryId) { console.warn(`⚠️  No category for slug: ${p.categorySlug}`); continue; }
    await db
      .insert(schema.products)
      .values({ name: p.name, description: p.description, price: p.price, image: p.image, categoryId })
      .onConflictDoNothing();
    count++;
  }
  console.log(`✅ ${count} products done`);
  console.log("🎉 Seed complete!");
  process.exit(0);
}

seed().catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); });
