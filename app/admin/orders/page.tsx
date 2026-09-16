"use client";

import { useEffect, useState } from "react";

type OrderStatus = "pending" | "approved" | "preparation" | "packing" | "on_way" | "delivered" | "cancelled";

interface OrderItem { name: string; price: number; quantity: number; }
interface Order {
  id: number; status: OrderStatus; total: number; createdAt: string;
  customerName: string; customerFatherName: string;
  customerPhone: string; customerWhatsapp: string; customerEmail: string;
  customerHouse: string; customerStreet: string; customerLandmark: string;
  customerArea: string; customerPostalCode: string; customerCity: string;
  customerLat: number | null; customerLng: number | null;
  note: string; items: OrderItem[];
}

const STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  pending:     { label: "Waiting",    color: "bg-amber-100 text-amber-700" },
  approved:    { label: "Accepted",   color: "bg-blue-100 text-blue-700" },
  preparation: { label: "Preparing",  color: "bg-indigo-100 text-indigo-700" },
  packing:     { label: "Packing",    color: "bg-purple-100 text-purple-700" },
  on_way:      { label: "On The Way", color: "bg-orange-100 text-orange-700" },
  delivered:   { label: "Delivered",  color: "bg-green-100 text-green-700" },
  cancelled:   { label: "Cancelled",  color: "bg-red-100 text-red-700" },
};

const ALL_FILTERS = ["all", "pending", "approved", "preparation", "packing", "on_way", "delivered", "cancelled"] as const;
type FilterValue = typeof ALL_FILTERS[number];

export default function AdminAllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token") ?? "";
    fetch(`/api/admin/orders`, { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Filter tab bar ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 no-scrollbar -mx-1 px-1">
        {ALL_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
              filter === s
                ? "bg-[#EC1E26] text-white border-[#EC1E26] shadow-sm shadow-red-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {s === "all" ? `All (${orders.length})` : `${STATUS_LABELS[s as OrderStatus].label}${filter === s ? ` (${filtered.length})` : ""}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 font-medium mb-4">
        {loading ? "Loading..." : `${filtered.length} order${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <p className="text-gray-400 text-sm font-medium">No orders found for this filter.</p>
        </div>
      ) : (
        <>
          {/* ── Desktop: Table layout ── */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-3.5 w-16">#</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-3.5">Customer</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-3.5">Items</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-3.5">Total</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-3.5">Status</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-3.5">Date</th>
                  <th className="w-10 px-4 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const st = STATUS_LABELS[order.status];
                  const isOpen = expanded === order.id;
                  const fullAddress = [
                    order.customerHouse, order.customerStreet, order.customerLandmark,
                    order.customerArea, order.customerCity, order.customerPostalCode,
                  ].filter(Boolean).join(", ");

                  return (
                    <>
                      <tr
                        key={order.id}
                        onClick={() => setExpanded(isOpen ? null : order.id)}
                        className={`border-b border-gray-100 cursor-pointer transition-colors ${
                          isOpen ? "bg-red-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-gray-900">#{order.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-400">{order.customerPhone}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-xs text-gray-600 line-clamp-1 max-w-[200px]">
                            {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                          </p>
                          <p className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-black text-[#EC1E26]">
                            Rs. {order.total.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </td>
                      </tr>

                      {/* Expanded detail panel */}
                      {isOpen && (
                        <tr key={`${order.id}-detail`} className="bg-gray-50">
                          <td colSpan={7} className="px-6 py-5">
                            <div className="grid grid-cols-3 gap-5">
                              {/* Items */}
                              <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Items</p>
                                <div className="space-y-1.5">
                                  {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                      <span className="text-gray-700">
                                        {item.name} <span className="text-gray-400 text-xs">×{item.quantity}</span>
                                      </span>
                                      <span className="font-semibold text-gray-900">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-black">
                                    <span>Total</span>
                                    <span className="text-[#EC1E26]">Rs. {order.total.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Customer */}
                              <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Customer</p>
                                <div className="space-y-1.5 text-sm">
                                  <div><span className="text-gray-400">Name: </span><span className="font-semibold text-gray-900">{order.customerName}</span></div>
                                  {order.customerFatherName && <div><span className="text-gray-400">S/O: </span><span className="font-semibold text-gray-900">{order.customerFatherName}</span></div>}
                                  <div>
                                    <span className="text-gray-400">Phone: </span>
                                    <a href={`tel:${order.customerPhone}`} className="font-semibold text-[#EC1E26]">{order.customerPhone}</a>
                                  </div>
                                  {order.customerWhatsapp && (
                                    <div>
                                      <span className="text-gray-400">WA: </span>
                                      <a href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600">{order.customerWhatsapp}</a>
                                    </div>
                                  )}
                                  {order.customerEmail && (
                                    <div><span className="text-gray-400">Email: </span><span className="font-semibold text-gray-700 text-xs">{order.customerEmail}</span></div>
                                  )}
                                </div>
                              </div>

                              {/* Address */}
                              <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Address</p>
                                <div className="space-y-1.5 text-sm">
                                  {order.customerHouse && <div><span className="text-gray-400">House: </span><span className="font-semibold text-gray-900">{order.customerHouse}</span></div>}
                                  {order.customerStreet && <div><span className="text-gray-400">Street: </span><span className="font-semibold text-gray-900">{order.customerStreet}</span></div>}
                                  {order.customerArea && <div><span className="text-gray-400">Area: </span><span className="font-semibold text-gray-900">{order.customerArea}</span></div>}
                                  {order.customerCity && <div><span className="text-gray-400">City: </span><span className="font-bold text-gray-900">{order.customerCity}</span></div>}
                                </div>
                                {fullAddress && (
                                  <div className="mt-2 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-600 border border-gray-200">
                                    {fullAddress}
                                  </div>
                                )}
                                {order.customerLat && order.customerLng && (
                                  <a
                                    href={`https://www.google.com/maps?q=${order.customerLat},${order.customerLng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 mt-1.5 text-[#EC1E26] text-xs font-bold hover:underline"
                                  >
                                    📍 Google Maps
                                  </a>
                                )}
                                {order.note && (
                                  <p className="mt-2 text-xs text-gray-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                                    <span className="font-bold text-amber-700">Note: </span>{order.note}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile: Accordion cards ── */}
          <div className="lg:hidden space-y-3">
            {filtered.map((order) => {
              const st = STATUS_LABELS[order.status];
              const isOpen = expanded === order.id;
              const fullAddress = [
                order.customerHouse, order.customerStreet, order.customerLandmark,
                order.customerArea, order.customerCity, order.customerPostalCode,
              ].filter(Boolean).join(", ");

              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Summary row */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    className="w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-sm font-black text-gray-900">Order #{order.id}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.color}`}>
                          {st.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                      <p className="text-[11px] text-gray-700 font-semibold mt-0.5">
                        {order.customerName} · {order.customerPhone}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-sm font-black text-[#EC1E26]">
                        Rs. {order.total.toLocaleString()}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="border-t border-gray-100">
                      {/* Items */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Items</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs mb-1">
                            <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                            <span className="font-semibold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-xs font-black pt-2 border-t border-gray-100 mt-1">
                          <span>Total</span>
                          <span className="text-[#EC1E26]">Rs. {order.total.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Customer Details</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                          <div><span className="text-gray-400">Name: </span><span className="font-semibold text-gray-900">{order.customerName}</span></div>
                          {order.customerFatherName && <div><span className="text-gray-400">S/O: </span><span className="font-semibold text-gray-900">{order.customerFatherName}</span></div>}
                          <div>
                            <span className="text-gray-400">Phone: </span>
                            <a href={`tel:${order.customerPhone}`} className="font-semibold text-[#EC1E26]">{order.customerPhone}</a>
                          </div>
                          {order.customerWhatsapp && (
                            <div>
                              <span className="text-gray-400">WA: </span>
                              <a href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600">{order.customerWhatsapp}</a>
                            </div>
                          )}
                          {order.customerEmail && (
                            <div className="col-span-2"><span className="text-gray-400">Email: </span><span className="font-semibold text-gray-700">{order.customerEmail}</span></div>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Delivery Address</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                          {order.customerHouse && <div><span className="text-gray-400">House: </span><span className="font-semibold text-gray-900">{order.customerHouse}</span></div>}
                          {order.customerStreet && <div><span className="text-gray-400">Street: </span><span className="font-semibold text-gray-900">{order.customerStreet}</span></div>}
                          {order.customerArea && <div><span className="text-gray-400">Area: </span><span className="font-semibold text-gray-900">{order.customerArea}</span></div>}
                          {order.customerLandmark && <div><span className="text-gray-400">Landmark: </span><span className="font-semibold text-gray-900">{order.customerLandmark}</span></div>}
                          {order.customerCity && <div><span className="text-gray-400">City: </span><span className="font-semibold text-gray-900">{order.customerCity}</span></div>}
                          {order.customerPostalCode && <div><span className="text-gray-400">Postal: </span><span className="font-semibold text-gray-900">{order.customerPostalCode}</span></div>}
                        </div>
                        {fullAddress && (
                          <div className="mt-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600">{fullAddress}</div>
                        )}
                        {order.customerLat && order.customerLng && (
                          <a
                            href={`https://www.google.com/maps?q=${order.customerLat},${order.customerLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-1.5 text-[#EC1E26] text-[11px] font-bold hover:underline"
                          >
                            📍 View on Google Maps
                          </a>
                        )}
                      </div>

                      {/* Note */}
                      {order.note && (
                        <div className="px-4 py-3">
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Note</p>
                          <p className="text-xs text-gray-700">{order.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
