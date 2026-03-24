import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/Loge.png";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation } from "react-router-dom"; // Vérifie bien cet import !

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cette ligne doit être AVANT tout le reste du code
  if (location.pathname === "/login") {
    return null; 
  }
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      // Effet flottant : on ajoute une marge et un arrondi
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl"
    >
      {/* Logo - Animation Scale au Hover */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </motion.div>

      {/* Desktop Navigation - Liens avec soulignement animé */}
      <div className="hidden md:flex items-center gap-10">
        {["Home", "Features", "Shop", "Categories"].map((item) => (
          <Link
            key={item}
            smooth
            to={`/#${item.toLowerCase()}`}
            className="relative group text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* Right side - Buttons stylés */}
      <div className="flex items-center gap-6">
        {/* Cart avec badge discret */}
        <div className="relative group cursor-pointer">
          <FiShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
            0
          </span>
        </div>

        {/* Login Button - Gradient & Shadow */}
        <Link
          to="/login"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
        >
          Login <FiArrowRight />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 bg-gray-100 rounded-xl text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu - Animation Slide Down */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 md:hidden border border-gray-100"
          >
            {["Home", "Features", "Shop", "Categories"].map((item) => (
              <Link
                key={item}
                smooth
                to={`/#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-bold text-gray-800"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/login"
              className="w-full text-center py-4 bg-indigo-600 text-white rounded-2xl font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}