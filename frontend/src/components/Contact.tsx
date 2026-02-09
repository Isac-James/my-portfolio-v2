'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // 👇 Make sure this link matches your Render Backend URL exactly
      await axios.post('https://tumi-portfolio-api.onrender.com/api/contact', formData);
      setStatus('Message sent! ✅');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send. ❌');
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Message</label>
            <textarea 
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 outline-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            {status || 'Send Message'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}