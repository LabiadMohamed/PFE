import React, { useState, useRef, useEffect } from "react";
import { getAllProduits, addToPanier, getMyPanier, removePanierLigne, modifyPanierLigne } from '../api';
import CTA from "../components/CTA";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = {
  black:    { hex: "#1a1a1a", label: "Noir" },
  tortoise: { hex: "#8B5E3C", label: "Écailles" },
  gold:     { hex: "#C9A84C", label: "Or" },
  silver:   { hex: "#A8A9AD", label: "Argent" },
  navy:     { hex: "#5f8dd6", label: "Marine" },
  n:        { hex: "#2d528f", label: "n" },
  red:      { hex: "#C0392B", label: "Rouge" },
  rose:     { hex: "#E8A598", label: "Rose" },
  v:        { hex: "#c821e2", label: "violet" },
  green:    { hex: "#4A7C59", label: "Vert" },
  g:        { hex: "#10431f", label: "V" },
  d:        { hex: "#f18a24f9", label: "Or" },
  s:        { hex: "#83848a", label: "s" },
  m:        { hex: "#717dc1", label: "m" },
};

// Mock data removed in favor of API

const TABS         = ["Optique", "Solaire", "Luxury"];
const GENRES       = ["Tous", "Femme", "Homme", "Enfant", ];
const FORMES       = ["Aviateur","Cat Eye","Ovale","Papillon","Rectangulaire","Rond","Carré",];
const MATERIAUX    = ["Acétate","Métal","Titane","Plastique"];
const PRIX_OPTIONS = [["Moins de 35€",[0,35]],["35€–55€",[35,55]],["Plus de 55€",[55,999]]];
const SORT_OPTIONS = [["En vedette","default"],["Prix croissant","asc"],["Prix décroissant","desc"],["Nom","name"]];

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
        <div className="absolute top-full left-0 mt-2 z-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 min-w-[180px]">
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
  const label = SORT_OPTIONS.find(([,v]) => v === value)?.[0] ?? "En vedette";
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

function QuickView({ product, onClose, onAddToCart }) {
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product) return null;

  const currentImg = product.images?.[selColor] || product.images?.[0] || "";

 const navigate = useNavigate();

const handleAdd = async () => {
  try {
    await addToPanier({ id_produit: product.id, quantite: qty, prix_unitaire: product.price });
    window.dispatchEvent(new Event('cartUpdated'));
    onAddToCart && onAddToCart(); // Trigger refresh on parent
    setAdded(true);
    setTimeout(() => {
        navigate("/cart");
    }, 500);
  } catch (err) {
    if (err.message && err.message.includes('Session')) {
        navigate("/login");
    } else {
        alert(err.message || "Erreur de panier");
    }
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
        style={{ animation: "fadeUp .25s ease" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-[#292077] transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div className="grid md:grid-cols-2">
          <div className="relative bg-gray-100 aspect-square overflow-hidden">
            <img src={currentImg} alt={product.name}
              className="w-full h-full object-contain p-4 transition-opacity duration-300"/>
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#292077] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.tab} · {product.category}</p>
              <h2 className="text-xl font-bold text-[#292077] mb-2">{product.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>
              <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-widest mb-2">
                Couleur — <span className="font-normal normal-case text-gray-400">{product.colors[selColor].label}</span>
              </p>
              <div className="flex gap-2 mb-5">
                {product.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelColor(i)} title={c.label}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selColor === i ? "border-[#d4af37] scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c.hex, outline: selColor === i ? "2px solid #e5e7eb" : "none", outlineOffset: 2 }}/>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-sm">−</button>
                <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-sm">+</button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-[#292077]">{product.price}€</span>
                <span className="text-sm text-gray-400">Total : {product.price * qty}€</span>
              </div>
              <button onClick={handleAdd}
                className="w-full bg-[#292077] text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#292077]/30 hover:bg-[#d4af37] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 mt-4">
                {added ? "✓ Ajouté !" : "Confirmer l'achat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ProductCard({ product, onQuickView, onAddToCart, onToggleFav, isFav }) {
  const [selColor, setSelColor] = useState(0);
  const [added, setAdded]       = useState(false);
  const [hovered, setHovered]   = useState(false);

  const currentImg = product.images?.[selColor] || product.images?.[0] || "";
const navigate = useNavigate();
  const handleAdd = async (e) => {
    e.stopPropagation();
    try {
      await addToPanier({ id_produit: product.id, quantite: 1, prix_unitaire: product.price });
      window.dispatchEvent(new Event('cartUpdated'));
      onAddToCart && onAddToCart();
      setAdded(true);
      navigate("/cart");
    } catch (err) {
      if (err.message && err.message.includes('Session')) {
          navigate("/login");
      } else {
          alert(err.message || "Erreur lors de l'ajout au panier");
      }
    }
  };
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      // هاد السطر هو اللي زدت فيه الخلفية بيضاء والborder أزرق
      className="flex flex-col cursor-pointer bg-white border border-gray-100 hover:border-[#d4af37]/30 rounded-xl p-3 transition-all duration-300"
      style={{ 
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 10px 20px -10px rgba(212, 175, 55, 0.2)" : "none"
      }}>

      <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: "4/3", marginBottom: 12 }}>
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#292077] text-white border border-[#292077]/10 rounded-full text-[10px] px-2.5 py-0.5 font-bold">
            {product.badge}
          </span>
        )}
        <div className="absolute top-2.5 right-2.5 z-10 bg-white/85 border border-[#292077]/10 rounded-full w-6 h-6 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <rect x="2" y="7" width="15" height="10" rx="2"/><path d="M17 9l5-3v12l-5-3V9z"/>
          </svg>
        </div>
        <img
          src={currentImg}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          style={{ transition: "transform .4s ease, opacity .25s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex gap-1.5">
          {product.colors.map((c, i) => (
            <button key={i} onClick={() => setSelColor(i)} title={c.label}
              className="rounded-full border transition-transform hover:scale-125"
              style={{
                width: 13, height: 13, backgroundColor: c.hex,
                borderColor: selColor === i ? "#d4af37" : "#d1d5db",
                outline: selColor === i ? "1.5px solid #eff6ff" : "none",
                outlineOffset: 1.5,
                transform: selColor === i ? "scale(1.2)" : "scale(1)",
              }}/>
          ))}
        </div>
        <button onClick={() => onToggleFav(product.id)} className="transition hover:scale-110 p-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={isFav ? "#d4af37" : "none"} stroke={isFav ? "#d4af37" : "#d1d5db"} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[13px] font-bold text-[#292077] tracking-wide">{product.name}</p>
        <p className="text-[13px] font-semibold text-[#d4af37]">{product.price}€</p>
      </div>

      <button onClick={() => onQuickView(product)}
        className="mt-2 w-full bg-[#292077] text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#292077]/20 hover:bg-[#d4af37] hover:shadow-[#d4af37]/40 flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
        Acheter
      </button>
    </div>
  );
}

function CartSidebar({ cart, onClose, onRemove, onUpdateQty, totalObj }) {
  const total = totalObj || 0;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="relative w-80 bg-white h-full flex flex-col shadow-2xl" style={{ animation: "slideIn .25s ease" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-[#292077]">Panier ({cart.reduce((s,i)=>s+i.qty,0)})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#292077] transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-300 gap-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              <p className="text-sm">Votre panier est vide</p>
            </div>
          )}
          {cart.map((item, idx) => (
            <div key={item.id_ligne} className="flex gap-3 items-start">
              <img 
                src={item.produit?.image_url || 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=100&q=80'} 
                alt={item.produit?.nom} 
                className="w-14 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=100&q=80'; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#292077] truncate">{item.produit?.nom}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: "#1a1a1a" }}/>
                  <p className="text-[11px] text-gray-400">Défaut</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button onClick={() => onUpdateQty(item.id_ligne, item.quantite-1)} className="w-5 h-5 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100">−</button>
                  <span className="text-xs font-medium w-4 text-center">{item.quantite}</span>
                  <button onClick={() => onUpdateQty(item.id_ligne, item.quantite+1)} className="w-5 h-5 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100">+</button>
                  <span className="ml-auto text-[13px] font-semibold text-[#292077]">{item.sous_total}€</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id_ligne)} className="text-gray-300 hover:text-red-400 transition flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-[14px] font-bold text-[#292077]">
              <span>Total</span><span>{total.toFixed(2)}€</span>
            </div>
            <Link to="/cart" className="w-full flex items-center justify-center bg-[#292077] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d4af37] transition-colors">
              Commander
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const [activeTab,  setActiveTab]  = useState("Optique");
  const [cart,       setCart]       = useState(null);
  const [favorites,  setFavorites]  = useState([]);
  const [quickView,  setQuickView]  = useState(null);
  const [cartOpen,   setCartOpen]   = useState(false);
  const [sortBy,     setSortBy]     = useState("default");
  const [fGenre,     setFGenre]     = useState([]);
  const [fFormes,    setFFormes]    = useState([]);
  const [fMat,       setFMat]       = useState([]);
  const [fPrix,      setFPrix]      = useState([]);

  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProduits("?size=100");
      const mapped = data.content.map(p => ({
        id: p.id_produit,
        nom: p.nom,
        name: p.nom,
        prix: p.prix,
        price: p.prix,
        marque: p.marque,
        tab: p.categorie.type === 'VUE' ? 'Optique' : p.categorie.type === 'SOLEIL' ? 'Solaire' : 'Luxury',
        category: p.genre === 'FEMME' ? 'Femme' : p.genre === 'HOMME' ? 'Homme' : 'Enfant',
        genre: p.genre,
        image_url: p.image_url && p.image_url.includes('placeholder') ? 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80' : p.image_url,
        images: [p.image_url && p.image_url.includes('placeholder') ? 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80' : p.image_url],
        colors: p.stocks && p.stocks.length > 0 ? p.stocks.map(s => COLORS[s.couleur.toLowerCase().substring(0,1)] || COLORS.black) : [COLORS.black],
        desc: p.marque,
        badge: null
      }));
      setProductsData(mapped);
    } catch(err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const data = await getMyPanier();
      setCart(data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const toggleF = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  // addToCart is passed to QuickView and ProductCard to trigger a refresh of the cart
  const addToCart = () => {
    fetchCart();
  };

  const removeFromCart = async (id_ligne) => {
      try {
          await removePanierLigne(id_ligne);
          fetchCart();
      } catch (err) {
          alert('Erreur suppression');
      }
  };
  const updateQty = async (id_ligne, qty) => {
    if (qty < 1) return removeFromCart(id_ligne);
    try {
        await modifyPanierLigne({ id_ligne, quantite: qty });
        fetchCart();
    } catch (err) {
        alert('Erreur modification quantite');
    }
  };
  const toggleFav = (id) => setFavorites(p => p.includes(id) ? p.filter(f=>f!==id) : [...p, id]);

  let list = productsData.filter(p => p.tab === activeTab);
  if (fGenre.length) list = list.filter(p => fGenre.includes(p.category));
  if (fFormes.length) list = list.filter(p => fFormes.includes(p.forme));
  if (fMat.length)    list = list.filter(p => fMat.includes(p.materiau));

  if (fPrix.length)  list = list.filter(p => fPrix.some(label => {
    if (label==="Moins de 35€") return p.price < 35;
    if (label==="35€–55€")      return p.price >= 35 && p.price <= 55;
    if (label==="Plus de 55€")  return p.price > 55;
    return true;
  }));
  if (sortBy==="asc")  list = [...list].sort((a,b) => a.price-b.price);
  if (sortBy==="desc") list = [...list].sort((a,b) => b.price-a.price);
  if (sortBy==="name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));

  const cartItemsCount = cart?.lignes ? cart.lignes.reduce((s,i) => s+i.quantite, 0) : 0;
  const activeFilters = fGenre.length + fFormes.length + fMat.length + fPrix.length;

  return (
    <div className="bg-white min-h-screen font-sans pt-26">

      {/* Tab bar */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center h-11">
          <div className="flex items-center gap-0">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 h-11 text-[14px] font-medium border-b-2 transition-colors ${
                  activeTab===tab ? "border-gray-900 text-[#292077] font-semibold" : "border-transparent text-gray-400 hover:text-gray-700"
                }`}>
                {tab}
              </button>
            ))}
          </div>
          
        </div>
      </div>

      {/* Filter bar */}
      <div className="border-b border-gray-100 bg-white  sticky z-20 " style={{ top: 108 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className={`text-[13px] ${activeFilters > 0 ? "text-gray-700 font-semibold" : "text-gray-300"}`}>
              Filtrer {activeFilters > 0 && `(${activeFilters})`}
            </span>
            <FilterDropdown label="Couleurs"  options={Object.values(COLORS).map(c=>c.label)} checked={fGenre}  onToggle={toggleF(setFGenre)}/>
            <FilterDropdown label="Formes"    options={FORMES}   checked={fFormes} onToggle={toggleF(setFFormes)}/>
            <FilterDropdown label="Matériaux" options={MATERIAUX} checked={fMat}   onToggle={toggleF(setFMat)}/>
            <FilterDropdown label="Prix"      options={PRIX_OPTIONS.map(([l])=>l)} checked={fPrix} onToggle={toggleF(setFPrix)}/>
            <FilterDropdown label="Genre"     options={GENRES.slice(1)} checked={fGenre} onToggle={toggleF(setFGenre)}/>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            Trier par <SortDropdown value={sortBy} onChange={setSortBy}/>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <p className="text-[13px] text-gray-400 mb-6">{list.length} produit{list.length!==1?"s":""}</p>
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300 gap-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <p className="text-sm">Aucun produit trouvé</p>
          </div>
        ) : (
          <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }}
>
  {list.map(product => (
    <motion.div
      key={product.id}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
    >
      <ProductCard
        product={product}
        onQuickView={setQuickView}
        onAddToCart={addToCart}
        onToggleFav={toggleFav}
        isFav={favorites.includes(product.id)}
      />
    </motion.div>
  ))}
</motion.div>
        )}
      </div>
      <CTA/>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onAddToCart={addToCart} />}
      {cartOpen  && <CartSidebar cart={cart?.lignes || []} totalObj={cart?.total || 0} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onUpdateQty={updateQty}/>}

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideIn { from { transform:translateX(100%) } to { transform:translateX(0) } }
      `}</style>
    </div>
  );
}
