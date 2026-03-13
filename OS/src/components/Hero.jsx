import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowRight } from "react-icons/fi";
import { Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "../heroSlider.css";

import glasse4 from "../assets/img1.png";
import glasse3 from "../assets/img2.png";
import glasse5 from "../assets/img3.png";
import glasse11 from "../assets/img4.png";
import gold from "../assets/img6.png";
import glasse15 from "../assets/img5.png";

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
    price: "$199.00",
    img: glasse5,
    desc: "Stylish and comfortable eyeglasses crafted with durable materials.",
  },
  {
    title: "Modern Smart Glasses",
    price: "$299.00",
    img: glasse3,
    desc: "Elegant and lightweight glasses designed for everyday comfort.",
  },
  {
    title: "Elegant Vision Glasses",
    price: "$245.00",
    img: glasse11,
    desc: "Premium lenses with modern frame.",
  },
  {
    title: "Luxury Vision Glasses",
    price: "$605.00",
    img: glasse4,
    desc: "Luxury eyewear with high quality materials.",
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative h-screen bg-white w-full overflow-hidden flex items-center justify-between">

      {/* STATIC TEXT */}
    
      <div className="absolute left-20 z-10 max-w-md">
      
        <h1 className="text-5xl font-bold  leading-tight"style={{ color: "#292077" }}>
            Discover <span className="text-[#dfb83a]">Premium Eyewear</span> & Stylish Glasses
        </h1>

        <p className="mt-4 text-gray-600">
            Shop modern eyeglasses and luxury frames crafted for comfort, 
            durability, and crystal-clear vision. Explore designer glasses 
            that elevate your everyday style.
        </p>

        <Link
          to="/products"
          className="explore-btn mt-6 border inline-flex items-center gap-2 px-4 py-2 text-[#4b45ef] font-semibold hover:text-[#2e05b8] hover:border-[#2e05b8] transition-colors duration-300"
        >
          Explore Product
          <FiArrowRight className="w-4 h-4" />
        </Link>

      </div>

      {/* IMAGE SLIDER */}
      <Swiper
        modules={[Mousewheel]}
        loop={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.5,
          releaseOnEdges: true,
        }}
        slidesPerView={4}
        speed={1500}
        className="heroSwiper h-full"
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