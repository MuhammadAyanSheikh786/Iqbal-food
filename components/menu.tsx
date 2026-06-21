"use client";

import { useState } from "react";
import Image from "next/image";
import { menuItems, categories, type MenuItem } from "@/lib/menu-data";

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-surface rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-1.5">
          {item.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{item.price}</span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary/90 active:scale-95"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary-lighter px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
            Flavors That{" "}
            <span className="text-primary">Delight</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From classic burgers to crispy sides, every item on our menu is
            crafted to perfection.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-md"
                : "bg-bg-section text-text-secondary hover:bg-bg-section/80"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-bg-section text-text-secondary hover:bg-bg-section/80"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-text-muted py-12">
            No items found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
