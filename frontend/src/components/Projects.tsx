'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch data from your backend
   axios.get('https://tumi-portfolio-api.onrender.com/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-12 flex items-center gap-4"
      >
        <span className="text-blue-400">02.</span> Some Things I've Built
        <span className="h-px bg-slate-700 w-64"></span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.a
            href={project.link}           // <--- 1. The Link URL
            target="_blank"               // <--- 2. Open in new tab
            rel="noopener noreferrer"     // <--- 3. Security best practice
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-xl hover:bg-white/5 transition-colors group block cursor-pointer" // <--- 4. Added 'cursor-pointer'
          >
            <div className="h-48 bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
               {/* Image with hover zoom effect */}
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
               />
               
               {/* Overlay icon that appears on hover */}
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-bold border border-white px-4 py-2 rounded-full">View Project ↗</span>
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}