"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

interface FormState {
  name: string;
  fatherName: string;
  email: string;
  whatsapp: string;
  // Address parts
  house: string;
  street: string;
  landmark: string;
  area: string;
  postalCode: string;
  city: string;
  // Location
  lat: number | null;
  lng: number | null;
  note: string;
}

const INPUT_CLASS = "w-full mt-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";
const LABEL_CLASS = "text-[11px] font-bold uppercase text-gray-500 tracking-wide";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "", fatherName: "", email: "", whatsapp: "",
    house: "", street: "", landmark: "", area: "", postalCode: "", city: "Karachi",
    lat: null, lng: null, note: "",
  });
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: f.name || user.name || "", email: user.email || "" }));
  }, [user]);

  useEffect(() => { if (!user) router.replace("/cart"); }, [user, router]);
  useEffect(() => { if (items.length === 0) router.replace("/"); }, [items.length, router]);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) { setLocError("Geolocation not supported."); return; }
    setLocating(true); setLocError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          const addr = data.address ?? {};
          setForm((f) => ({
            ...f,
            house: addr.house_number ?? f.house,
            street: addr.road ?? addr.street ?? f.street,
            area: addr.suburb ?? addr.neighbourhood ?? addr.quarter ?? f.area,
            city: addr.city ?? addr.town ?? addr.village ?? f.city,
            postalCode: addr.postcode ?? f.postalCode,
            lat, lng,
          }));
        } catch {
          setForm((f) => ({ ...f, lat, lng }));
        }
        setLocating(false);
      },
      () => { setLocError("Could not detect location. Please fill manually."); setLocating(false); },
      { timeout: 10000 }
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    if (!form.name || !form.fatherName || !form.whatsapp || !form.house || !form.street || !form.city) {
      setError("Please fill all required fields (Name, Father's Name, WhatsApp, House, Street, City)");
      return;
    }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customerName: form.name,
          customerFatherName: form.fatherName,
          customerEmail: form.email,
          customerPhone: form.whatsapp,
          customerWhatsapp: form.whatsapp,
          customerHouse: form.house,
          customerStreet: form.street,
          customerLandmark: form.landmark,
          customerArea: form.area,
          customerPostalCode: form.postalCode,
          customerCity: form.city,
          customerLat: form.lat,
          customerLng: form.lng,
          note: form.note,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      clearCart();
      router.push(`/order-confirmed?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [user, form, items, clearCart, router]);

  if (!user || items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  }

  const fullAddress = [form.house, form.street, form.landmark, form.area, form.city, form.postalCode].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/cart" className="text-gray-500 hover:text-gray-900">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="text-base font-black text-gray-900 uppercase">Checkout</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-4 pb-36 space-y-4">

        {/* Step 1 — Personal Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <h2 className="text-xs font-black uppercase text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">1</span>
            Personal Details
          </h2>
          <div className="space-y-3">
            <div>
              <label className={LABEL_CLASS}>Full Name <span className="text-primary">*</span></label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="e.g. Muhammad Ali" className={INPUT_CLASS}/>
            </div>
            <div>
              <label className={LABEL_CLASS}>Father&apos;s Name <span className="text-primary">*</span></label>
              <input type="text" value={form.fatherName} onChange={(e) => setForm({...form, fatherName: e.target.value})} placeholder="e.g. Muhammad Iqbal" className={INPUT_CLASS}/>
            </div>
            <div>
              <label className={LABEL_CLASS}>WhatsApp Number <span className="text-primary">*</span></label>
              <input type="tel" value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})} placeholder="03XX-XXXXXXX" className={INPUT_CLASS}/>
            </div>
            <div>
              <label className={LABEL_CLASS}>Email</label>
              <input type="email" value={form.email} readOnly className={`${INPUT_CLASS} bg-gray-50 text-gray-500 cursor-not-allowed`}/>
            </div>
          </div>
        </div>

        {/* Step 2 — Delivery Address */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <h2 className="text-xs font-black uppercase text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">2</span>
            Delivery Address
          </h2>

          {/* Auto-detect */}
          <button type="button" onClick={detectLocation} disabled={locating}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/40 hover:border-primary rounded-xl py-3 text-sm font-bold text-primary hover:bg-red-50 transition-all mb-4 disabled:opacity-60">
            {locating ? (
              <><span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"/>Detecting...</>
            ) : (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>Auto-detect My Location</>
            )}
          </button>
          {locError && <p className="text-xs text-red-500 mb-3">{locError}</p>}

          {/* Map preview */}
          {form.lat && form.lng && (
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 h-32">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${form.lng-0.01},${form.lat-0.01},${form.lng+0.01},${form.lat+0.01}&layer=mapnik&marker=${form.lat},${form.lng}`}
                className="w-full h-full" title="Location"/>
            </div>
          )}

          <div className="space-y-3">
            {/* House / Flat */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLASS}>House / Flat No. <span className="text-primary">*</span></label>
                <input type="text" value={form.house} onChange={(e) => setForm({...form, house: e.target.value})} placeholder="e.g. A-12 / Flat 3" className={INPUT_CLASS}/>
              </div>
              <div>
                <label className={LABEL_CLASS}>Postal Code</label>
                <input type="text" value={form.postalCode} onChange={(e) => setForm({...form, postalCode: e.target.value})} placeholder="e.g. 75400" className={INPUT_CLASS}/>
              </div>
            </div>
            {/* Street */}
            <div>
              <label className={LABEL_CLASS}>Street / Road <span className="text-primary">*</span></label>
              <input type="text" value={form.street} onChange={(e) => setForm({...form, street: e.target.value})} placeholder="e.g. Block 6 PECHS, Street 10" className={INPUT_CLASS}/>
            </div>
            {/* Area */}
            <div>
              <label className={LABEL_CLASS}>Area / Neighbourhood</label>
              <input type="text" value={form.area} onChange={(e) => setForm({...form, area: e.target.value})} placeholder="e.g. Gulshan-e-Iqbal, DHA" className={INPUT_CLASS}/>
            </div>
            {/* Landmark */}
            <div>
              <label className={LABEL_CLASS}>Nearest Landmark</label>
              <input type="text" value={form.landmark} onChange={(e) => setForm({...form, landmark: e.target.value})} placeholder="e.g. Near KFC, Opposite Masjid" className={INPUT_CLASS}/>
            </div>
            {/* City */}
            <div>
              <label className={LABEL_CLASS}>City <span className="text-primary">*</span></label>
              <input type="text" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="e.g. Karachi" className={INPUT_CLASS}/>
            </div>
          </div>

          {/* Address preview */}
          {fullAddress && (
            <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <p className="text-[10px] text-gray-400 font-semibold uppercase mb-0.5">Full Address Preview</p>
              <p className="text-xs text-gray-700">{fullAddress}</p>
            </div>
          )}
        </div>

        {/* Step 3 — Extra Message */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <h2 className="text-xs font-black uppercase text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">3</span>
            Extra Message
            <span className="text-gray-400 font-normal normal-case text-xs">(Optional)</span>
          </h2>
          <textarea value={form.note} onChange={(e) => setForm({...form, note: e.target.value})}
            placeholder="Extra sauce, no onions, ring bell on arrival…" rows={2}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"/>
        </div>

        {/* Step 4 — Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <h2 className="text-xs font-black uppercase text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">4</span>
            Order Summary
          </h2>
          <div className="space-y-2 mb-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                <span className="font-semibold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-black text-gray-900 text-sm">Total</span>
            <span className="font-black text-primary">Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-xs font-semibold">{error}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto">
          <button onClick={handleSubmit} disabled={loading}
            className="w-full flex items-center justify-between bg-primary text-white font-black px-6 py-4 rounded-2xl text-sm hover:bg-red-700 transition-colors disabled:opacity-60 shadow-lg shadow-red-200">
            <span>{loading ? "Placing Order..." : "Place Order"}</span>
            <span className="bg-white/20 rounded-full px-3 py-1">Rs. {total.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
