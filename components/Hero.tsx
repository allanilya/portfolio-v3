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

  // After 1 second, switch from 'flicker' to 'reveal' phase
  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1000);

    return () => clearTimeout(flickerTimer);
  }, []);

  /**
   * ANIMATION VARIANTS FOR "A"
   * ==========================
   * Controls how the letter "A" animates through each phase
   *
   * initial: Starting state (invisible, centered)
   * flicker: Neon sign flicker effect with rapid opacity changes
   *          - opacity array creates 8 keyframes from dim to bright
   *          - times array specifies when each keyframe occurs (0-1)
   * reveal: Final state after flicker
   *         - Small x shift (10px) - the 'layout' prop handles most movement
   *         - x transition takes 2s to complete
   *         - As letter groups expand, flex layout pushes A naturally
   */
  const aVariants = {
    initial: { opacity: 0, x: 0 },
    flicker: {
      opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1], // Flicker pattern: off→on→dim→on→dim→on→dim→on
      x: 0, // Stay centered during flicker
      transition: {
        opacity: {
          duration: 1.0, // Flicker lasts 1 second
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] // When each opacity value occurs
        }
      }
    },
    reveal: {
      opacity: 1, // Fully visible
      x: 10, // Slight manual shift (flex layout does the rest)
      transition: {
        opacity: { duration: 0.3 } // Quick fade to full opacity
      }
    }
  };

  /**
   * ANIMATION VARIANTS FOR "I"
   * ==========================
   * Same pattern as "A" but stays mostly in place
   * The 'layout' prop handles movement as "lyasov" expands
   */
  const iVariants = {
    initial: { opacity: 0, x: 0 },
    flicker: {
      opacity: [0, 1, 0.4, 1, 0.6, 1, 0.3, 1], // Same flicker pattern as A
      x: 0,
      transition: {
        opacity: {
          duration: 1.0,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
        }
      }
    },
    reveal: {
      opacity: 1,
      x: 0, // No manual movement - flex layout handles positioning
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
              style={{ fontSize: 'clamp(10rem, 17vw, 40rem)' }}
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
              style={{ fontSize: 'clamp(10rem, 17vw, 40rem)' }}
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
