import Hero from "@/components/hero";
import FeaturesStrip from "@/components/features-strip";
import Menu from "@/components/menu";
import PromoBanner from "@/components/promo-banner";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <Menu />
      <PromoBanner />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
