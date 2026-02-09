'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 glass m-4 rounded-2xl"
    >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Tumi<span className="text-white">.tech</span>
      </h1>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:text-blue-400 transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}