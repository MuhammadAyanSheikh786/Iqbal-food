"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { menuItems } from "@/lib/menu-data";
import { useState, useEffect, useRef } from "react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700", "900"] });

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-red-50 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200 cursor-pointer"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const { count, addItem } = useCart();
  const { user, signInWithGoogle, signOut } = useAuth();
  const pathname = usePathname();

  // Mobile Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Search Modal State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // About Us Modal State
  const [aboutOpen, setAboutOpen] = useState(false);

  // User Dropdown State
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  // Focus search input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Handle ESC key for modals and drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setAboutOpen(false);
        setDrawerOpen(false);
        setUserMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter menu items for quick search
  const filteredItems = searchQuery.trim()
    ? menuItems
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const isHome = pathname === "/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 shadow-sm transition-colors">
        <div className="h-16 sm:h-[72px] flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
          {/* ── Left: Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md shadow-red-200 dark:shadow-none group-hover:scale-105 transition-transform duration-200">
              <span>IF</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`${cinzel.className} text-base sm:text-xl font-bold tracking-wider text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors`}
              >
                Iqbal Food
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-gray-400 dark:text-gray-400 uppercase leading-none mt-0.5">
                RESTAURANT
              </span>
            </div>
          </Link>

          {/* ── Center: Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                isHome
                  ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#menu"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-1"
            >
              Menu
            </Link>
            <Link
              href="/#menu"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-1"
            >
              Categories
            </Link>
            <Link
              href="/#promo"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-1"
            >
              Offers
            </Link>
            <button
              type="button"
              onClick={() => setAboutOpen(true)}
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-1 cursor-pointer"
            >
              About Us
            </button>
            <Link
              href="#contact"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-1"
            >
              Contact
            </Link>
          </nav>

          {/* ── Right: Search + Theme Toggle + Profile + Cart + Hamburger ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search menu"
              className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-red-50 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* User Profile / Sign In */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                  className="w-10 h-10 rounded-full border-2 border-primary/30 hover:border-primary flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-primary font-bold text-sm transition-all duration-200 overflow-hidden cursor-pointer"
                >
                  {user.name ? (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  aria-label="Sign in with Google"
                  className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-red-50 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="Sign in"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 py-2 z-50 animate-fade-in-up">
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-neutral-800">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {user.name || "Customer"}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/my-orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-neutral-800 hover:text-primary transition-colors"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      </svg>
                      My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-neutral-800 hover:text-primary transition-colors"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-gray-100 dark:border-neutral-800 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              aria-label="View Cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:text-primary transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center px-1 shadow-md shadow-red-300 animate-fade-in-up">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation drawer"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden relative flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 dark:hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
            >
              <span
                className={`w-5 h-[2px] bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 absolute ${
                  drawerOpen ? "rotate-45 bg-primary" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`w-4 h-[2px] bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 absolute ml-[4px] ${
                  drawerOpen ? "opacity-0 translate-x-4" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 absolute ${
                  drawerOpen ? "-rotate-45 bg-primary" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Quick Search Modal ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 animate-fade-in-up">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, rolls, BBQ, deals..."
                className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            {!searchQuery && (
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Crispy Burger", "Chicken Tikka", "Malai Boti", "Roll", "Zinger"].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSearchQuery(tag)}
                        className="bg-white hover:bg-red-50 hover:text-primary hover:border-red-200 border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-600 transition-all"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-2">
              {searchQuery.trim() && filteredItems.length === 0 && (
                <div className="py-8 text-center text-gray-500 text-sm">
                  <p>No dishes found for &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching for burgers, bbq, or rolls
                  </p>
                </div>
              )}

              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {item.description}
                      </p>
                      <p className="text-xs font-black text-primary mt-0.5">
                        {item.price}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.priceValue,
                        image: item.image,
                      });
                    }}
                    className="flex-shrink-0 bg-primary hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors shadow-sm"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>

            {/* Footer shortcut */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Looking for full menu?</span>
              <Link
                href="/#menu"
                onClick={() => setSearchOpen(false)}
                className="font-bold text-primary hover:underline"
              >
                Browse All Dishes →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── About Us Modal ── */}
      {aboutOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in-up border border-gray-100">
            <button
              type="button"
              onClick={() => setAboutOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-200">
                IF
              </div>
              <div>
                <h3
                  className={`${cinzel.className} text-xl font-bold tracking-wider text-gray-900 leading-none`}
                >
                  Iqbal Food
                </h3>
                <p className="text-[11px] font-bold text-primary uppercase tracking-widest mt-1">
                  Our Culinary Heritage
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                Welcome to <strong>Iqbal Food</strong>, where authentic culinary
                tradition meets modern dining perfection. Since our inception,
                we have stayed true to our philosophy: fresh, 100% Halal certified
                meats, authentic secret marinades, and uncompromised quality.
              </p>
              <p>
                From sizzling grilled BBQ skewers and tender Behari boti to golden
                crispy zinger burgers and hearty shawarma rolls, every meal is
                crafted to deliver an unforgettable explosion of flavor.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="bg-red-50/60 rounded-2xl p-3 text-center border border-red-100">
                <span className="text-xl">🍗</span>
                <p className="text-[11px] font-bold text-gray-900 mt-1">100% Fresh</p>
                <p className="text-[9px] text-gray-500">Halal Certified</p>
              </div>
              <div className="bg-red-50/60 rounded-2xl p-3 text-center border border-red-100">
                <span className="text-xl">⚡</span>
                <p className="text-[11px] font-bold text-gray-900 mt-1">30 Mins</p>
                <p className="text-[9px] text-gray-500">Fast Delivery</p>
              </div>
              <div className="bg-red-50/60 rounded-2xl p-3 text-center border border-red-100">
                <span className="text-xl">⭐</span>
                <p className="text-[11px] font-bold text-gray-900 mt-1">4.9 Stars</p>
                <p className="text-[9px] text-gray-500">10k+ Reviews</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/#menu"
                onClick={() => setAboutOpen(false)}
                className="flex-1 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-full text-center text-xs sm:text-sm transition-colors shadow-md shadow-red-200"
              >
                Explore Menu
              </Link>
              <button
                type="button"
                onClick={() => setAboutOpen(false)}
                className="px-5 py-3 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Drawer Backdrop ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="relative bg-gradient-to-br from-primary to-red-700 px-5 pt-8 pb-6 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-primary font-black text-base">IF</span>
              </div>
              <div>
                <p
                  className={`${cinzel.className} text-white text-base tracking-widest uppercase leading-none`}
                >
                  Iqbal Food
                </p>
                <p className="text-white/70 text-[10px] uppercase tracking-wider mt-1">
                  Restaurant
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation drawer"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User info */}
          {user ? (
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-3 py-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-none truncate">
                  {user.name}
                </p>
                <p className="text-white/60 text-[10px] mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-3 py-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Guest</p>
                <p className="text-white/70 text-[10px]">Sign in to order</p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {/* Quick Search Button in Drawer */}
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              setSearchOpen(true);
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 bg-gray-50 hover:text-primary hover:bg-red-50 transition-all mb-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-semibold text-xs text-gray-500">
              Quick Search...
            </span>
          </button>

          {[
            {
              href: "/",
              label: "Home",
              icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            },
            {
              href: "/#menu",
              label: "Menu",
              icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2",
            },
            {
              href: "/#menu",
              label: "Categories",
              icon: "M4 6h16M4 12h16M4 18h7",
            },
            {
              href: "/#promo",
              label: "Offers & Deals",
              icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
            },
            {
              href: "/my-orders",
              label: "My Orders",
              icon: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
            },
            ...(user?.isAdmin
              ? [
                  {
                    href: "/admin",
                    label: "Admin Panel",
                    icon: "M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4",
                  },
                ]
              : []),
            {
              href: "#contact",
              label: "Contact",
              icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
            },
          ].map((nav) => (
            <Link
              key={nav.label}
              href={nav.href}
              onClick={() => setDrawerOpen(false)}
              className="group flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-red-50 transition-all duration-200 mb-0.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 group-hover:text-primary transition-colors"
                >
                  <path d={nav.icon} />
                </svg>
              </div>
              <span className="font-semibold text-sm">{nav.label}</span>
            </Link>
          ))}

          {/* About Us trigger in drawer */}
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              setAboutOpen(true);
            }}
            className="w-full group flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-red-50 transition-all duration-200 mb-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 group-hover:text-primary transition-colors"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <span className="font-semibold text-sm">About Us</span>
          </button>

          {/* Cart link with count */}
          <Link
            href="/cart"
            onClick={() => setDrawerOpen(false)}
            className="group flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-red-50 transition-all duration-200 mb-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 group-hover:text-primary transition-colors"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="font-semibold text-sm">Shopping Cart</span>
            {count > 0 && (
              <span className="ml-auto bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Drawer Footer */}
        <div className="border-t border-gray-100 p-4 space-y-2">
          {user ? (
            <button
              onClick={() => {
                signOut();
                setDrawerOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-bold py-3 rounded-2xl text-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                signInWithGoogle();
                setDrawerOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-white font-black py-3 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="white"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="white"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="white"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="white"
                />
              </svg>
              Continue with Google
            </button>
          )}
          <p className="text-[10px] text-center text-gray-400 pt-1">
            &copy; {new Date().getFullYear()} Iqbal Food. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
