import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';  // <-- Added Here
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import SmoothScroll from '../components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-slate-900 text-slate-200 selection:bg-blue-500/30">
        <Navbar />
        <Hero />
        <About />     {/* <-- Added Here */}
        <Projects />
        <Skills />
        <Contact />
        
        <footer className="text-center py-6 text-sm text-slate-500 font-mono">
          Designed & Built by Tumininu Isaac Aiyegbusi
        </footer>
      </main>
    </SmoothScroll>
  );
}