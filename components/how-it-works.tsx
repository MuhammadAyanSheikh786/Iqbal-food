export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Food",
      description: "Explore menu & choose your favorite dishes.",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Place Your Order",
      description: "Add to cart & place your order easily.",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Fast Delivery",
      description: "We deliver hot & fresh to your doorstep.",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3l3 4h4" />
          <path d="M14 9h4l3 5v4h-3" />
          <path d="M15 18H9" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Enjoy Your Meal",
      description: "Sit back, relax & enjoy your delicious meal.",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading & Subtitle */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight leading-tight">
          How It Works
        </h2>
        <div className="w-10 h-0.5 bg-primary rounded-full mx-auto mt-2.5 mb-2" />
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Simple 4 steps to satisfy your cravings
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-10">
        {steps.map((item, index) => (
          <div
            key={item.step}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 hover:-translate-y-1 transition-all duration-200 text-center relative flex flex-col items-center group"
          >
            {/* Step badge */}
            <span className="text-[10px] font-black text-primary/70 tracking-widest uppercase mb-2">
              Step {item.step}
            </span>

            {/* Circular Icon Badge */}
            <div className="w-14 h-14 rounded-full bg-red-50 text-primary border border-red-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-sm">
              {item.icon}
            </div>

            {/* Step Title */}
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">
              {item.title}
            </h3>

            {/* Step Description */}
            <p className="text-xs text-gray-500 max-w-[200px] mx-auto text-center leading-relaxed">
              {item.description}
            </p>

            {/* Connector arrow between steps (visible on desktop lg only, except last step) */}
            {index < steps.length - 1 && (
              <div
                className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 items-center justify-center pointer-events-none z-20 text-gray-300"
                aria-hidden="true"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
