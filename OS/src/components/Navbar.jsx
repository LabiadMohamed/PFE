import { motion, AnimatePresence, color } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import logo2 from "../assets/Logo2.jpeg";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { getMyPanier } from "../api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = async () => {
      if (localStorage.getItem("token")) {
        try {
          const data = await getMyPanier();
          const count = data.lignes ? data.lignes.reduce((total, item) => total + item.quantite, 0) : 0;
          setCartCount(count);
        } catch (err) {
          console.error(err);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  // Ensure this runs before rendering
  if (location.pathname === "/login" || location.pathname.startsWith("/vendor")) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl"
    >
      {/* Logo - Scale animation on hover */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center">
        <Link to="/" className="flex items-center h-full pb-1">
          <img src={logo2} alt="Logo" className="h-12 w-auto object-contain" />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {["Home", "Features", "Shop", "Categories", "Vendor", "Contact"].map((item) => {
          if (item === "Vendor") {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user.role !== "VENDEUR") return null;
            return (
            <Link
              key={item}
              to="/vendor/dashboard"
              className="relative group text-sm font-bold text-[#292077] hover:text-[#d4af37] transition-colors"
              style={{ marginTop: "2px" }}
            >
              Partner
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </Link>
            );
          } else {
            return (
            <Link
              key={item}
              smooth
              to={
                item === "Home"
                  ? "/#home"
                  : item === "Contact"
                  ? "/contact"
                  : item === "Shop"
                  ? "/shop"
                  : `/#${item.toLowerCase()}`
              }
              className="relative group text-sm font-semibold text-gray-600 hover:text-black transition-colors"
              style={{ marginTop: "2px" }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            );
          }
        })}
      </div>

      {/* Right side - Buttons */}
      <div className="flex items-center gap-6">
        {/* Cart with subtle badge */}
        <Link to="/cart" className="relative group cursor-pointer mr-2">
          <FiShoppingCart className="w-6 h-6 text-[#292077] hover:text-[#d4af37] transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-white shadow-md">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Login Button - Gradient & Shadow */}
        <Link
          to="/login"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#dfb83a] text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
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

      {/* Mobile Menu - Slide Down Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 md:hidden border border-gray-100"
          >
            {["Home", "Features", "Shop", "Categories", "Vendor", "Contact"].map((item) => {
              if (item === "Vendor") {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                if (user.role !== "VENDEUR") return null;
                return (
                <Link
                  key={item}
                  to="/vendor/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-bold text-[#292077]"
                >
                  Vendor
                </Link>
                );
              } else {
                return (
                <Link
                  key={item}
                  smooth
                  to={
                    item === "Home"
                      ? "/#home"
                      : item === "Contact"
                      ? "/contact"
                      : item === "Shop"
                      ? "/shop"
                      : `/#${item.toLowerCase()}`
                  }
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-bold text-gray-800"
                >
                  {item}
                </Link>
                );
              }
            })}
            <Link
              to="/login"
              className="w-full text-center py-4 bg-indigo-600 text-white bg-[#dfb83a] rounded-2xl font-bold"
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