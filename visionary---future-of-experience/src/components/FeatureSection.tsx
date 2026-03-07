import { motion } from "motion/react";

interface FeatureProps {
  title: string;
  description: string;
  reversed?: boolean;
  placeholderLabel: string;
}

export default function FeatureSection({ title, description, reversed, placeholderLabel }: FeatureProps) {
  return (
    <section className="py-24 md:py-32 px-4 overflow-hidden">
      <div className={`max-w-6xl mx-auto flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
        <motion.div 
          initial={{ opacity: 0, x: reversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full aspect-square md:aspect-video rounded-3xl placeholder-gradient flex items-center justify-center border border-black/5"
        >
          <span className="text-sm font-mono text-black/20 uppercase tracking-widest">
            {placeholderLabel}
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-apple-dark/60 leading-relaxed max-w-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
