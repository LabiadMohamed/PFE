import { useState, useEffect } from "react";
import { motion, AnimatePresence, color } from "motion/react";
import glasse4 from "../assets/glasse4.jpg";
import glasse3 from "../assets/glasse3.jpg";
import glasse5 from "../assets/glasse5.png";
import glasse11 from "../assets/glasse11.jpg";
import glasse9 from "../assets/glasse9.jpg";
import glasse12 from "../assets/glasse12.jpg";

const slides = [
  { id: 1, title: "Vision", subtitle: "Discover glasses that define sophistication for the modern man.",  bgImage: glasse3 , color: "text-dark" },
  { id: 2, title: "Outlook", subtitle: "tand out with glasses that combine strength and modern luxury.",  /*bgImage: glasse4*/ color: "bg-blue-300" },
  { id: 3, title: "Clarity", subtitle: "Navigate with your eyes, hands, and voice.", color: "text-dark", bgImage: glasse5 },
  { id: 4, title: "Empower Your Look", subtitle: "Stand out with glasses that combine strength and modern luxury.", color: "bg-blue-300", /*bgImage: glasse9*/ },
  { id: 5, title: "Where Innovation Meets Luxuryd", subtitle: "Step into the future of eyewear with bold, luxurious designs.", color: "placeholder-gradient" },
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
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute inset-0 flex items-center justify-center bg-cover bg-center ${slides[current].color ?? ""}`}
          style={{
            backgroundImage: slides[current].bgImage
              ? `url(${slides[current].bgImage})`
              : undefined
    }}
        >
          <div className="text-center z-10 px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-5xl md:text-7xl font-semibold tracking-tight mb-4 ${slides[current].textColor}`}
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8 opacity-80  font-Poppins uppercase ${current % 2 === 1 ? 'text-darck' : 'text-apple-dark'}`}
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                onClick={() => window.location.href = "/buy"} // navigate to buy page
              >
                Buy Now
              </button>
              <button className={`px-8 py-3 rounded-full font-medium border transition-colors ${current % 2 === 1 ? 'text- border-dark/30 hover:bg-white/10' : 'text-apple-dark border-black/10 hover:bg-black/5'}`}
                onClick={() => window.location.href = "/learn"} // navigate to learn page
              >
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

          
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
