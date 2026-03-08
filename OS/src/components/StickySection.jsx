import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import g1 from "../assets/g1.jpeg";
import g2 from "../assets/g2.jpeg";
import g4 from "../assets/g4.jpeg";
import glass13 from "../assets/glass13.jpeg";

const features = [
  { title: "Unmatched Clarity", description: "A custom micro-OLED display system features 23 million pixels, delivering stunning resolution and colors.", 
    image: g1 },
  { title: "Spatial Audio", description: "Dual-driver audio pods positioned next to each ear deliver personalized sound while letting you hear what’s around you.", 
    image: g2 },
  { title: "Revolutionary OS", description: "visionOS features a brand-new three-dimensional interface that you can control with your eyes, hands, and voice.",
    image: g4 },
  { title: "Dual-Chip Design", description: "A unique dual-chip design enables spatial experiences. The powerful M2 chip simultaneously runs visionOS."
      , image: glass13
  }
];

export default function StickySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const total = features.length;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-apple-dark text-white">
      <div className="sticky top-10 h-screen flex items-center justify-center">
        <div className="w-[80%] max-w-4xl aspect-video rounded-[40px] overflow-hidden border border-white/10 relative">
          {features.map((feature, index) => {
            const start = index / total;
            const end = (index + 1) / total;

            // opacity for each image individually
            const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

            // optional: small scale effect per image
            const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

            return (
              <motion.img
                key={index}
                src={feature.image}
                alt={feature.title}
                style={{ opacity, scale }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}