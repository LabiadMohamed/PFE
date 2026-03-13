import React from 'react';
import { Link } from 'react-router-dom';
import bg3 from "../assets/bg3.png";

function Header() {
  return (
    <div 
      className="relative w-full h-[500px] lg:h-[calc(100vh-64px)] mt-16 flex flex-col justify-end md:justify-center md:pt-20   items-start bg-cover  bg-center"
      style={{ backgroundImage: `url(${bg3})` ,
      backgroundPosition: window.innerWidth < 768 ? '75% center' : 'center center'
    }}
    >
      {/* Overlay to ensure text is readable regardless of the image */}
      <div className="absolute inset-0 bg-black/10  " />

      <div className="relative z-10 w-full max-w-4xl lg:max-w-3xl  p-7 md:p-16 md:mb-0 md:ml-0 lg:ml-0">
        
        {/* Title: Using a Serif font and responsive sizing */}
        <h1 className="text-white md:text-[#373535] text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] leading-tight tracking-tight mb-4">
          New frames with a <br className="hidden md:block" /> fresh point of view
        </h1>

        {/* Buttons Container */}
        {/* Buttons Container: Changed to flex-row by default for mobile */}
<div className="flex flex-row flex-wrap gap-3 items-center ">
  <Link 
    to="/quiz"
    // Changed w-full to w-auto, and text-lg to text-base for mobile
    className="w-auto text-center bg-[#0047cc] hover:bg-[#0037a3] text-white px-6 md:px-5 py-3 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-lg md:text-base transition-all duration-300 whitespace-nowrap"
  >
    Start with a quiz
  </Link>

  <Link 
    to="/shop" 
    // Changed w-full to w-auto
    className="w-auto text-center bg-[#001a57] hover:bg-[#000e2e] text-white px-6 md:px-5 py-3 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base text-sm md:text-lg transition-all duration-300 whitespace-nowrap"
  >
    Shop eyeglasses
  </Link>
</div>

        {/* New Arrivals Link */}
        <div className="mt-4">
          <Link 
            to="/new-arrivals" 
            className="text-white md:text-[#292077] font-semibold text-lg hover:underline flex items-center gap-2"
          >
            Shop new arrivals <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;