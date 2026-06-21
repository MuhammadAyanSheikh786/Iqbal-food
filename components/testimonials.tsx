import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Regular Customer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    content:
      "The best burgers in town! AM Foods never disappoints. The quality of ingredients is outstanding and the flavors are incredible.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Food Blogger",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    content:
      "I've tried burger joints across the city, and AM Foods stands out for its freshness and creativity. The loaded fries are a must-try!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Family of Four",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    content:
      "Our family loves AM Foods. There's something for everyone — from the kids' meals to the gourmet burgers. Fast delivery too!",
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
    <section id="testimonials" className="bg-bg-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary-lighter px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
            What Our{" "}
            <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Dont just take our word for it — hear from the people who love AM
            Foods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface rounded-xl p-6 shadow-sm border border-border"
            >
              <StarRating rating={t.rating} />
              <p className="text-text-secondary leading-relaxed mt-4 mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
