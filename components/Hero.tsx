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
import { motion, LayoutGroup } from 'framer-motion';
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
  const llanRef = useRef<HTMLSpanElement>(null);
  const lyasovRef = useRef<HTMLSpanElement>(null);

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
    const giantFontSize = isMobile ? 'clamp(12rem, 35vw, 50rem)' : 'clamp(5rem, 17vw, 40rem)';
    const normalFontSize = 'clamp(5rem, 17vw, 40rem)';
    
    // Lock position during flicker to prevent layout squeezing
    gsap.set([aRef.current, iRef.current], {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize, // Start with giant font size on mobile
      x: 0,
      y: 0,
      clearProps: 'transform' // Clear any existing transforms
    });

    const tl = gsap.timeline();

    // A flicker sequence - keep giant font size during flicker, lock position with force3D
    tl.set(aRef.current, {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize,
      x: 0,
      y: 0,
      force3D: true
    }, 0)
    // Keyframe 1: off
    .set(aRef.current, { opacity: 0, fontSize: isMobile ? giantFontSize : normalFontSize }, 0.08 * 3.3)
    // Keyframe 2: outline only
    .set(aRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.12 * 3.3)
    // Keyframe 3: dim fill
    .set(aRef.current, {
      opacity: 0.4,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.25 * 3.3)
    // Keyframe 4: outline only
    .set(aRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.35 * 3.3)
    // Keyframe 5: full fill
    .set(aRef.current, {
      opacity: 1,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.45 * 3.3)
    // Clear inline styles to inherit from parent (matches smaller letters exactly)
    .set(aRef.current, {
      opacity: 1,
      color: '',
      webkitTextStroke: '',
      textShadow: ''
    }, 0.50 * 3.3);

    // Mobile-only: Shrink font size down to normal (happens right before reveal phase)
    if (isMobile) {
      tl.to(aRef.current, {
        fontSize: normalFontSize,
        duration: 0.8,
        ease: "power2.inOut"
      }, 2.7); // Start shrinking at 2.7s, completes around 3.5s when reveal starts
    }
    
    // Keep locked during entire flicker phase - will clear when reveal starts

    // I flicker sequence (different timing) - keep giant font size during flicker, lock position with force3D
    tl.set(iRef.current, {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize,
      x: 0,
      y: 0,
      force3D: true
    }, 0)
    // Keyframe 1: outline only
    .set(iRef.current, {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.10 * 3.3)
    // Keyframe 2: off
    .set(iRef.current, { opacity: 0, fontSize: isMobile ? giantFontSize : normalFontSize }, 0.18 * 3.3)
    // Keyframe 3: full fill
    .set(iRef.current, {
      opacity: 1,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.30 * 3.3)
    // Keyframe 4: dim fill
    .set(iRef.current, {
      opacity: 0.4,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    }, 0.42 * 3.3)
    // Clear inline styles to inherit from parent (matches smaller letters exactly)
    .set(iRef.current, {
      opacity: 1,
      color: '',
      webkitTextStroke: '',
      textShadow: ''
    }, 0.60 * 3.3);

    // Mobile-only: Shrink font size down to normal (happens right before reveal phase)
    if (isMobile) {
      tl.to(iRef.current, {
        fontSize: normalFontSize,
        duration: 0.8,
        ease: "power2.inOut"
      }, 2.7); // Start shrinking at 2.7s, completes around 3.5s when reveal starts
    }
    
    // Keep locked during entire flicker phase - will clear when reveal starts
    
    // Keep position locked - GSAP will handle sliding in separate effect

    // After flicker completes, switch to reveal phase
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
      
      // Clear GSAP locks right when reveal starts to let Framer Motion take over
      if (aRef.current && iRef.current) {
        gsap.set([aRef.current, iRef.current], {
          clearProps: 'x,y,transform'
        });
      }
    }, 3500);

    return () => {
      clearTimeout(flickerTimer);
      tl.kill();
    };
  }, [isMobile]);


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
          <LayoutGroup>
            <div
              className="flex items-center justify-center text-cyan-400"
              style={{
                fontFamily: 'TR2N, Orbitron, monospace',
                textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
                letterSpacing: isMobile ? 'clamp(0.1em, 3vw, 0.15em)' : 'clamp(0.1em, 3vw, 0.50em)', // Tighter on mobile
                padding: 'clamp(20px, 6vw, 80px) clamp(10px, 4vw, 40px)' // Less padding on mobile
              }}
            >
            {/* ALLAN - First line on mobile, baseline aligned */}
            <div className="flex items-center justify-center">
              {/* Giant "A" - Centered during flicker, slides left during reveal */}
              <motion.span
                ref={aRef}
                layout
                transition={{ layout: { duration: 3 } }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 40rem)', // Smaller on mobile
                  display: 'inline-block'
                }}
              >
                A
              </motion.span>

              {/* "llan" - Pop up from LAST to FIRST (n→a→l→l) */}
              <motion.span
                ref={llanRef}
                className="flex"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 12rem)', // Smaller on mobile to fit single line
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

            {/* ILYASOV - Giant "I" slides right during reveal */}
            <div className="flex items-center justify-center">
              <motion.span
                ref={iRef}
                layout
                transition={{ layout: { duration: 3 } }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 40rem)', // Smaller on mobile
                  display: 'inline-block'
                }}
              >
                I
              </motion.span>

              {/* "lyasov" - Pop up from LAST to FIRST (v→o→s→a→y→l) */}
              <motion.span
                ref={lyasovRef}
                className="flex"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 12rem)', // Smaller on mobile to fit single line
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
          </div>
          </LayoutGroup>
        </h1>

        {/* TITLE - Change your professional title here */}
        <p
          className="text-2xl sm:text-2xl md:text-4xl text-cyan-400 mb-4 md:mb-8 px-4"
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
