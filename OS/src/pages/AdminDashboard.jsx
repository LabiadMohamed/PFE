import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo2 from '../assets/Loge.png';

const BASE = "http://localhost:8080";

const SIDEBAR_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard' },
  { id: 'utilisateurs', label: 'Utilisateurs' },
  { id: 'vendeurs',     label: 'Vendeurs' },
  { id: 'categories',   label: 'Catégories' },
  { id: 'produits',     label: 'Produits' },
  { id: 'commandes',    label: 'Commandes' },
];

const STATUT_COLORS = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  VALIDEE:    'bg-blue-100 text-blue-700 border-blue-200',
  EXPEDIEE:   'bg-orange-100 text-orange-700 border-orange-200',
  LIVREE:     'bg-green-100 text-green-700 border-green-200',
  ANNULEE:    'bg-red-100 text-red-700 border-red-200',
};

/* ── Auth helper ── */
function getAuth() {
  const token = localStorage.getItem("token");
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch(e) {}
  return { token, user };
}

function authHeaders() {
  const { token } = getAuth();
  return { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
}

async function api(url, opts = {}) {
  const res = await fetch(`${BASE}${url}`, { ...opts, headers: { ...authHeaders(), ...opts.headers } });
  if (!res.ok) {
    let msg = "Erreur serveur";
    try { const d = await res.json(); if (d.message) msg = d.message; } catch(e) {}
    throw new Error(msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/* ═══════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════ */

/* ── Dashboard Stats ── */
function DashboardSection() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api("/api/admin/dashboard").then(setStats).catch(console.error); }, []);

  if (!stats) return <Loading />;

  const cards = [
    { label: 'Total Utilisateurs', value: (stats.totalAcheteurs || 0) + (stats.totalVendeurs || 0) },
    { label: 'Total Vendeurs',     value: stats.totalVendeurs || 0 },
    { label: 'Total Produits',     value: stats.totalProduits || '—' },
    { label: 'Total Commandes',    value: stats.totalCommandes || 0 },
    { label: 'Chiffre d\'affaires', value: `${(stats.totalRevenue || 0).toLocaleString()} dh` },
    { label: 'Commandes en attente', value: stats.commandesParStatut?.EN_ATTENTE || 0 },
  ];

  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="Vue d'ensemble de la plateforme" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#292077]/40">Stat</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#292077]/60 mb-1">{c.label}</p>
            <p className="text-3xl font-black text-[#292077]">{c.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Utilisateurs ── */
function UtilisateursSection() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const load = () => api("/api/admin/utilisateurs").then(setUsers).catch(console.error);
  useEffect(() => { load(); }, []);

  const startEdit = (u) => { setEditId(u.id_utilisateur); setForm({ nom: u.nom, prenom: u.prenom, email: u.email, role: u.role }); };
  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id) => {
    try {
      await api(`/api/admin/utilisateurs/${id}`, { method: "PUT", body: JSON.stringify(form) });
      setEditId(null);
      load();
    } catch (e) { alert(e.message); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try { await api(`/api/admin/utilisateurs/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <SectionHeader title="Gestion des Utilisateurs" subtitle="Modifier ou supprimer les comptes utilisateurs" />
      <TableWrapper>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['ID', 'Nom', 'Prénom', 'Email', 'Rôle', 'Actions'].map(h => (
              <th key={h} className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#292077]/70 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id_utilisateur} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {editId === u.id_utilisateur ? (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{u.id_utilisateur}</td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></td>
                  <td className="py-3 px-6">
                    <select className="input-cell" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      <option value="ACHETEUR">ACHETEUR</option>
                      <option value="VENDEUR">VENDEUR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnSave onClick={() => saveEdit(u.id_utilisateur)} />
                    <BtnCancel onClick={cancelEdit} />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{u.id_utilisateur}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{u.nom}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{u.prenom}</td>
                  <td className="py-3 px-6 text-sm text-gray-500">{u.email}</td>
                  <td className="py-3 px-6"><RoleBadge role={u.role} /></td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnEdit onClick={() => startEdit(u)} />
                    <BtnDelete onClick={() => deleteUser(u.id_utilisateur)} />
                  </td>
                </>
              )}
            </tr>
          ))}
          {users.length === 0 && <EmptyRow cols={6} />}
        </tbody>
      </TableWrapper>
    </div>
  );
}

/* ── Vendeurs ── */
function VendeursSection() {
  const [vendeurs, setVendeurs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const load = () => api("/api/admin/vendeurs").then(setVendeurs).catch(console.error);
  useEffect(() => { load(); }, []);

  const startEdit = (v) => { setEditId(v.id_vendeur); setForm({ nom_boutique: v.nom_boutique, description: v.description || '', telephone: v.telephone }); };

  const saveEdit = async (id) => {
    try {
      await api(`/api/admin/vendeurs/${id}`, { method: "PUT", body: JSON.stringify(form) });
      setEditId(null); load();
    } catch (e) { alert(e.message); }
  };

  const deleteVendeur = async (id) => {
    if (!window.confirm("Supprimer ce vendeur ?")) return;
    try { await api(`/api/admin/vendeurs/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <SectionHeader title="Gestion des Vendeurs" subtitle="Modifier les boutiques et vendeurs" />
      <TableWrapper>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['ID', 'Boutique', 'Description', 'Téléphone', 'Note', 'Email vendeur', 'Actions'].map(h => (
              <th key={h} className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#292077]/70 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vendeurs.map(v => (
            <tr key={v.id_vendeur} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {editId === v.id_vendeur ? (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{v.id_vendeur}</td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.nom_boutique} onChange={e => setForm({...form, nom_boutique: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></td>
                  <td className="py-3 px-6 text-sm text-gray-500">{v.note_moyenne?.toFixed(1)}</td>
                  <td className="py-3 px-6 text-sm text-gray-500">{v.utilisateur?.email}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnSave onClick={() => saveEdit(v.id_vendeur)} />
                    <BtnCancel onClick={() => setEditId(null)} />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{v.id_vendeur}</td>
                  <td className="py-3 px-6 text-sm font-medium text-[#292077]">{v.nom_boutique}</td>
                  <td className="py-3 px-6 text-sm text-gray-500 max-w-[200px] truncate">{v.description}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{v.telephone}</td>
                  <td className="py-3 px-6 text-sm font-bold text-[#d4af37]">{v.note_moyenne?.toFixed(1)} ★</td>
                  <td className="py-3 px-6 text-sm text-gray-500">{v.utilisateur?.email}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnEdit onClick={() => startEdit(v)} />
                    <BtnDelete onClick={() => deleteVendeur(v.id_vendeur)} />
                  </td>
                </>
              )}
            </tr>
          ))}
          {vendeurs.length === 0 && <EmptyRow cols={7} />}
        </tbody>
      </TableWrapper>
    </div>
  );
}

/* ── Catégories ── */
function CategoriesSection() {
  const [cats, setCats] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [newCat, setNewCat] = useState({ type: 'VUE', description: '' });

  const load = () => api("/api/categories").then(setCats).catch(console.error);
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api("/api/categories", { method: "POST", body: JSON.stringify(newCat) });
      setNewCat({ type: 'VUE', description: '' }); load();
    } catch (e) { alert(e.message); }
  };

  const saveEdit = async (id) => {
    try {
      await api(`/api/categories/${id}`, { method: "PUT", body: JSON.stringify(form) });
      setEditId(null); load();
    } catch (e) { alert(e.message); }
  };

  const deleteCat = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try { await api(`/api/categories/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <SectionHeader title="Gestion des Catégories" subtitle="Ajouter, modifier ou supprimer les catégories de produits" />

      {/* Add category form */}
      <form onSubmit={create} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-wrap items-end gap-4">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-[#292077] mb-2 block">Type</label>
          <select value={newCat.type} onChange={e => setNewCat({...newCat, type: e.target.value})}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#292077] font-medium">
            <option value="VUE">VUE</option>
            <option value="SOLEIL">SOLEIL</option>
            <option value="LUXE">LUXE</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-black uppercase tracking-widest text-[#292077] mb-2 block">Description</label>
          <input required value={newCat.description} onChange={e => setNewCat({...newCat, description: e.target.value})}
            placeholder="Description de la catégorie" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#292077] font-medium placeholder-gray-400" />
        </div>
        <button type="submit" className="bg-[#d4af37] text-white px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#292077] transition-colors shadow-sm">
          + Ajouter
        </button>
      </form>

      <TableWrapper>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['ID', 'Type', 'Description', 'Actions'].map(h => (
              <th key={h} className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#292077]/70 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cats.map(c => (
            <tr key={c.id_categorie} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {editId === c.id_categorie ? (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{c.id_categorie}</td>
                  <td className="py-3 px-6">
                    <select className="input-cell" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option value="VUE">VUE</option>
                      <option value="SOLEIL">SOLEIL</option>
                      <option value="LUXE">LUXE</option>
                    </select>
                  </td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnSave onClick={() => saveEdit(c.id_categorie)} />
                    <BtnCancel onClick={() => setEditId(null)} />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{c.id_categorie}</td>
                  <td className="py-3 px-6"><span className="px-3 py-1 rounded-lg bg-[#292077]/10 text-[#292077] text-xs font-bold">{c.type}</span></td>
                  <td className="py-3 px-6 text-sm text-gray-600">{c.description}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnEdit onClick={() => { setEditId(c.id_categorie); setForm({ type: c.type, description: c.description || '' }); }} />
                    <BtnDelete onClick={() => deleteCat(c.id_categorie)} />
                  </td>
                </>
              )}
            </tr>
          ))}
          {cats.length === 0 && <EmptyRow cols={4} />}
        </tbody>
      </TableWrapper>
    </div>
  );
}

/* ── Produits ── */
function ProduitsSection() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const load = () => {
    api("/api/admin/produits").then(d => setProduits(d.content || d || [])).catch(console.error);
    api("/api/categories").then(setCategories).catch(console.error);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (p) => {
    setEditId(p.id_produit);
    setForm({ 
      nom: p.nom, 
      prix: p.prix, 
      marque: p.marque, 
      genre: p.genre, 
      image_url: p.image_url || '',
      colors: p.colors || '[]',
      description: p.description || '',
      image_badge: p.image_badge || '',
      id_categorie: p.categorie?.id_categorie || '' 
    });
  };

  const saveEdit = async (id) => {
    try {
      await api(`/api/produits/${id}`, { method: "PUT", body: JSON.stringify(form) });
      setEditId(null); load();
    } catch (e) { alert(e.message); }
  };

  const deleteProd = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try { await api(`/api/produits/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <SectionHeader title="Gestion des Produits" subtitle="Modifier ou supprimer les produits de la plateforme" />
      <TableWrapper>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['ID', 'Image', 'Nom', 'Marque', 'Prix', 'Genre', 'Catégorie', 'Vendeur', 'Actions'].map(h => (
              <th key={h} className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#292077]/70 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {produits.map(p => (
            <tr key={p.id_produit} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {editId === p.id_produit ? (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{p.id_produit}</td>
                  <td className="py-3 px-6">
                    <img src={form.image_url || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-lg object-cover mb-1" />
                    <input className="input-cell text-[10px]" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="URL Image" />
                  </td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" value={form.marque} onChange={e => setForm({...form, marque: e.target.value})} /></td>
                  <td className="py-3 px-6"><input className="input-cell" type="number" step="0.01" value={form.prix} onChange={e => setForm({...form, prix: e.target.value})} /></td>
                  <td className="py-3 px-6">
                    <select className="input-cell" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})}>
                      <option value="HOMME">HOMME</option><option value="FEMME">FEMME</option><option value="ENFANT">ENFANT</option>
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <select className="input-cell" value={form.id_categorie} onChange={e => setForm({...form, id_categorie: e.target.value})}>
                      {categories.map(c => <option key={c.id_categorie} value={c.id_categorie}>{c.type}</option>)}
                    </select>
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-500">{p.nom_boutique || '—'}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnSave onClick={() => saveEdit(p.id_produit)} />
                    <BtnCancel onClick={() => setEditId(null)} />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{p.id_produit}</td>
                  <td className="py-3 px-6">
                    <img src={p.image_url || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-lg object-cover"
                      onError={e => { e.target.src = 'https://via.placeholder.com/40'; }} />
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-[#292077]">{p.nom}</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{p.marque}</td>
                  <td className="py-3 px-6 text-sm font-bold text-[#d4af37]">{p.prix} dh</td>
                  <td className="py-3 px-6 text-sm text-gray-600">{p.genre}</td>
                  <td className="py-3 px-6"><span className="px-3 py-1 rounded-lg bg-[#292077]/10 text-[#292077] text-xs font-bold">{p.categorie?.type}</span></td>
                  <td className="py-3 px-6 text-sm text-gray-500">{p.nom_boutique || '—'}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <BtnEdit onClick={() => startEdit(p)} />
                    <BtnDelete onClick={() => deleteProd(p.id_produit)} />
                  </td>
                </>
              )}
            </tr>
          ))}
          {produits.length === 0 && <EmptyRow cols={9} />}
        </tbody>
      </TableWrapper>
    </div>
  );
}

/* ── Commandes ── */
function CommandesSection() {
  const [commandes, setCommandes] = useState([]);

  const load = () => api("/api/admin/commandes").then(setCommandes).catch(console.error);
  useEffect(() => { load(); }, []);

  const updateStatut = async (id, statut) => {
    try {
      await api(`/api/commandes/${id}/statut`, { method: "PUT", body: JSON.stringify({ statut }) });
      load();
    } catch (e) { alert(e.message); }
  };

  const deleteCmd = async (id) => {
    if (!window.confirm("Supprimer cette commande ?")) return;
    try { await api(`/api/admin/commandes/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <SectionHeader title="Supervision des Commandes" subtitle="Suivre et gérer toutes les commandes" />
      <TableWrapper>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['ID', 'Date', 'Montant', 'Statut', 'Adresse', 'Articles', 'Actions'].map(h => (
              <th key={h} className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#292077]/70 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {commandes.map(c => (
            <tr key={c.id_commande} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-6 text-sm font-bold text-[#292077]">#{c.id_commande}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{c.date_commande}</td>
              <td className="py-3 px-6 text-sm font-bold text-[#d4af37]">{c.montant_total} dh</td>
              <td className="py-3 px-6">
                <select value={c.statut} onChange={e => updateStatut(c.id_commande, e.target.value)}
                  className={`text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-1.5 border cursor-pointer ${STATUT_COLORS[c.statut] || 'bg-gray-100 text-gray-600'}`}>
                  {Object.keys(STATUT_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="py-3 px-6 text-sm text-gray-500 max-w-[180px] truncate">{c.adresse_livraison || '—'}</td>
              <td className="py-3 px-6 text-sm text-gray-500">{c.lignes?.length || 0} article(s)</td>
              <td className="py-3 px-6">
                <BtnDelete onClick={() => deleteCmd(c.id_commande)} />
              </td>
            </tr>
          ))}
          {commandes.length === 0 && <EmptyRow cols={7} />}
        </tbody>
      </TableWrapper>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SHARED MICRO-COMPONENTS
   ═══════════════════════════════════════════════════ */

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black uppercase tracking-wider text-[#292077]">{title}</h2>
      <p className="text-sm font-serif italic text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function TableWrapper({ children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#292077]"></div>
    </div>
  );
}

function EmptyRow({ cols }) {
  return <tr><td colSpan={cols} className="py-10 text-center text-gray-400 font-serif italic">Aucune donnée trouvée.</td></tr>;
}

function RoleBadge({ role }) {
  const colors = {
    ADMIN:    'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20',
    VENDEUR:  'bg-[#292077]/10 text-[#292077] border-[#292077]/20',
    ACHETEUR: 'bg-green-50 text-green-600 border-green-200',
  };
  return <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${colors[role] || 'bg-gray-100 text-gray-600'}`}>{role}</span>;
}

function BtnEdit({ onClick }) {
  return <button onClick={onClick} className="px-3 py-1.5 bg-[#292077] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#292077]/80 transition-colors">Modifier</button>;
}
function BtnDelete({ onClick }) {
  return <button onClick={onClick} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-600 transition-colors">Supprimer</button>;
}
function BtnSave({ onClick }) {
  return <button onClick={onClick} className="px-3 py-1.5 bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#d4af37]/80 transition-colors">Sauver</button>;
}
function BtnCancel({ onClick }) {
  return <button onClick={onClick} className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-300 transition-colors">Annuler</button>;
}

/* ═══════════════════════════════════════════════════
   MAIN: AdminDashboard
   ═══════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Auth guard
  useEffect(() => {
    const { user } = getAuth();
    if (!user || user.role !== "ADMIN") navigate("/login", { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-[#292077]">

      {/* ── SIDEBAR ── */}
      <aside className="sticky top-0 h-screen w-64 bg-[#3b3f61] flex flex-col shrink-0 z-20">
        {/* Logo */}
        <div className="h-24 flex items-center px-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo2} alt="OptiStyle" className="h-10 w-auto object-contain rounded" />
            <span className="text-xl font-black text-white tracking-tighter">OptiStyle</span>
          </Link>
        </div>

        {/* Nav */}
        <div className="p-5 flex-1">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-4 px-3">Administration</p>
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-xs font-bold tracking-widest uppercase ${
                    isActive
                      ? 'bg-white/10 text-white border-l-4 border-[#d4af37] shadow-lg'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80 border-l-4 border-transparent'
                  }`}>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-5 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full px-4 py-3 bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-500/80 transition-colors">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col h-screen max-w-full overflow-hidden">

        {/* Header */}
        <header className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#292077]/50">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Plateforme</Link>
            <span className="text-[#d4af37]">›</span>
            <span className="text-[#292077]">{SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}</span>
          </div>
          <div className="text-xs font-bold text-[#292077]/40 uppercase tracking-widest">
            Admin Panel
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 sm:p-10 max-w-[1400px] mx-auto w-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}>
              {activeTab === 'dashboard'    && <DashboardSection />}
              {activeTab === 'utilisateurs' && <UtilisateursSection />}
              {activeTab === 'vendeurs'     && <VendeursSection />}
              {activeTab === 'categories'   && <CategoriesSection />}
              {activeTab === 'produits'     && <ProduitsSection />}
              {activeTab === 'commandes'    && <CommandesSection />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-auto py-6 px-10 bg-white">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <p className="font-serif italic">OptiStyle © 2024. Tous droits réservés.</p>
            <p className="font-black uppercase tracking-widest text-[#292077]/30">Admin v1.0</p>
          </div>
        </footer>
      </main>

      {/* Global inline styles for edit cells */}
      <style>{`
        .input-cell {
          width: 100%;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.35rem 0.6rem;
          font-size: 0.8rem;
          color: #292077;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-cell:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
        }
      `}</style>
    </div>
  );
}
