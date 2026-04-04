import React, { useState } from 'react';
import { Quote, Star, ShieldCheck, CreditCard, Shield, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Ressa Mohamed Amine.",
    image: "/images/rev/a.jpeg",
    text: "Absolutely stunning glasses. The attention to detail and optical clarity is unlike anything I've experienced before.",
    verified: true
  },
  {
    id: 2,
    name: "Mohamed Labiad.",
    image: "/images/rev/b.jpeg",
    text: "The delivery was incredibly fast and the packaging itself felt like a luxury unboxing experience.",
    verified: true
  },
  {
    id: 3,
    name: "Aya Lahrar.",
    image: "/images/rev/c.jpeg",
    text: "Perfect fit from day one. These frames exude elegance without compromising on daily comfort.",
    verified: true
  },
  {
    id: 4,
    name: "Ayman Benai.",
    image: "/images/rev/d.jpeg",
    text: "A truly premium brand. The golden accents on my new shades are breathtaking and completely durable.",
    verified: true
  },
  {
    id: 5,
    name: "Douae maauoch.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    text: "Their customer service is peerless. The bespoke style of Optistyle Premium sets a new standard for optical fashion.",
    verified: true
  }
];

const Gallery = () => {
  const [reviews, setReviews] = useState(REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;
    
    const newReview = {
      id: Date.now(),
      name: newName,
      image: "https://ui-avatars.com/api/?name=" + encodeURIComponent(newName) + "&background=d4af37&color=fff",
      text: newText,
      verified: true
    };
    
    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewText('');
    setShowForm(false);
  };

  // Simple CSS snippet attached here so we don't rely strictly on tailwind.config overrides
  const inlineStyles = `
    @keyframes infinite-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-340px * 5)); }
    }
    
    .animate-infinite-scroll {
      display: flex;
      width: max-content;
      animation: infinite-scroll 35s linear infinite;
    }
    
    .animate-infinite-scroll:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <section className="bg-white py-20 overflow-hidden relative font-sans text-gray-900 border-t border-b border-gray-100">
      <style>{inlineStyles}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h4 className="text-[#292077] font-black text-sm tracking-[0.3em] uppercase mb-4">
          CLIENT <span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal">Excellence</span>
        </h4>
        <h2 className="text-4xl md:text-5xl font-black text-[#292077] tracking-wider uppercase mb-6 drop-shadow-sm">
          CUSTOMER <span className="text-[#d4af37] italic font-serif capitalize font-normal tracking-normal">Reviews</span>
        </h2>
        <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full mb-8"></div>

        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#292077] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] transition-colors shadow-lg shadow-[#292077]/20"
        >
          {showForm ? "Cancel" : "Add Your Review"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto bg-gray-50 p-6 rounded-3xl shadow-inner border border-gray-100 text-left transition-all">
            <div className="mb-4">
              <label className="block text-[#292077] font-bold text-sm mb-2 uppercase tracking-wide">Your Name</label>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#d4af37] transition-colors font-medium text-[#292077]" placeholder="e.g. John D." />
            </div>
            <div className="mb-6">
              <label className="block text-[#292077] font-bold text-sm mb-2 uppercase tracking-wide">Your Experience</label>
              <textarea value={newText} onChange={(e) => setNewText(e.target.value)} required rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#d4af37] transition-colors resize-none font-medium text-[#292077]" placeholder="Share your thoughts..."></textarea>
            </div>
            <button type="submit" className="w-full bg-[#d4af37] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#292077] transition-colors shadow-lg shadow-[#d4af37]/30">Submit Review</button>
          </form>
        )}
      </div>

      {/* Slider Container with Gradient Overlays */}
      <div className="relative w-full max-w-[1600px] mx-auto group">
        
        {/* Left Gradient Overlay */}
        <div className="absolute top-0 left-0 h-full w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scroll Track */}
        <div className="overflow-hidden py-8">
          <div className="animate-infinite-scroll gap-10 px-4">
            
            {/* Render items multiple times for seamless looping */}
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div 
                key={`${review.id}-${index}`} 
                className="w-[300px] h-[380px] bg-white rounded-2xl p-8 flex flex-col relative transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-[15px] hover:shadow-[0_25px_50px_-12px_rgba(41,32,119,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 border-b-4 border-b-[#d4af37] flex-shrink-0 group"
              >
                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-[#292077]/10 absolute top-8 right-6 group-hover:text-[#292077]/20 transition-colors" />

                {/* Review Text */}
                <p className="flex-1 text-lg font-bold text-gray-800 leading-relaxed italic relative z-10 overflow-hidden line-clamp-4">
                  "{review.text}"
                </p>

                {/* Profile Section */}
                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37] p-0.5"
                    />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <CheckCircle className="w-5 h-5 text-green-500 fill-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#292077] text-lg leading-tight">{review.name}</h3>
                    {review.verified && <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Verified Buyer</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Gradient Overlay */}
        <div className="absolute top-0 right-0 h-full w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      </div>

      {/* Trust Badges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-[#292077]/5 flex items-center justify-center mb-6 text-[#292077] hover:bg-[#292077] hover:text-white transition-colors duration-300">
              <Shield className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#292077] uppercase tracking-wider mb-3">Secure Shopping</h3>
            <p className="text-gray-500 font-medium">Your data and payments are secured directly by top-tier encryption algorithms.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-[#292077]/5 flex items-center justify-center mb-6 text-[#292077] hover:bg-[#292077] hover:text-white transition-colors duration-300">
              <Star className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#292077] uppercase tracking-wider mb-3">Premium Quality</h3>
            <p className="text-gray-500 font-medium">Optistyle frames are built with impeccable attention to precision and durable perfection.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-[#292077]/5 flex items-center justify-center mb-6 text-[#292077] hover:bg-[#292077] hover:text-white transition-colors duration-300">
              <CreditCard className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#292077] uppercase tracking-wider mb-3">Secure Payments</h3>
            <p className="text-gray-500 font-medium">We accept all major payment methods including Visa, MasterCard, PayPal, and Apple Pay.</p>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default Gallery;