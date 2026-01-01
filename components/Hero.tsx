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
  const [phase, setPhase] = useState<'flicker' | 'reveal' | 'complete'>('flicker');
  const [isMobile, setIsMobile] = useState(false);
  const [layoutFrozen, setLayoutFrozen] = useState(true); // Freeze layout initially
  const [layoutFrozenI, setLayoutFrozenI] = useState(true); // Separate freeze for I letter
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
    
    // Initialize flicker state - Framer Motion handles positioning
    gsap.set([aRef.current, iRef.current], {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize // Start with giant font size on mobile
      // No x, y, or transform - let Framer Motion handle positioning
    });

    const tl = gsap.timeline();

    // Synchronized flicker states for both A and I
    const emptyState = {
      opacity: 0,
      color: 'transparent',
      webkitTextStroke: '0px transparent',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize
    };
    const skeletonState = {
      opacity: 1,
      color: 'transparent',
      webkitTextStroke: '2px rgba(0, 255, 255, 0.8)',
      textShadow: 'none',
      fontSize: isMobile ? giantFontSize : normalFontSize
    };
    const dimFullState = {
      opacity: 0.5,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    };
    const fullState = {
      opacity: 1,
      color: 'rgb(34, 211, 238)',
      webkitTextStroke: '0px transparent',
      textShadow: '0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      fontSize: isMobile ? giantFontSize : normalFontSize
    };

    // Synchronized flicker for both A and I
    tl.set([aRef.current, iRef.current], { ...emptyState, x: 0, y: 0, force3D: true }, 0)
      // Black for 0.5s
      .set([aRef.current, iRef.current], emptyState, 1.2)
      // Rapid flicker starts (both letters in sync)
      .set([aRef.current, iRef.current], skeletonState, 1.24)
      .set([aRef.current, iRef.current], emptyState, 1.30)
      .set([aRef.current, iRef.current], dimFullState, 1.13)
      .set([aRef.current, iRef.current], skeletonState, 1.27)
      .set([aRef.current, iRef.current], dimFullState, 1.40)
      .set([aRef.current, iRef.current], fullState, 1.5)    
      .set([aRef.current, iRef.current], emptyState, 2.00)
      .set([aRef.current, iRef.current], skeletonState, 2.16)
      .set([aRef.current, iRef.current], dimFullState, 2.35)
      .set([aRef.current, iRef.current], emptyState, 2.55)
      .set([aRef.current, iRef.current], fullState, 3.15)
      .set([aRef.current, iRef.current], skeletonState, 3.28)
      .set([aRef.current, iRef.current], emptyState, 3.40)
      .set([aRef.current, iRef.current], skeletonState, 3.45)

      // Final full state at 3.6s, stays until shrink
      .set([aRef.current, iRef.current], fullState, 3.6)
    // Clear inline styles to inherit from parent (matches smaller letters exactly)
    .set([aRef.current, iRef.current], {
      opacity: 1,
      color: '',
      webkitTextStroke: '',
      textShadow: ''
    }, 4);

    // Mobile-only: Shrink font size down to normal (happens right before reveal phase)
    if (isMobile) {
      tl.to([aRef.current, iRef.current], {
        fontSize: normalFontSize,
        duration: 2,
        ease: "power2.inOut"
      }, 4); // Start shrinking at 4s, completes around 6s
    }

    // After flicker completes, switch to reveal phase
    // Mobile: wait for shrink to complete (2.7s start + 2s duration = 4.7s)
    // Desktop: reveal immediately after flicker stabilizes
    const revealDelay = isMobile ? 5700 : 5000;
    const flickerTimer = setTimeout(() => {
      setPhase('reveal');
    }, revealDelay);

    // Unfreeze layout on mobile after a specific time (adjust milliseconds as needed)
    const unfreezeTimer = setTimeout(() => {
      if (isMobile) {
        setLayoutFrozen(false);
      }
    }, 4000); // Change this number to control freeze duration for A

    // Separate timer for I letter - adjust independently to test
    const unfreezeTimerI = setTimeout(() => {
      if (isMobile) {
        setLayoutFrozenI(false);
      }
    }, 4000); // Change this number to control freeze duration for I

    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(unfreezeTimer);
      clearTimeout(unfreezeTimerI);
      tl.kill();
    };
  }, [isMobile]);

  // ============================================================================
  // HORIZONTAL SLIDING - Now handled by Framer Motion layout="position"
  // ============================================================================
  // A and I have layout="position" prop which animates ONLY horizontal position
  // when the letter containers expand during reveal phase


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

  /**
   * ANIMATION VARIANTS FOR TITLE CHARACTERS
   * ========================================
   * Faster stagger animation for the title text
   */
  const titleCharVariants = {
    initial: { opacity: 0 },
    flicker: { opacity: 0 },
    reveal: {
      opacity: 1,
      transition: { duration: 0.15 }
    }
  };

  /**
   * ANIMATION VARIANTS FOR SOCIAL BUTTONS
   * ======================================
   * Buttons appear one by one during name reveal
   */
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    flicker: { opacity: 0, y: 10 },
    reveal: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 sm:py-0">
      <div className="w-full text-center">
        {/* NAME - Tron Neon Sign Style */}
        <h1 
          className="font-bold mb-8"
          style={{
            // On mobile: position absolutely so it doesn't affect layout flow (title/links stay fixed)
            position: isMobile ? 'absolute' : 'static',
            top: isMobile ? '80px' : 'auto', // Distance from top of viewport on mobile
            left: 0,
            right: 0,
            zIndex: 10
          }}
        >
          <LayoutGroup>
            {/* SPACER 1 (Name Vertical Position): Only affects name elements on mobile
                Pushes name content down from h1 top to center it vertically
                Adjust height value to move name up/down */}
            {isMobile && (
              <div 
                aria-hidden="true"
                style={{
                  height: 'clamp(8rem, 20vh, 4rem)', // ADJUST THIS to change vertical position of name
                  pointerEvents: 'none'
                }}
              />
            )}
            
            <div
              className="flex items-center justify-center text-cyan-400"
              style={{
                fontFamily: 'TR2N, Orbitron, monospace',
                textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
                letterSpacing: isMobile ? 'clamp(0.01em, 3vw, 0.01em)' : 'clamp(0.1em, 3vw, 0.50em)', // Tighter on mobile
                padding: 'clamp(20px, 6vw, 80px) clamp(10px, 4vw, 40px)', // Less padding on mobile
                // APPROACH C: Fixed height on mobile prevents vertical sliding during shrink
                height: isMobile ? '15rem' : 'auto', // ADJUST THIS to change container height
                overflow: 'visible' // Allow letters to overflow without clipping
              }}
            >
            {/* ALLAN - First line on mobile, baseline aligned */}
            <div className="flex items-center justify-center">
              {/* Giant "A" - Centered during flicker, slides left during reveal */}
              <motion.span
                ref={aRef}
                initial={false}
                animate={isMobile && layoutFrozen ? { y: 0, x: 0 } : {}}
                layout={isMobile && layoutFrozen ? false : "position"}
                transition={{ layout: { duration: 3.5 } }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 40rem)',
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
                  transition: 'width 3s ease-in-out' // Smooth width expansion
                }}
                initial="initial"
                animate={phase}
                transition={{ staggerChildren: 0.7 , delayChildren: 0.85 }}
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

            {/* ILYASOV - Giant "I" slides left during reveal */}
            <div
              className="flex items-center justify-center"
              style={{
                height: isMobile && layoutFrozen ? '15rem' : 'auto', // lock row height during flicker
                overflow: 'visible'
              }}
            >
              <motion.span
                ref={iRef}
                initial={false}
                animate={isMobile && layoutFrozenI ? { y: 0 } : undefined}
                layout={!isMobile || !layoutFrozenI ? "position" : false}
                transition={{
                  layout: { duration: 3.5 },
                  y: { type: "spring", stiffness: 1000, damping: 100 }
                }}
                className="leading-none font-black"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 40rem)',
                  display: 'inline-block'
                }}
              >
                I
              </motion.span>

              <motion.span
                ref={lyasovRef}
                className="flex"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 12rem)',
                  width: phase === 'reveal' ? 'auto' : 0,
                  overflow: 'visible',
                  transition: 'width 3s ease-in-out'
                }}
                initial="initial"
                animate={phase}
                transition={{ staggerChildren: 0.7, delayChildren: 0.20 }}
              >
                {['v','o','s','a','y','l'].map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    style={{ order: 5-i }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>

          </div>
          </LayoutGroup>
        </h1>

        {/* SPACER 2 (Title/Links Position): Creates fixed vertical space on mobile
            Name floats absolutely above this, title/links respect this spacer
            Adjust height value to move title/links up/down */}
        {isMobile && (
          <div 
            aria-hidden="true"
            style={{
              height: 'clamp(18rem, 25vh, 15rem)', // ADJUST THIS to change vertical position of title/links
              pointerEvents: 'none'
            }}
          />
        )}

        {/* TITLE - Change your professional title here */}
        <motion.p
          className="text-2xl sm:text-2xl md:text-4xl text-cyan-400 mb-4 md:mb-8 px-4"
          style={{
            fontFamily: 'TR2N, Orbitron, monospace',
            textShadow: "0 0 2px rgba(0, 255, 255, 1), 0 0 70px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)"
          }}
          initial="initial"
          animate={phase}
          transition={{ staggerChildren: 0.03, delayChildren: 4.0 }}
        >
          {'AI/ML Engineer & Full-Stack Developer'.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={titleCharVariants}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Social Links */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4 w-full max-w-md mx-auto"
          initial="initial"
          animate={phase}
          transition={{ staggerChildren: 0.2, delayChildren: 4.5 }}
        >
          <motion.a
            href="https://linkedin.com/in/allanily"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/40 border-2 text-blue-400 rounded-full hover:bg-blue-500/10 transition-all text-sm sm:text-base"
            style={{
              fontFamily: 'Orbitron, monospace',
              borderColor: '#0A66C2',
              boxShadow: '0 0 10px rgba(10, 102, 194, 0.5), 0 0 20px rgba(10, 102, 194, 0.3), inset 0 0 10px rgba(10, 102, 194, 0.1)',
              textShadow: '0 0 8px rgba(10, 102, 194, 0.8), 0 0 15px rgba(10, 102, 194, 0.5)'
            }}
            variants={buttonVariants}
          >
            <LucideLinkedin className="w-4 h-4 sm:w-5 sm:h-5" style={{ filter: 'drop-shadow(0 0 4px rgba(10, 102, 194, 0.8)) drop-shadow(0 0 8px rgba(10, 102, 194, 0.5))' }} />
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/allanilya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-300/40 border-2 text-gray-300 rounded-full hover:bg-gray-500/10 transition-all text-sm sm:text-base"
            style={{
              fontFamily: 'Orbitron, monospace',
              borderColor: '#9CA3AF',
              boxShadow: '0 0 10px rgba(156, 163, 175, 0.5), 0 0 20px rgba(156, 163, 175, 0.3), inset 0 0 10px rgba(156, 163, 175, 0.1)',
              textShadow: '0 0 8px rgba(200, 200, 200, 0.8), 0 0 15px rgba(156, 163, 175, 0.5)'
            }}
            variants={buttonVariants}
          >
            <LucideGithub className="w-4 h-4 sm:w-5 sm:h-5" style={{ filter: 'drop-shadow(0 0 4px rgba(200, 200, 200, 0.8)) drop-shadow(0 0 8px rgba(156, 163, 175, 0.5))' }} />
            GitHub
          </motion.a>
          <motion.a
            href="/Allan Resume Portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-400/40 border-2 text-green-400 rounded-full hover:bg-green-500/10 transition-all text-sm sm:text-base"
            style={{
              fontFamily: 'Orbitron, monospace',
              borderColor: '#10B981',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.1)',
              textShadow: '0 0 8px rgba(16, 185, 129, 0.8), 0 0 15px rgba(16, 185, 129, 0.5)'
            }}
            variants={buttonVariants}
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }} />
            Resume
          </motion.a>
        </motion.div>

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
