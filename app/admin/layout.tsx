"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "New Orders",
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9",
  },
  {
    href: "/admin/active",
    label: "Active Orders",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    href: "/admin/orders",
    label: "All Orders",
    icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2",
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: "M20 7l-8-4-8 4m16 0-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) { setChecked(true); return; }
    const token = sessionStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
    else setChecked(true);
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (!checked) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-[#EC1E26] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const currentLabel = NAV_ITEMS.find((n) => isActive(n.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-gray-50 flex font-[Poppins,sans-serif]">

      {/* ── Desktop Sidebar (lg+) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-30 shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#EC1E26] flex items-center justify-center shadow-md shadow-red-200 flex-shrink-0">
            <span className="text-white font-black text-sm">IF</span>
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm uppercase tracking-wide leading-none">Iqbal Food</p>
            <p className="text-[10px] text-[#EC1E26] font-bold uppercase tracking-wider mt-0.5">Admin Dashboard</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 mb-3">Main Menu</p>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  active
                    ? "bg-[#EC1E26] text-white shadow-md shadow-red-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EC1E26] flex items-center justify-center shadow-sm shadow-red-200">
              <span className="text-white font-black text-xs">IF</span>
            </div>
            <div>
              <p className="font-black text-gray-900 text-xs uppercase leading-none">Iqbal Food</p>
              <p className="text-[9px] text-gray-400 mt-0.5">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs text-gray-500 font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-[#EC1E26] font-bold border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-w-0">
        {/* Desktop page header */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Admin Panel</p>
            <h1 className="text-xl font-black text-gray-900 mt-0.5">{currentLabel}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EC1E26] flex items-center justify-center shadow-md shadow-red-200">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Admin</span>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
                  active ? "text-[#EC1E26]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? "2.5" : "2"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                <span className={`text-[9px] font-bold leading-none ${active ? "text-[#EC1E26]" : ""}`}>
                  {item.label.split(" ")[0]}
                </span>
                {active && <span className="w-1 h-1 rounded-full bg-[#EC1E26] mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
