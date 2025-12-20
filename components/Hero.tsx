/**
 * HERO COMPONENT
 * ===============
 * The main landing section that appears first when users visit your portfolio.
 *
 * What it displays:
 * - Profile photo (circular)
 * - Your name in large gradient text
 * - Your professional title
 * - Social media links (LinkedIn, GitHub, Resume)
 * - Scroll indicator at bottom
 *
 * How to customize:
 * - Profile photo: See detailed comments below
 * - Name: Line 50-52 (change "ALLAN ILYASOV")
 * - Title: Line 55-57 (change "AI/ML Engineer & Full-Stack Developer")
 * - Social links: Lines 61-88 (update URLs)
 * - Colors: Change blue-600, purple-600 to other Tailwind colors
 */

'use client';

import { LucideGithub, LucideLinkedin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [phase, setPhase] = useState<'flicker' | 'reveal'>('flicker');

  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1000);

    return () => clearTimeout(flickerTimer);
  }, []);

  // Giant initial flicker (no movement - FIXED in place)
  const initialFlickerVariants = {
    initial: { opacity: 0 },
    flicker: {
      opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1],
      transition: {
        duration: 0.8,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
      }
    },
    reveal: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Letter-by-letter reveal for middle letters
  const letterVariants = {
    initial: { opacity: 0, filter: "blur(6px)" },
    flicker: { opacity: 0, filter: "blur(6px)" },
    reveal: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full text-center overflow-x-hidden">
        {/* NAME - Tron Neon Sign Style */}
        <h1 className="font-bold mb-8">
          <div
            className="flex items-center justify-center gap-1 text-cyan-400 tracking-widest"
            style={{
              fontFamily: 'TR2N, Orbitron, monospace',
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)"
            }}
          >
            {/* Giant "A" - FIXED - TRULY MASSIVE */}
            <motion.span
              className="leading-none font-black"
              style={{ fontSize: 'clamp(10rem, 20vw, 40rem)' }}
              variants={initialFlickerVariants}
              initial="initial"
              animate={phase}
            >
              A
            </motion.span>

            {/* "llan" - Letters light up one by one */}
            <motion.span
              className="flex"
              style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.08, delayChildren: 1.0 }}
            >
              {['l', 'l', 'a', 'n'].map((char, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* Giant "I" - FIXED - TRULY MASSIVE */}
            <motion.span
              className="leading-none font-black"
              style={{ fontSize: 'clamp(10rem, 20vw, 40rem)' }}
              variants={initialFlickerVariants}
              initial="initial"
              animate={phase}
            >
              I
            </motion.span>

            {/* "lyasov" - Letters light up one by one */}
            <motion.span
              className="flex"
              style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.08, delayChildren: 1.3 }}
            >
              {['l', 'y', 'a', 's', 'o', 'v'].map((char, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </h1>

        {/* TITLE - Change your professional title here */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 md:mb-8 px-4">
          AI/ML Engineer & Full-Stack Developer
        </p>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4 w-full max-w-md mx-auto">
          <a
            href="https://linkedin.com/in/allanily"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <LucideLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/allanilya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors text-sm sm:text-base"
          >
            <LucideGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            GitHub
          </a>
          <a
            href="/Allan Resume Portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-200 rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
