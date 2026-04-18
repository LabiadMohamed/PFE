import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Glasses, Sun, Diamond, Stethoscope, ArrowRight } from 'lucide-react';

import g2 from "../assets/g2.jpeg";
import g4 from "../assets/g4.jpeg";
import glass13 from "../assets/glass13.jpeg";


const categories = [
  {
    id: "01",
    title: "Optical",
    subtitle: "Everyday clarity",
    desc: "Discover our premium selection of optical frames crafted for durability and all-day comfort. Experience vision like never before.",
    icon: Glasses,
    image: g2,
    link: "/shop"
  },
  {
    id: "02",
    title: "Sun",
    subtitle: "UV Protection",
    desc: "Elevate your outdoor style with our luxury prescription sunglasses, offering maximum UV protection without compromising elegance.",
    icon: Sun,
    image: g4,
    link: "/shop"
  },
  {
    id: "03",
    title: "LUXURY",
    subtitle: "Designer frames",
    desc: "Indulge in our exclusive boutique collection. Handmade frames with exquisite detailing and uncompromising luxurious quality.",
    icon: Diamond,
    image: glass13,
    link: "/shop"
  },
  
];

export default function Visionary() {
  // We duplicate the categories array 4 times to ensure enough width for super wide screens 
  // and loop perfectly seamlessly across 50% translation length
  const duplicatedCategories = [...categories, ...categories, ...categories, ...categories];

  return (
    <section className="bg-white py-24 w-full overflow-hidden">
      <style>
        {`
          @keyframes scrollTrack {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.75rem)); } 
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: scrollTrack 50s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#292077]  capitalize tracking-wide">
            Product <span className="text-[#d4af37] italic font-serif capitalize font-normal">Categories</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our curated collections designed to elevate your everyday eyewear experience.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full max-w-[100vw] mx-auto overflow-hidden">
        
        {/* Side-gradient masks for cinematic feel */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-white to-transparent pointer-events-none z-50" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-white to-transparent pointer-events-none z-50" />

        <div className="py-4 flex">
          <div className="animate-infinite-scroll gap-4 lg:gap-6 px-4 lg:px-6">
            {duplicatedCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <motion.div 
                  key={`${cat.id}-${index}`}
                  whileHover={{ y: -16, scale: 1.03, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  className="group relative h-[380px] w-[240px] sm:w-[280px] lg:w-[320px] rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 shadow-xl cursor-pointer flex-shrink-0"
                >
                  <Link to={cat.link} className="absolute inset-0 z-20" aria-label={cat.title} />

                  {/* Background Image Container */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img 
                      src={cat.image} 
                      alt={cat.title}
                      animate={{ scale: [1.05, 1.15, 1.05], x: [0, -6, 0] }}
                      transition={{ duration: 20 + (index % 4) * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.25]"
                    />
                  </div>

                  {/* Gradient Overlay: Neutral Black/Gray to transparent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-60 pointer-events-none z-10" />

                  {/* Faint Index Number behind the content */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: (index % 4) * 0.8 }}
                    className="absolute top-8 right-5 text-[6rem] leading-none font-black italic text-white/10 transition-colors duration-700 group-hover:text-[#d4af37]/20 pointer-events-none select-none z-10"
                  >
                    {cat.id}
                  </motion.div>

                  {/* Glassmorphism Icon Badge */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: (index % 4) * 0.4 }}
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center transition-colors duration-500 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] z-30"
                  >
                    <IconComponent className="text-white w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                  </motion.div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 pointer-events-none flex flex-col justify-end">
                    
                    <p className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-1 italic shadow-sm shadow-black/20">
                      {cat.subtitle}
                    </p>
                    
                    <h3 className="text-white text-2xl font-black tracking-wider uppercase mb-1 drop-shadow-lg">
                      {cat.title}
                    </h3>

                    {/* Hidden Description sliding down on hover */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-white/90 font-medium text-sm leading-relaxed pt-1 pb-3 drop-shadow-md">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center text-white/90 text-xs font-bold tracking-widest uppercase transition-colors duration-500 group-hover:text-white">
                      Discover <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </div>

                  </div>

                  {/* Thin Gold Progress Bar at Bottom */}
                  <div className="absolute bottom-0 left-0 h-[4px] bg-[#d4af37] w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full z-40 pointer-events-none" />

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}