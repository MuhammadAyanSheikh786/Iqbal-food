"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number; slug: string; label: string; emoji: string;
  sortOrder: number; active: boolean;
}

const EMPTY_FORM = { slug: "", label: "", emoji: "🍽️", sortOrder: 0 };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openEdit = (c: Category) => {
    setEditId(c.id);
    setForm({ slug: c.slug, label: c.label, emoji: c.emoji, sortOrder: c.sortOrder });
    setShowForm(true);
  };
  const openNew = () => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); };

  const handleSave = async () => {
    if (!form.slug || !form.label) return;
    setSaving(true);
    if (editId) {
      await fetch(`/api/categories/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    await fetchData();
    setSaving(false);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deactivate this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: false }) });
    await fetchData();
  };

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 font-medium">
            {categories.length} categor{categories.length !== 1 ? "ies" : "y"} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#EC1E26] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Category
        </button>
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-black text-gray-900 text-sm">{editId ? "Edit Category" : "Add New Category"}</h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { key: "slug", label: "Slug *", placeholder: "e.g. bar-bq" },
                { key: "label", label: "Label *", placeholder: "e.g. Bar B.Q." },
                { key: "emoji", label: "Emoji", placeholder: "🍖" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC1E26] focus:ring-1 focus:ring-[#EC1E26]/20"
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC1E26] focus:ring-1 focus:ring-[#EC1E26]/20"
                />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#EC1E26] text-white font-black py-2.5 rounded-xl text-sm hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <p className="text-gray-400 text-sm font-medium">No categories yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${!c.active ? "opacity-50" : ""}`}
            >
              {/* Emoji area */}
              <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 bg-gray-50 border-b border-gray-100">
                <span className="text-5xl mb-3 select-none">{c.emoji}</span>
                <p className="font-black text-gray-900 text-sm text-center leading-tight">{c.label}</p>
                {!c.active && (
                  <span className="mt-2 text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase">
                    Inactive
                  </span>
                )}
              </div>

              {/* Info + buttons */}
              <div className="p-3">
                <div className="mb-3">
                  <p className="text-[10px] text-gray-400 font-medium truncate">/{c.slug}</p>
                  <p className="text-[10px] text-gray-400">Sort: {c.sortOrder}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold text-[#EC1E26] border border-red-200 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 border border-gray-200 py-1.5 rounded-lg hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" /><path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Deactivate
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
