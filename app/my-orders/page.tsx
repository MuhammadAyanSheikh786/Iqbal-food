"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

type OrderStatus = "pending" | "approved" | "preparation" | "packing" | "on_way" | "delivered" | "cancelled";

interface Order {
  id: number;
  status: OrderStatus;
  total: number;
  customerName: string;
  customerCity: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; dot: string }> = {
  pending:     { label: "Waiting",    color: "bg-amber-100 text-amber-700",   dot: "bg-amber-400" },
  approved:    { label: "Accepted",   color: "bg-blue-100 text-blue-700",     dot: "bg-blue-400" },
  preparation: { label: "Preparing",  color: "bg-blue-100 text-blue-700",     dot: "bg-blue-500" },
  packing:     { label: "Packing",    color: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
  on_way:      { label: "On The Way", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  delivered:   { label: "Delivered",  color: "bg-green-100 text-green-700",   dot: "bg-green-400" },
  cancelled:   { label: "Cancelled",  color: "bg-red-100 text-red-700",       dot: "bg-red-400" },
};

const ACTIVE_STATUSES: OrderStatus[] = ["pending", "approved", "preparation", "packing", "on_way"];

export default function MyOrdersPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"active" | "history">("active");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) return;
    if (!user) return;
    fetch(`/api/orders?uid=${user.uid}`)
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin"/>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-2">Sign in to view orders</h2>
        <p className="text-gray-500 text-sm mb-8">Please sign in with Google to see your order history</p>
        <button onClick={signInWithGoogle} className="bg-[#EC1E26] text-white font-black px-8 py-3.5 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
          Sign in with Google
        </button>
      </div>
    );
  }

  const activeOrders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
  const historyOrders = orders.filter((o) => !ACTIVE_STATUSES.includes(o.status));
  const displayed = tab === "active" ? activeOrders : historyOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <div>
            <h1 className="text-base font-black text-gray-900">My Orders</h1>
            <p className="text-xs text-gray-400">{user.name}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto flex border-t border-gray-100">
          {(["active", "history"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wide border-b-2 transition-colors flex items-center justify-center gap-2 ${
                tab === t ? "border-[#EC1E26] text-[#EC1E26]" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}>
              {t === "active" ? "Active Orders" : "History"}
              {t === "active" && activeOrders.length > 0 && (
                <span className="bg-[#EC1E26] text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center">{activeOrders.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">{tab === "active" ? "⏳" : "📋"}</span>
            </div>
            <p className="font-black text-gray-900 mb-1">{tab === "active" ? "No Active Orders" : "No Order History"}</p>
            <p className="text-sm text-gray-400 mb-6">{tab === "active" ? "Your active orders will appear here" : "Completed orders will appear here"}</p>
            {tab === "active" && (
              <Link href="/" className="bg-[#EC1E26] text-white font-black px-6 py-3 rounded-2xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                Order Now
              </Link>
            )}
          </div>
        ) : (
          displayed.map((order) => {
            const st = STATUS_CONFIG[order.status];
            const isActive = ACTIVE_STATUSES.includes(order.status);
            return (
              <div key={order.id} onClick={() => router.push(`/track/${order.id}`)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer hover:border-[#EC1E26] hover:shadow-md transition-all duration-200 group">
                {/* Top accent for active orders */}
                {isActive && <div className="h-1 bg-gradient-to-r from-[#EC1E26] to-red-400"/>}

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">Order #{order.id}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString("en-PK", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${isActive ? "animate-pulse" : ""}`}/>
                        {st.label}
                      </span>
                      <span className="text-sm font-black text-[#EC1E26]">Rs. {order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                    {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {order.customerCity || "Karachi"}
                    </span>
                    <span className="text-xs font-bold text-[#EC1E26] flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isActive ? "Track Order" : "View Details"}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
