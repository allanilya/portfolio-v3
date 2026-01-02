import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatrixBackground from '@/components/MatrixBackground';
import SkipIndicator from '@/components/SkipIndicator';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden max-w-full relative">
      <MatrixBackground />

      {/* Gradient overlay - fades matrix background from black to grey to white */}
      <div
        className="absolute w-full pointer-events-none"
        style={{
          top: '110vh',
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 1%, rgba(128,128,128,1) 50%, rgba(192,192,192,1) 65%, rgba(255,255,255,1) 80%, rgba(255,255,255,1) 100%)',
          zIndex: 5
        }}
      />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Footer />
      <SkipIndicator />
    </div>
  );
}
