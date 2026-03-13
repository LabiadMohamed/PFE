import React from 'react';
// Note: You can replace these with your preferred icon library like Lucide or FontAwesome
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const colors = {
    navy: '#292077',
    gold: '#dfb83a',
    white: '#ffffff'
  };

  return (
    <footer style={{ backgroundColor: colors.navy }} className="w-full text-white pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Strange SEO Keyword Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 style={{ color: colors.gold }} className="text-3xl font-bold mb-4 tracking-tight">
            OptiStyle
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Discover our collection of <span className="font-semibold italic text-white">Opti-Curated Artifacts</span>. 
            We don't just sell glasses; we engineer your visual identity.
          </p>
          <div className="flex space-x-5">
            <a href="#" style={{ color: colors.gold }} className="hover:opacity-80 transition-opacity"><Instagram size={20} /></a>
            <a href="#" style={{ color: colors.gold }} className="hover:opacity-80 transition-opacity"><Facebook size={20} /></a>
            <a href="#" style={{ color: colors.gold }} className="hover:opacity-80 transition-opacity"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Navigation Columns */}
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Collections</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gold transition-colors">Bespoke Frames</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Blue-Light Series</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Limited Editions</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Virtual Try-On</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Client Care</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gold transition-colors">Shipping Logistics</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Returns & Refitting</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Vision Guide</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Stay Visionary</h4>
          <p className="text-xs text-gray-400 mb-4">Join our inner circle for early access to new drops.</p>
          <div className="flex border-b border-gray-500 py-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-none text-sm w-full focus:outline-none placeholder-gray-500"
            />
            <button style={{ color: colors.gold }}><Mail size={18} /></button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
        <p>© 2026 OptiStyle Inc. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sales Policy</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}