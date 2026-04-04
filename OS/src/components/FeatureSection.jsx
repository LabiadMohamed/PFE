import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Feather, Maximize } from "lucide-react";

import man2 from "../assets/man2.jpg";
import women from "../assets/women.jpeg";
import glasse14 from "../assets/glasse14.jpeg";

const FEATURES = [
  {
    id: "materials",
    icon: Sparkles,
    label: "Premium Materials",
    title: "Crafted for Eternity",
    desc: "Acetat and aerospace-grade titanium combined to create frames that are feather-light yet incredibly durable.",
    img: man2,
  },
  {
    id: "design",
    icon: Maximize,
    label: "Precision Engineered",
    title: "Perfect Balance",
    desc: "Each curve is meticulously calculated to distribute weight evenly, ensuring they stay perfectly positioned all day.",
    img: women,
  },
  {
    id: "comfort",
    icon: Feather,
    label: "Ultimate Comfort",
    title: "Effortless Wear",
    desc: "Ergonomic nose pads and flexible hinges adapt to your unique facial structure for a custom-fit feel.",
    img: glasse14,
  }
];

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id);

  const currentFeature = FEATURES.find(f => f.id === activeFeature);

  return (
    <section className="py-24 md:py-32 bg-gray-50 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
  <div className="max-w-2xl">
    <h4 className="text-[#d4af37] font-black text-sm tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-4">
      <div className="w-8 h-px bg-[#d4af37]"></div>
      Signature Collection
    </h4>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#292077] tracking-tighter uppercase mb-6 leading-[1.1]">
      Uncompromising <br className="hidden md:block"/>
      <span className="text-[#d4af37] italic font-serif capitalize font-normal">Excellence</span>
    </h2>
  </div>
</div>
        {/* Interactive Showcase */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 border border-gray-100 min-h-[600px]">
          
          {/* Active Image Reveal */}
          <div className="relative w-full lg:w-3/5 h-[400px] lg:h-auto rounded-[2rem] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentFeature.id}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                src={currentFeature.img}
                alt={currentFeature.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Elegant vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#292077]/80 via-transparent to-transparent opacity-80" />
            
            {/* Floating Info on Image */}
            <motion.div 
              key={`text-${currentFeature.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-8 left-8 right-8 text-white"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20 text-[#d4af37]">
                <currentFeature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-wider mb-2 drop-shadow-lg">{currentFeature.title}</h3>
              <p className="text-white/80 font-medium max-w-md drop-shadow-md">{currentFeature.desc}</p>
            </motion.div>
          </div>

          {/* Tab Selection List */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center py-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 px-4">Innovations</h4>
            
            <div className="space-y-4">
              {FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left px-6 py-5 rounded-2xl transition-all duration-500 relative flex items-center gap-6 group ${
                    activeFeature === feature.id 
                      ? "bg-gray-50 shadow-sm"
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  {/* Selection Indicator */}
                  {activeFeature === feature.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#d4af37] rounded-r-full"
                    />
                  )}
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                    activeFeature === feature.id ? "bg-[#292077] text-white shadow-lg shadow-[#292077]/30" : "bg-gray-100 text-gray-400 group-hover:text-[#292077]"
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h5 className={`font-black uppercase tracking-wider text-sm transition-colors duration-300 ${
                      activeFeature === feature.id ? "text-[#292077]" : "text-gray-500 group-hover:text-[#292077]"
                    }`}>
                      {feature.label}
                    </h5>
                    <p className={`text-xs mt-1 transition-all duration-300 font-medium ${
                      activeFeature === feature.id ? "text-gray-500 opacity-100" : "text-transparent opacity-0 h-0"
                    }`}>
                      Click to explore feature
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-12 px-6">
              <button className="group flex items-center gap-4 text-[#292077] font-black uppercase tracking-widest text-xs hover:text-[#d4af37] transition-colors relative">
                Explore The Science
                <div className="absolute -bottom-2 left-0 w-8 h-px bg-[#292077] group-hover:bg-[#d4af37] group-hover:w-full transition-all duration-500" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
