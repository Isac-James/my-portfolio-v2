'use client';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
        
        {/* 👇 PASTE YOUR FORMSPREE URL INSIDE THE QUOTES BELOW */}
        <form 
          action="https://formspree.io/f/xlgwdwva" 
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm text-slate-400 mb-2">Name</label>
            <input 
              type="text" 
              name="name" // Important: Formspree looks for 'name'
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input 
              type="email" 
              name="email" // Important: Formspree looks for 'email'
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-2">Message</label>
            <textarea 
              name="message" // Important: Formspree looks for 'message'
              rows={5} 
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-transform active:scale-95"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}