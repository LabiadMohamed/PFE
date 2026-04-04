import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User } from 'lucide-react';

const Comments = () => {
  const [comments, setComments] = useState([
    { id: 1, name: "Mohamed amine ressa .", text: "Absolutely love the new collection! The frames are unmatched.", date: "2 hours ago" },
    { id: 2, name: "Mohamed labiad.", text: "The Titanium frames are lighter than I expected. Great purchase.", date: "1 day ago" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;
    
    const comment = {
      id: Date.now(),
      name: name,
      text: newComment,
      date: "Just now"
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
    setName("");
  };

  return (
    <section className="py-20 px-4 bg-gray-50 font-sans" id="comments">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#292077] uppercase mb-4">
            Customer <span className="text-[#d4af37] italic font-serif capitalize font-normal">Feedback</span>
          </h2>
          <p className="text-gray-500 font-medium">Join the conversation and share your Optistyle experience.</p>
        </div>

        {/* Comment Form */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#292077] shrink-0">
                <User strokeWidth={2.5} className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-bold text-[#292077]"
                required
              />
            </div>
            <textarea 
              placeholder="What are your thoughts?" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-[#292077] resize-none min-h-[120px]"
              required
            />
            <div className="flex justify-end mt-2">
              <button 
                type="submit" 
                className="group flex items-center gap-3 bg-[#292077] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/40"
              >
                Post Comment
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex gap-5 group hover:border-[#292077]/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#292077]/5 flex items-center justify-center text-[#292077] font-black shrink-0 group-hover:bg-[#292077] group-hover:text-white transition-colors text-lg">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="mt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-[#292077] text-lg leading-none">{comment.name}</h4>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Comments;
