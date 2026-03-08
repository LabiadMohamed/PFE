import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import g1 from "../assets/g1.jpeg"
import g2 from "../assets/g2.jpeg"
import g4 from "../assets/g4.jpeg"

export default function ImageCarousel() {

    const images = [g1, g2,g4]

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard arrows
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const getIndex = (i) => {
    return (index + i + images.length) % images.length;
  };
return (
    <section className="w-full flex flex-col items-center py-24">

        {/* Heading */}
    <h2 className="text-5xl font-semibold jus  mb-20">
        Take a closer look
    </h2>

      {/* Carousel */}
    <div className="relative flex items-center justify-center gap-6">

        {/* Left image */}
        <motion.img
        key={getIndex(-1)}
        src={images[getIndex(-1)]}
        className="w-[240px] h-[340px] object-cover rounded-xl opacity-60"
        animate={{ scale: 0.8 }}
        transition={{ duration: 0.5 }}
        />

        {/* Center image */}
        <motion.img
        key={getIndex(0)}
        src={images[getIndex(0)]}
        className="w-[360px] h-[460px] object-cover rounded-3xl shadow-xl"
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        />

        {/* Right image */}
        <motion.img
        key={getIndex(1)}
        src={images[getIndex(1)]}
        className="w-[240px] h-[340px] object-cover rounded-xl opacity-60"
        animate={{ scale: 0.8 }}
        transition={{ duration: 0.5 }}
        />

    </div>

      {/* Arrow controls */}
        <div className="flex gap-10 mt-10">

        <button
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white"
        >
            <ChevronLeft size={22}/>
        </button>

        <button
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white"
        >
          <ChevronRight size={22}/>
        </button>

      </div>

    </section>
  );
}