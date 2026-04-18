import React, { useState, useRef, useEffect } from "react";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addToPanier } from "../api";

// ── Complete color map — covers all possible DB label values ──
const COLOR_MAP = {
  "black":        { hex: "#1a1a1a", label: "black" },
  "tortoise":     { hex: "#8B5E3C", label: "tortoise" },
  "gold":         { hex: "#C9A84C", label: "gold" },
  "silver":       { hex: "#A8A9AD", label: "silver" },
  "navy":         { hex: "#5f8dd6", label: "navy" },
  "blue":         { hex: "#2d528f", label: "blue" },
  "n":            { hex: "#2d528f", label: "blue" },
  "m":            { hex: "#717dc1", label: "blue" },
  "red":          { hex: "#C0392B", label: "red" },
  "pink":         { hex: "#d50d9dff", label: "pink" },
  "rose":         { hex: "#e0086dff", label: "pink" },
  "purple":       { hex: "#bb19d3ff", label: "purple" },
  "v":            { hex: "#c821e2", label: "purple" },
  "green":        { hex: "#4A7C59", label: "green" },
  "dark green":   { hex: "#10431f", label: "dark green" },
  "darkgreen":    { hex: "#10431f", label: "dark green" },
  "g":            { hex: "#10431f", label: "dark green" },
  "orange":       { hex: "#f18a24", label: "orange" },
  "d":            { hex: "#f18a24", label: "orange" },
  "dark silver":  { hex: "#83848a", label: "dark silver" },
  "darksilver":   { hex: "#83848a", label: "dark silver" },
  "s":            { hex: "#83848a", label: "dark silver" },
  "white":        { hex: "#f5f5f5", label: "white" },
  "brown":        { hex: "#6B3F1E", label: "brown" },
  "beige":        { hex: "#D9C5A0", label: "beige" },
  "transparent":  { hex: "#e8e8e8", label: "transparent" },
  "crystal":      { hex: "#d6eaf8", label: "crystal" },
  "grey":         { hex: "#9e9e9e", label: "grey" },
  "gray":         { hex: "#9e9e9e", label: "grey" },
};

const FILTER_COLOR_LABELS = [...new Set(Object.values(COLOR_MAP).map(c => c.label))].sort();
const TABS         = ["Optical", "Sun", "Luxury"];
const GENRES       = ["All", "Women", "Men", "Kids"];
const FORMES       = ["Aviator", "Cat Eye", "Oval", "Butterfly", "Rectangular", "Round", "Square"];
const MATERIAUX    = ["Acetate", "Metal", "Titanium", "Plastic"];
const SORT_OPTIONS = [["Featured","default"],["Price: Low to High","asc"],["Price: High to Low","desc"],["Name","name"]];

function parseJsonField(field, fallback = []) {
  if (Array.isArray(field)) return field;
  if (typeof field === "string" && field.trim().startsWith("[")) {
    try { return JSON.parse(field); } catch { return fallback; }
  }
  return fallback;
}

function normalizeColor(raw) {
  if (!raw || typeof raw !== "object") return null;
  const rawLabel = String(raw.label || raw.name || raw.color || "").toLowerCase().trim();
  const rawHex   = raw.hex || raw.color_hex || raw.value || "";
  if (COLOR_MAP[rawLabel]) return COLOR_MAP[rawLabel];
  if (rawHex) return { hex: rawHex, label: rawLabel || "color" };
  return null;
}

function capitalize(str) {
  if (!str) return "";
  const s = str.trim();
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function useOutsideClick(ref, cb) {
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

function FilterDropdown({ label, options, checked, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));
  const active = checked.length > 0;
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 text-[13px] transition-colors ${active ? "text-[#292077] font-semibold" : "text-gray-500 hover:text-gray-800"}`}>
        {label}
        {active && <span className="ml-1 bg-[#292077] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{checked.length}</span>}
        <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 min-w-[190px] max-h-64 overflow-y-auto">
          {options.map(opt => {
            const val = Array.isArray(opt) ? opt[0] : opt;
            const isChecked = checked.includes(val);
            return (
              <label key={val} className={`flex items-center gap-2.5 px-4 py-2 cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 transition-colors ${isChecked ? "bg-gray-50" : ""}`}>
                <input type="checkbox" checked={isChecked} onChange={() => onToggle(val)} className="accent-gray-900 w-3.5 h-3.5"/>
                {val}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));
  const label = SORT_OPTIONS.find(([,v]) => v === value)?.[0] ?? "Featured";
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[13px] text-gray-600 font-medium hover:text-[#292077] transition">
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 z-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 min-w-[170px]">
          {SORT_OPTIONS.map(([lbl, val]) => (
            <button key={val} onClick={() => { onChange(val); setOpen(false); }}
              className={`block w-full text-left px-4 py-2 text-[13px] transition-colors ${value === val ? "bg-gray-50 font-semibold text-[#292077]" : "text-gray-600 hover:bg-gray-50"}`}>
              {lbl}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RoleAlertModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-2xl rounded-[32px] max-w-sm w-full p-10 shadow-[0_32px_64px_-16px_rgba(41,32,119,0.2)] border border-white/20 relative text-center flex flex-col items-center"
        onClick={e => e.stopPropagation()}>
        
        <div className="w-16 h-16 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>

        <h3 className="text-xl font-black text-[#292077] uppercase tracking-wider mb-3">Partner Access Only</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          As a <span className="font-bold text-[#d4af37]">Partner</span>, you manage products and orders. To test the shopping flow, please log in with a <span className="font-bold text-[#292077]">Client</span> account.
        </p>

        <button onClick={onClose}
          className="w-full bg-[#292077] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-xl shadow-[#292077]/20 hover:bg-[#d4af37] transition-all hover:-translate-y-0.5 active:scale-95">
          Understood
        </button>
      </motion.div>
    </div>
  );
}

function QuickView({ product, onClose, onRoleAlert }) {
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  if (!product) return null;

  const currentImg = product.images?.[selColor] || product.images?.[0] || product.image_url || "";

  const handleAdd = async () => {
    // Role Check: Inform Vendors that they cannot shop
    const userStr = localStorage.getItem("user");
    if (userStr) {
       const user = JSON.parse(userStr);
       const role = (user?.role || "").trim().toUpperCase();
       const isVendor = /VENDEUR|VENDOR|PARTNER|VENDEURE/i.test(role);
       if (isVendor) {
         onRoleAlert();
         return;
       }
    }

    // Guest Cart Logic: If not logged in, save to localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existing = guestCart.find(i => i.id_produit === product.id_produit);
      if (existing) {
        existing.quantite += qty;
      } else {
        // We store minimal info but enough to render in Cart.jsx
        guestCart.push({ 
          id_produit: product.id_produit, 
          quantite: qty, 
          prix_unitaire: product.prix,
          name: product.name,
          image: currentImg,
          brand: product.brand || "OptiStyle",
          color: product.colors?.[selColor]?.label || "N/A"
        });
      }
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => navigate("/cart"), 500);
      return;
    }

    try {
      await addToPanier({ id_produit: product.id_produit, quantite: qty, prix_unitaire: product.prix });
      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => navigate("/cart"), 500);
    } catch (err) {
      alert("Failed to add to cart! Are you logged in? " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
        style={{ animation: "fadeUp .25s ease" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-[#292077] transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div className="grid md:grid-cols-2">
          <div className="relative bg-gray-100 aspect-square overflow-hidden">
            <img src={currentImg} alt={product.name} className="w-full h-full object-contain p-4"/>
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#292077] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.tab} · {product.category}</p>
              <h2 className="text-xl font-bold text-[#292077] mb-1">{product.name}</h2>
              {(product.forme || product.materiau) && (
                <p className="text-[11px] text-gray-400 mb-3">{[product.forme, product.materiau].filter(Boolean).join(" · ")}</p>
              )}
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
              {product.colors?.length > 0 && (
                <>
                  <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-widest mb-2">
                    Color — <span className="font-normal normal-case text-gray-400">{product.colors[selColor]?.label}</span>
                  </p>
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {product.colors.map((c, i) => (
                      <button key={i} onClick={() => setSelColor(i)} title={c.label}
                        className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selColor === i ? "border-[#d4af37] scale-110" : "border-gray-200"}`}
                        style={{ backgroundColor: c.hex }}/>
                    ))}
                  </div>
                </>
              )}
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm">−</button>
                <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm">+</button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-[#292077]">{Number(product.prix)}dh</span>
                <span className="text-sm text-gray-400">Total: {Number(product.prix) * qty}dh</span>
              </div>
              <button onClick={handleAdd}
                className="w-full bg-[#292077] text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#292077]/30 hover:bg-[#d4af37] flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                {added ? "✓ Added!" : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onQuickView, onToggleFav, isFav }) {
  const [selColor, setSelColor] = useState(0);
  const [hovered, setHovered]   = useState(false);
  const currentImg = product.images?.[selColor] || product.images?.[0] || product.image_url || "";

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="flex flex-col cursor-pointer bg-white border border-gray-100 hover:border-[#d4af37]/30 rounded-xl p-3 transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-8px) scale(1.02)" : "none",
        boxShadow: hovered ? "0 10px 20px -10px rgba(212,175,55,0.2)" : "none",
      }}>
      <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: "4/3", marginBottom: 12 }}>
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#292077] text-white rounded-full text-[10px] px-2.5 py-0.5 font-bold">
            {product.badge}
          </span>
        )}
        <img src={currentImg} alt={product.name} className="w-full h-full object-contain p-2"
          style={{ transition: "transform .4s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}/>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex gap-1.5 flex-wrap">
          {product.colors.map((c, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setSelColor(i); }} title={c.label}
              className="rounded-full border transition-transform hover:scale-125"
              style={{ width: 13, height: 13, backgroundColor: c.hex,
                borderColor: selColor === i ? "#d4af37" : "#d1d5db",
                borderWidth: selColor === i ? 2 : 1 }}/>
          ))}
        </div>
        <button onClick={e => { e.stopPropagation(); onToggleFav(product.id_produit); }} className="transition hover:scale-110 p-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "#d4af37" : "none"} stroke={isFav ? "#d4af37" : "#d1d5db"} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[13px] font-bold text-[#292077] tracking-wide truncate mr-2">{product.name}</p>
        <p className="text-[13px] font-semibold text-[#d4af37] whitespace-nowrap">{Number(product.prix)}dh</p>
      </div>

      <button onClick={() => onQuickView(product)}
        className="mt-2 w-full bg-[#292077] text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#292077]/20 hover:bg-[#d4af37] flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
        Buy Now
      </button>
    </div>
  );
}

export default function Shop() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeTab, setActiveTab]       = useState("Optical");
  const [favorites, setFavorites]       = useState([]);
  const [quickView, setQuickView]       = useState(null);
  const [sortBy, setSortBy]             = useState("default");
  const [fGenre, setFGenre]             = useState([]);
  const [fFormes, setFFormes]           = useState([]);
  const [fMat, setFMat]                 = useState([]);
  const [fPrix, setFPrix]               = useState([]);
  const [fColors, setFColors]           = useState([]);
  const [roleAlert, setRoleAlert]       = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/produits?size=100")
      .then(res => res.json())
      .then(data => {
        const raw = data.content || data;
        const arr = Array.isArray(raw) ? raw : [];

        const formatted = arr.map(p => {
          // ── Parse colors ──
          const rawColors = parseJsonField(p.colors, []);
          const colors = rawColors.length > 0
            ? rawColors.map(normalizeColor).filter(Boolean)
            : [{ hex: "#1a1a1a", label: "black" }];

          // ── Parse images — one per color slot ──
          const rawImages = parseJsonField(p.images, []);
          const images = rawImages.length > 0
            ? rawImages
            : p.image_url
              ? Array(colors.length).fill(p.image_url)
              : [];

          return {
            ...p,
            id:          p.id_produit,
            name:        p.nom,
            prix:        p.prix,
            description: p.description || "",
            forme:       capitalize(p.forme    || ""),
            materiau:    capitalize(p.materiau || ""),
            badge:       p.badge || null,
            tab:
              p.categorie?.type === "VUE"    ? "Optical" :
              p.categorie?.type === "SOLEIL" ? "Sun"     :
              p.categorie?.type === "LUXE"   ? "Luxury"  : "Optical",
            category:
              p.genre === "FEMME"  ? "Women" :
              p.genre === "HOMME"  ? "Men"   :
              p.genre === "ENFANT" ? "Kids"  : "All",
            colors,
            images,
          };
        });

        setProductsData(formatted);
        setLoading(false);
      })
      .catch(err => { console.error("Fetch Error:", err); setLoading(false); });
  }, []);

  const toggleF   = setter => val => setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  const toggleFav = id => setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);

  let list = productsData.filter(p => p.tab === activeTab);
  if (fGenre.length)  list = list.filter(p => fGenre.includes(p.category));
  if (fFormes.length) list = list.filter(p => fFormes.some(f => f.toLowerCase() === (p.forme||"").toLowerCase()));
  if (fMat.length)    list = list.filter(p => fMat.some(m => m.toLowerCase() === (p.materiau||"").toLowerCase()));
  if (fColors.length) list = list.filter(p => p.colors.some(c => fColors.includes(c.label)));
  if (fPrix.length)   list = list.filter(p => fPrix.some(label => {
    const pr = Number(p.prix);
    if (label === "Under 350dh")  return pr < 350;
    if (label === "350dh–550dh") return pr >= 350 && pr <= 550;
    if (label === "Over 550dh")   return pr > 550;
    return true;
  }));

  if (sortBy === "asc")  list = [...list].sort((a,b) => Number(a.prix) - Number(b.prix));
  if (sortBy === "desc") list = [...list].sort((a,b) => Number(b.prix) - Number(a.prix));
  if (sortBy === "name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));

  const activeFilters = fGenre.length + fFormes.length + fMat.length + fPrix.length + fColors.length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-[#292077] font-bold text-lg animate-pulse">Loading Products...</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans pt-26">

      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center h-11">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 h-11 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === tab ? "border-gray-900 text-[#292077] font-semibold" : "border-transparent text-gray-400 hover:text-gray-700"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white sticky z-20" style={{ top: 108 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className={`text-[13px] ${activeFilters > 0 ? "text-gray-700 font-semibold" : "text-gray-300"}`}>
              Filter {activeFilters > 0 && `(${activeFilters})`}
            </span>
            <FilterDropdown label="Colors"    options={FILTER_COLOR_LABELS}                        checked={fColors} onToggle={toggleF(setFColors)}/>
            <FilterDropdown label="Shapes"    options={FORMES}                                      checked={fFormes} onToggle={toggleF(setFFormes)}/>
            <FilterDropdown label="Materials" options={MATERIAUX}                                   checked={fMat}    onToggle={toggleF(setFMat)}/>
            <FilterDropdown label="Price"     options={["Under 350dh","350dh–550dh","Over 550dh"]} checked={fPrix}   onToggle={toggleF(setFPrix)}/>
            <FilterDropdown label="Gender"    options={GENRES.slice(1)}                             checked={fGenre}  onToggle={toggleF(setFGenre)}/>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            Sort by <SortDropdown value={sortBy} onChange={setSortBy}/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <p className="text-[13px] text-gray-400 mb-6">{list.length} product{list.length !== 1 ? "s" : ""}</p>
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300 gap-3">
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
            initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            {list.map(product => (
              <motion.div key={product.id_produit}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <ProductCard product={product} onQuickView={setQuickView} onToggleFav={toggleFav} isFav={favorites.includes(product.id_produit)}/>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <CTA/>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onRoleAlert={() => { setQuickView(null); setRoleAlert(true); }}/>}
      {roleAlert && <RoleAlertModal onClose={() => setRoleAlert(false)} />}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}