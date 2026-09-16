"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function CartPage() {
  const { items, removeItem, increment, decrement, total, clearCart } = useCart();
  const { user, signInWithGoogle } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">Looks like you haven&apos;t added anything yet. Browse our menu and find something delicious!</p>
        <Link href="/#menu" className="bg-[#EC1E26] text-white font-black px-8 py-3.5 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
          Browse Menu
        </Link>
      </div>
    );
  }

  const deliveryFee = 0;
  const itemsCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
            <div>
              <h1 className="text-base font-black text-gray-900">Your Cart</h1>
              <p className="text-xs text-gray-400">{itemsCount} item{itemsCount !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={clearCart} className="text-xs text-red-500 font-bold hover:underline">Clear all</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 pb-48 lg:pb-6 lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">

        {/* Items list - takes 3 cols on desktop */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-xs font-black uppercase text-gray-400 tracking-wide mb-3">Order Items</p>
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4 shadow-sm">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EC1E26] flex-shrink-0 shadow-md">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-gray-900 leading-snug mb-1">{item.name}</p>
                <p className="text-base font-black text-[#EC1E26]">Rs. {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                    <button onClick={() => decrement(item.id)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 font-bold shadow-sm hover:bg-[#EC1E26] hover:text-white transition-all text-lg leading-none">−</button>
                    <span className="text-sm font-black w-5 text-center">{item.quantity}</span>
                    <button onClick={() => increment(item.id)} className="w-7 h-7 rounded-full bg-[#EC1E26] flex items-center justify-center text-white font-bold shadow-sm hover:bg-red-700 transition-all text-lg leading-none">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-auto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-black text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary - 2 cols on desktop, bottom on mobile */}
        <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm font-black text-gray-900 uppercase mb-4">Order Summary</p>
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemsCount} items)</span>
                <span className="font-semibold text-gray-900">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-base">
                <span>Total</span>
                <span className="text-[#EC1E26]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            {user ? (
              <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-[#EC1E26] text-white font-black py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                Proceed to Checkout
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            ) : (
              <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-2 bg-[#EC1E26] text-white font-black py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                Sign in to Checkout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{itemsCount} items · Free delivery</span>
            <span className="font-black text-gray-900 text-sm">Rs. {total.toLocaleString()}</span>
          </div>
          {user ? (
            <Link href="/checkout" className="w-full flex items-center justify-between bg-[#EC1E26] text-white font-black px-6 py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
              <span>Proceed to Checkout</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          ) : (
            <button onClick={signInWithGoogle} className="w-full bg-[#EC1E26] text-white font-black py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
              Sign in with Google to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
