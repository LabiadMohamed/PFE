import React from 'react';
import bg2 from "../assets/bg2.avif";
import { Link } from "react-router-dom";

const WarbyHero = () => {
  return (
    <div className="w-full p-4 md:p-10 bg-white">
      {/* The Container: 
        1. relative: allows us to layer text over the image.
        2. bg-cover & bg-center: makes your bg2 image fill the whole shape.
      */}
      <section 
        className="max-w-[1440px] mx-auto min-h-[500px] rounded-[40px] overflow-hidden relative flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        
        {/* The Left Content Overlay:
          We use a subtle gradient (from light blue to transparent) 
          so the text is readable but the image shows through.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#dbeaf4] via-[#dbeaf4]/80 to-transparent md:w-3/4 lg:w-1/2 flex flex-col justify-center px-12 md:px-24 py-16">
          
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase leading-tight text-[#292077] mb-10 drop-shadow-sm">
            Get 15% off <br /> multiple Rx pairs
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <Link to="/shop" className="bg-[#1d52ce] text-white px-9 py-4 rounded-full font-bold text-[14px] hover:bg-blue-700 transition-all active:scale-95 inline-block">
              Shop eyeglasses
            </Link>
            <Link to="/shop" className="bg-[#00143a] text-white px-9 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all active:scale-95 inline-block">
              Shop sunglasses
            </Link>
          </div>
<Link to="/about" className="text-[#1d52ce] font-bold text-[15px] flex items-center group hover:underline">
  about us
  <span className="ml-2 text-xl mb-1 group-hover:translate-x-1 transition-transform inline-block">›</span>
</Link>
          
        </div>

      </section>
    </div>
  );
};

export default WarbyHero;