import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import g1 from "../assets/g1.jpeg";
import g2 from "../assets/g2.jpeg";
import g4 from "../assets/g4.jpeg";

export default function SplitVisionCarousel() {
  const images = [g1, g2, g4];
  const [index, setIndex] = useState(0);

  const brandBlue = "#292077";
  const brandGold = "#dfb83a";

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-center bg-white overflow-hidden">
      
      {/* Left Column: Fixed Content */}
      <div className="w-full md:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: brandGold }}
        >
          Exclusive Collection
        </motion.span>
        
        <h2 className="text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tighter text-[#111]">
          The <br />
          <span style={{ color: brandBlue }}>Ocularia <br /> Synthesis.</span>
        </h2>
        
        <p className="text-gray-500 max-w-md text-lg leading-relaxed mb-10">
          Our glasses aren't just accessories—they are an evolution of sight. 
          Discover the future of digital protection and style.
        </p>

        {/* Custom Navigation Brackets */}
        <div className="flex items-center gap-6">
          <button 
            onClick={prev}
            className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-90"
          >
            <ArrowLeft size={24} style={{ color: brandBlue }} />
          </button>
          
          <div className="text-lg font-mono font-medium">
            0{index + 1} <span className="text-gray-300 mx-2">/</span> 0{images.length}
          </div>

          <button 
            onClick={next}
            className="p-4 rounded-full text-white transition-all active:scale-90 shadow-lg"
            style={{ backgroundColor: brandBlue }}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Right Column: Animated Image Card */}
      <div className="w-full md:w-1/2 h-[600px] md:h-screen relative p-6 md:p-12">
        <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="OptiStyle Product"
            />
          </AnimatePresence>

          {/* Gold Accent Overlay */}
          <div 
            className="absolute top-10 right-10 w-24 h-24 rounded-full flex items-center justify-center text-[10px] font-bold text-center uppercase tracking-tighter backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `${brandGold}dd`, color: brandBlue }}
          >
            New <br /> Drop
          </div>
        </div>
        
        {/* Decorative Background Element */}
        <div 
          className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: brandBlue }}
        />
      </div>

    </section>
  );
}