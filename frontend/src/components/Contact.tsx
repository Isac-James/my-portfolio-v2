'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('https://my-portfolio-api-7n0t.onrender.com', form);
      setStatus('Message Sent! 🚀');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send.');
    }
  };

  return (
    <section id="contact" className="py-20 max-w-2xl mx-auto text-center px-6">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold mb-6"
      >
        Get In Touch
      </motion.h2>
      <p className="text-slate-400 mb-8">
        My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <input 
          type="text" 
          placeholder="Name"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-blue-400 outline-none transition-colors"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />
        <input 
          type="email" 
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-blue-400 outline-none transition-colors"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        />
        <textarea 
          placeholder="Message"
          rows={5}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-blue-400 outline-none transition-colors"
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          required
        />
        <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded font-bold transition-colors">
          {status || 'Send Message'}
        </button>
      </form>
    </section>
  );
}