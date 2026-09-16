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
}

const ACTIVE_STATUSES: OrderStatus[] = ["approved", "preparation", "packing", "on_way"];
const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  approved: "preparation", preparation: "packing", packing: "on_way", on_way: "delivered",
};
const STATUS_LABELS: Record<OrderStatus, { label: string; color: string; border: string }> = {
  pending:     { label: "Waiting",     color: "bg-amber-100 text-amber-700",   border: "border-l-4 border-l-amber-400" },
  approved:    { label: "Accepted",    color: "bg-blue-100 text-blue-700",     border: "border-l-4 border-l-blue-400" },
  preparation: { label: "Preparing",   color: "bg-indigo-100 text-indigo-700", border: "border-l-4 border-l-indigo-400" },
  packing:     { label: "Packing",     color: "bg-purple-100 text-purple-700", border: "border-l-4 border-l-purple-400" },
  on_way:      { label: "On The Way",  color: "bg-orange-100 text-orange-700", border: "border-l-4 border-l-orange-400" },
  delivered:   { label: "Delivered",   color: "bg-green-100 text-green-700",   border: "border-l-4 border-l-green-400" },
  cancelled:   { label: "Cancelled",   color: "bg-red-100 text-red-700",       border: "border-l-4 border-l-red-400" },
};
const NEXT_LABELS: Partial<Record<OrderStatus, string>> = {
  approved:    "▶ Start Preparation",
  preparation: "📦 Mark as Packing",
  packing:     "🛵 Mark On The Way",
  on_way:      "✅ Mark as Delivered",
};
const STATUS_CHIP_COLORS: Partial<Record<OrderStatus, string>> = {
  approved:    "bg-blue-50 text-blue-700 border border-blue-200",
  preparation: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  packing:     "bg-purple-50 text-purple-700 border border-purple-200",
  on_way:      "bg-orange-50 text-orange-700 border border-orange-200",
};

export default function AdminActiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchOrders = async () => {
    const token = sessionStorage.getItem("admin_token") ?? "";
    const res = await fetch(`/api/admin/orders`, { headers: { "x-admin-token": token } });
    const data = await res.json();
    setOrders((Array.isArray(data) ? data : []).filter((o: Order) => ACTIVE_STATUSES.includes(o.status)));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const i = setInterval(fetchOrders, 20000);
    return () => clearInterval(i);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Count per active status
  const countByStatus = ACTIVE_STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Stats chips ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm">
          <span className="text-xs font-black text-gray-900">{orders.length}</span>
          <span className="text-xs text-gray-500 font-medium">Total Active</span>
        </div>
        {(["approved", "preparation", "packing", "on_way"] as OrderStatus[]).map((s) => (
          <div
            key={s}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 ${STATUS_CHIP_COLORS[s]}`}
          >
            <span className="text-xs font-black">{countByStatus[s] ?? 0}</span>
            <span className="text-xs font-semibold">{STATUS_LABELS[s].label}</span>
          </div>
        ))}
        <button
          onClick={fetchOrders}
          className="ml-auto flex items-center gap-1.5 text-xs text-[#EC1E26] font-bold hover:underline px-2"
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
          <div className="text-5xl mb-4">📭</div>
          <p className="font-black text-gray-900 text-lg mb-1">No Active Orders</p>
          <p className="text-sm text-gray-400">All quiet — nothing in progress right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const st = STATUS_LABELS[order.status];
            const nextStatus = NEXT_STATUS[order.status];
            const fullAddress = [
              order.customerHouse, order.customerStreet, order.customerLandmark,
              order.customerArea, order.customerCity, order.customerPostalCode,
            ].filter(Boolean).join(", ");

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm ${st.border}`}
              >
                <div className="p-5 lg:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-black text-xs">#{order.id}</span>
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm">Order #{order.id}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                        {st.label}
                      </span>
                      <span className="text-lg font-black text-[#EC1E26]">
                        Rs. {order.total.toLocaleString()}
                      </span>
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

                  {/* Big prominent action button */}
                  {nextStatus && (
                    <button
                      onClick={() => updateStatus(order.id, nextStatus)}
                      disabled={updating === order.id}
                      className="w-full bg-[#EC1E26] text-white font-black py-4 rounded-xl text-sm hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-red-200"
                    >
                      {updating === order.id ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        NEXT_LABELS[order.status]
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
