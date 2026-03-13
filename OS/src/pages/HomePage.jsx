import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import Gallery from "../components/Gallery";
import CTA from "../components/CTA";
import Header from "../components/Header";
import Gategories from "../components/Gategories";
import Hero2 from "../components/Hero2";

import man2 from "../assets/man2.jpg";
import women from "../assets/women.jpeg";
import glasse14 from "../assets/glasse14.jpeg";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
<Gategories />
      <Hero />

      

      {/* <Gat />*/}

      <div id="features" className="">
      <FeatureSection
  title={["Premium ", <span style={{ color: "#dfb83a" }}>Quality Materials.</span>]}
  description="Crafted from high-quality materials to ensure durability, comfort, and timeless elegance."
  imageSrc={man2}
/>

<FeatureSection
  reversed
  title={
    <>
      Precision <span className="text-[#dfb83a]">Engineered Design.</span>
    </>
  }
  description="Frames engineered with modern design and perfect balance, combining style and functionality to elevate your everyday look."
  imageSrc={women}
/>

<FeatureSection
  title={
    <>
      Ultimate <span className="text-[#dfb83a]">Comfort Fit.</span>
    </>
  }
  description="Lightweight construction designed for smooth, effortless wear, ensuring your glasses feel as natural as they look."
  imageSrc={glasse14}
/>
      </div>

      <Hero2 />

      <section id="gallery">
        <Gallery />
      </section>

      <section id="contact">
        <CTA />
      </section>
    </main>
  );
}