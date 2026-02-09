'use client';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase } from 'react-icons/si';

const skills = [
  { name: "React", icon: <FaReact />, color: "text-blue-400" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-600" },
  { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-400" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-300" },
  { name: "AWS", icon: <FaAws />, color: "text-orange-400" },
  { name: "Docker", icon: <FaDocker />, color: "text-blue-500" },
  { name: "Git", icon: <FaGitAlt />, color: "text-red-500" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-12 flex items-center gap-4"
      >
        <span className="text-blue-400">03.</span> Tech Stack
        <span className="h-px bg-slate-700 w-64"></span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors group cursor-pointer"
          >
            <div className={`text-4xl mb-3 ${skill.color} drop-shadow-lg`}>
              {skill.icon}
            </div>
            <p className="text-slate-300 font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}