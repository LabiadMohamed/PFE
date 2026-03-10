import { motion } from "motion/react";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../assets/Loge.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 bg-transparent"
    >
      {/* LEFT: Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="OptiStyle Logo"
          className="h-[90px] object-contain"
        />
      </div>

      {/* CENTER: Navigation */}
      <div className="flex-1 flex justify-center">
        <nav className="flex items-center gap-8 text-[15px] font-medium text-gray-700">
          <a href="#home" className="hover:text-black transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-black transition-colors">
            Features
          </a>
          <a href="#shop" className="hover:text-black transition-colors">
            Shop
          </a>
          <a href="#categories" className="hover:text-black transition-colors">
            Categories
          </a>
          <a href="#contact" className="hover:text-black transition-colors">
            Contact
          </a>
        </nav>
      </div>

      {/* RIGHT: Cart + Login */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-gray-800 cursor-pointer hover:text-black">
          <FiShoppingCart className="w-5 h-5" />
          <span className="text-sm">Cart (0)</span>
        </div>


<Link
  to="/login"
  className="px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition"
>
  Login
</Link>
      </div>
    </motion.nav>
  );
}