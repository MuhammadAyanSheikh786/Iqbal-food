"use client";

import { useEffect, useState } from "react";

type OrderStatus = "pending" | "approved" | "preparation" | "packing" | "on_way" | "delivered" | "cancelled";

interface OrderItem { name: string; price: number; quantity: number; }
interface Order {
  id: number; status: OrderStatus; total: number;
  customerName: string; customerFatherName: string;
  customerPhone: string; customerWhatsapp: string; customerEmail: string;
  customerHouse: string; customerStreet: string; customerLandmark: string;
  customerArea: string; customerPostalCode: string; customerCity: string;
  customerLat: number | null; customerLng: number | null;
  note: string; createdAt: string; items: OrderItem[];
  user: { name: string; email: string };
}

export default function AdminNewOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchOrders = async () => {
    const token = sessionStorage.getItem("admin_token") ?? "";
    const res = await fetch(`/api/admin/orders`, { headers: { "x-admin-token": token } });
    const data = await res.json();
    setOrders((Array.isArray(data) ? data : []).filter((o: Order) => o.status === "pending"));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const i = setInterval(fetchOrders, 20000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: number, status: OrderStatus) => {
    setUpdating(id);
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchOrders();
    setUpdating(null);
  };

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{orders.length}</p>
            <p className="text-xs text-gray-500 font-medium">New Orders</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EC1E26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              Rs. {orders.reduce((s, o) => s + o.total, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 font-medium">Pending Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">~25</p>
            <p className="text-xs text-gray-500 font-medium">Avg. minutes</p>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-gray-500">
          {loading ? "Loading..." : `${orders.length} order${orders.length !== 1 ? "s" : ""} waiting`}
        </p>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 text-xs text-[#EC1E26] font-bold hover:underline"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Refresh
        </button>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p className="font-black text-gray-900 text-lg mb-1">All Caught Up!</p>
          <p className="text-sm text-gray-400">No new orders waiting right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-sm"
            >
              {/* Amber top strip */}
              <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />

              <div className="p-5 lg:p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 border border-amber-200">
                      <span className="text-amber-700 font-black text-xs">#{order.id}</span>
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">Order #{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-black text-[#EC1E26]">
                      Rs. {order.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* 2-col grid: items + customer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  {/* Items */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
                      Order Items
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">
                            {item.name}{" "}
                            <span className="text-gray-400 text-xs">×{item.quantity}</span>
                          </span>
                          <span className="font-bold text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black">
                        <span className="text-gray-700">Total</span>
                        <span className="text-[#EC1E26]">Rs. {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
                      Customer
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400 flex-shrink-0">Name</span>
                        <span className="font-bold text-gray-900 text-right">{order.customerName}</span>
                      </div>
                      {order.customerFatherName && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-400 flex-shrink-0">S/O</span>
                          <span className="font-medium text-gray-700 text-right">{order.customerFatherName}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400 flex-shrink-0">Phone</span>
                        <a href={`tel:${order.customerPhone}`} className="font-bold text-[#EC1E26]">
                          {order.customerPhone}
                        </a>
                      </div>
                      {order.customerWhatsapp && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-400 flex-shrink-0">WhatsApp</span>
                          <a
                            href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-green-600"
                          >
                            {order.customerWhatsapp}
                          </a>
                        </div>
                      )}
                      {order.customerEmail && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-400 flex-shrink-0">Email</span>
                          <span className="font-medium text-gray-700 text-xs text-right break-all">
                            {order.customerEmail}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address — full width */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
                        Delivery Address
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 text-sm">
                        {order.customerHouse && (
                          <div>
                            <span className="text-gray-400 text-xs">House: </span>
                            <span className="font-semibold text-gray-900">{order.customerHouse}</span>
                          </div>
                        )}
                        {order.customerStreet && (
                          <div>
                            <span className="text-gray-400 text-xs">Street: </span>
                            <span className="font-semibold text-gray-900">{order.customerStreet}</span>
                          </div>
                        )}
                        {order.customerArea && (
                          <div>
                            <span className="text-gray-400 text-xs">Area: </span>
                            <span className="font-semibold text-gray-900">{order.customerArea}</span>
                          </div>
                        )}
                        {order.customerLandmark && (
                          <div>
                            <span className="text-gray-400 text-xs">Landmark: </span>
                            <span className="font-semibold text-gray-900">{order.customerLandmark}</span>
                          </div>
                        )}
                        {order.customerCity && (
                          <div>
                            <span className="text-gray-400 text-xs">City: </span>
                            <span className="font-bold text-gray-900">{order.customerCity}</span>
                          </div>
                        )}
                        {order.customerPostalCode && (
                          <div>
                            <span className="text-gray-400 text-xs">Postal: </span>
                            <span className="font-semibold text-gray-900">{order.customerPostalCode}</span>
                          </div>
                        )}
                      </div>
                      {order.note && (
                        <p className="mt-3 text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                          <span className="font-bold text-amber-700">Note: </span>
                          {order.note}
                        </p>
                      )}
                    </div>
                    {order.customerLat && order.customerLng && (
                      <a
                        href={`https://www.google.com/maps?q=${order.customerLat},${order.customerLng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#EC1E26] hover:bg-red-50 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Map
                      </a>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(order.id, "approved")}
                    disabled={updating === order.id}
                    className="flex-1 bg-[#EC1E26] text-white font-black py-3 rounded-xl text-sm hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-red-200"
                  >
                    {updating === order.id ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    {updating === order.id ? "Accepting..." : "Accept Order"}
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "cancelled")}
                    disabled={updating === order.id}
                    className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
