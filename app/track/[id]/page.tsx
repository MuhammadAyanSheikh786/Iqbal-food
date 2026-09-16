"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "approved" | "preparation" | "packing" | "on_way" | "delivered" | "cancelled";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  status: OrderStatus;
  total: number;
  // Personal
  customerName: string;
  customerFatherName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp: string;
  // Address
  customerHouse: string;
  customerStreet: string;
  customerLandmark: string;
  customerArea: string;
  customerPostalCode: string;
  customerCity: string;
  customerLat: number | null;
  customerLng: number | null;
  // Order
  note: string;
  items: OrderItem[];
  createdAt: string;
  approvedAt: string | null;
  preparationAt: string | null;
  packingAt: string | null;
  onWayAt: string | null;
  deliveredAt: string | null;
}

const STAGES: { key: OrderStatus; label: string; icon: string; desc: string; tsField: keyof Order }[] = [
  { key: "approved",    label: "Order Accepted", icon: "✅", desc: "Restaurant accepted your order",  tsField: "approvedAt" },
  { key: "preparation", label: "Preparation",    icon: "👨‍🍳", desc: "Your food is being prepared",    tsField: "preparationAt" },
  { key: "packing",     label: "Packing",        icon: "📦", desc: "Your order is being packed",      tsField: "packingAt" },
  { key: "on_way",      label: "On The Way",     icon: "🛵", desc: "Rider is heading your way",       tsField: "onWayAt" },
  { key: "delivered",   label: "Delivered",      icon: "🎉", desc: "Your order has been delivered!",  tsField: "deliveredAt" },
];

const STATUS_ORDER: OrderStatus[] = ["pending", "approved", "preparation", "packing", "on_way", "delivered"];

const STATUS_META: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending:     { label: "Waiting for Acceptance", color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
  approved:    { label: "Order Accepted",          color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  preparation: { label: "Being Prepared",          color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  packing:     { label: "Being Packed",            color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  on_way:      { label: "On The Way",              color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  delivered:   { label: "Delivered ✓",             color: "text-green-700",  bg: "bg-green-50 border-green-200" },
  cancelled:   { label: "Cancelled",               color: "text-red-700",    bg: "bg-red-50 border-red-200" },
};

function fmt(ts: string | null) {
  if (!ts) return null;
  return new Date(ts).toLocaleString("en-PK", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (res.ok) setOrder(await res.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        </div>
        <p className="font-black text-gray-900 mb-1">Order not found</p>
        <p className="text-sm text-gray-400 mb-6">We couldn&apos;t find this order</p>
        <Link href="/my-orders" className="bg-[#EC1E26] text-white font-black px-6 py-3 rounded-2xl text-sm hover:bg-red-700 transition-colors">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(order.status);
  const meta = STATUS_META[order.status];
  const fullAddress = [order.customerHouse, order.customerStreet, order.customerLandmark, order.customerArea, order.customerCity, order.customerPostalCode].filter(Boolean).join(", ");
  const isActive = !["delivered", "cancelled"].includes(order.status);

  // Hero gradient per status
  const heroGradient =
    order.status === "delivered"  ? "from-green-500 to-emerald-600" :
    order.status === "cancelled"  ? "from-red-500 to-red-700" :
    order.status === "on_way"     ? "from-orange-500 to-amber-600" :
    order.status === "pending"    ? "from-amber-400 to-yellow-500" :
    "from-[#EC1E26] to-red-700";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Header ── */}
      <div className={`bg-gradient-to-br ${heroGradient} text-white px-4 pt-5 pb-8 relative overflow-hidden`}>
        {/* Back button */}
        <div className="max-w-2xl mx-auto flex items-center gap-3 mb-6 relative z-10">
          <Link href="/my-orders" className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <span className="text-sm font-black opacity-90 uppercase tracking-wide">Track Order</span>

          {/* Live polling indicator */}
          {isActive && (
            <div className="ml-auto flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"/>
              <span className="text-[10px] font-black uppercase tracking-wide opacity-90">Live</span>
            </div>
          )}
        </div>

        {/* Order identity */}
        <div className="max-w-2xl mx-auto relative z-10">
          <p className="text-white/70 text-xs font-medium mb-1">
            {new Date(order.createdAt).toLocaleString("en-PK", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
          <h1 className="text-3xl font-black mb-2">Order #{order.id}</h1>
          <div className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5`}>
            <span className={`w-2 h-2 rounded-full bg-white ${isActive ? "animate-pulse" : ""}`}/>
            <span className="text-sm font-black">{meta.label}</span>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none"/>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full pointer-events-none"/>
      </div>

      {/* Card pull-up */}
      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-10 space-y-4">

        {/* ── Status Banner (pending / cancelled / delivered) ── */}
        {order.status === "pending" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⏳</span>
            </div>
            <div>
              <p className="font-black text-amber-800 text-sm">Waiting for Acceptance</p>
              <p className="text-xs text-amber-600 mt-0.5">The restaurant is reviewing your order. Hang tight!</p>
            </div>
          </div>
        )}
        {order.status === "cancelled" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">❌</span>
            </div>
            <div>
              <p className="font-black text-red-800 text-sm">Order Cancelled</p>
              <p className="text-xs text-red-500 mt-0.5">This order was cancelled. Contact us if you have questions.</p>
            </div>
          </div>
        )}
        {order.status === "delivered" && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎉</span>
            </div>
            <div>
              <p className="font-black text-green-800 text-sm">Order Delivered!</p>
              <p className="text-xs text-green-600 mt-0.5">Enjoy your meal. Thank you for ordering from Iqbal Food!</p>
            </div>
          </div>
        )}

        {/* ── Progress Tracker ── */}
        {order.status !== "pending" && order.status !== "cancelled" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-black uppercase text-gray-400 tracking-wide">Order Progress</p>
              <span className="text-[10px] text-gray-400">{STAGES.filter((s) => STATUS_ORDER.indexOf(s.key) <= currentIndex).length} of {STAGES.length} steps</span>
            </div>

            {/* Desktop: horizontal stepper */}
            <div className="hidden sm:block">
              <div className="flex items-start">
                {STAGES.map((stage, idx) => {
                  const stageIdx = STATUS_ORDER.indexOf(stage.key);
                  const done = currentIndex >= stageIdx;
                  const active = currentIndex === stageIdx;
                  const ts = fmt(order[stage.tsField] as string | null);
                  return (
                    <div key={stage.key} className="flex-1 flex flex-col items-center relative">
                      {/* Connector line left */}
                      {idx > 0 && (
                        <div className={`absolute top-5 right-1/2 left-0 h-0.5 -translate-y-1/2 ${
                          STATUS_ORDER.indexOf(STAGES[idx - 1].key) < currentIndex ? "bg-[#EC1E26]" : "bg-gray-200"
                        }`}/>
                      )}
                      {/* Step circle */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        done
                          ? active
                            ? "bg-[#EC1E26] border-[#EC1E26] shadow-lg shadow-red-200"
                            : "bg-[#EC1E26] border-[#EC1E26]"
                          : "bg-white border-gray-200"
                      }`}>
                        {done ? (
                          active
                            ? <span className="text-base">{stage.icon}</span>
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : (
                          <span className="text-base opacity-30">{stage.icon}</span>
                        )}
                        {active && (
                          <span className="absolute inset-0 rounded-full bg-[#EC1E26] animate-ping opacity-30"/>
                        )}
                      </div>
                      {/* Label */}
                      <div className="mt-2 text-center px-1">
                        <p className={`text-[10px] font-black leading-tight ${done ? "text-gray-900" : "text-gray-400"}`}>{stage.label}</p>
                        {ts && <p className="text-[9px] text-gray-400 mt-0.5">{ts}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical stepper */}
            <div className="sm:hidden space-y-1">
              {STAGES.map((stage, idx) => {
                const stageIdx = STATUS_ORDER.indexOf(stage.key);
                const done = currentIndex >= stageIdx;
                const active = currentIndex === stageIdx;
                const ts = fmt(order[stage.tsField] as string | null);
                return (
                  <div key={stage.key} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                        done
                          ? active
                            ? "bg-[#EC1E26] border-[#EC1E26] shadow-md shadow-red-200"
                            : "bg-[#EC1E26] border-[#EC1E26]"
                          : "bg-white border-gray-200"
                      }`}>
                        {done ? (
                          active
                            ? <span className="text-sm">{stage.icon}</span>
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : (
                          <span className="text-sm opacity-30">{stage.icon}</span>
                        )}
                      </div>
                      {idx < STAGES.length - 1 && (
                        <div className={`w-0.5 h-6 mt-1 ${done && currentIndex > stageIdx ? "bg-[#EC1E26]" : "bg-gray-200"}`}/>
                      )}
                    </div>
                    <div className="pt-1.5 flex-1 flex items-start justify-between pb-1">
                      <div>
                        <p className={`text-xs font-black ${done ? "text-gray-900" : "text-gray-400"}`}>{stage.label}</p>
                        <p className={`text-[10px] mt-0.5 ${done ? "text-gray-500" : "text-gray-300"}`}>{stage.desc}</p>
                      </div>
                      {ts && <p className="text-[10px] text-gray-400 ml-2 flex-shrink-0">{ts}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Desktop 3-col / Mobile stacked info grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Column 1: Order Items */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC1E26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <p className="text-xs font-black uppercase text-gray-700 tracking-wide">Items Ordered</p>
            </div>
            <div className="space-y-2 mb-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-700 font-medium leading-snug">
                    {item.name} <span className="text-gray-400 font-normal">×{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-900 ml-2 flex-shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center">
              <span className="text-xs font-black text-gray-700">Total</span>
              <span className="text-sm font-black text-[#EC1E26]">Rs. {order.total.toLocaleString()}</span>
            </div>
            {order.note && (
              <div className="mt-3 bg-amber-50 rounded-xl px-3 py-2">
                <p className="text-[10px] text-amber-600 font-bold uppercase mb-0.5">Note</p>
                <p className="text-xs text-amber-800">{order.note}</p>
              </div>
            )}
          </div>

          {/* Column 2: Customer Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
              </div>
              <p className="text-xs font-black uppercase text-gray-700 tracking-wide">Customer</p>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-gray-400 mb-0.5">Full Name</p>
                <p className="font-semibold text-gray-900">{order.customerName}</p>
              </div>
              {order.customerFatherName && (
                <div>
                  <p className="text-gray-400 mb-0.5">Father&apos;s Name</p>
                  <p className="font-semibold text-gray-900">{order.customerFatherName}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 mb-0.5">WhatsApp</p>
                <a href={`tel:${order.customerWhatsapp || order.customerPhone}`} className="font-semibold text-[#EC1E26] hover:underline">
                  {order.customerWhatsapp || order.customerPhone}
                </a>
              </div>
              {order.customerPhone && order.customerPhone !== order.customerWhatsapp && (
                <div>
                  <p className="text-gray-400 mb-0.5">Phone</p>
                  <a href={`tel:${order.customerPhone}`} className="font-semibold text-gray-900 hover:underline">
                    {order.customerPhone}
                  </a>
                </div>
              )}
              {order.customerEmail && (
                <div>
                  <p className="text-gray-400 mb-0.5">Email</p>
                  <p className="font-semibold text-gray-700 break-all">{order.customerEmail}</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Delivery Address */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <p className="text-xs font-black uppercase text-gray-700 tracking-wide">Address</p>
            </div>
            <div className="space-y-2 text-xs">
              {order.customerHouse && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">House/Flat</span>
                  <span className="font-semibold text-gray-900">{order.customerHouse}</span>
                </div>
              )}
              {order.customerStreet && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">Street</span>
                  <span className="font-semibold text-gray-900">{order.customerStreet}</span>
                </div>
              )}
              {order.customerArea && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">Area</span>
                  <span className="font-semibold text-gray-900">{order.customerArea}</span>
                </div>
              )}
              {order.customerLandmark && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">Landmark</span>
                  <span className="font-semibold text-gray-900">{order.customerLandmark}</span>
                </div>
              )}
              {order.customerCity && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">City</span>
                  <span className="font-semibold text-gray-900">{order.customerCity}</span>
                </div>
              )}
              {order.customerPostalCode && (
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">Postal</span>
                  <span className="font-semibold text-gray-900">{order.customerPostalCode}</span>
                </div>
              )}
            </div>

            {/* Full address pill */}
            {fullAddress && (
              <div className="mt-3 bg-gray-50 rounded-xl px-3 py-2">
                <p className="text-[10px] text-gray-400 mb-0.5">Full Address</p>
                <p className="text-[11px] text-gray-700 leading-snug">{fullAddress}</p>
              </div>
            )}

            {/* Google Maps CTA */}
            {order.customerLat && order.customerLng && (
              <a
                href={`https://www.google.com/maps?q=${order.customerLat},${order.customerLng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 bg-[#EC1E26] text-white font-black py-3 rounded-xl text-xs hover:bg-red-700 transition-colors shadow-md shadow-red-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Open in Google Maps
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
