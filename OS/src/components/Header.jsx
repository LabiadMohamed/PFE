
import React from "react";
import bgVideo from "../assets/a.mp4";


export default function Header() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Elegant Overlay Gradient for better text readability */}
     {/* <div className="absolute inset-0  pointer-events-none bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#292077]/50 via-transparent to-[#0a0a0c] pointer-events-none opacity-80" />**/}

      {/* Centered Typography */}
      <div className="relative z-10 text-center px-6 mt-16 md:mt-0">
        <h1 className="text-4xl sm:text-6xl lg:text-[75px] font-black text-white capitalize  drop-shadow-2xl mb-4 leading-[1.1]">
          Opti<span className="text-[#d4af37] italic font-serif tracking-normal capitalize font-normal">Style</span>
        </h1>

        <p className="text-bleu-300 text-xs md:text-sm font-bold  uppercase max-w-xl mx-auto drop-shadow-md">
          Experience the pinnacle of clarity and design
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#d4af37] rounded-full" />
          </div>
        </div>
      </div>  
    </div>
  );
}
