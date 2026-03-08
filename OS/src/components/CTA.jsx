import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-32 px-4 bg-apple-gray" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight mb-12"
        >
          The future is here.<br />
          Experience Visionary.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            onClick={() => window.location.href = "/buy"} // navigate to buy page
          >
            Buy Now
          </button>
          <p className="text-apple-dark/60 text-sm">
            
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-black/5 text-[12px] text-apple-dark/40 flex flex-col md:flex-row justify-between gap-4"
        >
          <p>© 2026 OptiStyle Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-apple-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-apple-dark transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-apple-dark transition-colors">Sales Policy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
