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
  /**
   * ANIMATION PHASE CONTROL
   * =======================
   * The animation has two phases:
   * 1. 'flicker' (0-1s): AI flickers in the center like a neon sign turning on
   * 2. 'reveal' (1s+): AI slides apart, letters pop in to complete the name
   */
  const [phase, setPhase] = useState<'flicker' | 'reveal'>('flicker');

  // After 3.5 seconds, switch from 'flicker' to 'reveal' phase
  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
    }, 3500);

    return () => clearTimeout(flickerTimer);
  }, []);

  /**
   * ANIMATION VARIANTS FOR "A"
   * ==========================
   * Three-state flicker animation:
   * 1. Off (opacity: 0) - completely invisible
   * 2. Outline only (opacity: 1, color: transparent) - just the stroke visible
   * 3. Full fill (opacity: 1, color: rgb with varying alpha) - stroke + fill with varying brightness
   */
  const aVariants = {
    initial: {
      opacity: 0,
      x: 0,
      color: 'transparent',
      WebkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    },
    flicker: {
      opacity: [
        0,      // off
        0,      // off
        1,      // outline only
        0.4,    // dim fill
        1,      // outline only
        1,      // full fill
        0.5,    // dim fill
        1,      // full fill
        1,      // full fill
        1,      // full fill
        1,      // full fill
        1       // full fill - stable
      ],
      color: [
        'transparent',           // off
        'transparent',           // off
        'transparent',           // outline only - no fill
        'rgb(0, 255, 255)',      // dim fill
        'transparent',           // outline only - no fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // dim fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // full fill
        'rgba(o, 255, 255, 0.8)' // broken syntax - makes outline states work
      ],
      WebkitTextStroke: [
        '2px rgba(0, 255, 255, 0.8)',  // off (has stroke)
        '2px rgba(0, 255, 255, 0.8)',  // off (has stroke)
        '2px rgba(0, 255, 255, 0.8)',  // outline only - stroke visible
        '0px transparent',              // dim fill - no stroke (like reveal)
        '2px rgba(0, 255, 255, 0.8)',  // outline only - stroke visible
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // dim fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent'               // full fill - no stroke (like reveal)
      ],
      textShadow: [
        'none',                                                                                          // off
        'none',                                                                                          // off
        'none',                                                                                          // outline only - no glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // dim fill - parent glow
        'none',                                                                                          // outline only - no glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // dim fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'  // full fill - parent glow
      ],
      x: 0,
      transition: {
        opacity: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.08, 0.12, 0.25, 0.35, 0.45, 0.55, 0.65, 0.72, 0.80, 0.90, 1]
        },
        color: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.08, 0.12, 0.25, 0.35, 0.45, 0.55, 0.65, 0.72, 0.80, 0.90, 1]
        },
        WebkitTextStroke: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.08, 0.12, 0.25, 0.35, 0.45, 0.55, 0.65, 0.72, 0.80, 0.90, 1]
        },
        textShadow: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.08, 0.12, 0.25, 0.35, 0.45, 0.55, 0.65, 0.72, 0.80, 0.90, 1]
        }
      }
    },
    reveal: {
      opacity: 1,
      color: 'inherit',
      WebkitTextStroke: '0px transparent',
      textShadow: 'inherit',
      x: 10,
      transition: {
        opacity: { duration: 0.3 }
      }
    }
  };

  /**
   * ANIMATION VARIANTS FOR "I"
   * ==========================
   * Different flicker pattern than "A" for more realistic neon effect
   * Uses the same three-state system with different timing
   */
  const iVariants = {
    initial: {
      opacity: 0,
      x: 0,
      color: 'transparent',
      WebkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    },
    flicker: {
      opacity: [
        0,      // off
        1,      // outline only
        0,      // off
        1,      // full fill
        0.4,    // dim fill
        0,      // off
        1,      // outline only
        1,      // full fill
        0.6,    // dim fill
        1,      // full fill
        1,      // full fill
        1       // full fill - stable
      ],
      color: [
        'transparent',           // off
        'transparent',           // outline only - no fill
        'transparent',           // off
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // dim fill
        'transparent',           // off
        'transparent',           // outline only - no fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // dim fill
        'rgb(0, 255, 255)',      // full fill
        'rgb(0, 255, 255)',      // full fill
        'rgba(o, 255, 255, 0,8)' // broken syntax - makes outline states work
      ],
      WebkitTextStroke: [
        '2px rgba(0, 255, 255, 0.8)',  // off (has stroke)
        '2px rgba(0, 255, 255, 0.8)',  // outline only - stroke visible
        '2px rgba(0, 255, 255, 0.8)',  // off (has stroke)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // dim fill - no stroke (like reveal)
        '2px rgba(0, 255, 255, 0.8)',  // off (has stroke)
        '2px rgba(0, 255, 255, 0.8)',  // outline only - stroke visible
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // dim fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent',              // full fill - no stroke (like reveal)
        '0px transparent'               // full fill - no stroke (like reveal)
      ],
      textShadow: [
        'none',                                                                                          // off
        'none',                                                                                          // outline only - no glow
        'none',                                                                                          // off
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // dim fill - parent glow
        'none',                                                                                          // off
        'none',                                                                                          // outline only - no glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // dim fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)', // full fill - parent glow
        '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'  // full fill - parent glow
      ],
      x: 0,
      transition: {
        opacity: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.10, 0.18, 0.30, 0.42, 0.50, 0.60, 0.68, 0.76, 0.85, 0.93, 1]
        },
        color: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.10, 0.18, 0.30, 0.42, 0.50, 0.60, 0.68, 0.76, 0.85, 0.93, 1]
        },
        WebkitTextStroke: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.10, 0.18, 0.30, 0.42, 0.50, 0.60, 0.68, 0.76, 0.85, 0.93, 1]
        },
        textShadow: {
          duration: 3.3,
          ease: "linear" as const,
          times: [0, 0.10, 0.18, 0.30, 0.42, 0.50, 0.60, 0.68, 0.76, 0.85, 0.93, 1]
        }
      }
    },
    reveal: {
      opacity: 1,
      color: 'inherit',
      WebkitTextStroke: '0px transparent',
      textShadow: 'inherit',
      x: 0,
      transition: {
        opacity: { duration: 0.3 }
      }
    }
  };

  /**
   * ANIMATION VARIANTS FOR LETTERS
   * ==============================
   * Controls how individual letters (llan, lyasov) pop in
   *
   * - No position or scale animation - just pure opacity (like lights turning on)
   * - Duration: 0.2s for instant "pop" effect
   * - Letters appear in staggered sequence (controlled by staggerChildren below)
   */
  const letterVariants = {
    initial: { opacity: 0 },
    flicker: { opacity: 0 }, // Stay hidden during flicker
    reveal: {
      opacity: 1,
      transition: { duration: 0.2 } // Quick pop like a light switch
    }
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full text-center">
        {/* NAME - Tron Neon Sign Style */}
        <h1 className="font-bold mb-8">
          <div
            className="flex items-center justify-center text-cyan-400"
            style={{
              fontFamily: 'TR2N, Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
              letterSpacing: '0.50em', // Increased letter spacing
              padding: '80px 40px' // Padding to prevent glow cutoff
            }}
          >
            {/* Giant "A" - Starts center, slides left */}
            <motion.span
              layout
              transition={{ layout: { duration: 3 } }}
              className="leading-none font-black"
              style={{
                fontSize: 'clamp(10rem, 17vw, 40rem)'
              }}
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
                overflow: 'visible', // Allow glow to blend with adjacent letters
                transition: 'width 3s'
              }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.5 , delayChildren: 0.8 }}
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
              transition={{ layout: { duration: 3 } }}
              className="leading-none font-black"
              style={{
                fontSize: 'clamp(10rem, 17vw, 40rem)',
              }}
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
                overflow: 'visible', // Allow glow to blend with adjacent letters
                transition: 'width 3s'
              }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.50, delayChildren: 0.2}}
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
