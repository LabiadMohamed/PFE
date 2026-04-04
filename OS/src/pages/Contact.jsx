import React from "react";
import { Mail, Phone, Linkedin,  } from "lucide-react";
import CTA from "../components/CTA";

const TEAM = [
  {
    name: "Amine Ressa",
    role: "Co-Founder & Lead Designer",
    email: "amine.ressa@optistyle.com",
    phone: "+212 649 685 851",
    image: "/images/rev/cc.jpeg"
  },
  {
    name: "Aya Lahrar",
    role: "Chief Technology Officer",
    email: "aya.lahrar@optistyle.com",
    phone: "+212 606 209 239",
    image: "/images/rev/aa.jpeg"
  },
  {
    name: "Mohamed Labiad",
    role: "Head of Operations",
    email: "labiad.mohamed@optistyle.com",
    phone: "+212 706 045 440",
    image: "/images/rev/bb.jpeg"
  },
  {
    name: "Ayman Benai ",
    role: "Marketing Director",
    email: "benai.ayman@optistyle.com",
    phone: "+212 617 665 299",
    image: "/images/rev/dd.jpeg"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-sans">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h4 className="text-[#d4af37] font-black text-sm tracking-[0.3em] uppercase mb-4">
          Get in Touch
        </h4>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-[#292077]">
          Contact <span className="text-[#d4af37] italic font-serif capitalize font-normal">Our Team</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          The leadership team at OptiStyle is dedicated to redefining luxury eyewear. 
          Reach out to our founders and directors for partnerships, support, or general inquiries.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {TEAM.map((member, index) => (
          <div key={index} className="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            
            <div className="w-32 h-32 mx-auto rounded-full p-1 bg-white border-2 border-[#d4af37] mb-6 shadow-md group-hover:scale-105 transition-transform">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <h3 className="text-xl font-black text-[#292077] mb-1">{member.name}</h3>
            <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-6">{member.role}</p>
            
            <div className="space-y-3">
              <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-3 text-sm text-gray-500 hover:text-[#292077] transition-colors font-medium">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                {member.email}
              </a>
              <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-3 text-sm text-gray-500 hover:text-[#292077] transition-colors font-medium">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                {member.phone}
              </a>
            </div>

            <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-[#292077] hover:text-white transition-colors shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
             
            </div>
            
          </div>
        ))}
      </div>

      {/* Corporate Info removed as requested */}

      <CTA />
    </div>
  );
}
