import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import Gallery from "../components/gallery";
import CTA from "../components/CTA";

import man2 from "../assets/man2.jpg";
import women from "../assets/women.jpeg";
import glasse14 from "../assets/glasse14.jpeg";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div id="features" className="bg-white">
        <FeatureSection
          title="Premium Quality Materials."
          description="Crafted from high-quality materials to ensure durability, comfort, and timeless elegance, giving every frame a luxurious and lasting presence."
          imageSrc={man2}
        />

        <FeatureSection
          reversed
          title="Precision Engineered Design."
          description="Frames engineered with modern design and perfect balance, combining style and functionality to elevate your everyday look."
          imageSrc={women}
        />

        <FeatureSection
          title="Ultimate Comfort Fit."
          description="Lightweight construction designed for smooth, effortless wear, ensuring your glasses feel as natural as they look."
          imageSrc={glasse14}
        />
      </div>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="contact">
        <CTA />
      </section>
    </main>
  );
}