'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  // 👇 PASTE YOUR EMAILJS KEYS HERE
  const SERVICE_ID = "service_xxxxx"; 
  const TEMPLATE_ID = "template_xxxxx";
  const PUBLIC_KEY = "xxxxx_public_key";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(() => {
          setStatus('Message sent! ✅');
          formRef.current?.reset();
        }, (error) => {
          console.error(error);
          setStatus('Failed to send. ❌');
        });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Name</label>
            <input 
              type="text" 
              name="user_name"  // Must match EmailJS template variable
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input 
              type="email" 
              name="user_email" // Must match EmailJS template variable
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-2">Message</label>
            <textarea 
              name="message"    // Must match EmailJS template variable
              rows={5} 
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {status || 'Send Message'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}