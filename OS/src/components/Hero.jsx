import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  { id: 1, title: "Visionary", subtitle: "Welcome to the era of spatial computing.", color: "placeholder-gradient" },
  { id: 2, title: "Immersive", subtitle: "A canvas for your apps that lives in your space.", color: "placeholder-dark" },
  { id: 3, title: "Intuitive", subtitle: "Navigate with your eyes, hands, and voice.", color: "placeholder-gradient" },
  { id: 4, title: "Powerful", subtitle: "More pixels than a 4K TV for each eye.", color: "placeholder-dark" },
  { id: 5, title: "Connected", subtitle: "Stay present with the world around you.", color: "placeholder-gradient" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute inset-0 flex items-center justify-center ${slides[current].color}`}
        >
          <div className="text-center z-10 px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-5xl md:text-7xl font-semibold tracking-tight mb-4 ${current % 2 === 1 ? 'text-white' : 'text-apple-dark'}`}
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8 opacity-80 ${current % 2 === 1 ? 'text-white' : 'text-apple-dark'}`}
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Buy Now
              </button>
              <button className={`px-8 py-3 rounded-full font-medium border transition-colors ${current % 2 === 1 ? 'text-white border-white/30 hover:bg-white/10' : 'text-apple-dark border-black/10 hover:bg-black/5'}`}>
                Learn More
              </button>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === idx 
                    ? `w-8 ${current % 2 === 1 ? 'bg-white' : 'bg-apple-dark'}` 
                    : `w-1.5 ${current % 2 === 1 ? 'bg-white/30' : 'bg-black/20'}`
                }`}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className={`text-2xl font-mono uppercase tracking-widest ${current % 2 === 1 ? 'text-white' : 'text-apple-dark'}`}>
              Hero Image Placeholder {current + 1}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
