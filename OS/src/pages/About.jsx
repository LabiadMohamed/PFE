import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Star, Headphones, ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react';
import CTA from '../components/CTA';

const About = () => {
  // داتا ديال المؤسسين بـ 4 (الستيل اللي عجبك)
  const founders = [
    { name: "Founder Name 1", role: "Creative Lead", img: "/images/rev/aa.jpeg", bio: "Defining the visual aesthetic of modern eyewear." },
    { name: "Founder Name 2", role: "Optical Expert", img: "/images/rev/bb.jpeg", bio: "Ensuring medical precision in every single lens." },
    { name: "Founder Name 3", role: "Operations", img: "/images/rev/cc.jpeg", bio: "Managing the gold standard of our supply chain." },
    { name: "Founder Name 4", role: "Style Advisor", img: "/images/rev/dd.jpeg", bio: "Helping you find the frame that tells your story." },
  ];

  // داتا ديال Why Choose Us
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: "Premium Quality",
      desc: "High-grade Acetate and Titanium frames built for longevity."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#d4af37]" />,
      title: "Optical Precision",
      desc: "Lenses fitted with medical accuracy by certified professionals."
    },
    {
      icon: <Star className="w-6 h-6 text-[#d4af37]" />,
      title: "Unique Design",
      desc: "Limited collections curated for unique face shapes."
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#d4af37]" />,
      title: "24/7 Support",
      desc: "Dedicated team for styling advice and after-sales care."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- Section 1: How Are We? (Introduction) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-[#d4af37] font-bold text-sm capitalize tracking-[0.3em] mb-4"></h2>
            <h1 className="text-6xl md:text-8xl font-black text-[#292077] capitalize leading-[0.9] tracking-tighter mb-8">
              How Are <br />
              <span className="text-[#d4af37] capitalize">We?</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed border-l-4 border-[#d4af37] pl-6 max-w-2xl">
              OptiStyle is a collective of four visionaries. We started with a simple question: Why settle for generic when you can have exceptional? We bridge the gap between optical health and high-fashion.
            </p>
          </motion.div>
          <div className="absolute -top-10 -right-10 text-[180px] font-black text-gray-50 opacity-[0.04] select-none pointer-events-none uppercase hidden lg:block">
            Vision
          </div>
        </div>
      </section>

      {/* --- Section 2: THE FOUNDERS (الستيل اللي عجبك ديال التصاور) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl font-black text-[#292077] uppercase tracking-tighter">The Visionaries</h2>
          <div className="h-px flex-1 bg-gray-100 mx-8 hidden md:block mb-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gray-100 shadow-sm">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.6]"
                  onError={(e) => e.target.src = "https://via.placeholder.com/600x800?text=Founder+Photo"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292077]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-[#d4af37]" />
                    <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-[#d4af37]" />
                    <Mail className="w-5 h-5 text-white cursor-pointer hover:text-[#d4af37]" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#292077] mb-1">{member.name}</h3>
              <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Why Choose Us? --- */}
      <section className="bg-gray-50 py-32 mb-32 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#292077]/5 rounded-full -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-[#d4af37] uppercase tracking-[0.4em] mb-4">Commitment</h2>
            <h3 className="text-5xl font-black text-[#292077]">Why Choose Us?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#292077]/10 transition-all group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#292077] transition-all duration-300">
                  <div className="group-hover:text-white group-hover:scale-110 transition-all">
                    {reason.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[#292077] mb-4">{reason.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 bg-[#292077] rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[#292077]/30"
          >
             <h3 className="text-3xl md:text-4xl font-bold mb-6">Experience the difference.</h3>
             <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                We combine Moroccan hospitality with global standards to provide you with the best eyewear experience in the kingdom.
             </p>
             <button className="bg-[#d4af37] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-white hover:text-[#292077] transition-all group">
                Browse Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
        </div>
      </section>

      <CTA />
      
    </div>
  );
};

export default About;