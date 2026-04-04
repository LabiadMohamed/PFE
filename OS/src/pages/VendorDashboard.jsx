import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, ShoppingCart, PackageSearch, PlusCircle, Bell, Search, 
  Wallet, TrendingUp, Clock, MoreHorizontal, UploadCloud, ChevronRight, User
} from 'lucide-react';
import { getAllVendeurs, getVendeurProduits, getVendeurVentes, createProduit, getAllCategories } from '../api';

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales', icon: ShoppingCart },
  { id: 'inventory', label: 'Inventory', icon: PackageSearch },
  { id: 'add-product', label: 'Add Product', icon: PlusCircle },
];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vendorId, setVendorId] = useState(null);
  const [vendorStats, setVendorStats] = useState({ revenue: 0, balance: 0, pending: 0 });
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form State
  const [formData, setFormData] = useState({ nom: '', prix: '', marque: '', genre: 'HOMME', id_categorie: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "VENDEUR") {
      window.location.href = "/";
      return;
    }

    const initData = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);

        const vends = await getAllVendeurs();
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const v = vends.find(x => x.utilisateur.email === user.email);
        if (v) {
          setVendorId(v.id_vendeur);
          const prods = await getVendeurProduits(v.id_vendeur);
          setInventory(prods);

          const sales = await getVendeurVentes(v.id_vendeur);
          setOrders(sales);

          const revenue = sales.reduce((sum, s) => sum + s.sous_total, 0);
          setVendorStats({ revenue, balance: revenue * 0.8, pending: 0 }); // mockup balance based on revenue
        }
      } catch (err) {
        console.error("Dashboard init error:", err);
      }
    };
    initData();
  }, []);

  const getStatusStyle = (status) => {
    if(!status) return 'bg-gray-100 text-[#292077]';
    switch(status.toUpperCase()) {
      case 'EN_ATTENTE': return 'bg-gray-50 text-gray-500 border border-gray-200';
      case 'PAYE': case 'REUSSI': case 'VALIDE': return 'bg-[#292077]/10 text-[#292077]';
      case 'LIVRE': return 'bg-[#d4af37]/10 text-[#d4af37]';
      case 'ANNULEE': case 'ANNULE': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-[#292077]';
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!vendorId) {
      alert("Vendor profile required");
      return;
    }
    try {
      await createProduit({
        id_categorie: formData.id_categorie || (categories.length > 0 ? categories[0].id_categorie : null),
        nom: formData.nom,
        prix: parseFloat(formData.prix),
        marque: formData.marque,
        genre: formData.genre,
        image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80'
      });
      alert('Product created successfully!');
      setFormData({ nom: '', prix: '', marque: '', genre: 'HOMME', id_categorie: '' });
      // Refresh inventory
      const prods = await getVendeurProduits(vendorId);
      setInventory(prods);
      setActiveTab('inventory');
    } catch(err) {
      alert(err.message);
    }
  };

  const statsMap = [
    { id: 1, title: 'Total Revenue', value: `$${vendorStats.revenue.toFixed(2)}`, icon: Wallet },
    { id: 2, title: 'Balance', value: `$${vendorStats.balance.toFixed(2)}`, icon: TrendingUp },
    { id: 3, title: 'Pending', value: `$${vendorStats.pending.toFixed(2)}`, icon: Clock },
  ];

  const renderDashboard = () => (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wider text-[#292077]">Overview</h2>
        <p className="text-sm font-serif italic text-gray-500 mt-1">Your store's performance at a glance.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsMap.map(stat => (
          <div key={stat.id} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all hover:border-[#292077]/20 group">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-[#292077] transition-colors duration-300">
                <stat.icon className="w-5 h-5 text-[#292077] group-hover:text-[#d4af37] transition-colors" />
              </div>
              <button className="text-gray-400 hover:text-[#d4af37] transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#292077]/60 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-[#292077]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderSales = () => (
    <motion.div 
      key="sales"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
      className="pt-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase tracking-wider text-[#292077]">Sales <span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal">History</span></h2>
        <p className="text-sm font-serif italic text-gray-500 mt-1">Track and manage your recent orders.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-5 px-8 text-xs font-black text-[#292077]/70 uppercase tracking-[0.05em]">Order ID</th>
                <th className="py-5 px-8 text-xs font-black text-[#292077]/70 uppercase tracking-[0.05em]">Product Name</th>
                <th className="py-5 px-8 text-xs font-black text-[#292077]/70 uppercase tracking-[0.05em]">Date</th>
                <th className="py-5 px-8 text-xs font-black text-[#292077]/70 uppercase tracking-[0.05em]">Price</th>
                <th className="py-5 px-8 text-xs font-black text-[#292077]/70 uppercase tracking-[0.05em]">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id_ligne_cmd} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-8 text-sm font-black text-[#292077]">#{order.id_commande}</td>
                  <td className="py-5 px-8 text-sm font-medium text-[#292077]/80">{order.nom_produit}</td>
                  <td className="py-5 px-8 text-sm font-serif italic text-gray-500">{order.date_commande}</td>
                  <td className="py-5 px-8 text-sm font-black text-[#d4af37]">${order.sous_total.toFixed(2)}</td>
                  <td className="py-5 px-8">
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg ${getStatusStyle(order.statut)}`}>
                      {order.statut}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 font-serif italic">No sales found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderInventory = () => (
    <motion.div 
      key="inventory"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
      className="pt-10"
    >
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-[#292077]">Inventory</h2>
          <p className="text-sm font-serif italic text-gray-500 mt-1">Manage your product catalog and stock.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {inventory.map((item) => {
          const defaultImg = item.image_url?.includes("placeholder") ? 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80' : item.image_url;
          const stockVal = item.stocks?.reduce((acc,s)=>acc+s.quantite,0) || 0;
          return (
          <div key={item.id_produit} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/30 transition-all group">
            <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
              <img src={defaultImg || 'https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80'} alt={item.nom} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1572635196237-14b3f28150cc?w=400&q=80'}}/>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#292077]">{item.nom}</h3>
                <span className="text-sm font-bold text-[#d4af37]">${item.prix}</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className={`w-2 h-2 rounded-full ${stockVal > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#292077]/60">{stockVal > 0 ? `${stockVal} in stock` : 'Out of stock'}</span>
              </div>
            </div>
          </div>
        )})}
        {inventory.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500 font-serif italic">Your inventory is empty.</div>
        )}
      </div>
    </motion.div>
  );

  const renderAddProduct = () => (
    <motion.div 
      key="add-product"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
      className="pt-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-wider text-[#292077]">Add New <span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal">Product</span></h2>
          <p className="text-sm font-serif italic text-gray-500 mt-1">Fill in the details to list a new item in your store.</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <form className="space-y-8" onSubmit={handleAddProduct}>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Product Images</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-[#d4af37]/5 hover:border-[#d4af37]/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#292077] group-hover:text-white transition-all">
                  <UploadCloud className="w-5 h-5 text-[#292077]/60 group-hover:text-white" />
                </div>
                <p className="text-sm font-bold text-[#292077]">Click to upload or drag and drop</p>
                <p className="text-xs font-serif italic text-gray-500 mt-1">Currently auto-provided via Unsplash</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Product Name</label>
                <input required type="text" value={formData.nom} onChange={(e)=>setFormData({...formData, nom: e.target.value})} placeholder="e.g. Classic Aviator" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#292077]/20 focus:border-[#292077] transition-all text-[#292077] font-medium placeholder-gray-400" />
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Brand (Marque)</label>
                <input required type="text" value={formData.marque} onChange={(e)=>setFormData({...formData, marque: e.target.value})} placeholder="e.g. Ray-Ban" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#292077]/20 focus:border-[#292077] transition-all text-[#292077] font-medium placeholder-gray-400" />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Price</label>
                <input required type="number" step="0.01" value={formData.prix} onChange={(e)=>setFormData({...formData, prix: e.target.value})} placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#292077]/20 focus:border-[#292077] transition-all text-[#292077] font-medium placeholder-gray-400" />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Gender (Genre)</label>
                <select value={formData.genre} onChange={(e)=>setFormData({...formData, genre: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#292077]/20 focus:border-[#292077] transition-all text-[#292077] font-medium">
                  <option value="HOMME">Homme</option>
                  <option value="FEMME">Femme</option>
                  <option value="ENFANT">Enfant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#292077] mb-3">Category</label>
                <select value={formData.id_categorie} onChange={(e)=>setFormData({...formData, id_categorie: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#292077]/20 focus:border-[#292077] transition-all text-[#292077] font-medium">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id_categorie} value={cat.id_categorie}>{cat.type} - {cat.description}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-[#292077] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#d4af37] hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] transition-all">
                Publish Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-[#292077]">
      
      {/* SIDEBAR */}
      <aside className="sticky top-0 h-screen w-64 bg-white border-r border-[#292077]/10 flex flex-col shrink-0 z-20">
        <div className="h-24 flex items-center px-8 border-b border-[#292077]/5">
          <div className="w-10 h-10 bg-[#292077] rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-[#292077]/20">
            <span className="font-black text-[#d4af37] text-xl leading-none">O</span>
          </div>
          <h1 className="text-xl font-black tracking-wider uppercase">Opti<span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal text-lg">Style</span></h1>
        </div>

        <div className="p-6">
          <p className="text-[10px] font-black text-[#292077]/40 uppercase tracking-[0.1em] mb-4 px-2">Menu</p>
          <nav className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-xs font-bold tracking-widest uppercase ${
                    isActive ? 'bg-[#292077] text-white shadow-lg shadow-[#292077]/20' : 'text-[#292077]/60 hover:bg-[#292077]/5 hover:text-[#292077]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-[#292077]/40'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#292077]/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-[#292077]/5 rounded-full flex items-center justify-center border border-[#292077]/10">
              <User className="w-5 h-5 text-[#292077]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-[#292077] uppercase tracking-wider">{JSON.parse(localStorage.getItem("user") || "{}").nom}</p>
              <p className="text-[10px] font-serif italic text-gray-500 mt-0.5">Vendor Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden">
        
        {/* HEADER */}
        <header className="h-24 border-b border-[#292077]/10 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#292077]/50">
            <span>Platform</span>
            <ChevronRight className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[#292077]">{SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#292077]/40" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#292077]/50 focus:bg-white transition-all text-xs font-medium text-[#292077] w-64"
              />
            </div>
            <button className="p-2.5 relative bg-white border border-gray-200 rounded-full hover:border-[#d4af37] transition-all text-[#292077] group">
              <Bell className="w-4 h-4 group-hover:text-[#d4af37] transition-colors" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#d4af37] rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden cursor-pointer hover:border-[#d4af37] transition-all">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-8 sm:p-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'sales' && renderSales()}
            {activeTab === 'inventory' && renderInventory()}
            {activeTab === 'add-product' && renderAddProduct()}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[#292077]/10 mt-auto py-8 px-10 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-serif italic text-gray-500">OptiStyle © 2024. All rights reserved.</p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-[#292077]/60">
              <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d4af37] transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default VendorDashboard;
