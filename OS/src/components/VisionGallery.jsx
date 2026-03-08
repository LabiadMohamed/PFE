import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import g1 from "../assets/g1.jpeg"
import g2 from "../assets/g2.jpeg"
import g4 from "../assets/g4.jpeg"

export default function CloserLook() {

  const images = [g1, g2,  g4]

  const [index, setIndex] = useState(0);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-32 bg-white">

      {/* Heading */}
      <h2 className="text-5xl font-semibold text-center mb-20">
        Take a closer look
      </h2>

      <div className="flex justify-center items-center gap-10">

        {/* Left preview images */}
        <div className="flex flex-col gap-6">
          {images.slice(1,3).map((img, i) => (
            <HoverImage 
              key={i} 
              src={img} 
              onClick={() => setIndex(i + 1)} 
            />
          ))}
        </div>

        {/* Main image */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="w-[420px] h-[520px] rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src={images[index]}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right preview image */}
        <div className="flex flex-col gap-6">
          {images.slice(3,4).map((img, i) => (
            <HoverImage 
              key={i} 
              src={img} 
              onClick={() => setIndex(3)} 
            />
          ))}
        </div>

        {/* Arrow controls */}
        <div className="flex flex-col gap-4 ml-6">

          <button
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white"
          >
            <ChevronUp size={22}/>
          </button>

          <button
            onClick={next}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white"
          >
            <ChevronDown size={22}/>
          </button>

        </div>

      </div>

    </section>
  );
}


function HoverImage({ src, onClick }) {

  return (
    <div
      onClick={onClick}
      className="w-[160px] h-[200px] rounded-xl overflow-hidden shadow-md cursor-pointer group"
    >
      <img
        src={src}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
}