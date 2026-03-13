import { motion } from "motion/react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/Loge.png";
import { HashLink as Link } from "react-router-hash-link";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex shrink-0 items-center justify-between px-6 bg-transparent opacity-90 backdrop-blur-sm border-b border-gray-200"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="OptiStyle Logo"
            className="mt-11 h-[150px]"

          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="flex-1 justify-center hidden md:flex">
        <nav className="flex items-center gap-8 text-[15px] font-medium text-gray-700">
          <HashLink smooth to="/#home" className="hover:text-black transition-colors">
            Home
          </HashLink>
          <HashLink smooth to="/#features" className="hover:text-black transition-colors">
            Features
          </HashLink>
          <Link smooth to="/#shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <Link smooth to="/#categories" className="hover:text-black transition-colors">
            Categories
          </Link>
          <a href="#contact" className="hover:text-black transition-colors">
            Contact
          </a>
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Cart */}
        <div className="hidden md:flex items-center gap-1 text-gray-800 cursor-pointer hover:text-black">
          <FiShoppingCart className="w-5 h-5" />
          <span className="text-sm">Cart</span>
        </div>

        {/* Login */}
        <Link
          to="/login"
          className="hidden md:block px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition"
        >
          Login
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
            <HashLink smooth to="/#home" onClick={() => setMenuOpen(false)}>
              Home
            </HashLink>

            <HashLink smooth to="/#features" onClick={() => setMenuOpen(false)}>
              Features
            </HashLink>

            <Link smooth to="/#shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>

            <Link smooth to="/#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>

            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>

            <div className="flex items-center gap-2">
              <FiShoppingCart />
              Cart
            </div>

            <Link
              to="/login"
              className="px-4 py-2 border rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </motion.nav>
  );
}