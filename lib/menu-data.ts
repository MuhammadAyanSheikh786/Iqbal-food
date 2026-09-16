export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: "bar-bq", label: "Bar B.Q.", emoji: "🍖" },
  { id: "bar-bq-roll", label: "Bar B.Q. Roll", emoji: "🌯" },
  { id: "fastfood", label: "Fast Food", emoji: "🍟" },
  { id: "beef-burger", label: "Beef Burger", emoji: "🍔" },
  { id: "crispy-burger", label: "Crispy Burger", emoji: "🍔" },
  { id: "chicken-burger", label: "Chicken Burger", emoji: "🍗" },
  { id: "fish-burger", label: "Fish Burger", emoji: "🐟" },
  { id: "wings-nuggets", label: "Wings & Nuggets", emoji: "🍗" },
  { id: "chinese", label: "Chinese", emoji: "🥡" },
  { id: "soup", label: "Soup", emoji: "🍜" },
  { id: "biryani", label: "Biryani", emoji: "🍚" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "partha-roti", label: "Paratha, Roti & Beverages", emoji: "🫓" },
];

export const menuItems: MenuItem[] = [
  // BAR B.Q.
  { id: 1, name: "Chicken Tikka Leg", description: "Tender chicken tikka leg marinated in spices, grilled to perfection.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 2, name: "Chicken Tikka Chest", description: "Juicy chicken tikka chest piece with rich smoky flavour.", price: "Rs. 420", priceValue: 420, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 3, name: "Chicken Malai Boti (Plate)", description: "Creamy malai boti on a sizzling plate, soft and flavourful.", price: "Rs. 680", priceValue: 680, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 4, name: "Chicken Behari Boti (Plate)", description: "Classic Behari boti with rich spice blend.", price: "Rs. 650", priceValue: 650, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 5, name: "Chicken Reshmi Kabab (Plate)", description: "Silky smooth reshmi kabab made with tender chicken mince.", price: "Rs. 600", priceValue: 600, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 6, name: "Chanda Kabab (Plate)", description: "Special chanda kabab with a unique blend of spices.", price: "Rs. 650", priceValue: 650, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 7, name: "Fry Kabab", description: "Crispy fried kabab with a golden crust.", price: "Rs. 750", priceValue: 750, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", category: "bar-bq" },
  { id: 8, name: "Beef Boti (Plate)", description: "Tender beef boti grilled with traditional spices.", price: "Rs. 650", priceValue: 650, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "bar-bq" },
  { id: 9, name: "Beef Gola Kabab (Plate)", description: "Juicy beef gola kabab with aromatic herbs.", price: "Rs. 600", priceValue: 600, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "bar-bq" },
  { id: 10, name: "Beef Dhaga Kabab (Plate)", description: "Classic beef dhaga kabab on a sizzling platter.", price: "Rs. 600", priceValue: 600, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "bar-bq" },

  // BAR B.Q. ROLL
  { id: 11, name: "Chicken Kabab Chatni Roll", description: "Soft roll filled with chicken kabab and green chatni.", price: "Rs. 250", priceValue: 250, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 12, name: "Chicken Kabab Mayo Roll", description: "Chicken kabab roll with creamy mayo.", price: "Rs. 280", priceValue: 280, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 13, name: "Chicken Kabab Cheese Roll", description: "Chicken kabab with melted cheese in a soft roll.", price: "Rs. 300", priceValue: 300, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 14, name: "Chicken Behari Boti Roll", description: "Behari boti wrapped in a soft roll.", price: "Rs. 250", priceValue: 250, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 15, name: "Chicken Behari Boti Mayo Roll", description: "Behari boti with mayo in a soft roll.", price: "Rs. 280", priceValue: 280, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 16, name: "Chicken Malai Boti Roll", description: "Creamy malai boti wrapped in a fresh roll.", price: "Rs. 300", priceValue: 300, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 17, name: "Beef Boti Chanti Roll", description: "Beef boti with tangy chatni in a roll.", price: "Rs. 250", priceValue: 250, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 18, name: "Beef Boti Mayo Roll", description: "Beef boti with mayo in a soft roll.", price: "Rs. 280", priceValue: 280, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 19, name: "Beef Kabab Chatni Roll", description: "Beef kabab with chatni in a fresh roll.", price: "Rs. 250", priceValue: 250, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },
  { id: 20, name: "Beef Kabab Mayo Roll", description: "Beef kabab with creamy mayo in a roll.", price: "Rs. 280", priceValue: 280, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "bar-bq-roll" },

  // FAST FOOD
  { id: 21, name: "Chicken Broast Qtr. Leg", description: "Quarter leg broast chicken, crispy and juicy.", price: "Rs. 430", priceValue: 430, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "fastfood" },
  { id: 22, name: "Chicken Broast Qtr. Chest", description: "Quarter chest broast chicken, golden and crispy.", price: "Rs. 450", priceValue: 450, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "fastfood" },
  { id: 23, name: "French Fries", description: "Crispy golden french fries with sea salt.", price: "Rs. 100", priceValue: 100, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", category: "fastfood" },
  { id: 24, name: "French Fries Mayo Garlic", description: "French fries topped with garlic mayo sauce.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", category: "fastfood" },
  { id: 25, name: "French Fries Mayo Garlic Cheese", description: "French fries with garlic mayo and melted cheese.", price: "Rs. 200", priceValue: 200, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", category: "fastfood" },
  { id: 26, name: "Pizza Roll", description: "Pizza flavoured roll, crispy outside and loaded inside.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "fastfood" },
  { id: 27, name: "Chipotle Fries", description: "Fries tossed in smoky chipotle seasoning.", price: "Rs. 500", priceValue: 500, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", category: "fastfood" },
  { id: 28, name: "Special Club", description: "Club sandwich with chicken, veggies and sauces.", price: "Rs. 460", priceValue: 460, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80", category: "fastfood" },
  { id: 29, name: "Chicken Sandwich", description: "Crispy chicken fillet sandwich with fresh veggies.", price: "Rs. 350", priceValue: 350, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80", category: "fastfood" },
  { id: 30, name: "Chicken Cheese Sandwich", description: "Chicken sandwich loaded with melted cheese.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80", category: "fastfood" },
  { id: 31, name: "Chicken Club Sandwich", description: "Triple-decker chicken club sandwich.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80", category: "fastfood" },

  // BEEF BURGER
  { id: 32, name: "Beef Burger", description: "Classic beef patty burger with fresh lettuce and tomato.", price: "Rs. 350", priceValue: 350, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },
  { id: 33, name: "Beef Cheese Burger", description: "Beef burger loaded with melted cheese.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },
  { id: 34, name: "Beef Egg Burger", description: "Beef burger topped with a fried egg.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },
  { id: 35, name: "Beef Egg Cheese Burger", description: "Beef burger with fried egg and melted cheese.", price: "Rs. 450", priceValue: 450, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },
  { id: 36, name: "Double Decker Beef Burger", description: "Two beef patties stacked high with fresh toppings.", price: "Rs. 670", priceValue: 670, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },
  { id: 37, name: "Double Decker Beef Cheese Burger", description: "Double beef patties with double cheese.", price: "Rs. 720", priceValue: 720, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "beef-burger" },

  // CRISPY BURGER
  { id: 38, name: "Zinger Burger", description: "Classic crispy zinger fillet burger.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },
  { id: 39, name: "Zinger Cheese Burger", description: "Crispy zinger fillet with melted cheese.", price: "Rs. 450", priceValue: 450, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },
  { id: 40, name: "Hot Zinger Burger", description: "Spicy crispy zinger fillet burger.", price: "Rs. 350", priceValue: 350, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },
  { id: 41, name: "Hot Zinger Cheese Burger", description: "Spicy zinger with melted cheese.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },
  { id: 42, name: "Mega Zinger Burger", description: "Extra large crispy zinger burger.", price: "Rs. 790", priceValue: 790, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },
  { id: 43, name: "Mega Zinger Cheese Burger", description: "Extra large zinger with double cheese.", price: "Rs. 840", priceValue: 840, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80", category: "crispy-burger" },

  // CHICKEN BURGER
  { id: 44, name: "Chicken Burger", description: "Tender chicken fillet burger with fresh toppings.", price: "Rs. 350", priceValue: 350, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 45, name: "Chicken Cheese Burger", description: "Chicken fillet burger with melted cheese.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 46, name: "Chicken Egg Burger", description: "Chicken burger topped with fried egg.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 47, name: "Chicken Egg Cheese Burger", description: "Chicken, fried egg and melted cheese burger.", price: "Rs. 450", priceValue: 450, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 48, name: "Double Decker Chicken Burger", description: "Two chicken fillets stacked in one burger.", price: "Rs. 680", priceValue: 680, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 49, name: "Jalapino Burger", description: "Spicy jalapeño chicken burger with tangy sauce.", price: "Rs. 490", priceValue: 490, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 50, name: "American Burger", description: "Classic American style chicken burger.", price: "Rs. 590", priceValue: 590, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 51, name: "Staff Burger", description: "Our chef's special loaded staff burger.", price: "Rs. 640", priceValue: 640, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },
  { id: 52, name: "Classic Burger", description: "Simple, classic chicken burger done right.", price: "Rs. 390", priceValue: 390, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chicken-burger" },

  // FISH BURGER
  { id: 53, name: "Fish Burger", description: "Crispy fish fillet burger with tartar sauce.", price: "Rs. 390", priceValue: 390, image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&q=80", category: "fish-burger" },
  { id: 54, name: "Fish Grill Burger", description: "Grilled fish fillet burger with fresh veggies.", price: "Rs. 420", priceValue: 420, image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&q=80", category: "fish-burger" },

  // WINGS & NUGGETS
  { id: 55, name: "Honey Wings 4 Pcs", description: "4 pieces of sweet and sticky honey glazed wings.", price: "Rs. 400", priceValue: 400, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80", category: "wings-nuggets" },
  { id: 56, name: "Nuggets 6 Pcs", description: "6 crispy golden chicken nuggets.", price: "Rs. 350", priceValue: 350, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80", category: "wings-nuggets" },
  { id: 57, name: "Chicken Strips 5 Pcs", description: "5 crispy chicken strips with dipping sauce.", price: "Rs. 480", priceValue: 480, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80", category: "wings-nuggets" },

  // CHINESE
  { id: 58, name: "Chicken Shashlik with Rice", description: "Grilled chicken shashlik served with steamed rice.", price: "Rs. 590", priceValue: 590, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category: "chinese" },
  { id: 59, name: "Chicken Manchurian with Rice", description: "Classic chicken manchurian with steamed rice.", price: "Rs. 560", priceValue: 560, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category: "chinese" },
  { id: 60, name: "Chicken Chilli Dry with Rice", description: "Spicy dry chilli chicken with rice.", price: "Rs. 590", priceValue: 590, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category: "chinese" },
  { id: 61, name: "Chicken Jalfrezi with Rice", description: "Jalfrezi style chicken stir fry with rice.", price: "Rs. 660", priceValue: 660, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category: "chinese" },
  { id: 62, name: "Garlic Chicken with Rice", description: "Sizzling garlic chicken served with rice.", price: "Rs. 560", priceValue: 560, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", category: "chinese" },
  { id: 63, name: "Chicken Fried Rice", description: "Classic egg fried rice with chicken.", price: "Rs. 380", priceValue: 380, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80", category: "chinese" },
  { id: 64, name: "Vegetable Fried Rice", description: "Stir fried rice with fresh vegetables.", price: "Rs. 250", priceValue: 250, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80", category: "chinese" },
  { id: 65, name: "Beef Fried Rice", description: "Fried rice tossed with tender beef.", price: "Rs. 380", priceValue: 380, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80", category: "chinese" },
  { id: 66, name: "Beef Chilli with Rice", description: "Spicy beef chilli dry served with rice.", price: "Rs. 590", priceValue: 590, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80", category: "chinese" },
  { id: 67, name: "Chicken Chowmein", description: "Classic stir fried noodles with chicken.", price: "Rs. 490", priceValue: 490, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80", category: "chinese" },
  { id: 68, name: "Beef Chowmein", description: "Stir fried noodles with tender beef.", price: "Rs. 490", priceValue: 490, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80", category: "chinese" },

  // SOUP
  { id: 69, name: "Chicken Corn Soup", description: "Classic creamy chicken corn soup.", price: "Rs. 180", priceValue: 180, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", category: "soup" },
  { id: 70, name: "Hot & Sour Soup", description: "Spicy and tangy hot & sour soup.", price: "Rs. 200", priceValue: 200, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", category: "soup" },
  { id: 71, name: "Hot & Sour Soup (White)", description: "Creamy white hot & sour soup.", price: "Rs. 180", priceValue: 180, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", category: "soup" },
  { id: 72, name: "Vegetable Soup", description: "Light and healthy vegetable soup.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", category: "soup" },
  { id: 73, name: "Thai Soup", description: "Fragrant Thai style soup with herbs.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", category: "soup" },

  // BIRYANI
  { id: 74, name: "Chicken Biryani (Plate)", description: "Aromatic chicken biryani cooked with whole spices.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&q=80", category: "biryani" },
  { id: 75, name: "Beef Pulao (Plate)", description: "Slow cooked beef pulao with fragrant rice.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&q=80", category: "biryani" },

  // PIZZA
  { id: 76, name: "Tikka Flavour Pizza (Small)", description: "Tandoori tikka flavoured pizza, small size.", price: "Rs. 500", priceValue: 500, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },
  { id: 77, name: "Tikka Flavour Pizza (Medium)", description: "Tandoori tikka flavoured pizza, medium size.", price: "Rs. 700", priceValue: 700, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },
  { id: 78, name: "Tikka Flavour Pizza (Large)", description: "Tandoori tikka flavoured pizza, large size.", price: "Rs. 1000", priceValue: 1000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },
  { id: 79, name: "Fajita Flavour Pizza (Small)", description: "Fajita style pizza with peppers and chicken, small.", price: "Rs. 500", priceValue: 500, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },
  { id: 80, name: "Macroni Flavour Pizza (Medium)", description: "Macaroni topped pizza, medium size.", price: "Rs. 700", priceValue: 700, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },
  { id: 81, name: "Afghani Flavour Pizza (Large)", description: "Afghani spiced pizza, large size.", price: "Rs. 1000", priceValue: 1000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", category: "pizza" },

  // PARATHA, ROTI & BEVERAGES
  { id: 82, name: "Fry Puri Paratha (Large)", description: "Large crispy fried puri paratha.", price: "Rs. 150", priceValue: 150, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", category: "partha-roti" },
  { id: 83, name: "Chota Tawa Paratha", description: "Small tawa paratha, soft and flaky.", price: "Rs. 70", priceValue: 70, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", category: "partha-roti" },
  { id: 84, name: "Chapati", description: "Fresh soft chapati.", price: "Rs. 20", priceValue: 20, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", category: "partha-roti" },
  { id: 85, name: "Soft Drinks", description: "Chilled soft drink (Pepsi/7UP/Mirinda).", price: "Rs. 60", priceValue: 60, image: "https://images.unsplash.com/photo-1507281549113-040fcfef650e?w=400&q=80", category: "partha-roti" },
  { id: 86, name: "Water Small", description: "Small bottle of mineral water.", price: "Rs. 40", priceValue: 40, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80", category: "partha-roti" },
  { id: 87, name: "Water Large", description: "Large bottle of mineral water.", price: "Rs. 120", priceValue: 120, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80", category: "partha-roti" },
];
