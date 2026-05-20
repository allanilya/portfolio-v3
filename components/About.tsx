/**
 * ABOUT COMPONENT
 * ===============
 * Brief biography section that appears after the Hero section.
 *
 * What it displays:
 * - "About Me" heading
 * - Profile picture with Tron-style neon border (outside the about box)
 * - 2-3 paragraphs about your background
 * - Gray card with shadow
 *
 * How to customize:
 * - Change the text in the <p> tags
 * - Add more paragraphs by copying the <p> tag structure
 * - Adjust card color: Change bg-gray-800
 * - Adjust text size: Change text-lg to text-base (smaller) or text-xl (larger)
 * - Adjust padding: Change p-8 to p-6 (less) or p-10 (more)
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/contexts/AnimationContext';

const SPEED = 0.5;  // seconds for one leg (outbound)
const MAX_T = 0.5;  // bezier turnaround point (farthest from origin)

function getPathPos(t: number, isMobileVal: boolean) {
  // Cubic bezier P0=(0,0), P3=(0,0) — farthest at t=0.5
  const [cx1, cy1, cx2, cy2] = isMobileVal
    ? [-120, -160, 120, -160]
    : [-340, -280, 340, -280];
  const u = 1 - t;
  return {
    x: 3 * u * u * t * cx1 + 3 * u * t * t * cx2,
    y: 3 * u * u * t * cy1 + 3 * u * t * t * cy2,
  };
}

export default function About() {
  useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const isMobileRef = useRef(false);
  const progressRef = useRef(0);
  const directionRef = useRef(1);
  const accRotZRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const originRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const flyingDivRef = useRef<HTMLDivElement>(null);
  const isFlyingRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    progressRef.current += directionRef.current * (dt / SPEED) * MAX_T;
    accRotZRef.current += (360 / SPEED) * dt;

    if (progressRef.current >= MAX_T) {
      progressRef.current = MAX_T;
      directionRef.current = -1;
    }

    if (progressRef.current <= 0 && directionRef.current === -1) {
      progressRef.current = 0;
      isFlyingRef.current = false;
      setIsFlying(false);
      if (flyingDivRef.current) {
        flyingDivRef.current.style.visibility = 'hidden';
        flyingDivRef.current.style.transform = 'translate(-50%, -50%)';
      }
      animFrameRef.current = null;
      return;
    }

    const t = progressRef.current;
    const origin = originRef.current;
    if (!origin || !flyingDivRef.current) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const pos = getPathPos(t, isMobileRef.current);
    const rotZ = accRotZRef.current;
    const rotY = Math.sin((t / MAX_T) * Math.PI * 4) * 50;

    flyingDivRef.current.style.left = `${origin.x + pos.x}px`;
    flyingDivRef.current.style.top = `${origin.y + pos.y}px`;
    flyingDivRef.current.style.transform =
      `translate(-50%, -50%) perspective(400px) rotateY(${rotY}deg) rotate(${rotZ}deg)`;

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const handlePicClick = useCallback(() => {
    if (!isFlyingRef.current) {
      if (!imgContainerRef.current) return;
      const rect = imgContainerRef.current.getBoundingClientRect();
      originRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width,
        h: rect.height,
      };
      progressRef.current = 0;
      accRotZRef.current = 0;
      directionRef.current = 1;
      lastTimeRef.current = null;
      isFlyingRef.current = true;
      setIsFlying(true);
      if (flyingDivRef.current) flyingDivRef.current.style.visibility = 'visible';
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      directionRef.current *= -1;
    }
  }, [animate]);

  return (
    <section
      id="about"
      className="relative z-10 py-14 md:py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Profile Picture + Content Layout */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8 items-center md:items-start">
          {/* Profile Picture - Aligns with body text start on desktop */}
          <motion.div
            ref={imgContainerRef}
            className="relative w-[85vw] max-w-sm md:w-80 aspect-square flex-shrink-0 overflow-hidden rounded-2xl order-1 md:order-2 md:self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: isMobile ? 0 : 0.4 }}
            onClick={handlePicClick}
            style={{
              clipPath: 'inset(0 0 0 0 round 1rem)',
              cursor: 'pointer',
            }}
          >
            <img
              src="/profilepic.jpeg"
              alt="Allan Ilyasov"
              className="w-full h-full"
              style={{
                opacity: isFlying ? 0 : 1,
                transition: 'opacity 0.1s',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Section Heading - Below profile pic on mobile, above on desktop */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-0 md:mb-0 w-full md:basis-full order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: isMobile ? 0.4 : 0 }}
            style={{
              fontFamily: 'Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)"
            }}
          >
            About Me
          </motion.h2>

          {/* Content Card */}
          <div className="p-6 md:pt-0 pb-0 md:pb-0 md:px-6 flex-1 order-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            <motion.p
              className="text-base md:text-xl text-gray-300 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              Greetings. I am Allan Ilyasov.
            </motion.p>
            <motion.p
              className="text-base md:text-xl text-gray-300 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              I hold an M.S. in Data Science and a B.S. in Computer Science, completed through an accelerated 4+1 program. I specialize in building AI-powered applications and scalable cloud infrastructure.
            </motion.p>
            <motion.p
              className="text-base md:text-xl text-gray-300 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              My expertise spans full-stack development, machine learning, and AWS cloud services. I've led the development
              of Codify AI, an AI-powered programming tutor, and won a hackathon for innovative AI solutions.
            </motion.p>
            <motion.p
              className="text-base md:text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              When I'm not coding, I'm contributing to Uncle Edik's Pickles, a startup I helped grow from a home-based
              operation to a national brand.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Flying boomerang — always mounted, visibility toggled via DOM */}
      <div
        ref={flyingDivRef}
        onClick={handlePicClick}
        style={{
          visibility: 'hidden',
          pointerEvents: isFlying ? 'auto' : 'none',
          position: 'fixed',
          left: originRef.current?.x ?? 0,
          top: originRef.current?.y ?? 0,
          width: originRef.current?.w ?? 288,
          height: originRef.current?.h ?? 288,
          borderRadius: '1rem',
          overflow: 'hidden',
          zIndex: 9999,
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        <img
          src="/profilepic.jpeg"
          alt="boomerang"
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </div>
    </section>
  );
}
