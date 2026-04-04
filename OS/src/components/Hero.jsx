import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowRight } from "react-icons/fi";
import { Mousewheel, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "../heroSlider.css";

import glasse4 from "../assets/ee.png";
import glasse3 from "../assets/c.png";
import glasse5 from "../assets/h.png";
import glasse11 from "../assets/bbb.png";
import gold from "../assets/aaaa.png";
import glasse15 from "../assets/cs.png";

const slides = [
  {
    title: "VisionComfort Pro",
    price: "$279.00",
    img: glasse15,
    desc: "Modern eyeglasses designed for everyday comfort and clear vision.",
  },
  {
    title: "Powerbeats Pro",
    price: "$249.99",
    img: gold,
    desc: "Wireless high-performance earphones with up to 9 hours listening time.",
  },
  {
    title: "Classic Premium Glasses",
    price: "700.00 dh",
    img: glasse5,
    desc: "Stylish and comfortable eyeglasses crafted with durable materials.",
  },
  {
    title: "Modern Smart Glasses",
    price: "299.00 dh",
    img: glasse3,
    desc: "Elegant and lightweight glasses designed for everyday comfort.",
  },
  {
    title: "Elegant Vision Glasses",
    price: "245.00 dh",
    img: glasse11,
    desc: "Premium lenses with modern frame.",
  },
  {
    title: "Luxury Vision Glasses",
    price: "605.00 dh",
    img: glasse4,
    desc: "Luxury eyewear with high quality materials.",
  },
];

export default function Hero() {
  return (
    <section
  id="home"
  className="relative md:mt-32 mt-20 lg:mt-0 h-screen bg-white w-full overflow-hidden flex items-center justify-between flex-col lg:flex-row"
>

  {/* TEXT */}
  <div className="z-10 max-w-md px-6 lg:px-0 text-center lg:text-left lg:absolute lg:left-20">
    
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase leading-tight mb-6 text-[#292077]">
      DISCOVER <span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal">Premium Eyewear</span> <br/>
      
    </h1>

    <p className="mt-6 mb-8 text-lg text-gray-600 italic font-serif leading-relaxed px-4 border-l-4 border-[#d4af37] inline-block text-left">
      "Shop modern eyeglasses and luxury frames crafted for comfort,
      durability, and crystal-clear vision. Explore designer glasses
      that elevate your everyday style."
    </p>

    <Link
      to="/shop"
      className="inline-flex items-center gap-3 px-8 py-4 bg-[#292077] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[#d4af37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-300 group"
    >
      Explore Collection
      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>

  </div>

  {/* SLIDER */}
  <Swiper
    modules={[Mousewheel, Autoplay]}
    loop={true}
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
    mousewheel={{
      forceToAxis: true,
      sensitivity: 0.5,
      releaseOnEdges: true,
    }}
    speed={800}
    className="heroSwiper h-full w-full"

    breakpoints={{
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    }}
    
  >
    {slides.map((slide, i) => (
      <SwiperSlide key={i}>
        <div className="slide-img">
          <img src={slide.img} alt={slide.title} />
        </div>

        <div className="slide-img-blur">
          <img src={slide.img} alt={`${slide.title} blurred`} />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  

</section>
  );
}