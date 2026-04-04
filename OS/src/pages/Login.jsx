import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Shield, Sparkles, User, Briefcase, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import clientBg from "../assets/ay.jpeg";
import vendorBg from "../assets/g4.jpeg";

const Login = () => {
  const [role, setRole] = useState('client'); // 'client' | 'vendor'
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const bgImage = role === 'client' ? clientBg : vendorBg;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden bg-[#0a0a0c] font-sans">
      
      {/* Background with Motion Blur Transition */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={role}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Heavy dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-[#292077]/50 to-[#0a0a0c]/90" />
        </motion.div>
      </AnimatePresence>

      <Link to="/" className="absolute top-8 left-8 z-50 text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold tracking-widest uppercase font-sans"></span>
      </Link>

      {/* The Elite Card: Spring Elastic Slide-Up */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, mass: 1.1 }}
        className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        
        {/* LEFT PANEL: Branding (45%) */}
        <div className="w-full md:w-[45%] p-8 md:p-10 lg:p-14 bg-black/50 backdrop-blur-md flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          
          <div className="space-y-4">
            {/* 3D Floating Logo */}
            <motion.div 
              whileHover={{ rotateX: 15, rotateY: 15, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 rounded-2xl bg-[#d4af37] flex items-center justify-center shadow-[0_10px_30px_rgb(212,175,55,0.3)] cursor-pointer border border-[#d4af37]/50"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>

            {/* Massive Heading with MANDATORY Dual-Tone Styling */}
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-white font-sans leading-[1.05] tracking-tight mt-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
              {isLogin ? (
                <>WELCOME <br /><span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal drop-shadow-none">back!</span></>
              ) : (
                <>HELLO, <br /><span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal drop-shadow-none">Welcome!</span></>
              )}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-sm font-sans">
              Enter the exclusive portal for our esteemed {role === 'client' ? 'clients' : 'partners'}. Experience eyewear luxury uninterrupted.
            </p>
          </div>

          {/* Social Proof Avatars */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#292077] bg-gray-300 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-white/90 text-[13px] font-sans font-medium hover:text-[#d4af37] transition-colors cursor-default">
              Join <span className="text-[#d4af37] font-bold">10,000+</span> visionaries.
            </div>
          </div>
          
        </div>

        {/* RIGHT PANEL: Form (55%) */}
        <div className="w-full md:w-[55%] bg-white p-8 md:p-10 lg:p-14 flex flex-col justify-center relative">
          
          {/* Dual-Tone Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-black uppercase text-[#292077] font-sans tracking-wider mb-2 drop-shadow-sm">
              {isLogin ? (
                <>LOGIN <br className="hidden md:block"/><span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal drop-shadow-none"></span></>
              ) : (
                <>REGISTRATION <br className="hidden md:block"/><span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal drop-shadow-none">Portal</span></>
              )}
            </h1>
            <p className="text-gray-500 font-sans mt-2 text-sm md:text-base">
              {isLogin ? 'Access your personalized Optistyle dashboard.' : 'Begin your journey with luxury eyewear.'}
            </p>
          </div>

          {/* Role Switcher Pill (Active background #292077) */}
          <div className="relative flex bg-gray-100 p-1 rounded-full mb-6 w-full mx-auto md:mx-0 shadow-inner">
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#292077] rounded-full shadow-md"
              animate={{ left: role === 'client' ? '4px' : 'calc(50%)' }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
            <button 
              type="button"
              onClick={() => setRole('client')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest font-sans transition-colors duration-300 ${role === 'client' ? 'text-white' : 'text-gray-400 hover:text-[#292077]'}`}
            >
              <User className="w-3.5 h-3.5" /> Client
            </button>
            <button 
              type="button"
              onClick={() => setRole('vendor')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest font-sans transition-colors duration-300 ${role === 'vendor' ? 'text-white' : 'text-gray-400 hover:text-[#292077]'}`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Partner
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative group pt-2 pb-1 border-b-2 border-gray-200 focus-within:border-[#d4af37] transition-colors duration-300"
                >
                  <div className="absolute bottom-3 left-0 flex items-center text-[#d4af37] transition-colors duration-300">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    className="w-full pl-9 pr-3 py-1.5 bg-transparent outline-none text-[#292077] font-semibold font-sans transition-colors placeholder:text-gray-400 placeholder:font-medium text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="relative group pt-2 pb-1 border-b-2 border-gray-200 focus-within:border-[#d4af37] transition-colors duration-300">
              <div className="absolute bottom-3 left-0 flex items-center text-[#d4af37] transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address / ID" 
                className="w-full pl-9 pr-3 py-1.5 bg-transparent outline-none text-[#292077] font-semibold font-sans transition-colors placeholder:text-gray-400 placeholder:font-medium text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative group pt-2 pb-1 border-b-2 border-gray-200 focus-within:border-[#d4af37] transition-colors duration-300">
              <div className="absolute bottom-3 left-0 flex items-center text-[#d4af37] transition-colors duration-300">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full pl-9 pr-10 py-1.5 bg-transparent outline-none text-[#292077] font-semibold font-sans transition-colors placeholder:text-gray-400 placeholder:font-medium text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-3 right-0 flex items-center text-gray-400 hover:text-[#d4af37] transition-colors px-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Helpers */}
            <AnimatePresence>
              {isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between text-[13px] mt-4 font-sans"
                >
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-[#d4af37] flex items-center justify-center transition-colors relative bg-white">
                      <input type="checkbox" className="peer w-full h-full absolute opacity-0 cursor-pointer" />
                      <div className="w-3 h-3 rounded-[2px] bg-[#d4af37] scale-0 peer-checked:scale-100 transition-transform duration-300" />
                    </div>
                    <span className="text-gray-500 font-medium group-hover:text-[#292077] transition-colors">Remember Access</span>
                  </label>
                  
                  <a href="#" className="font-bold text-[#292077] hover:text-[#d4af37] transition-colors underline-offset-4 hover:underline">
                    Lost Credentials?
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button with Continuous Shine Effect */}
            <button 
              type="submit" 
              className="group relative w-full mt-6 bg-[#292077] text-white py-3 rounded-lg text-sm font-black font-sans uppercase tracking-widest overflow-hidden shadow-lg hover:shadow-[#292077]/40 hover:-translate-y-1 transition-all duration-300 mb-2"
            >
              <motion.div 
                className="absolute inset-0 bg-white/30 translate-x-[-150%] skew-x-[-45deg]"
                animate={{ translateX: ['-150%', '250%'] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLogin ? `Sign In ${role === 'vendor' ? 'as Partner' : ''}` : 'Create Account'}
              </span>
            </button>

            {/* Toggle Login/Register */}
            <div className="text-center mt-6 font-sans">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 font-medium text-sm hover:text-[#292077] transition-colors"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="font-black text-[#d4af37] uppercase tracking-wider">{isLogin ? "Register" : "Sign In"}</span>
              </button>
            </div>

          </form>

          {/* Bottom Security Badge */}
          <div className="mt-8 flex items-center justify-center md:justify-start gap-3 text-[#d4af37] text-xs font-bold uppercase tracking-widest absolute bottom-6 md:bottom-10 left-0 right-0 md:left-14 lg:left-20">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-5 h-5" />
            </motion.div>
            <span className="font-sans">Encrypted & Secure</span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default Login;