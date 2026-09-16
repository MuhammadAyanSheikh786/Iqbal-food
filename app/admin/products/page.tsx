"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Category { id: number; label: string; slug: string; }
interface Product {
  id: number; name: string; description: string; price: number;
  image: string; available: boolean; featured: boolean;
  category: Category;
}

const EMPTY_FORM = { name: "", description: "", price: "", image: "", categoryId: "", featured: false, available: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    const [pRes, cRes] = await Promise.all([fetch("/api/products"), fetch("/api/categories")]);
    const pData = await pRes.json();
    const cData = await cRes.json();
    setProducts(Array.isArray(pData) ? pData : []);
    setCategories(Array.isArray(cData) ? cData : []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // ── ImageKit upload ──
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadError("");
    try {
      const authRes = await fetch("/api/imagekit-auth");
      const { signature, expire, token } = await authRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `product-${Date.now()}-${file.name}`);
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("token", token);
      formData.append("folder", "/iqbal-food/products");

      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Upload failed");
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name, description: p.description, price: String(p.price),
      image: p.image, categoryId: String(p.category?.id ?? ""),
      featured: p.featured, available: p.available,
    });
    setShowForm(true);
  };

  const openNew = () => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.categoryId) return;
    setSaving(true);
    const payload = { ...form, price: parseFloat(form.price), categoryId: parseInt(form.categoryId) };
    if (editId) {
      await fetch(`/api/products/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    await fetchData();
    setSaving(false);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Mark this product as unavailable?")) return;
    await fetch(`/api/products/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ available: false }) });
    await fetchData();
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || String(p.category?.id) === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 font-medium">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#EC1E26] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </button>
      </div>

      {/* ── Search + category filter ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#EC1E26] focus:ring-1 focus:ring-[#EC1E26]/20 bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
              categoryFilter === "all"
                ? "bg-[#EC1E26] text-white border-[#EC1E26]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(String(c.id))}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                categoryFilter === String(c.id)
                  ? "bg-[#EC1E26] text-white border-[#EC1E26]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-black text-gray-900 text-sm">{editId ? "Edit Product" : "Add New Product"}</h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">
              {([
                { key: "name", label: "Product Name *", placeholder: "e.g. Beef Burger", inputType: "text" },
                { key: "description", label: "Description", placeholder: "Short description...", inputType: "text" },
                { key: "price", label: "Price (Rs.) *", placeholder: "350", inputType: "number" },
              ] as const).map(({ key, label, placeholder, inputType }) => (
                <div key={key}>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type={inputType ?? "text"}
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC1E26] focus:ring-1 focus:ring-[#EC1E26]/20"
                  />
                </div>
              ))}

              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Category *</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC1E26] focus:ring-1 focus:ring-[#EC1E26]/20"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              {/* Image upload */}
              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Product Image</label>
                {form.image && (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 mt-2 mb-2 bg-[#EC1E26]">
                    <Image src={form.image} alt="preview" fill className="object-cover" sizes="400px" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full text-white text-xs flex items-center justify-center hover:bg-black/80"
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full mt-1 border-2 border-dashed border-gray-300 hover:border-[#EC1E26] rounded-xl py-3 text-sm text-gray-500 hover:text-[#EC1E26] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      {form.image ? "Replace Image" : "Upload Image (ImageKit)"}
                    </>
                  )}
                </button>
                {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
                <div className="mt-2">
                  <label className="text-[10px] text-gray-400">Or paste image URL</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#EC1E26]"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-[#EC1E26]" />
                  <span className="font-medium text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="w-4 h-4 accent-[#EC1E26]" />
                  <span className="font-medium text-gray-700">Available</span>
                </label>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 bg-[#EC1E26] text-white font-black py-2.5 rounded-xl text-sm hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Products grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
              <p className="text-gray-400 text-sm font-medium">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col transition-shadow hover:shadow-md ${!p.available ? "opacity-50" : ""}`}
                >
                  {/* Square image */}
                  <div className="relative aspect-square bg-[#EC1E26] flex-shrink-0">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-3xl">🍔</span>
                      </div>
                    )}
                    {/* Featured badge */}
                    {p.featured && (
                      <div className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                        Featured
                      </div>
                    )}
                    {/* Unavailable badge */}
                    {!p.available && (
                      <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        Hidden
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-xs font-black text-gray-900 line-clamp-2 leading-tight mb-1">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium mb-1.5">{p.category?.label}</p>
                    <p className="text-sm font-black text-[#EC1E26] mt-auto">Rs. {p.price.toLocaleString()}</p>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-2.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold text-[#EC1E26] border border-red-200 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 border border-gray-200 py-1.5 rounded-lg hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                        Hide
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
