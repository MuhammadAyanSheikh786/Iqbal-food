"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Links Data ───────────────────────────────────────────────────────────────
const COMPANY_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#careers", label: "Careers" },
  { href: "#blog", label: "Blog" },
  { href: "#press", label: "Press" },
];

const HELP_LINKS = [
  { href: "#faq", label: "FAQ" },
  { href: "#delivery", label: "Shipping & Delivery" },
  { href: "#returns", label: "Returns" },
  { href: "/track/demo", label: "Track Order" },
];

const LEGAL_LINKS = [
  { href: "#terms", label: "Terms & Conditions" },
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#refund", label: "Refund Policy" },
  { href: "#cancellation", label: "Cancellation Policy" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="contact" className="bg-[#0f0f0f] text-gray-400 text-xs pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════════════════════════
            TOP ROW: 4 COLUMNS (Stay Updated | App Badges | Food Graphic | Brand Logo)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
          {/* Column 1: Stay Updated! */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base mb-2 flex items-center gap-1.5">
              <span>Stay Updated!</span>
              <span className="text-primary text-base">✨</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3.5">
              Subscribe to get exclusive offers, foodie deals &amp; updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-primary w-full transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-green-400 font-medium animate-fade-in-up">
                  ✓ You&apos;re subscribed to exclusive foodie deals!
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Download Our App */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base mb-2 flex items-center gap-1.5">
              <span>Download Our App</span>
              <span className="text-primary">📱</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3.5">
              Get the app for a faster &amp; better experience.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
              {/* App Store */}
              <a
                href="#app-store"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-xl px-3.5 py-2 transition-all group"
              >
                <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.58-.71.97-1.7.86-2.69-.83.03-1.85.55-2.44 1.25-.52.6-.97 1.57-.85 2.53.93.07 1.87-.49 2.43-1.09z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-gray-400">Download on the</div>
                  <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#google-play"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-xl px-3.5 py-2 transition-all group"
              >
                <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a2.036 2.036 0 0 1-.22-.93V2.744c0-.348.08-.667.219-.93zm11.306 11.307L6.84 21.196l8.075-8.075zm.94-1.062l2.368-1.368c.846-.488.846-1.288 0-1.776L15.855 7.55l-1.92 1.92 1.92 2.59zM6.84 2.804l8.075 8.075-8.075-8.075z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-gray-400">GET IT ON</div>
                  <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Center Food Graphic / Signature Dish Thumbnail */}
          <div>
            <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3.5 group hover:border-primary/40 transition-all">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=300&q=80"
                  alt="Signature Crispy Chicken"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
                <span className="absolute top-1 left-1 bg-primary text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md">
                  HOT
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold mb-0.5">
                  <span>★★★★★</span>
                  <span className="text-white text-[10px] ml-0.5">4.9</span>
                </div>
                <p className="text-white font-bold text-xs uppercase tracking-tight">
                  Crispy Broast Combo
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                  Quarter leg &amp; chest, signature spices with garlic mayo
                </p>
                <p className="text-primary font-bold text-[11px] mt-1">Chef&apos;s Special</p>
              </div>
            </div>
          </div>

          {/* Column 4: Brand Logo & Social Icons */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md shadow-red-950/40 flex-shrink-0">
                <span className="text-white font-black text-sm tracking-wider">IF</span>
              </div>
              <div>
                <h4 className="font-black uppercase text-white text-base tracking-wide leading-none">
                  Iqbal Food
                </h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary mt-1">
                  RESTAURANT
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Good food, great taste &amp; fast delivery at your doorstep.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all active:scale-95"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            DIVIDER
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="border-t border-white/10 my-10" />

        {/* ══════════════════════════════════════════════════════════════════════
            LINKS ROW: 4 COLUMNS (Company | Help | Legal | Contact Us + Script)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: COMPANY */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3.5">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3.5">
              Help
            </p>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3.5">
              Legal
            </p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT US + Decorative Script */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3.5">
              Contact Us
            </p>
            <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
              <p className="flex items-center gap-1.5">
                <span className="text-primary font-bold">📞</span>
                <a href="tel:111-47225-11" className="hover:text-white transition-colors">
                  111-IQBAL-11
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✉️</span>
                <a href="mailto:hello@iqbalfood.com" className="hover:text-white transition-colors">
                  hello@iqbalfood.com
                </a>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="text-primary font-bold mt-0.5">📍</span>
                <span>123 Flavor Street, Foodville</span>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <span>🕐 Mon – Sun: 11:00 AM – 11:00 PM</span>
              </p>
            </div>

            {/* Right decorative script: "Good Food ♡ Good Mood" in warm amber/gold script */}
            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="font-serif italic text-amber-400 text-lg sm:text-xl font-medium tracking-wide drop-shadow-sm select-none">
                Good Food ♡ Good Mood
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BOTTOM COPYRIGHT
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-gray-500">
            Copyright &copy; {new Date().getFullYear()} Iqbal Food. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              100% Halal Certified
            </span>
            <span>·</span>
            <span>Fast 30-Min Delivery</span>
            <span>·</span>
            <a href="#menu" className="text-primary hover:underline font-semibold">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
