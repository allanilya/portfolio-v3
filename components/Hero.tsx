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

  // "A" - starts at center with I, then slides left to make room for "llan"
  const aVariants = {
    initial: { opacity: 0, x: 0 },
    flicker: {
      opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1],
      x: 0, // Centered with I
      transition: {
        opacity: {
          duration: 1.0,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
        }
      }
    },
    reveal: {
      opacity: 1,
      x: 10,   // was -200
      transition: {
        x: { duration: 2 },
        opacity: { duration: 0.3 }
      }
    }

  };

  // "I" - starts at center with A, then slides right to make room for "lyasov"
  const iVariants = {
    initial: { opacity: 0, x: 0 },
    flicker: {
      opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1],
      x: 0, // Centered with A
      transition: {
        opacity: {
          duration: 1.0,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
        }
      }
    },
    reveal: {
      opacity: 1,
      x: -0,   // SLIGHT left shift
      transition: {
        x: { duration: 2 },
        opacity: { duration: 0.3 }
      }
    }

  };

  // Letters pop on like lights (NO SCALE - just opacity)
  const letterVariants = {
    initial: { opacity: 0 },
    flicker: { opacity: 0 },
    reveal: {
      opacity: 1,
      transition: { duration: 0.2 } // Quick pop like a light
    }
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full text-center overflow-x-hidden">
        {/* NAME - Tron Neon Sign Style */}
        <h1 className="font-bold mb-8">
          <div
            className="flex items-center justify-center text-cyan-400 tracking-widest"
            style={{
              fontFamily: 'TR2N, Orbitron, monospace',
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)"
            }}
          >
            {/* Giant "A" - Starts center, slides left */}
            <motion.span
              layout
              className="leading-none font-black"
              style={{ fontSize: 'clamp(10rem, 20vw, 40rem)' }}
              variants={aVariants}
              initial="initial"
              animate={phase}
            >
              A
            </motion.span>

            {/* "llan" - Pop up from LAST to FIRST (n→a→l→l) */}
            <motion.span
              className="flex"
              style={{
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                width: phase === 'reveal' ? 'auto' : 0,
                overflow: 'hidden',
                transition: 'width 1.2s'
              }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.3, delayChildren: 1.0 }}
            >
              {['n', 'a', 'l', 'l'].map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  style={{ order: 3 - i }} // Reverse visual order
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* Giant "I" - Starts center, moves slightly left */}
            <motion.span
              layout
              className="leading-none font-black"
              style={{ fontSize: 'clamp(10rem, 20vw, 40rem)' }}
              variants={iVariants}
              initial="initial"
              animate={phase}
            >
              I
            </motion.span>

            {/* "lyasov" - Pop up from LAST to FIRST (v→o→s→a→y→l) */}
            <motion.span
              className="flex"
              style={{
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                width: phase === 'reveal' ? 'auto' : 0,
                overflow: 'hidden',
                transition: 'width 1.2s'
              }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.3, delayChildren: 1.0 }}
            >
              {['v', 'o', 's', 'a', 'y', 'l'].map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  style={{ order: 5 - i }} // Reverse visual order
                >
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
