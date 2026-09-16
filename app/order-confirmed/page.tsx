"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ConfirmedContent() {
  const params = useSearchParams();
  const orderId = params.get("id");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">

      {/* Confetti dots (CSS only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce"
            style={{
              left: `${(i * 8) + 2}%`,
              top: `${10 + (i % 4) * 12}%`,
              backgroundColor: i % 3 === 0 ? "#EC1E26" : i % 3 === 1 ? "#FCD34D" : "#86EFAC",
              animationDelay: `${i * 0.15}s`,
              animationDuration: "1.2s",
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Check circle */}
      <div
        className={`relative w-28 h-28 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-200 transition-all duration-700 ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {/* Ring pulse */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      {/* Text */}
      <div
        className={`transition-all duration-700 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-1">
          Thank You! 🎉
        </h1>
        <p className="text-gray-500 text-sm mb-1">Your order has been placed successfully</p>
        {orderId && (
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mt-2 mb-6">
            <span className="text-[11px] text-gray-500 font-medium">Order</span>
            <span className="text-sm font-black text-gray-900">#{orderId}</span>
          </div>
        )}
      </div>

      {/* Info card */}
      <div
        className={`w-full max-w-sm bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8 transition-all duration-700 delay-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">⏳</span>
          <div className="text-left">
            <p className="text-xs font-black text-amber-800 uppercase mb-1">Waiting for Acceptance</p>
            <p className="text-xs text-amber-700">
              Restaurant will review and accept your order shortly. Once accepted, you can track it live.
            </p>
          </div>
        </div>
      </div>

      {/* Iqbal Food branding */}
      <div
        className={`flex items-center gap-2 mb-8 transition-all duration-700 delay-[400ms] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-black text-xs">IF</span>
        </div>
        <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Iqbal Food</span>
      </div>

      {/* Action buttons */}
      <div
        className={`flex flex-col gap-3 w-full max-w-xs transition-all duration-700 delay-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {orderId && (
          <Link
            href={`/track/${orderId}`}
            className="w-full bg-primary text-white font-black py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
            </svg>
            Track My Order
          </Link>
        )}
        <Link
          href="/my-orders"
          className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm hover:border-primary hover:text-primary transition-colors"
        >
          My Orders
        </Link>
        <Link
          href="/"
          className="w-full text-gray-400 font-medium py-2 text-sm hover:text-gray-700 transition-colors"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmedContent />
    </Suspense>
  );
}
