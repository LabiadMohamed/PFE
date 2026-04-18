import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import logo2 from "../assets/Loge.png";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Read user from localStorage reactively — re-read on route changes & storage events
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch(e) { return null; }
  });
  const userRole = (user?.role || "").trim().toUpperCase();
  const isVendor = /VENDEUR|VENDOR|PARTNER|VENDEURE/i.test(userRole);
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    const readUser = () => {
      try { setUser(JSON.parse(localStorage.getItem("user"))); } catch(e) { setUser(null); }
    };
    // Re-read on every route change so the icon appears after login redirect
    readUser();
    window.addEventListener("storage", readUser);
    return () => window.removeEventListener("storage", readUser);
  }, [location.pathname]);

  useEffect(() => {
    const updateCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          setCartCount(guestCart.reduce((total, item) => total + (item.quantite || 1), 0));
          return;
        }
        // Use plain fetch so a 401/403 doesn't clear auth (important for VENDEUR users)
        const res = await fetch("http://localhost:8080/api/panier", {
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!res.ok) { setCartCount(0); return; }
        const data = await res.json();
        if (data && data.lignes) {
          setCartCount(data.lignes.reduce((total, item) => total + (item.quantite || 1), 0));
        } else {
          setCartCount(0);
        }
      } catch (err) {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  // Hide navbar on login page, vendor dashboard, and admin dashboard
  if (
    location.pathname === "/login" ||
    location.pathname.startsWith("/vendor") ||
    location.pathname === "/admin-dashboard"
  ) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl h-20 flex items-center justify-between px-8 bg-white/70  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl"
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center">
        <Link to="/" className="flex items-center h-full pb-1">
          <img src={logo2} alt="Logo" className="h-10 w-auto object-contain mt-1" />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {["Home", "About", "Shop", "Contact"].map((item) => (
          <Link
            key={item}
            smooth
            to={
              item === "Home"   ? "/#home" :
              item === "About"  ? "/About" :
              item === "Contact" ? "/contact" :
              item === "Shop"   ? "/shop" :
              `/#${item.toLowerCase()}`
            }
            className="relative group text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            style={{ marginTop: "2px" }}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        {isVendor && (
          <Link
            to="/vendor/dashboard"
            className="relative group text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            style={{ marginTop: "2px" }}
          >
            Partner
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
          </Link>
        )}
      </div>

      {/* Right side - Icons & Buttons */}
      <div className="flex items-center gap-4">


        {/* Admin Dashboard Icon — only if ADMIN */}
        {isAdmin && (
          <Link to="/admin-dashboard" className="relative group cursor-pointer" title="Admin Dashboard">
            <svg className="w-6 h-6 text-[#292077] hover:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </Link>
        )}

        {/* Cart */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex flex-col items-end mr-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#292077]/40 leading-none mb-0.5">Welcome</span>
              <span className="text-xs font-bold text-[#292077]">{user.prenom} {user.nom}</span>
            </div>
          )}
          <Link to="/cart" className="relative group cursor-pointer mr-2">
            <FiShoppingCart className="w-6 h-6 text-[#292077] hover:text-[#d4af37] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Login / Logout */}
        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#292077] text-white text-sm font-bold rounded-2xl hover:bg-red-600 hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#dfb83a] text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
          >
            Login <FiArrowRight />
          </Link>
        )}

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 bg-gray-100 rounded-xl text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 md:hidden border border-gray-100"
          >
            {["Home", "Shop", "Contact"].map((item) => (
              <Link
                key={item}
                smooth
                to={
                  item === "Home" ? "/#home" :
                  item === "Contact" ? "/contact" :
                  item === "Shop" ? "/shop" :
                  `/#${item.toLowerCase()}`
                }
                onClick={() => setMenuOpen(false)}
                className="text-lg font-bold text-gray-800"
              >
                {item}
              </Link>
            ))}

            {isVendor && (
              <Link to="/vendor/dashboard" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-[#292077]">
                Vendor Dashboard
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-[#292077]">
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="w-full text-center py-4 bg-[#292077] text-white rounded-2xl font-bold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full text-center py-4 bg-[#dfb83a] text-white rounded-2xl font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}