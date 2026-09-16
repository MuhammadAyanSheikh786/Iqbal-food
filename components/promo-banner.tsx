"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("IQBAL20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 my-14">
      <div className="bg-[#161616] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/5">
        {/* Subtle decorative background glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side: Brand Tag & Heading */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3">
            {/* Delivery bag icon */}
            <svg
              className="w-3.5 h-3.5 text-primary shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-primary font-bold">
              HUNGRY? WE&apos;VE GOT YOU!
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Get 20% OFF{" "}
            <span className="text-white block sm:inline font-bold">
              On Your First Order ❤️
            </span>
          </h2>
        </div>

        {/* Center / Action: Promo code box */}
        <div className="z-10 w-full sm:w-auto flex justify-center">
          <button
            type="button"
            onClick={handleCopyCode}
            title="Click to copy promo code"
            className="w-full sm:w-auto border border-dashed border-red-500/50 bg-white/5 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-150 px-6 py-3 rounded-2xl flex flex-col items-center cursor-pointer group"
          >
            <div className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
              <span>Use Code:</span>
              <span className="text-primary font-black tracking-wider text-lg">
                IQBAL20
              </span>
              <span className="text-[10px] text-gray-400 font-normal ml-1 bg-white/10 px-1.5 py-0.5 rounded transition-colors group-hover:text-white">
                {copied ? "Copied! ✓" : "Copy"}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              Valid on orders over Rs. 500
            </span>
          </button>
        </div>

        {/* Right Side: Plate preview & CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0 z-10 w-full md:w-auto justify-center md:justify-end">
          {/* Mouth-watering food imagery / plate preview */}
          <div className="relative group">
            {/* Decorative ambient glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary via-amber-500 to-primary rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40">
              <Image
                src="https://images.unsplash.com/photo-1563379091339-03246963d96d?w=400&q=80"
                alt="Delicious Biryani Plate"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="120px"
              />
            </div>
          </div>

          {/* CTA Link Button */}
          <Link
            href="/#menu"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 active:scale-95 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-200 whitespace-nowrap"
          >
            Order With 20% OFF &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
