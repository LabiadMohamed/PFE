import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass h-12 flex items-center justify-center px-4"
    >
      <div className="max-w-5xl w-full flex items-center justify-between text-[12px] font-medium opacity-80">
        <div className="flex items-center gap-8">
          <a href="#" className="hover:opacity-100 transition-opacity">Visionary</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Overview</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Tech Specs</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Compare</a>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] hover:bg-blue-700 transition-colors">
          Buy Now
        </button>
      </div>
    </motion.nav>
  );
}
