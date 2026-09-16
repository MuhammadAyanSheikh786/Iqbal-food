export default function AnnouncementBar() {
  return (
    <div className="bg-[#1a1a1a] text-white border-b border-white/10 text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto h-9 sm:h-10 px-4 sm:px-8 flex items-center justify-between font-normal tracking-wide">
        {/* Left Item */}
        <div className="flex items-center gap-1.5 text-gray-200">
          <span className="text-sm select-none" role="img" aria-label="Delivery truck">
            🚚
          </span>
          <span>
            Free Delivery on orders over{" "}
            <span className="font-semibold text-white">Rs. 500</span>
          </span>
        </div>

        {/* Center Item */}
        <div className="hidden md:flex items-center gap-1.5 text-gray-300 font-medium">
          <span>Good Food, Delivered Fast</span>
          <span className="text-sm select-none" role="img" aria-label="Fire">
            🔥
          </span>
        </div>

        {/* Right Item */}
        <div className="flex items-center gap-2">
          <a
            href="tel:111-472-251"
            className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors group"
          >
            <span
              className="text-sm select-none group-hover:scale-110 transition-transform"
              role="img"
              aria-label="Headphones"
            >
              🎧
            </span>
            <span className="text-gray-300">
              <span className="hidden xs:inline text-gray-400">24/7 Support: </span>
              <span className="font-semibold text-white tracking-wide">111-IQBAL-11</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export { AnnouncementBar };
