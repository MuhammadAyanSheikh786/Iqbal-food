import Image from "next/image";
import Link from "next/link";

const CUSTOMER_AVATARS = [
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    alt: "Happy Customer 1",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    alt: "Happy Customer 2",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    alt: "Happy Customer 3",
  },
  {
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    alt: "Happy Customer 4",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-[#FAF7F2] rounded-b-[32px] sm:rounded-b-[40px] overflow-hidden pt-4 sm:pt-8 pb-8 sm:pb-20 px-4 sm:px-8 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
        {/* Left column */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 animate-fade-in-up text-center lg:text-left">
          {/* Handwriting / italic badge */}
          <div>
            <span className="font-serif italic text-base sm:text-xl text-gray-700 select-none">
              Delicious Food.
            </span>
          </div>

          {/* Giant catchy headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-950 leading-[1.1]">
            Delivered
            <span className="text-primary block sm:inline sm:ml-3 lg:block lg:ml-0">
              To You <span className="text-primary font-normal">♡</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Your favorite meals from Iqbal Food, prepared with premium ingredients
            and delivered fast &amp; fresh to your door.
          </p>

          {/* Action buttons - Hidden on small mobile to keep banner compact, visible on sm and up */}
          <div className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
            <Link
              href="#menu"
              className="bg-primary hover:bg-red-700 text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-red-200 text-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
            >
              <span>Order Now</span>
              <span className="text-base leading-none">→</span>
            </Link>
            <Link
              href="#menu"
              className="border border-gray-300 hover:border-gray-900 bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:bg-gray-50 active:scale-95 shadow-sm inline-flex items-center gap-2"
            >
              Explore Menu
            </Link>
          </div>

          {/* Social Proof / Happy Customers */}
          <div className="pt-1 sm:pt-3 flex items-center justify-center lg:justify-start gap-3">
            {/* Overlapping customer avatars */}
            <div className="flex items-center">
              {CUSTOMER_AVATARS.map((avatar, idx) => (
                <div
                  key={idx}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden shadow-xs -ml-2 first:ml-0 ring-1 ring-black/5"
                >
                  <Image
                    src={avatar.img}
                    alt={avatar.alt}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ))}
            </div>

            {/* Stars & counter */}
            <div className="text-left">
              <div className="flex items-center text-amber-400 text-xs sm:text-sm leading-none tracking-wide select-none">
                ★★★★★
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-800 mt-0.5">
                10K+ Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-6 relative flex items-center justify-center mt-2 lg:mt-0">
          {/* Subtle background glow */}
          <div
            className="absolute -inset-4 bg-gradient-to-tr from-red-100/60 via-amber-100/50 to-orange-100/30 rounded-full blur-3xl -z-10 scale-95 pointer-events-none"
            aria-hidden="true"
          />

          {/* Large hero food image container - compact on mobile */}
          <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px] aspect-[16/10] sm:aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/90 group">
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop&q=85"
              alt="Crispy Burger & Feast from Iqbal Food"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating badge 1: Fast Delivery (Top Right) */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 border border-gray-100 flex items-center gap-2 sm:gap-3 absolute -top-2 right-1 sm:top-4 sm:right-6 z-10 scale-90 sm:scale-100">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18.5" cy="17.5" r="3.5" />
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="15" cy="5" r="1" />
                <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-gray-900 leading-tight">
                Fast Delivery
              </p>
              <p className="text-[9px] sm:text-[11px] font-medium text-emerald-600">
                Within 30 mins
              </p>
            </div>
          </div>

          {/* Floating badge 2: ⭐ 4.9 Rating (Bottom Left) */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 border border-gray-100 flex items-center gap-2 sm:gap-3 absolute -bottom-2 left-1 sm:bottom-4 sm:left-6 z-10 scale-90 sm:scale-100">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-sm sm:text-lg flex-shrink-0 select-none">
              ★
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-xs font-black text-gray-900 leading-tight">
                  4.9 Rating
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
                  (2.5k)
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] font-medium text-primary">
                Fresh &amp; Hot Food
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
