"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const hours = [
  { day: "Mon – Thu", time: "11:00 – 22:00" },
  { day: "Fri – Sat", time: "11:00 – 23:00" },
  { day: "Sunday", time: "12:00 – 21:00" },
];

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19.6 6.3a4.8 4.8 0 0 1-3-1.1 4.8 4.8 0 0 1-1.6-3h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.1a5.7 5.7 0 0 0-.8-.1 5.8 5.8 0 1 0 5.8 5.8V8.5a8 8 0 0 0 4.6 1.5z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2H21.5l-7.13 8.15L23 22h-6.957l-4.49-5.857L6.4 22H3.144l7.63-8.72L2 2h7.115l4.057 5.346L18.244 2zm-2.44 18h1.86L8.27 4H6.29l9.514 16z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    footerRef.current
      ?.querySelectorAll(".footer-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="footer-section relative isolate overflow-hidden bg-secondary text-white"
    >
      {/* ═══════ BACKGROUND LAYERS ═══════ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary via-secondary to-black"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/[0.08] blur-3xl"
      />

      {/* Top hairline accent */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      {/* ═══════ NEWSLETTER CTA ═══════ */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="footer-reveal relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm md:p-12 lg:p-14">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-amber-500/15 blur-3xl"
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                  Stay Hungry
                </span>
              </div>
              <h3 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-[2.5rem]">
                Get a taste of{" "}
                <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  what&apos;s cooking
                </span>
                <span className="text-amber-400">.</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                New menu drops, exclusive offers, and behind-the-grill stories.
                Delivered hot to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:flex-shrink-0"
            >
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
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
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur transition-all focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50 active:translate-y-0 active:scale-[0.98]"
              >
                {subscribed ? (
                  <>
                    Subscribed
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                ) : (
                  <>
                    Subscribe
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN GRID ═══════ */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="footer-reveal col-span-2 md:col-span-12 lg:col-span-4">
            <Link
              href="#home"
              className="group inline-flex items-center gap-2.5"
              aria-label="AM Foods home"
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:rotate-12">
                <span className="text-base font-bold">AM</span>
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Foods<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65 md:text-[15px]">
              Premium fast food crafted with passion. Quality ingredients, bold
              flavors, and unforgettable taste — every single time.
            </p>

            {/* Trust pills */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
                <span className="text-amber-400">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                  4.9 · 2.3k Reviews
                </span>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                Award Winning
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-reveal col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Navigate
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-reveal col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Hours
            </h3>
            <ul className="space-y-3 text-sm text-white/65">
              {hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-3"
                >
                  <span>{h.day}</span>
                  <span className="text-white/85">{h.time}</span>
                </li>
              ))}
              <li className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400">
                  Open Now
                </span>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="footer-reveal col-span-2 md:col-span-12 lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Visit Us
            </h3>
            <ul className="space-y-4 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>
                  123 Flavor Street
                  <br />
                  Foodville, FC 10001
                </span>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="group flex items-center gap-3 text-white/85 transition-colors hover:text-primary"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@amfoods.com"
                  className="group flex items-center gap-3 text-white/85 transition-colors hover:text-primary"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  </span>
                  hello@amfoods.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ═══════ MEGA WORDMARK ═══════ */}
        <div
          aria-hidden
          className="footer-reveal footer-mega mt-16 select-none overflow-hidden md:mt-20"
        >
          <div className="flex items-center justify-center">
            <span
              className="text-center font-bold uppercase leading-none tracking-[-0.04em]"
              style={{
                fontSize: "clamp(4rem, 18vw, 14rem)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AM Foods
            </span>
          </div>
        </div>

        {/* ═══════ BOTTOM BAR ═══════ */}
        <div className="footer-reveal mt-8 border-t border-white/10 pt-7 md:mt-10 md:pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <p className="text-xs text-white/45">
              &copy; {new Date().getFullYear()} AM Foods Co. · All rights
              reserved · Made with{" "}
              <span className="text-primary">♥</span> for food lovers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a
                href="#"
                className="text-xs text-white/45 transition-colors hover:text-white/80"
              >
                Privacy Policy
              </a>
              <span
                aria-hidden
                className="hidden h-1 w-1 rounded-full bg-white/20 md:inline-block"
              />
              <a
                href="#"
                className="text-xs text-white/45 transition-colors hover:text-white/80"
              >
                Terms of Service
              </a>
              <span
                aria-hidden
                className="hidden h-1 w-1 rounded-full bg-white/20 md:inline-block"
              />
              <a
                href="#"
                className="text-xs text-white/45 transition-colors hover:text-white/80"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ANIMATIONS ═══════ */}
      <style jsx>{`
        .footer-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes megaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .footer-mega.is-visible {
          animation: megaFloat 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-reveal,
          .footer-mega {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
