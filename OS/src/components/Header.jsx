<<<<<<< HEAD
import React from "react";
import bgVideo from "../assets/watermarked_preview.mp4";

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
      <div className="absolute inset-0  pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#292077]/50 via-transparent to-[#0a0a0c] pointer-events-none opacity-80" />

      {/* Centered Typography */}
      <div className="relative z-10 text-center px-6 mt-16 md:mt-0">
        <h1 className="text-4xl sm:text-6xl lg:text-[75px] font-black text-white uppercase tracking-wider drop-shadow-2xl mb-4 leading-[1.1]">
          Opti<span className="text-[#d4af37] italic font-serif tracking-normal capitalize font-normal">Style</span>
        </h1>

        <p className="text-gray-300 text-xs md:text-sm font-bold tracking-[0.4em] uppercase max-w-xl mx-auto drop-shadow-md">
          Experience the pinnacle of clarity and design
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#d4af37] rounded-full" />
          </div>
        </div>
=======
import React, { useState, useEffect } from "react";
import "../Header.css";

function Header() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-container">
      {/* Texte de fond flou */}
      <h1 className="blurred-text">CLEAR VISION</h1>

      {/* SVG qui définit la forme des lunettes */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="glasses-mask">
            {/* Forme des verres (à ajuster selon ton image) */}
            <circle cx={mousePos.x} cy={mousePos.y} r="150" />
          </clipPath>
        </defs>
      </svg>

      {/* Texte net (masqué par le SVG) */}
      <div className="lens-container">
        <h1 className="sharp-text">VIVISIONT</h1>
>>>>>>> 64c923227c0025b6dc09bbc8491cc2efc57447fe
      </div>
    </div>
  );
}