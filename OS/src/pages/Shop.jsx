import React, { useState, useRef, useEffect } from "react";
import CTA from "../components/CTA";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = {
  black:    { hex: "#1a1a1a", label: "black" },
  tortoise: { hex: "#8B5E3C", label: "tortoise" },
  gold:     { hex: "#C9A84C", label: "gold" },
  silver:   { hex: "#A8A9AD", label: "silver" },
  navy:     { hex: "#5f8dd6", label: "navy" },
  n:        { hex: "#2d528f", label: "blue" },
  red:      { hex: "#C0392B", label: "red" },
  rose:     { hex: "#E8A598", label: "pink" },
  v:        { hex: "#c821e2", label: "purple" },
  green:    { hex: "#4A7C59", label: "green" },
  g:        { hex: "#10431f", label: "dark green" },
  d:        { hex: "#f18a24f9", label: "orange" },
  s:        { hex: "#83848a", label: "dark silver" },
  m:        { hex: "#717dc1", label: "blue" },
};

const productsData = [
  // ── Optical ─────────────────────────────────────────
  { id:1, forme: "Cat Eye", materiau: "Acetate",  tab:"Optical", category:"Women",  name:"CORALIE",   price:500,  badge:null,
    colors:[COLORS.rose, COLORS.navy, COLORS.tortoise, COLORS.black],
    images:["/images/women/a.jfif", "/images/women/aa.jfif", "/images/women/aaa.jfif", "/images/women/aaaa.jfif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:2, forme: "Round", materiau: "Titanium", tab:"Optical", category:"Men",  name:"FAIDHERBE", price:450,  
    colors:[COLORS.black, COLORS.silver, COLORS.gold, COLORS.tortoise],
    images:["/images/b/x.jfif", "/images/b/xxx.jfif", "/images/b/xxxx.jfif", "/images/b/xx.jfif"],
    desc:"Classic round acetate frame. Available in many colors." },

  { id:3, forme: "Cat Eye", materiau: "Acetate", tab:"Optical", category:"Women",  name:"ADELINE",   price:430,  badge:null,
    colors:[COLORS.red, COLORS.black, COLORS.s, COLORS.silver],
    images:["/images/women/bbb.jfif", "/images/women/b.jfif", "/images/women/bbbb.jfif", "/images/women/bb.jfif"],
    desc:"Delicate oval in acetate. Fine finishes, timeless style." },

  { id:4, forme: "Aviator", materiau: "Titanium", tab:"Optical", category:"Men",  name:"XAV S",     price:550,  badge:"New",
    colors:[COLORS.black, COLORS.tortoise, COLORS.tortoise, COLORS.gold],
    images:["/images/men/a.jfif", "/images/men/aa.jfif", "/images/men/aaa.jfif", "/images/men/aaaa.jfif"],
    desc:"Modern square in acetate. Robust frame with an assertive look." },

  { id:5, forme: "Round", materiau: "Titanium", tab:"Optical", category:"Women",  name:"RACHEL",    price:200,  badge:null,
    colors:[COLORS.rose, COLORS.black, COLORS.silver, COLORS.red],
    images:["/images/women/c.jfif", "/images/women/cc.jfif", "/images/women/ccc.jfif", "/images/women/cccc.jfif"],
    desc:"Light butterfly in metal. Gold details for a refined look." },

  { id:6, forme: "Aviator", materiau: "Acetate", tab:"Optical", category:"Men",  name:"GEORGES",   price:440,  badge:null,
    colors:[COLORS.black, COLORS.rose],
    images:["/images/b/h.jfif", "/images/b/hh.jfif"],
    desc:"Rectangular in acetate. Large format, optimal comfort." },

  { id:7, forme: "Aviator", materiau: "Plastic", tab:"Optical", category:"Men",  name:"BRETON",    price:455,  badge:null,
    colors:[COLORS.black, COLORS.silver],
    images:["/images/b/e.jfif", "/images/b/ee.jfif"],
    desc:"Two-tone browline. Revisited vintage style in premium acetate." },

  { id:8, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Women",  name:"CLAIRE",    price:599,  badge:"New",
    colors:[COLORS.rose, COLORS.gold, COLORS.silver, COLORS.black],
    images:["/images/women/d.jfif", "/images/women/dd.jfif", "/images/women/ddd.jfif", "/images/women/dddd.jfif"],
    desc:"Fine oval in gold metal. Discreet elegance for all faces." },

  { id:25, forme: "Round", materiau: "Titanium", tab:"Optical", category:"Men",  name:"TITAN RX",  price:120, badge:"Premium",
    colors:[COLORS.tortoise, COLORS.rose, COLORS.red, COLORS.black],
    images:["/images/men/ccc.jfif", "/images/men/cc.jfif", "/images/men/cccc.jfif", "/images/men/c.jfif"],
    desc:"Ultra-light titanium frame. Shape memory, maximum resistance." },

  { id:10, forme: "Square", materiau: "Metal", tab:"Optical", category:"Kids",  name:"BOULEVARD", price:799,  badge:null,
    colors:[COLORS.black,COLORS.s],
    images:["/images/kids/a.avif", "/images/kids/aa.avif"],
    desc:"Large statement square. Thick acetate, bold and contemporary look." },

  { id:27, forme: "Cat Eye", materiau: "Acetate", tab:"Optical", category:"Women",  name:"LÉONIE",    price:805,  badge:null,
    colors:[COLORS.rose, COLORS.gold, COLORS.silver, COLORS.tortoise],
    images:["/images/women/e.jfif", "/images/women/ee.jfif", "/images/women/eee.jfif", "/images/women/eeee.jfif"],
    desc:"Delicate metal cat-eye. Spring hinges for optimal comfort." },

  { id:28, forme: "Square", materiau: "Metal", tab:"Optical", category:"Men",  name:"MARCUS",    price:745,  badge:"+2 colors",
    colors:[COLORS.black, COLORS.s, COLORS.silver, COLORS.tortoise],
    images:["/images/men/d.jfif", "/images/men/dd.jfif", "/images/men/ddd.jfif", "/images/men/dddd.jfif"],
    desc:"Rectangular pilot in acetate. Thick frame for a bold style." },

  { id:30, forme: "Oval", materiau: "Titanium",  tab:"Optical", category:"Women",  name:"Durand",   price:460,  badge:null,
    colors:[COLORS.rose, COLORS.s, COLORS.silver, COLORS.tortoise],
    images:["/images/a/a.jfif", "/images/a/aa.jfif", "/images/a/aaa.jfif", "/images/a/aaaa.jfif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:31, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Xiv",     price:590,  badge:"+1 color",
    colors:[COLORS.black, COLORS.silver, COLORS.s],
    images:["/images/b/a.jfif", "/images/b/aa.jfif", "/images/b/aaa.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:32, forme: "Oval", materiau: "Titanium",  tab:"Optical", category:"Women",  name:"Percey",   price:499,  badge:null,
    colors:[COLORS.red, COLORS.s, COLORS.black, COLORS.tortoise],
    images:["/images/a/b.jfif", "/images/a/bb.jfif", "/images/a/bbb.jfif", "/images/a/bbbb.jfif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:33, forme: "Oval", materiau: "Titanium",  tab:"Optical", category:"Women",  name:"Wilkey",   price:470,  badge:null,
    colors:[COLORS.black, COLORS.s, COLORS.tortoise],
    images:["/images/a/c.jfif", "/images/a/cc.jfif", "/images/a/ccc.jfif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:34, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Cran",     price:599,  badge:"+1 color",
    colors:[COLORS.tortoise, COLORS.red, COLORS.silver, COLORS.s],
    images:["/images/b/b.jfif", "/images/b/bb.jfif", "/images/b/bbb.jfif", "/images/b/bbbb.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:35, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Brady",     price:299,  badge:"+1 color",
    colors:[COLORS.s, COLORS.d, COLORS.black],
    images:["/images/b/c.jfif", "/images/b/cc.jfif", "/images/b/ccc.jfif", "/images/b/cccc.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:36, forme: "Oval", materiau: "Titanium",  tab:"Optical", category:"Women",  name:"Rice",   price:199,  badge:null,
    colors:[COLORS.silver, COLORS.tortoise, COLORS.black, COLORS.s],
    images:["/images/a/d.jfif", "/images/a/dd.jfif", "/images/a/ddd.jfif", "/images/a/dddd.jfif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:37, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Nzami",     price:100,  badge:"+1 color",
    colors:[COLORS.s, COLORS.silver],
    images:["/images/b/d.jfif", "/images/b/dd.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:38, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Zala",     price:250,  badge:"+1 color",
    colors:[COLORS.black, COLORS.silver],
    images:["/images/b/e.jfif", "/images/b/ee.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:39, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Krimo",     price:120,  badge:"+1 color",
    colors:[COLORS.s, COLORS.tortoise, COLORS.g, COLORS.d],
    images:["/images/b/f.jfif", "/images/b/ff.jfif", "/images/b/fff.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:40, forme: "Oval", materiau: "Titanium", tab:"Optical", category:"Men",  name:"Sima",     price:370,  badge:"+1 color",
    colors:[COLORS.black, COLORS.rose, COLORS.s],
    images:["/images/b/g.jfif", "/images/b/gg.jfif", "/images/b/ggg.jfif"],
    desc:"Modern square in acetate. Robust frame with a bold look." },

  { id:66, forme: "Cat Eye", materiau: "Acetate",  tab:"Optical", category:"Kids",  name:"COR",   price:100,  badge:null,
    colors:[COLORS.black],
    images:["/images/kids/b.avif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:67, forme: "Cat Eye", materiau: "Acetate",  tab:"Optical", category:"Kids",  name:"COR",   price:160,  badge:null,
    colors:[COLORS.n, COLORS.rose, COLORS.black],
    images:["/images/kids/c.avif", "/images/kids/cc.avif", "/images/kids/ccc.avif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:68, forme: "Cat Eye", materiau: "Acetate",  tab:"Optical", category:"Kids",  name:"COR",   price:90,  badge:null,
    colors:[COLORS.black],
    images:["/images/kids/a.avif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  { id:69, forme: "Cat Eye", materiau: "Acetate",  tab:"Optical", category:"Kids",  name:"COR",   price:120,  badge:null,
    colors:[COLORS.v],
    images:["/images/kids/d.avif"],
    desc:"Butterfly acetate frame. Lightweight and elegant for daily wear." },

  // ── Sun ─────────────────────────────────────────
  { id:9, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"KENITO",    price:600,  badge:"Collab",
    colors:[COLORS.tortoise, COLORS.green, COLORS.g],
    images:["/images/m/a.jfif", "/images/m/aa.jfif", "/images/m/aaa.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:101, forme: "Aviator", materiau: "Acetate", tab:"Sun", category:"Women",  name:"TINA2000",  price:370,  badge:"Collab",
    colors:[COLORS.m, COLORS.rose, COLORS.silver],
    images:["/images/w/a.jfif", "/images/w/aa.jfif", "/images/w/aaa.jfif"],
    desc:"Retro oval in thin metal. Trendy pink lenses, delicate frame." },

  { id:11, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Kids",  name:"IZY20",     price:220,  badge:null,
    colors:[COLORS.s],
    images:["/images/r/aa.jpg"],
    desc:"Oversize acetate square. 90s style, maximum protection." },

  { id:12, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Men",  name:"AVIATOR S", price:590,  badge:"Bestseller",
    colors:[COLORS.black, COLORS.tortoise],
    images:["/images/m/b.jpg", "/images/m/bb.jpg"],
    desc:"Classic titanium aviator. Polarized gradient lenses." },

  { id:13, forme: "Oval", materiau: "Acetate", tab:"Sun", category:"Women",  name:"CAT LUXE",  price:235,  badge:null,
    colors:[COLORS.green, COLORS.black, COLORS.tortoise],
    images:["/images/w/b.jfif", "/images/w/bb.jfif", "/images/w/bbb.jfif"],
    desc:"Thick acetate cat-eye. Handmade in Italy." },

  { id:14, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Kids",  name:"HEXAGON",   price:70,  badge:"Limited",
    colors:[COLORS.black],
    images:["/images/r/b.jpg"],
    desc:"Geometric hexagonal in stainless steel. Limited edition." },

  { id:15, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Men",  name:"SHIELD",    price:450,  badge:"New",
    colors:[COLORS.d, COLORS.black, COLORS.tortoise],
    images:["/images/m/c.jpg", "/images/m/cc.jpg", "/images/m/ccc.jpg"],
    desc:"Sport mono-lens shield. Maximum UV protection, futuristic style." },

  { id:29, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Men",  name:"WAYFARER X", price:350,  badge:null,
    colors:[COLORS.silver],
    images:["/images/m/d.jpg"],
    desc:"Modern wayfarer in thick acetate. UV400 gradient lenses." },

  { id:30, forme: "Butterfly", materiau: "Acetate", tab:"Sun", category:"Women",  name:"PAPAYA",    price:480,  badge:"+3 colors",
    colors:[COLORS.g],
    images:["/images/w/c.jfif"],
    desc:"Trendy oval in bright colors. Lightweight and ultra feminine." },

  { id:31, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Kids",  name:"SPORT PRO", price:60,  badge:"New",
    colors:[COLORS.v],
    images:["/images/r/c.jpg"],
    desc:"TR-90 wrap-around sports frame. Interchangeable polarized lenses." },

  { id:32, forme: "Cat Eye", materiau: "Acetate", tab:"Sun", category:"Men",  name:"MARCO",     price:620,  badge:null,
    colors:[COLORS.black, COLORS.s, COLORS.tortoise],
    images:["/images/m/e.jpg", "/images/m/ee.jpg", "/images/m/eee.jpg"],
    desc:"Thick acetate rectangular. Revisited 70s vintage look." },

  { id:16, forme: "Oval", materiau: "Acetate", tab:"Sun", category:"Women",  name:"ROUND SOL", price:459,  badge:null,
    colors:[COLORS.navy, COLORS.tortoise],
    images:["/images/w/d.jfif", "/images/w/dd.jfif"],
    desc:"John Lennon style round in thin metal. Smoked lenses, ultra light." },

  { id:102, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"Royal",    price:460,  badge:"Collab",
    colors:[COLORS.tortoise, COLORS.d],
    images:["/images/m/ff.jpg", "/images/m/f.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:103, forme: " ", materiau: "", tab:"Sun", category:"Women",  name:"Sweet",    price:540,  badge:"Collab",
    colors:[COLORS.black, COLORS.navy, COLORS.s],
    images:["/images/w/g.jpg", "/images/w/gg.jpg", "/images/w/ggg.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:104, forme: " Aviator ", materiau: "", tab:"Sun", category:"Men",  name:"Classic",    price:600,  badge:"Collab",
    colors:[COLORS.s],
    images:["/images/m/g.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:105, forme: " Cat Eye", materiau: "", tab:"Sun", category:"Women",  name:"Angel",    price:130,  badge:"Collab",
    colors:[COLORS.black, COLORS.navy, COLORS.green],
    images:["/images/w/e.jfif", "/images/w/ee.jfif", "/images/w/eee.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:106, forme: "Cat Eye ", materiau: "", tab:"Sun", category:"Women",  name:"Glam Eyes",    price:250,  badge:"Collab",
    colors:[COLORS.s],
    images:["/images/w/h.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:107, forme: "Aviator ", materiau: "", tab:"Sun", category:"Men",  name:"Noble Glass",    price:220,  badge:"Collab",
    colors:[COLORS.n, COLORS.s],
    images:["/images/m/h.jfif", "/images/m/hh.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:108, forme: " ", materiau: "", tab:"Sun", category:"Women",  name:"Evil",    price:450,  badge:"Collab",
    colors:[COLORS.rose, COLORS.navy, COLORS.gold],
    images:["/images/w/i.jpg", "/images/w/ii.jpg", "/images/w/iii.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:109, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"Urban",    price:800,  badge:"Collab",
    colors:[COLORS.green, COLORS.silver, COLORS.black],
    images:["/images/m/i.jfif", "/images/m/ii.jfif", "/images/m/iii.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:110, forme: " Round", materiau: "", tab:"Sun", category:"Men",  name:"Speed Loke",    price:70,  badge:"Collab",
    colors:[COLORS.g, COLORS.tortoise],
    images:["/images/m/j.jfif", "/images/m/jj.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:111, forme: " ", materiau: "", tab:"Sun", category:"Women",  name:"Luna chic",    price:100,  badge:"Collab",
    colors:[COLORS.green],
    images:["/images/w/j.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:112, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"Mazig",    price:120,  badge:"Collab",
    colors:[COLORS.green],
    images:["/images/m/k.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:113, forme: " ", materiau: "", tab:"Sun", category:"Kids",  name:"Asmar",    price:300,  badge:"Collab",
    colors:[COLORS.rose],
    images:["/images/r/r.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:119, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"EDAHEM",    price:400,  badge:"Collab",
    colors:[COLORS.navy],
    images:["/images/m/l.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:114, forme: " ", materiau: "", tab:"Sun", category:"Kids",  name:"Kadra",    price:250,  badge:"Collab",
    colors:[COLORS.rose],
    images:["/images/r/sss.webp"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:115, forme: " ", materiau: "", tab:"Sun", category:"Kids",  name:"Rharou",    price:120,  badge:"Collab",
    colors:[COLORS.tortoise],
    images:["/images/r/d.jpg"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:116, forme: " ", materiau: "", tab:"Sun", category:"Kids",  name:"Sva",    price:450,  badge:"Collab",
    colors:[COLORS.navy],
    images:["/images/r/ss.webp"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:117, forme: " ", materiau: "", tab:"Sun", category:"Men",  name:"KENITO",    price:600,  badge:"Collab",
    colors:[COLORS.black],
    images:["/images/m/m.jfif"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  { id:118, forme: " ", materiau: "", tab:"Sun", category:"Kids",  name:"Domi",    price:230,  badge:"Collab",
    colors:[COLORS.n],
    images:["/images/r/s.webp"],
    desc:"Octagonal metal. Exclusive collaboration. UV400 polarized lenses." },

  // ── Luxury ────────────────────────────────────────────
  { id:17, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Men", name:"TINY STAR", price:750, badge:"Kids",
    colors:[COLORS.s, COLORS.tortoise, COLORS.black],
    images:["/images/n/a.jpg", "/images/n/aaa.jpg", "/images/n/aa.jpg"],
    desc:"Star frame for kids. Flexible and resistant TR-90." },

  { id:18, forme: "Round", materiau: "Acetate", tab:"Luxury", category:"Women", name:"JR ROUND",  price:850, badge:null,
    colors:[COLORS.rose],
    images:["/images/x/d.jpg"],
    desc:"Soft round for little ones. Comfortable rubber pads." },

  { id:19, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Women", name:"DINO",      price:380, badge:"Fun",
    colors:[COLORS.rose],
    images:["/images/x/a.jpg"],
    desc:"Playful dinosaur accents. Anti-scratch lenses." },

  { id:20, forme: "Aviator", materiau: "Acetate", tab:"Luxury", category:"Men", name:"MINI AVI",  price:460, badge:null,
    colors:[COLORS.black, COLORS.rose],
    images:["/images/n/b.jpg", "/images/n/bb.jpg"],
    desc:"Mini aviator for kids. UV protection included." },

  { id:21, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Kids", name:"SPORTY JR", price:399, badge:null,
    colors:[COLORS.rose],
    images:["/images/f/a.jpg"],
    desc:"Flexible sport wrap. Unbreakable lenses for active children." },

  { id:22, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Women", name:"HEART",     price:450, badge:"Popular",
    colors:[COLORS.black, COLORS.rose],
    images:["/images/x/b.jpg", "/images/x/bb.jpg", "", ""],
    desc:"Heart accent for girls. Lightweight and safe." },

  { id:23, forme: "Square", materiau: "Acetate", tab:"Luxury", category:"Women", name:"SQ PLAY",   price:333, badge:null,
    colors:[COLORS.rose],
    images:["/images/x/c.jpg"],
    desc:"Bold square for kids. Non-slip rubber temples." },

  { id:24, forme: "Butterfly", materiau: "Acetate", tab:"Luxury", category:"Men", name:"BUTTERFLY", price:360, badge:"New",
    colors:[COLORS.d],
    images:["/images/n/c.jpg"],
    desc:"Cute butterfly for girls ages 4-10. Flexible hinges." },

  { id:33, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Men", name:"RAINBOW",   price:290, badge:"+5 colors",
    colors:[COLORS.black],
    images:["/images/n/d.jpg"],
    desc:"Colorful rainbow frame. Soft acetate, all-day comfort." },

  { id:34, forme: "Aviator", materiau: "Acetate", tab:"Luxury", category:"Women", name:"PILOT JR",  price:370, badge:null,
    colors:[COLORS.rose],
    images:["/images/x/e.jpg"],
    desc:"Junior pilot in lightweight metal. Anti-UV lenses for little adventurers." },

  { id:35, forme: "Cat Eye", materiau: "Acetate", tab:"Luxury", category:"Kids", name:"ROBO",      price:340, badge:"Fun",
    colors:[COLORS.black],
    images:["/images/f/c.jpg"],
    desc:"Futuristic robotic design. TR-90 ultra shock resistant." },

  { id:36, forme: "Oval", materiau: "Acetate", tab:"Luxury", category:"Kids", name:"FLOCON",    price:300, badge:null,
    colors:[COLORS.rose],
    images:["/images/f/b.jpg"],
    desc:"Soft oval for little girls. Flexible and secure temples." },
];

const TABS         = ["Optical", "Sun", "Luxury"];
const GENRES       = ["All", "Women", "Men", "Kids"];
const FORMES       = ["Aviator","Cat Eye","Oval","Butterfly","Rectangular","Round","Square"];
const MATERIAUX    = ["Acetate","Metal","Titanium","Plastic"];
const PRIX_OPTIONS = [["Under 350dh",[0,350]],["350dh–550dh",[350,550]],["Over 550dh",[550,999]]];
const SORT_OPTIONS = [["Featured","default"],["Price: Low to High","asc"],["Price: High to Low","desc"],["Name","name"]];

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

function QuickView({ product, onClose }) {
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  if (!product) return null;
  const currentImg = product.images?.[selColor] || product.images?.[0] || "";

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
    setAdded(true);
    setTimeout(() => navigate("/cart"), 500);
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
              <h2 className="text-xl font-bold text-[#292077] mb-2">{product.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>
              <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-widest mb-2">
                Color — <span className="font-normal normal-case text-gray-400">{product.colors[selColor].label}</span>
              </p>
              <div className="flex gap-2 mb-5">
                {product.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelColor(i)} title={c.label}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selColor === i ? "border-[#d4af37] scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c.hex }}/>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm">−</button>
                <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-sm">+</button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-[#292077]">{product.price}dh</span>
                <span className="text-sm text-gray-400">Total: {product.price * qty}dh</span>
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
  const currentImg = product.images?.[selColor] || product.images?.[0] || "";

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="flex flex-col cursor-pointer bg-white border border-gray-100 hover:border-[#d4af37]/30 rounded-xl p-3 transition-all duration-300"
      style={{ 
        transform: hovered ? "translateY(-8px) scale(1.02)" : "none",
        boxShadow: hovered ? "0 10px 20px -10px rgba(212, 175, 55, 0.2)" : "none"
      }}>

      <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: "4/3", marginBottom: 12 }}>
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#292077] text-white rounded-full text-[10px] px-2.5 py-0.5 font-bold">
            {product.badge}
          </span>
        )}
        <img src={currentImg} alt={product.name}
          className="w-full h-full object-contain p-2"
          style={{ transition: "transform .4s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex gap-1.5">
          {product.colors.map((c, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setSelColor(i); }}
              className="rounded-full border transition-transform hover:scale-125"
              style={{ width: 13, height: 13, backgroundColor: c.hex, borderColor: selColor === i ? "#d4af37" : "#d1d5db" }}/>
          ))}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggleFav(product.id); }} className="transition hover:scale-110 p-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "#d4af37" : "none"} stroke={isFav ? "#d4af37" : "#d1d5db"} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[13px] font-bold text-[#292077] tracking-wide">{product.name}</p>
        <p className="text-[13px] font-semibold text-[#d4af37]">{product.price}dh</p>
      </div>

      <button onClick={() => onQuickView(product)}
        className="mt-2 w-full bg-[#292077] text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#292077]/20 hover:bg-[#d4af37] flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
        Buy Now
      </button>
    </div>
  );
}

export default function Shop() {
  const [activeTab,  setActiveTab]  = useState("Optical");
  const [favorites,  setFavorites]  = useState([]);
  const [quickView,  setQuickView]  = useState(null);
  const [sortBy,     setSortBy]     = useState("default");
  const [fGenre,     setFGenre]     = useState([]);
  const [fFormes,    setFFormes]    = useState([]);
  const [fMat,       setFMat]       = useState([]);
  const [fPrix,      setFPrix]      = useState([]);
  const [fColors,    setFColors]    = useState([]);

  const toggleF = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const toggleFav = (id) => setFavorites(p => p.includes(id) ? p.filter(f=>f!==id) : [...p, id]);

  let list = productsData.filter(p => p.tab === activeTab);
  if (fGenre.length) list = list.filter(p => fGenre.includes(p.category));
  if (fFormes.length) list = list.filter(p => fFormes.includes(p.forme));
  if (fMat.length)    list = list.filter(p => fMat.includes(p.materiau));
  if (fColors.length) list = list.filter(p => p.colors.some(c => fColors.includes(c.label)));

  if (fPrix.length)  list = list.filter(p => fPrix.some(label => {
    if (label==="Under 350dh") return p.price < 350;
    if (label==="350dh–550dh")      return p.price >= 350 && p.price <= 550;
    if (label==="Over 550dh")  return p.price > 550;
    return true;
  }));

  if (sortBy==="asc")  list = [...list].sort((a,b) => a.price-b.price);
  if (sortBy==="desc") list = [...list].sort((a,b) => b.price-a.price);
  if (sortBy==="name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));

  const activeFilters = fGenre.length + fFormes.length + fMat.length + fPrix.length + fColors.length;

  return (
    <div className="bg-white min-h-screen font-sans pt-26">

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

      <div className="border-b border-gray-100 bg-white sticky z-20" style={{ top: 108 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className={`text-[13px] ${activeFilters > 0 ? "text-gray-700 font-semibold" : "text-gray-300"}`}>
              Filter {activeFilters > 0 && `(${activeFilters})`}
            </span>
            <FilterDropdown label="Colors" options={Object.values(COLORS).map(c=>c.label)} checked={fColors} onToggle={toggleF(setFColors)}/>
            <FilterDropdown label="Shapes" options={FORMES} checked={fFormes} onToggle={toggleF(setFFormes)}/>
            <FilterDropdown label="Materials" options={MATERIAUX} checked={fMat} onToggle={toggleF(setFMat)}/>
            <FilterDropdown label="Price" options={PRIX_OPTIONS.map(([l])=>l)} checked={fPrix} onToggle={toggleF(setFPrix)}/>
            <FilterDropdown label="Gender" options={GENRES.slice(1)} checked={fGenre} onToggle={toggleF(setFGenre)}/>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            Sort by <SortDropdown value={sortBy} onChange={setSortBy}/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <p className="text-[13px] text-gray-400 mb-6">{list.length} product{list.length!==1?"s":""}</p>
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300 gap-3">
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
            initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            {list.map(product => (
              <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <ProductCard product={product} onQuickView={setQuickView} onToggleFav={toggleFav} isFav={favorites.includes(product.id)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <CTA/>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}