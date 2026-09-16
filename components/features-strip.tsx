import type { ReactNode } from "react";

interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Fast Delivery",
    description: "Get your food in 30 minutes",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18.5" cy="17.5" r="3.5" />
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="15" cy="5" r="1" />
        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
  },
  {
    title: "Best Quality",
    description: "Fresh ingredients & top quality",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Best Prices",
    description: "Great food at affordable prices",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "We're here for you anytime",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: "Exclusive Offers",
    description: "Enjoy discounts & special deals",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
  },
];

export default function FeaturesStrip() {
  return (
    <section aria-label="Features" className="px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 max-w-7xl mx-auto -mt-6 sm:-mt-8 relative z-20 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-3 group ${
                index === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-red-50 text-primary flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:scale-105">
                {feature.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-gray-900 leading-tight truncate">
                  {feature.title}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeaturesStrip };
