import { motion } from "motion/react";
import { FiSearch, FiShoppingCart } from "react-icons/fi"; // Fi = Feather Icons
import logo from "../assets/Loge.png"

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass h-15 flex items-center justify-center px-4"
    >
       {/* LEFT (logo or empty) */}
      <div className="flex items-center h-full">
    <img
      src={logo}
      alt="Logo"
      className="h-[150px] mt-11  " // increase height to fit navbar
    />
  </div>

      <div className="relative max-w-5xl w-full  flex items-center text-[15px] font-medium opacity-80 me-4">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 pe-7 ">
          <a href="#home" className="hover:opacity-100 transition-opacity">
            Home</a>
          <div className="hidden md:flex justify-center items-center gap-8">
            <a href="#" className="hover:opacity-100 transition-opacity">Shop</a>
            <a href="#section" className="hover:opacity-100 transition-opacity">Feature</a>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
        {/* Right buttons */}
  <div className="absolute right-0 flex items-center gap-2">
    <FiShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] hover:bg-blue-700 transition-colors"
      onClick={() => window.location.href = "/login"} // navigate to login page
      >
      Login
    </button>
    {/*<button className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] hover:bg-blue-700 transition-colors"
     onClick={() => window.location.href = "/buy"} // navigate to buy page
    >
      Buy Now
    </button>*/}
    
  </div>
      </div>
    </motion.nav>
  );
}
