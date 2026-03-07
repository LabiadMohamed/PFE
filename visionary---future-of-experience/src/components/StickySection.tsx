import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const features = [
  {
    title: "Unmatched Clarity",
    description: "A custom micro-OLED display system features 23 million pixels, delivering stunning resolution and colors."
  },
  {
    title: "Spatial Audio",
    description: "Dual-driver audio pods positioned next to each ear deliver personalized sound while letting you hear what’s around you."
  },
  {
    title: "Revolutionary OS",
    description: "visionOS features a brand-new three-dimensional interface that you can control with your eyes, hands, and voice."
  },
  {
    title: "Dual-Chip Design",
    description: "A unique dual-chip design enables spatial experiences. The powerful M2 chip simultaneously runs visionOS."
  }
];

export default function StickySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-apple-dark text-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity }}
          className="w-[80%] max-w-4xl aspect-video rounded-[40px] placeholder-dark border border-white/10 flex items-center justify-center mb-12"
        >
          <span className="text-sm font-mono text-white/20 uppercase tracking-widest">
            Sticky Product Placeholder
          </span>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {features.map((feature, index) => (
            <FeatureText 
              key={index} 
              index={index} 
              total={features.length} 
              scrollYProgress={scrollYProgress}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureText({ index, total, scrollYProgress, title, description }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-4 text-center"
    >
      <h3 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h3>
      <p className="text-white/60 max-w-md mx-auto">{description}</p>
    </motion.div>
  );
}
