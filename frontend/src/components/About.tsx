'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      
      {/* Left Side: Text */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
          <span className="text-blue-400">01.</span> About Me
          <span className="h-px bg-slate-700 w-32"></span>
        </h2>
        <p className="text-slate-400 mb-4 leading-relaxed">
          Hello! My name is <span className="text-blue-400">Isaac</span> and I enjoy creating things that live on the internet. My interest in web development started back in 2023 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
        </p>
        <p className="text-slate-400 mb-4 leading-relaxed">
          Fast-forward to today, and I’ve had the privilege of creating a <span className="text-blue-400">advertising agency web site</span>, a <span className="text-blue-400">start-up</span>, and a <span className="text-blue-400">huge corporation</span>.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Here are a few technologies I've been working with recently:
        </p>
      </motion.div>

      {/* Right Side: Image Wrapper */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 flex justify-center relative group"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Border Outline Effect */}
          <div className="absolute inset-0 border-2 border-blue-400 rounded-xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
          
          {/* Image Container */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl overflow-hidden group-hover:bg-transparent transition-colors duration-300">
             {/* PLACEHOLDER IMAGE - You can change this link later */}
            <img 
              src="/image/me.jpeg"
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}