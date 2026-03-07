import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import StickySection from "./components/StickySection";
import CTA from "./components/CTA";

export default function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="bg-white">
        <FeatureSection 
          title="Apps leap into your space."
          description="In visionOS, apps have a new dimension. They can fill the space around you, move anywhere, and scale to the perfect size."
          placeholderLabel="Product Image Placeholder 1"
        />
        
        <FeatureSection 
          reversed
          title="Your room is a theater."
          description="Transform any room into your own personal theater. Expand your movies, shows, and games to the perfect size while feeling like you're part of the action."
          placeholderLabel="Product Image Placeholder 2"
        />

        <FeatureSection 
          title="Stay connected to others."
          description="Visionary helps you stay connected to those around you. Eyesight reveals your eyes and lets those nearby know when you're using apps."
          placeholderLabel="Product Image Placeholder 3"
        />
      </div>

      <StickySection />
      
      <CTA />
    </main>
  );
}
