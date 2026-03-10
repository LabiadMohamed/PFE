import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

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
desc: "Modern eyeglasses designed for everyday comfort and clear vision."
},
{
title: "Powerbeats Pro",
price: "$249.99",
img: gold,
desc: "Wireless high-performance earphones with up to 9 hours listening time."
},
{
title: "Classic Premium Glasses",
price: "$199.00",
img: glasse5,
desc: "Stylish and comfortable eyeglasses crafted with durable materials."
},
{
title: "Modern Smart Glasses",
price: "$299.00",
img: glasse3,
desc: "Elegant and lightweight glasses designed for everyday comfort."
},
{
title: "Elegant Vision Glasses",
price: "$245.00",
img: glasse11,
desc: "Premium lenses with modern frame."
},
{
title: "Luxury Vision Glasses",
price: "$605.00",
img: glasse4,
desc: "Luxury eyewear with high quality materials."
}
];

export default function Hero() {

return (

<section id="home" className="relative h-screen w-full overflow-hidden">

<Swiper
modules={[Mousewheel]}
loop={true}
mousewheel={{
  forceToAxis: true,   // only horizontal
  sensitivity: 0.5,
  releaseOnEdges: true
}}
slidesPerView={4}
speed={1500}
className="heroSwiper h-full"
>

{slides.map((slide, i) => (

<SwiperSlide key={i}>

<div className="slide-content">

<h2>{slide.title}</h2>

<p>{slide.desc}</p>

<div className="price">
{slide.price}
</div>

<button className="explore-btn">
<span>Explore Product</span>

<svg width="16" height="16" viewBox="0 0 16 16">
<path
d="M3.33334 12.6667L12.6667 3.33333M12.6667 3.33333H4.66667M12.6667 3.33333V11.3333"
stroke="currentColor"
strokeWidth="1.5"
strokeLinecap="round"
strokeLinejoin="round"
/>
</svg>

</button>

</div>

<div className="slide-img">
<img src={slide.img} />
</div>

<div className="slide-img-blur">
<img src={slide.img} />
</div>

</SwiperSlide>

))}

</Swiper>

</section>

);
}