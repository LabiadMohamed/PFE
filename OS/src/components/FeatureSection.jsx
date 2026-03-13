import { motion } from "motion/react";

export default function FeatureSection({imageSrc, title, description, reversed}) {
  return (
    <section className="py-24 md:py-32 px-4 overflow-hidden" id="features">
      <div className={`max-w-6xl mx-auto flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
        <motion.div 
          initial={{ opacity: 0, x: reversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full md:h-[600px] rounded-3xl flex items-center justify-center border border-black/5 overflow-hidden">
            {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title} 
              className=" w-full h-full object-cover rounded-3xl"
            />
          ) : (
          <span className="text-sm font-mono text-black/20 uppercase tracking-widest">
            {placeholderLabel}
          </span>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
        <div className="bg-white/30 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl text-center max-w-3xl mx-4">
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight"
          style={{ color: "#292077" }}
    >
          {title}
        </h2>
          <p className="text-lg md:text-xl text-apple-dark/60 leading-relaxed max-w-lg">
            {description}
          </p>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
