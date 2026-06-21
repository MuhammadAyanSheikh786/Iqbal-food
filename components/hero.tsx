import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80"
          alt="Delicious burger with fresh ingredients"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-6">
            Premium Fast Food
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
            Taste the
            <br />
            <span className="text-primary">Extraordinary</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            At AM Foods, we craft every burger, fry, and chip with premium
            ingredients and uncompromising taste. Fast food, elevated.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl active:scale-95"
            >
              Explore Our Menu
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/50"
            >
              Our Story
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">★</span>
              <span>Premium Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">★</span>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">★</span>
              <span>100% Fresh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
