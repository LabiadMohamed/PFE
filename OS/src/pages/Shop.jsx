import React, { useState, useRef, useEffect } from "react";
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

const productsData = [
  // ── Optique ─ 12 ─────────────────────────────────────────
  { id:1,forme: "Cat Eye", materiau: "Acétate",  tab:"Optique", category:"Femme",  name:"CORALIE",   price:50,  badge:null,
    colors:[COLORS.rose, COLORS.navy, COLORS.tortoise, COLORS.black],
    images:["/images/women/a.jfif", "/images/women/aa.jfif", "/images/women/aaa.jfif", "/images/women/aaaa.jfif"],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },

  { id:2,forme: "Rond",    materiau: "Titane",tab:"Optique", category:"Homme",  name:"FAIDHERBE", price:50,  
    colors:[COLORS.black, COLORS.silver, COLORS.gold, COLORS.tortoise],
    images:["/images/b/x.jfif", "/images/b/xxx.jfif", "/images/b/xxxx.jfif", "/images/b/xx.jfif"],
    desc:"Monture ronde classique en acétate. Disponible en de nombreuses couleurs." },

  { id:3, forme: "Cat Eye", materiau: "Acétate", tab:"Optique", category:"Femme",  name:"ADELINE",   price:40,  badge:null,
    colors:[COLORS.red, COLORS.black, COLORS.s, COLORS.silver],
    images:["/images/women/bbb.jfif", "/images/women/b.jfif", "/images/women/bbbb.jfif", "/images/women/bb.jfif"],
    desc:"Ovale délicat en acétate. Finitions soignées, style intemporel." },

  { id:4, forme: "Aviateur",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"XAV S",     price:50,  badge:"Nouveau",
    colors:[COLORS.black, COLORS.tortoise, COLORS.tortoise, COLORS.gold],
    images:["/images/men/a.jfif", "/images/men/aa.jfif", "/images/men/aaa.jfif", "/images/men/aaaa.jfif"],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },

  { id:5, forme: "Rond", materiau: "Titane", tab:"Optique", category:"Femme",  name:"RACHEL",    price:50,  badge:null,
    colors:[COLORS.rose, COLORS.black, COLORS.silver, COLORS.red],
    images:["/images/women/c.jfif", "/images/women/cc.jfif", "/images/women/ccc.jfif", "/images/women/cccc.jfif"],
    desc:"Papillon léger en métal. Détails dorés pour un look raffiné." },

  { id:6, forme: "Aviateur",    materiau: "Acétate", tab:"Optique", category:"men",  name:"GEORGES",   price:40,  badge:null,
    colors:[COLORS.black, COLORS.rose, ],
    images:["/images/b/h.jfif", "/images/b/hh.jfif", ],
    desc:"Rectangulaire en acétate. Format large, confort optimal." },

  { id:7, forme: "Aviateur",    materiau: "Plastique", tab:"Optique", category:"Homme",  name:"BRETON",    price:45,  badge:null,
    colors:[COLORS.black, COLORS.silver,],
    images:["/images/b/e.jfif", "/images/b/ee.jfif", ],
    desc:"Browline deux tons. Style vintage revisité en acétate premium." },

  { id:8, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Femme",  name:"CLAIRE",    price:55,  badge:"Nouveau",
    colors:[COLORS.rose, COLORS.gold, COLORS.silver, COLORS.black],
    images:["/images/women/d.jfif", "/images/women/dd.jfif", "/images/women/ddd.jfif", "/images/women/dddd.jfif"],
    desc:"Ovale fin en métal doré. Élégance discrète pour tous les visages." },

  { id:25, forme: "Rond", materiau: "Titane",tab:"Optique", category:"Homme",  name:"TITAN RX",  price:120, badge:"Premium",
    colors:[COLORS.tortoise, COLORS.rose, COLORS.red, COLORS.black],
    images:["/images/men/ccc.jfif", "/images/men/cc.jfif", "/images/men/cccc.jfif", "/images/men/c.jfif"],
    desc:"Monture titane ultra-légère. Mémoire de forme, résistance maximale." },

  { id:10, forme: "Carré",    materiau: "Métal",tab:"Optique", category:"Enfant",  name:"BOULEVARD", price:95,  badge:null,
    colors:[COLORS.black,COLORS.s,],
    images:["/images/kids/a.avif", "/images/kids/aa.avif"],
    desc:"Carré large statement. Acétate épais, look audacieux et contemporain." },

  { id:27,forme: "Cat Eye", materiau: "Acétate", tab:"Optique", category:"Femme",  name:"LÉONIE",    price:85,  badge:null,
    colors:[COLORS.rose, COLORS.gold, COLORS.silver, COLORS.tortoise],
    images:["/images/women/e.jfif", "/images/women/ee.jfif", "/images/women/eee.jfif", "/images/women/eeee.jfif"],
    desc:"Cat-eye délicat en métal. Charnières à ressort pour un confort optimal." },

  { id:28,forme: "Carré",    materiau: "Métal", tab:"Optique", category:"Homme",  name:"MARCUS",    price:75,  badge:"+2 couleurs",
    colors:[COLORS.black, COLORS.s, COLORS.silver, COLORS.tortoise],
    images:["/images/men/d.jfif", "/images/men/dd.jfif", "/images/men/ddd.jfif", "/images/men/dddd.jfif"],
    desc:"Pilote rectangulaire en acétate. Monture épaisse pour un style affirmé." },
    { id:30,forme: "Ovale", materiau: "Titane",  tab:"Optique", category:"Femme",  name:"Durand",   price:40,  badge:null,
    colors:[COLORS.rose, COLORS.s, COLORS.silver, COLORS.tortoise],
    images:["/images/a/a.jfif", "/images/a/aa.jfif", "/images/a/aaa.jfif", "/images/a/aaaa.jfif"],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:31, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Xiv",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.black, COLORS.silver, COLORS.s, ],
    images:["/images/b/a.jfif", "/images/b/aa.jfif", "/images/b/aaa.jfif", ],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:32,forme: "Ovale", materiau: "Titane",  tab:"Optique", category:"Femme",  name:"Percey",   price:40,  badge:null,
    colors:[COLORS.red, COLORS.s, COLORS.black, COLORS.tortoise],
    images:["/images/a/b.jfif", "/images/a/bb.jfif", "/images/a/bbb.jfif", "/images/a/bbbb.jfif"],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:33,forme: "Ovale", materiau: "Titane",  tab:"Optique", category:"Femme",  name:"Wilkey",   price:40,  badge:null,
    colors:[COLORS.black, COLORS.s, COLORS.tortoise, ],
    images:["/images/a/c.jfif", "/images/a/cc.jfif", "/images/a/ccc.jfif", ],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:34, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Cran",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.tortoise, COLORS.red, COLORS.silver, COLORS.s],
    images:["/images/b/b.jfif", "/images/b/bb.jfif", "/images/b/bbb.jfif", "/images/b/bbbb.jfif"],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:35, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Brady",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.s, COLORS.d, COLORS.black, ],
    images:["/images/b/c.jfif", "/images/b/cc.jfif", "/images/b/ccc.jfif", "/images/b/cccc.jfif"],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:36,forme: "Ovale", materiau: "Titane",  tab:"Optique", category:"Femme",  name:"Rice",   price:40,  badge:null,
    colors:[COLORS.silver, COLORS.tortoise, COLORS.black, COLORS.s],
    images:["/images/a/d.jfif", "/images/a/dd.jfif", "/images/a/ddd.jfif", "/images/a/dddd.jfif"],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:37, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Nzami",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.s, COLORS.silver, ],
    images:["/images/b/d.jfif", "/images/b/dd.jfif", ],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:38, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Zala",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.black, COLORS.silver, ],
    images:["/images/b/e.jfif", "/images/b/ee.jfif", ],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:39, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Krimo",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.s, COLORS.tortoise, COLORS.g, COLORS.d],
    images:["/images/b/f.jfif", "/images/b/ff.jfif", "/images/b/fff.jfif", ],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:40, forme: "Ovale",    materiau: "Titane", tab:"Optique", category:"Homme",  name:"Sima",     price:50,  badge:"+1 couleurs",
    colors:[COLORS.black, COLORS.rose, COLORS.s, ],
    images:["/images/b/g.jfif", "/images/b/gg.jfif", "/images/b/ggg.jfif", ],
    desc:"Carré moderne en acétate. Monture robuste au look affirmé." },
    { id:66,forme: "Cat Eye", materiau: "Acétate",  tab:"Optique", category:"Enfant",  name:"COR",   price:60,  badge:null,
    colors:[COLORS.black, ],
    images:["/images/kids/b.avif", ],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:67,forme: "Cat Eye", materiau: "Acétate",  tab:"Optique", category:"Enfant",  name:"COR",   price:60,  badge:null,
    colors:[COLORS.n,COLORS.rose,COLORS.black, ],
    images:["/images/kids/c.avif","/images/kids/cc.avif","/images/kids/ccc.avif"],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:68,forme: "Cat Eye", materiau: "Acétate",  tab:"Optique", category:"Enfant",  name:"COR",   price:60,  badge:null,
    colors:[COLORS.black, ],
    images:["/images/kids/a.avif", ],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },
    { id:69,forme: "Cat Eye", materiau: "Acétate",  tab:"Optique", category:"Enfant",  name:"COR",   price:60,  badge:null,
    colors:[COLORS.v,],
    images:["/images/kids/d.avif", ],
    desc:"Monture acétate papillon. Légère et élégante pour un port quotidien." },


  // ── Solaire ─ 12 ─────────────────────────────────────────
  { id:9, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"KENITO",    price:60,  badge:"Collab",
    colors:[COLORS.tortoise, COLORS.green, COLORS.g, ],
    images:["/images/m/a.jfif", "/images/m/aa.jfif", "/images/m/aaa.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },

  { id:101, forme: "Aviateur", materiau: "Acétate",tab:"Solaire", category:"Femme",  name:"TINA2000",  price:50,  badge:"Collab",
    colors:[COLORS.m, COLORS.rose, COLORS.silver,],
    images:["/images/w/a.jfif", "/images/w/aa.jfif", "/images/w/aaa.jfif",],
    desc:"Ovale rétro en métal fin. Verres roses tendance, monture délicate." },

  { id:11,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Enfant",  name:"IZY20",     price:50,  badge:null,
    colors:[COLORS.s,],
    images:["/images/r/aa.jpg", ],
    desc:"Carré acétate oversize. Style années 90, protection maximale." },

  { id:12,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Homme",  name:"AVIATOR S", price:59,  badge:"Bestseller",
    colors:[COLORS.black, COLORS.tortoise,],
    images:["/images/m/b.jpg", "/images/m/bb.jpg",],
    desc:"Aviateur classique titanium. Verres dégradés polarisés." },

  { id:13, forme: "Ovale", materiau: "Acétate",tab:"Solaire", category:"Femme",  name:"CAT LUXE",  price:65,  badge:null,
    colors:[COLORS.green, COLORS.black, COLORS.tortoise, ],
    images:["/images/w/b.jfif", "/images/w/bb.jfif", "/images/w/bbb.jfif", ],
    desc:"Cat-eye acétate épais. Fabriqué à la main en Italie." },

  { id:14,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Enfant",  name:"HEXAGON",   price:70,  badge:"Limité",
    colors:[COLORS.black, ],
    images:["/images/r/b.jpg", ],
    desc:"Hexagonal géométrique en acier inoxydable. Édition limitée." },

  { id:15,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Homme",  name:"SHIELD",    price:75,  badge:"Nouveau",
    colors:[COLORS.d, COLORS.black, COLORS.tortoise, ],
    images:["/images/m/c.jpg", "/images/m/cc.jpg", "/images/m/ccc.jpg",],
    desc:"Écran monobloc sport. Protection UV maximale, style futuriste." },

  { id:29,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Homme",  name:"WAYFARER X",price:55,  badge:null,
    colors:[COLORS.silver,],
    images:["/images/m/d.jpg", ],
    desc:"Wayfarer moderne en acétate épais. Verres dégradés UV400." },

  { id:30,forme: "Papilon", materiau: "Acétate", tab:"Solaire", category:"Femme",  name:"PAPAYA",    price:48,  badge:"+3 couleurs",
    colors:[COLORS.g,],
    images:["/images/w/c.jfif", ],
    desc:"Ovale tendance aux couleurs vives. Léger et ultra féminin." },

  { id:31,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Enfant",  name:"SPORT PRO", price:80,  badge:"Nouveau",
    colors:[COLORS.v, ],
    images:["/images/r/c.jpg", ],
    desc:"Enveloppant sportif TR-90. Verres interchangeables polarisés." },

  { id:32,forme: "Cat Eye", materiau: "Acétate", tab:"Solaire", category:"Homme",  name:"MARCO",     price:62,  badge:null,
    colors:[COLORS.black, COLORS.s, COLORS.tortoise, ],
    images:["/images/m/e.jpg", "/images/m/ee.jpg", "/images/m/eee.jpg", ],
    desc:"Rectangulaire acétate épais. Look vintage années 70 revisité." },

  { id:16,forme: "Ovale", materiau: "Acétate", tab:"Solaire", category:"Femme",  name:"ROUND SOL", price:45,  badge:null,
    colors:[COLORS.navy, COLORS.tortoise,  ],
    images:["/images/w/d.jfif", "/images/w/dd.jfif", ],
    desc:"Rond John Lennon en métal fin. Verres fumés, ultra léger." },
    { id:102, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"Royal",    price:60,  badge:"Collab",
    colors:[COLORS.tortoise, COLORS.d, ],
    images:["/images/m/ff.jpg", "/images/m/f.jpg", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:103, forme: " ", materiau: "", tab:"Solaire", category:"Femme",  name:"Sweet",    price:60,  badge:"Collab",
    colors:[COLORS.black, COLORS.navy, COLORS.s, ],
    images:["/images/w/g.jpg", "/images/w/gg.jpg", "/images/w/ggg.jpg", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:104, forme: " Aviateur ", materiau: "", tab:"Solaire", category:"Homme",  name:"Classic",    price:60,  badge:"Collab",
    colors:[COLORS.s,],
    images:["/images/m/g.jpg", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:105, forme: " Cat Eye", materiau: "", tab:"Solaire", category:"Femme",  name:"Angel",    price:60,  badge:"Collab",
    colors:[COLORS.black, COLORS.navy, COLORS.green, ],
    images:["/images/w/e.jfif", "/images/w/ee.jfif", "/images/w/eee.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:106, forme: "Cat Eye ", materiau: "", tab:"Solaire", category:"Femme",  name:"Glam Eyes",    price:60,  badge:"Collab",
    colors:[COLORS.s, ],
    images:["/images/w/h.jpg",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:107, forme: "Aviateur ", materiau: "", tab:"Solaire", category:"Homme",  name:"Noble Glass",    price:60,  badge:"Collab",
    colors:[COLORS.n, COLORS.s,],
    images:["/images/m/h.jfif", "/images/m/hh.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:108, forme: " ", materiau: "", tab:"Solaire", category:"Femme",  name:"Evil",    price:60,  badge:"Collab",
    colors:[COLORS.rose, COLORS.navy, COLORS.gold,],
    images:["/images/w/i.jpg", "/images/w/ii.jpg", "/images/w/iii.jpg",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:109, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"Urban",    price:60,  badge:"Collab",
    colors:[COLORS.green, COLORS.silver, COLORS.black,],
    images:["/images/m/i.jfif", "/images/m/ii.jfif", "/images/m/iii.jfif",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:110, forme: " Rond", materiau: "", tab:"Solaire", category:"Homme",  name:"Speed Loke",    price:60,  badge:"Collab",
    colors:[COLORS.g, COLORS.tortoise, ],
    images:["/images/m/j.jfif", "/images/m/jj.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:111, forme: " ", materiau: "", tab:"Solaire", category:"Femme",  name:"Luna chic",    price:60,  badge:"Collab",
    colors:[COLORS.green,],
    images:["/images/w/j.jpg",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:112, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"Mazig",    price:60,  badge:"Collab",
    colors:[COLORS.green,],
    images:["/images/m/k.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:113, forme: " ", materiau: "", tab:"Solaire", category:"Enfant",  name:"Asmar",    price:60,  badge:"Collab",
    colors:[COLORS.rose, ],
    images:["/images/r/r.jpg",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
    { id:119, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"EDAHEM",    price:60,  badge:"Collab",
    colors:[COLORS.navy, ],
    images:["/images/m/l.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
{ id:114, forme: " ", materiau: "", tab:"Solaire", category:"Enfant",  name:"Kadra",    price:60,  badge:"Collab",
    colors:[COLORS.rose, ],
    images:["/images/r/sss.webp", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
{ id:115, forme: " ", materiau: "", tab:"Solaire", category:"Enfant",  name:"Rharou",    price:60,  badge:"Collab",
    colors:[COLORS.tortoise,],
    images:["/images/r/d.jpg",],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
{ id:116, forme: " ", materiau: "", tab:"Solaire", category:"Enfant",  name:"Sva",    price:60,  badge:"Collab",
    colors:[COLORS.navy, ],
    images:["/images/r/ss.webp", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
{ id:117, forme: " ", materiau: "", tab:"Solaire", category:"Homme",  name:"KENITO",    price:60,  badge:"Collab",
    colors:[COLORS.black, ],
    images:["/images/m/m.jfif", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },
{ id:118, forme: " ", materiau: "", tab:"Solaire", category:"Enfant",  name:"Domi",    price:60,  badge:"Collab",
    colors:[COLORS.n, ],
    images:["/images/r/s.webp", ],
    desc:"Octogonal métal. Collaboration exclusive. Verres polarisés UV400." },



  // ── Luxury ─ 12 ────────────────────────────────────────────
  { id:17,forme: "Cat Eye", materiau: "Acétate", tab:"Luxury", category:"Homme", name:"TINY STAR", price:35, badge:"Kids",
    colors:[COLORS.s, COLORS.tortoise, COLORS.black, ],
    images:["/images/n/a.jpg", "/images/n/aaa.jpg", "/images/n/aa.jpg", ],
    desc:"Monture étoile pour enfants. TR-90 flexible et résistant." },

  { id:18, forme: "Ronde", materiau: "Acétate",tab:"Luxury", category:"Femme", name:"JR ROUND",  price:30, badge:null,
    colors:[COLORS.rose,],
    images:["/images/x/d.jpg", ],
    desc:"Ronde douce pour les petits. Plaquettes caoutchouc confortables." },

  { id:19, forme: "Cat Eye", materiau: "Acétate",tab:"Luxury", category:"Femme", name:"DINO",      price:38, badge:"Fun",
    colors:[COLORS.rose, ],
    images:["/images/x/a.jpg", ],
    desc:"Accents dinosaure ludiques. Verres anti-rayures." },

  { id:20,forme: " aviateur", materiau: "Acétate", tab:"Luxury", category:"Homme", name:"MINI AVI",  price:40, badge:null,
    colors:[COLORS.black, COLORS.rose, ],
    images:["/images/n/b.jpg", "/images/n/bb.jpg", ],
    desc:"Mini aviateur pour enfants. Protection UV incluse." },

  { id:21,forme: "Cat Eye", materiau: "Acétate", tab:"Luxury", category:"Enfant", name:"SPORTY JR", price:32, badge:null,
    colors:[COLORS.rose,],
    images:["/images/f/a.jpg",],
    desc:"Enveloppant sport flexible. Verres incassables pour les actifs." },

  { id:22, forme: "Cat Eye", materiau: "Acétate",tab:"Luxury", category:"Femme", name:"HEART",     price:28, badge:"Populaire",
    colors:[COLORS.black, COLORS.rose,],
    images:["/images/x/b.jpg", "/images/x/bb.jpg", "", ""],
    desc:"Accent cœur pour filles. Léger et sécurisé." },

  { id:23,forme: "Carré", materiau: "Acétate", tab:"Luxury", category:"Femme", name:"SQ PLAY",   price:33, badge:null,
    colors:[COLORS.rose, ],
    images:["/images/x/c.jpg", ],
    desc:"Carré bold pour enfants. Branches caoutchouc antidérapantes." },

  { id:24,forme: " Papillon", materiau: "Acétate", tab:"Luxury", category:"Homme", name:"BUTTERFLY", price:36, badge:"Nouveau",
    colors:[COLORS.d, ],
    images:["/images/n/c.jpg", ],
    desc:"Papillon mignon pour filles 4-10 ans. Charnières flexibles." },

  { id:33,forme: "Cat Eye", materiau: "Acétate", tab:"Luxury", category:"Homme", name:"RAINBOW",   price:29, badge:"+5 couleurs",
    colors:[COLORS.black,],
    images:["/images/n/d.jpg", ],
    desc:"Monture arc-en-ciel colorée. Acétate souple, confort toute la journée." },

  { id:34,forme: "Aviateur ", materiau: "Acétate", tab:"Luxury", category:"Femme", name:"PILOT JR",  price:37, badge:null,
    colors:[COLORS.rose,],
    images:["/images/x/e.jpg",],
    desc:"Aviateur junior métal léger. Verres anti-UV pour les petits aventuriers." },

  { id:35,forme: "Cat Eye", materiau: "Acétate", tab:"Luxury", category:"Enfant", name:"ROBO",      price:34, badge:"Fun",
    colors:[COLORS.black,],
    images:["/images/f/c.jpg", ],
    desc:"Design robotique futuriste. TR-90 ultra résistant aux chocs." },

  { id:36, forme: "Ovale Eye", materiau: "Acétate",tab:"Luxury", category:"Enfant", name:"FLOCON",    price:31, badge:null,
    colors:[COLORS.rose,],
    images:["/images/f/b.jpg", ],
    desc:"Ovale doux pour les petites filles. Branches souples et sécurisées." },
];

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

const handleAdd = () => {
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const newItem = {
    id: product.id + "-" + selColor,
    brand: product.tab || "OptiStyle",
    name: product.name,
    color: product.colors[selColor].label,
    price: product.price,
    quantity: qty,
    image: currentImg
  };
  
  const existingItemIndex = currentCart.findIndex(item => item.name === newItem.name && item.color === newItem.color);
  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity += qty;
  } else {
    currentCart.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(currentCart));
  window.dispatchEvent(new Event('cartUpdated'));
  navigate("/cart");
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
  const handleAdd = (e) => {
  e.stopPropagation();

  // (اختياري) تخزين product باش صاحبك يقراه
  localStorage.setItem("cart", JSON.stringify([product]));

  // توجيه ل page panier
  navigate("/cart");
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

function CartSidebar({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
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
            <div key={idx} className="flex gap-3 items-start">
              <img src={item.images?.[0] || ""} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#292077] truncate">{item.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: item.color?.hex || "#1a1a1a" }}/>
                  <p className="text-[11px] text-gray-400">{item.color?.label || "Color"}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button onClick={() => onUpdateQty(idx, item.qty-1)} className="w-5 h-5 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100">−</button>
                  <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(idx, item.qty+1)} className="w-5 h-5 rounded-full border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100">+</button>
                  <span className="ml-auto text-[13px] font-semibold text-[#292077]">{item.price * item.qty}€</span>
                </div>
              </div>
              <button onClick={() => onRemove(idx)} className="text-gray-300 hover:text-red-400 transition flex-shrink-0 mt-0.5">
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
            <button className="w-full bg-[#292077] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d4af37] transition-colors">
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const [activeTab,  setActiveTab]  = useState("Optique");
  const [cart,       setCart]       = useState([]);
  const [favorites,  setFavorites]  = useState([]);
  const [quickView,  setQuickView]  = useState(null);
  const [cartOpen,   setCartOpen]   = useState(false);
  const [sortBy,     setSortBy]     = useState("default");
  const [fGenre,     setFGenre]     = useState([]);
  const [fFormes,    setFFormes]    = useState([]);
  const [fMat,       setFMat]       = useState([]);
  const [fPrix,      setFPrix]      = useState([]);

  const toggleF = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const addToCart = (product, qty=1, color=product.colors[0]) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id===product.id && (i.color?.hex === color?.hex));
      if (idx >= 0) return prev.map((item,i) => i===idx ? {...item, qty: item.qty+qty} : item);
      return [...prev, {...product, qty, color}];
    });
  };
  const removeFromCart = (idx) => setCart(p => p.filter((_,i) => i!==idx));
  const updateQty = (idx, qty) => {
    if (qty < 1) return removeFromCart(idx);
    setCart(p => p.map((item,i) => i===idx ? {...item, qty} : item));
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

  const cartCount    = cart.reduce((s,i) => s+i.qty, 0);
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

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onAddToCart={addToCart}/>}
      {cartOpen  && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onUpdateQty={updateQty}/>}

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideIn { from { transform:translateX(100%) } to { transform:translateX(0) } }
      `}</style>
    </div>
  );
}
