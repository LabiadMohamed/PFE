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
        <FeatureSection />
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