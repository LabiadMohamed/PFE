import React from 'react';
import '../Header.css';
import bg3 from "../assets/bg3.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div 
      className="relative w-full h-[calc(100vh-64px)] mt-16  flex items-start justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${bg3})` }}
    >
      {/* Glassmorphism Container *  className="bg-white/30 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl text-center max-w-3xl mx-4" >*/}
      <div className=" p-10 md:p-16 mt-35 max-w-3xl mx-4 ms-5" >
        
        {/* Title */}
        <h1  className="text-6xl md:text-8xl font-black tracking-tighter  mb-4">
        See the World Differently with Our New Eyewear Frames
        {/*<span className="highlight">STYLE</span>*/}
        </h1>

        {/* Description */}
        {/*<div className="text-gray-900 text-lg md:text-xl font-medium mb-10 leading-snug">
          <p>Premium eyewear crafted for those who see the world differently.</p>
          <p>Discover the OptiStyle collection.</p>
        </div>*/}

        {/* Button */}
        <div>
        <Link 
          to="/shop"
          id='button'          
          className="inline-block mt-4  text-white px-4 py-4 rounded-full font-bold shadow-xl hover:bg-[#FF9900] hover:scale-105 transition-all active:scale-95  tracking-wide"
          style={{ 
            fontFamily: 'Geometric Sans-Serif', 
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(12, 12, 13, 0.15)',
            transition: 'transform 0.2s ease'
          }}
>
          View Collection
        </Link>

        <Link 
          to="/shop" 
          id="button2"        
          className="inline-block mt-4 ms-5  text-white px-4 py-4 rounded-full font-bold shadow-xl hover:bg-[#FF9900] hover:scale-105 transition-all active:scale-95  tracking-wide"
          style={{ 
            
            fontFamily: 'Geometric Sans-Serif', 
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(12, 12, 13, 0.15)',
            transition: 'transform 0.2s ease'
          }}
>
        Shope Eyeglasses
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Header;