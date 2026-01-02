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
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden max-w-full">
      <MatrixBackground />
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
