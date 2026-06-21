import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-bg-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
              alt="AM Foods restaurant ambiance"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="inline-block rounded-full bg-primary-lighter px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Our Story
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6 text-balance">
              Where Quality Meets
              <br />
              <span className="text-primary">Flavor</span>
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                AM Foods was born from a simple belief: fast food should never
                compromise on quality. We source the finest ingredients, from
                locally grown produce to premium cuts of meat, ensuring every
                bite is as fresh as it is delicious.
              </p>
              <p>
                Our kitchen is where tradition meets innovation. We combine
                time-honored cooking techniques with bold, contemporary flavors
                to create a menu that surprises and satisfies. Every burger is
                hand-crafted, every fry is cut fresh, and every sauce is made
                in-house.
              </p>
              <p>
                We are more than a restaurant — we are a community. From
                families sharing a meal to friends catching up over fries, AM
                Foods is where great food brings people together.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { number: "15+", label: "Years of Excellence" },
                { number: "50+", label: "Menu Items" },
                { number: "10K+", label: "Happy Customers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
