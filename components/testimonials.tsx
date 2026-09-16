import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Regular Customer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    content:
      "The best burgers in town! Iqbal Food never disappoints. The quality of ingredients is outstanding and the flavors are incredible.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Food Blogger",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    content:
      "I've tried burger joints across the city, and Iqbal Food stands out for its freshness and creativity. The loaded fries are a must-try!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Family of Four",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    content:
      "Our family loves Iqbal Food. There's something for everyone — from the kids' meals to the gourmet burgers. Fast delivery too!",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i} className="text-primary text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#111111] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight mb-3">
            What Our{" "}
            <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear from the people who love Iqbal Food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 rounded-xl p-5 border border-white/10 border-l-2 border-l-primary backdrop-blur-sm shadow-sm"
            >
              <StarRating rating={t.rating} />
              <span className="text-primary/30 font-black text-6xl leading-none block -mb-4">&ldquo;</span>
              <p className="text-gray-300 text-sm leading-relaxed mt-3 mb-5">
                {t.content}
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
