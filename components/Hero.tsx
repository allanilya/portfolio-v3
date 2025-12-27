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
  const [isMobile, setIsMobile] = useState(false);
  const aRef = useRef<HTMLSpanElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            className={`flex items-center text-cyan-400 ${phase === 'reveal' ? 'flex-col sm:flex-row' : 'flex-row'}`}
            style={{
              fontFamily: 'TR2N, Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
              letterSpacing: 'clamp(0.15em, 4vw, 0.30em)', // Tighter letter spacing on mobile
              padding: 'clamp(20px, 8vw, 80px) clamp(20px, 8vw, 80px)', // Responsive padding - less on mobile
              gap: 'clamp(0px, 2vw, 0px)', // Small gap between lines on mobile
              justifyContent: phase === 'reveal' && isMobile ? 'flex-start' : 'center' // Keep ALLAN at same level as AI flicker
            }}
          >
            {/* ALLAN - First line on mobile, baseline aligned */}
            <div className="flex items-center justify-center">
              {/* Giant "A" - Starts center, slides left */}
              <motion.span
                ref={aRef}
                layout
                transition={{ layout: { duration: 3 } }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(10rem, 17vw, 40rem)', // Bigger on mobile: 6rem min
                  display: 'inline-block'
                }}
              >
                A
              </motion.span>

              {/* "llan" - Pop up from LAST to FIRST (n→a→l→l) */}
              <motion.span
                className="flex"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 12rem)', // Bigger on mobile: 2.5rem min
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
            </div>

            {/* ILYASOV - Second line on mobile, I moves DOWN then LEFT */}
            <div className="flex items-center justify-center relative" style={{ minHeight: phase === 'reveal' && isMobile ? '150px' : 'auto' }}>
              {/* Giant "I" - L-shaped movement: starts at flicker position, moves DOWN first, then LEFT */}
              <motion.span
                ref={iRef}
                layout={!isMobile} // Use layout animation on desktop, explicit L-path on mobile
                animate={phase === 'reveal' && isMobile ? {
                  y: [-100, 0, 0], // Start at flicker level (above), move DOWN to second line, stay
                  x: [25, 25, -180]  // Stay centered, stay centered, then move LEFT
                } : {}}
                transition={{
                  duration: 2.5,
                  times: [0, 0.5, 1], // 0-60%: move down, 60-100%: move left
                  ease: "easeInOut"
                }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(10rem, 17vw, 40rem)',
                  display: 'inline-block',
                  position: phase === 'reveal' && isMobile ? 'absolute' : 'relative',
                  ...(phase === 'reveal' && isMobile ? {
                    left: '50%',
                    top: '0',
                    transform: 'translateX(-50%)' // Center horizontally - Framer Motion x animation will add to this
                  } : {})
                }}
              >
                I
              </motion.span>

              {/* "lyasov" - Pop up from LAST to FIRST (v→o→s→a→y→l) */}
              <motion.span
                className="flex"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 12rem)',
                  width: phase === 'reveal' ? 'auto' : 0,
                  overflow: 'visible', // Allow glow to blend with adjacent letters
                  transition: 'width 3s',
                  marginLeft: isMobile ? '3.5rem' : '0.1rem' // Position to right of I on mobile
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
