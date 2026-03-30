import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import CTA from "../components/CTA";

const TEAM = [
  {
    name: "Aya Lahrar",
    role: "Co-Founder & Lead Designer",
    email: "aya.lahrar@optistyle.com",
    phone: "+212 600 000 001",
    image: "https://ui-avatars.com/api/?name=Aya+Lahrar&background=292077&color=fff&size=200"
  },
  {
    name: "Amine Ressa",
    role: "Chief Technology Officer",
    email: "amine.ressa@optistyle.com",
    phone: "+212 600 000 002",
    image: "https://ui-avatars.com/api/?name=Amine+Ressa&background=d4af37&color=fff&size=200"
  },
  {
    name: "Labiad Mohamed",
    role: "Head of Operations",
    email: "labiad.mohamed@optistyle.com",
    phone: "+212 600 000 003",
    image: "https://ui-avatars.com/api/?name=Labiad+Mohamed&background=292077&color=fff&size=200"
  },
  {
    name: "Bennay Aymane",
    role: "Marketing Director",
    email: "bennay.aymane@optistyle.com",
    phone: "+212 600 000 004",
    image: "https://ui-avatars.com/api/?name=Bennay+Aymane&background=d4af37&color=fff&size=200"
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
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-[#292077] hover:text-white transition-colors shadow-sm">
                <Github className="w-4 h-4" />
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
