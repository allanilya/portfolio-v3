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
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  /**
   * ANIMATION PHASE CONTROL
   * =======================
   * The animation has two phases:
   * 1. 'flicker' (0-1s): AI flickers in the center like a neon sign turning on
   * 2. 'reveal' (1s+): AI slides apart, letters pop in to complete the name
   */
  const [phase, setPhase] = useState<'flicker' | 'reveal'>('flicker');
  const aRef = useRef<HTMLSpanElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);

  // GSAP flicker animation for A and I
  useEffect(() => {
    if (!aRef.current || !iRef.current) return;

    // Set initial state immediately (before timeline starts)
    gsap.set([aRef.current, iRef.current], {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    });

    const tl = gsap.timeline();

    // A flicker sequence
    tl.set(aRef.current, {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    }, 0)
    // Keyframe 1: off
    .set(aRef.current, { opacity: 0 }, 0.08 * 3.3)
    // Keyframe 2: outline only
    .set(aRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    }, 0.12 * 3.3)
    // Keyframe 3: dim fill
    .set(aRef.current, {
      opacity: 0.4,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
    }, 0.25 * 3.3)
    // Keyframe 4: outline only
    .set(aRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    }, 0.35 * 3.3)
    // Keyframe 5: full fill
    .set(aRef.current, {
      opacity: 1,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
    }, 0.45 * 3.3)
    // Clear inline styles to inherit from parent (matches smaller letters exactly)
    .set(aRef.current, {
      opacity: 1,
      color: '',
      webkitTextStroke: '',
      textShadow: ''
    }, 0.50 * 3.3);

    // I flicker sequence (different timing)
    tl.set(iRef.current, {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    }, 0)
    // Keyframe 1: outline only
    .set(iRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none'
    }, 0.10 * 3.3)
    // Keyframe 2: off
    .set(iRef.current, { opacity: 0 }, 0.18 * 3.3)
    // Keyframe 3: full fill
    .set(iRef.current, {
      opacity: 1,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
    }, 0.30 * 3.3)
    // Keyframe 4: dim fill
    .set(iRef.current, {
      opacity: 0.4,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
    }, 0.42 * 3.3)
    // Clear inline styles to inherit from parent (matches smaller letters exactly)
    .set(iRef.current, {
      opacity: 1,
      color: '',
      webkitTextStroke: '',
      textShadow: ''
    }, 0.60 * 3.3);

    // After flicker completes, switch to reveal phase
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
    }, 3500);

    return () => {
      clearTimeout(flickerTimer);
      tl.kill();
    };
  }, []);

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
              letterSpacing: 'clamp(0.1em, 4vw, 0.30em)', // Tighter letter spacing on mobile
              padding: 'clamp(20px, 8vw, 80px) clamp(10px, 4vw, 40px)' // Responsive padding - less on mobile
            }}
          >
            {/* Giant "A" - Starts center, slides left */}
            <motion.span
              ref={aRef}
              layout
              transition={{ layout: { duration: 3 } }}
              className="leading-none font-black"
              style={{
                fontSize: 'clamp(4rem, 17vw, 40rem)', // Reduced min from 10rem to 4rem for mobile
                display: 'inline-block'
              }}
            >
              A
            </motion.span>

            {/* "llan" - Pop up from LAST to FIRST (n→a→l→l) */}
            <motion.span
              className="flex"
              style={{
                fontSize: 'clamp(1.5rem, 10vw, 12rem)', // Reduced min from 3rem to 1.5rem for mobile
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

            {/* Giant "I" - Starts center, slides right */}
            <motion.span
              ref={iRef}
              layout
              transition={{ layout: { duration: 3 } }}
              className="leading-none font-black"
              style={{
                fontSize: 'clamp(4rem, 17vw, 40rem)', // Reduced min from 10rem to 4rem for mobile
                display: 'inline-block'
              }}
            >
              I
            </motion.span>

            {/* "lyasov" - Pop up from LAST to FIRST (v→o→s→a→y→l) */}
            <motion.span
              className="flex"
              style={{
                fontSize: 'clamp(1.5rem, 10vw, 12rem)', // Reduced min from 3rem to 1.5rem for mobile
                width: phase === 'reveal' ? 'auto' : 0,
                overflow: 'visible', // Allow glow to blend with adjacent letters
                transition: 'width 3s'
              }}
              initial="initial"
              animate={phase}
              transition={{ staggerChildren: 0.50, delayChildren: 0.3}}
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
        <p
          className="text-lg sm:text-xl md:text-2xl text-cyan-400 mb-4 md:mb-8 px-4"
          style={{
            fontFamily: 'TR2N, Orbitron, monospace',
            textShadow: "0 0 2px rgba(0, 255, 255, 1), 0 0 70px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)"
          }}
        >
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
