import React from 'react';
import { Link } from 'react-router-dom';
import g4 from "../assets/g4.jpeg"
import g2 from "../assets/g2.jpeg"
import g1 from "../assets/g1.jpeg"
import glass13 from "../assets/glass13.jpeg"

// 1. Added 'path' to the props destructuring here
const CategoryCard = ({ title, image, alt, path }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl">
      <div className="aspect-[4/5] w-full bg-gray-100">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
        <Link 
          to={path} // Now 'path' is defined!
          className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg text-sm md:text-base hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default function Visionary() {
  const categories = [
    { title: " Eyeglasses", 
      image: g4, 
      alt: "Eyeglasses", 
      path: "/eyeglasses" 
    },
    { title: "Prescription sunglasses", 
      image: g2, 
      alt: "Sunglasses", 
      path: "/sunglasses" 
    },
    { title: "luxury Glasses", 
      image: glass13, 
      alt: "luxury Glasses", 
      path: "/contacts" 
    },
    { title: "Eye exams", 
      image: g1, 
      alt: "Eye examination", 
      path: "/exams" 
    },
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-12">
      <h2 className="text-4xl text-[#292077] md:text-5xl font-serif text-center mb-12 ">
      Discover <span className="text-[#dfb83a]">Every Category</span> Designed for You
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index}
            title={category.title}
            image={category.image}
            alt={category.alt}
            path={category.path} // 2. Added this line to pass the path!
          />
        ))}
      </div>
    </section>
  );
}