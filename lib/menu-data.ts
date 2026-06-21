export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: "burgers" | "fries" | "chips" | "drinks";
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Beef Burger",
    description:
      "Juicy 200g beef patty with lettuce, tomato, cheese, and our signature sauce in a brioche bun.",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    category: "burgers",
  },
  {
    id: 2,
    name: "Crispy Chicken Burger",
    description:
      "Double-breaded chicken breast fillet with coleslaw and spicy mayo on a toasted sesame bun.",
    price: "$8.99",
    image:
      "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80",
    category: "burgers",
  },
  {
    id: 3,
    name: "Smoky BBQ Bacon Burger",
    description:
      "Thick-cut beef patty topped with smoked bacon, cheddar, onion rings, and BBQ sauce.",
    price: "$11.99",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80",
    category: "burgers",
  },
  {
    id: 4,
    name: "Golden Fries",
    description:
      "Crispy golden fries seasoned with sea salt and herbs. Served with your choice of dipping sauce.",
    price: "$4.49",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
    category: "fries",
  },
  {
    id: 6,
    name: "Spicy Chili Fries",
    description:
      "Crispy fries topped with house-made chili, melted cheese, and fresh green onions.",
    price: "$7.49",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80",
    category: "fries",
  },
  {
    id: 7,
    name: "Classic Potato Chips",
    description:
      "Thick-cut kettle-cooked potato chips with a light sea salt crunch. Perfect for sharing.",
    price: "$3.99",
    image:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "chips",
  },
  {
    id: 8,
    name: "Tortilla Chips & Salsa",
    description:
      "Crunchy corn tortilla chips served with fresh tomato salsa and creamy guacamole.",
    price: "$5.49",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "chips",
  },
  {
    id: 9,
    name: "Fresh Lemonade",
    description:
      "House-squeezed lemonade with a hint of mint. Refreshingly cool and perfectly sweet.",
    price: "$2.99",
    image:
      "https://images.unsplash.com/photo-1507281549113-040fcfef650e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "drinks",
  },
  {
    id: 10,
    name: "Chocolate Milkshake",
    description:
      "Thick and creamy chocolate milkshake topped with whipped cream and chocolate shavings.",
    price: "$4.99",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
    category: "drinks",
  },
];

export const categories = [
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "fries", label: "Fries", emoji: "🍟" },
  { id: "chips", label: "Chips & Sides", emoji: "🥔" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
] as const;
