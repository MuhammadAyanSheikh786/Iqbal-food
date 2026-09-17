"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems, categories, type MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

// ─── Category Cards Data ──────────────────────────────────────────────────────
interface ExploreCategory {
  id: string;
  label: string;
  emoji: string;
  countLabel: string;
  image: string;
  matchesCategory?: string[]; // optionally match multiple category IDs
}

const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: "bar-bq",
    label: "Bar B.Q.",
    emoji: "🍖",
    countLabel: "10+ Items",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80",
    matchesCategory: ["bar-bq"],
  },
  {
    id: "bar-bq-roll",
    label: "Rolls",
    emoji: "🌯",
    countLabel: "10+ Items",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80",
    matchesCategory: ["bar-bq-roll"],
  },
  {
    id: "crispy-burger",
    label: "Burgers",
    emoji: "🍔",
    countLabel: "15+ Items",
    image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=400&q=80",
    matchesCategory: ["crispy-burger", "beef-burger", "chicken-burger", "fish-burger"],
  },
  {
    id: "chinese",
    label: "Chinese",
    emoji: "🥡",
    countLabel: "12+ Items",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    matchesCategory: ["chinese"],
  },
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    countLabel: "8+ Items",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    matchesCategory: ["pizza"],
  },
  {
    id: "fastfood",
    label: "Fast Food",
    emoji: "🍟",
    countLabel: "11+ Items",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
    matchesCategory: ["fastfood"],
  },
  {
    id: "wings-nuggets",
    label: "Wings & Bites",
    emoji: "🍗",
    countLabel: "5+ Items",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80",
    matchesCategory: ["wings-nuggets"],
  },
  {
    id: "biryani",
    label: "Biryani & Rice",
    emoji: "🍚",
    countLabel: "5+ Items",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&q=80",
    matchesCategory: ["biryani"],
  },
  {
    id: "soup",
    label: "Soups",
    emoji: "🍜",
    countLabel: "5+ Items",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    matchesCategory: ["soup"],
  },
  {
    id: "partha-roti",
    label: "Paratha & Drinks",
    emoji: "🫓",
    countLabel: "6+ Items",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
    matchesCategory: ["partha-roti"],
  },
];

// Popular items IDs curated for high conversion
const POPULAR_ITEM_IDS = [1, 38, 3, 12, 76, 33, 58, 25];

// ─── Food Card Component (BiteHub layout) ────────────────────────────────────
interface FoodCardProps {
  item: MenuItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function FoodCard({ item, isFavorite, onToggleFavorite }: FoodCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.priceValue,
      image: item.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  };

  return (
    <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:border-neutral-700 transition-all duration-300 overflow-hidden flex flex-col p-3 relative group">
      {/* Heart / Wishlist icon top right of image */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item.id);
        }}
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-primary transition-all shadow-sm active:scale-90 cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isFavorite ? "text-primary fill-primary scale-110 transition-transform" : "text-gray-400 dark:text-gray-300 transition-colors"}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image with 4:3 aspect ratio */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Title */}
      <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug mt-2" title={item.name}>
        {item.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-2" title={item.description}>
        {item.description}
      </p>

      {/* Bottom row: Price + Add to cart button */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="font-bold text-base text-gray-950 dark:text-white">{item.price}</span>
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} to cart`}
          className={`w-8 h-8 rounded-xl bg-primary hover:bg-red-700 text-white flex items-center justify-center font-bold text-lg shadow-sm active:scale-95 transition-all ${
            justAdded ? "bg-green-600 scale-105" : ""
          }`}
          title="Add to cart"
        >
          {justAdded ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            "+"
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-start mb-4 mt-8">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
        <h3 className="text-xl sm:text-2xl font-black uppercase text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

// ─── Category Subtitles ──────────────────────────────────────────────────────
const CATEGORY_SUBTITLES: Record<string, string> = {
  "bar-bq": "Smoky, tender, grilled over charcoal to perfection",
  "bar-bq-roll": "Soft golden parathas packed with spicy BBQ & tangy chatni",
  "fastfood": "Crispy broast, golden fries & toasted club sandwiches",
  "beef-burger": "Juicy grilled beef patties stacked with secret sauce",
  "crispy-burger": "Golden crispy zinger fillets with crunchy iceberg",
  "chicken-burger": "Tender chicken fillets with melted cheese & fresh toppings",
  "fish-burger": "Crispy & grilled fish fillets with creamy tartar",
  "wings-nuggets": "Crunchy glazed wings & bite-sized golden nuggets",
  "chinese": "Wok-tossed authentic gravies, fried rice & noodles",
  "soup": "Warm, hearty & nourishing hot soups",
  "biryani": "Fragrant basmati rice slow-cooked with whole spices",
  "pizza": "Stone-baked crust with loaded mozzarella & savory toppings",
  "partha-roti": "Freshly rolled parathas, hot chapatis & chilled beverages",
};

// ─── Main Menu Component ─────────────────────────────────────────────────────
export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { count, total } = useCart();
  const categorySliderRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollCategorySlider = (direction: "left" | "right") => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSelectExploreCategory = (category: ExploreCategory) => {
    setActiveCategory(category.id);
    setSearchQuery("");
    // Smoothly scroll down to full-menu section
    const target = document.getElementById("full-menu");
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleViewAllMenu = () => {
    setActiveCategory("all");
    setSearchQuery("");
    const target = document.getElementById("full-menu");
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Filtered menu items based on category + search
  const filteredItems = useMemo(() => {
    let list = menuItems;

    if (activeCategory !== "all") {
      // Check if activeCategory matches an ExploreCategory with multiple categories (e.g. Burgers)
      const exploreMatch = EXPLORE_CATEGORIES.find((c) => c.id === activeCategory);
      if (exploreMatch?.matchesCategory) {
        list = list.filter((item) => exploreMatch.matchesCategory!.includes(item.category));
      } else {
        list = list.filter((item) => item.category === activeCategory);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // Curated Popular items
  const popularDishes = useMemo(() => {
    const list = menuItems.filter((item) => POPULAR_ITEM_IDS.includes(item.id));
    return list.length ? list : menuItems.slice(0, 8);
  }, []);

  return (
    <section id="menu" className="bg-[#fcfcfc] dark:bg-[#0f0f0f] pb-28 pt-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: TOP PART - EXPLORE CATEGORIES
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="mb-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-4 sm:mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Browse By Taste
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Explore Categories
              </h2>
            </div>
            <button
              type="button"
              onClick={handleViewAllMenu}
              className="text-primary hover:text-red-700 font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition-colors cursor-pointer py-1"
            >
              View all categories
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Categories Horizontal Slider with Arrow Controls */}
          <div className="relative group/slider">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCategorySlider("left")}
              aria-label="Scroll left"
              className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-gray-100 dark:border-neutral-700 items-center justify-center text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary/40 transition-all active:scale-95 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {/* Scrollable Container */}
            <div
              ref={categorySliderRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 -mx-2 px-2"
            >
              {EXPLORE_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectExploreCategory(cat)}
                    className={`flex-shrink-0 w-32 sm:w-36 rounded-2xl p-2.5 sm:p-3 text-center transition-all duration-300 flex flex-col items-center cursor-pointer border ${
                      isActive
                        ? "bg-white dark:bg-neutral-800 border-primary shadow-md ring-2 ring-primary/20 -translate-y-1"
                        : "bg-white dark:bg-[#161616] border-gray-100 dark:border-neutral-800 shadow-xs hover:border-gray-200 dark:hover:border-neutral-700 hover:shadow-md hover:-translate-y-1"
                    }`}
                  >
                    {/* Rounded Image with Emoji Tag */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800 shadow-inner">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                      <span className="absolute bottom-1 right-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs text-xs px-1.5 py-0.5 rounded-lg shadow-xs">
                        {cat.emoji}
                      </span>
                    </div>

                    {/* Label & Item Count */}
                    <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white mt-2.5 truncate w-full text-center">
                      {cat.label}
                    </p>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                      {cat.countLabel}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCategorySlider("right")}
              aria-label="Scroll right"
              className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-gray-100 dark:border-neutral-700 items-center justify-center text-gray-700 dark:text-gray-200 hover:text-primary hover:border-primary/40 transition-all active:scale-95 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: MIDDLE PART - POPULAR DISHES
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="mb-14">
          {/* Header */}
          <div className="flex items-end justify-between mb-4 sm:mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Customer Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Popular Dishes
              </h2>
            </div>
            <button
              type="button"
              onClick={handleViewAllMenu}
              className="text-primary hover:text-red-700 font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition-colors cursor-pointer py-1"
            >
              View all menu
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Grid of Popular Items Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {popularDishes.map((item) => (
              <FoodCard
                key={`popular-${item.id}`}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3: FULL MENU WITH STICKY CATEGORY FILTER & SEARCH
      ══════════════════════════════════════════════════════════════════════ */}
      <div id="full-menu" className="scroll-mt-28">
        {/* Sticky category & search bar */}
        <div className="sticky top-[72px] z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-y border-gray-100 dark:border-neutral-800 shadow-xs transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Scrollable selector chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-bold border transition-all duration-200 cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-neutral-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700"
                  }`}
                >
                  All ({menuItems.length})
                </button>
                {categories.map((cat) => {
                  const catCount = menuItems.filter((i) => i.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery("");
                      }}
                      className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        activeCategory === cat.id
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-neutral-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700"
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                          activeCategory === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-gray-300"
                        }`}
                      >
                        {catCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64 flex-shrink-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes..."
                  className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:border-primary focus:bg-white dark:focus:bg-neutral-900 rounded-full pl-8 pr-8 py-1.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
                />
                <svg
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Menu Items Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* If user is actively searching */}
          {searchQuery.trim() !== "" ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-gray-800">
                  Search results for &ldquo;{searchQuery}&rdquo; ({filteredItems.length} items found)
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 my-4">
                  <span className="text-3xl mb-2 block">🔍</span>
                  <p className="text-gray-800 font-bold text-base">No dishes found</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching for another dish like &ldquo;Zinger&rdquo;, &ldquo;Tikka&rdquo;, or &ldquo;Biryani&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          ) : activeCategory === "all" ? (
            // All categories grouped
            categories.map((cat) => {
              const catItems = menuItems.filter((i) => i.category === cat.id);
              if (!catItems.length) return null;
              return (
                <div key={cat.id} className="mb-10">
                  <SectionHeader
                    title={cat.label}
                    subtitle={CATEGORY_SUBTITLES[cat.id] ?? "Fresh, bold flavors cooked to order"}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {catItems.map((item) => (
                      <FoodCard
                        key={item.id}
                        item={item}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Specific category filtered
            <div>
              <SectionHeader
                title={
                  categories.find((c) => c.id === activeCategory)?.label ??
                  EXPLORE_CATEGORIES.find((c) => c.id === activeCategory)?.label ??
                  "Menu"
                }
                subtitle={CATEGORY_SUBTITLES[activeCategory] ?? "Freshly made with authentic spices & quality ingredients"}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
              {!filteredItems.length && (
                <p className="text-center text-gray-400 py-16 text-sm">No items in this category.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Floating Cart Bottom Bar ── */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-4 py-3 sm:py-3.5">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-primary flex items-center justify-center font-black text-lg border border-red-100 flex-shrink-0">
                🛒
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-gray-900">
                  {count} {count === 1 ? "item" : "items"} in your order
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary">
                  Total: Rs. {total.toLocaleString()}
                </p>
              </div>
            </div>
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-200 active:scale-95 flex-shrink-0"
            >
              <span>View Cart</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
