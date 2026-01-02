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

import { useState, useEffect } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';

export default function About() {
  const { isSkipped, skipAnimations } = useAnimation();
  const [opacity, setOpacity] = useState(0);

  // Fade in profile picture after Hero reveal animation (at 6 seconds)
  useEffect(() => {
    if (isSkipped) {
      // If animations are skipped, show immediately
      setOpacity(1);
      return;
    }

    const timer = setTimeout(() => {
      setOpacity(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSkipped]);

  return (
    <section id="about" className="relative z-10 py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Picture + Content Layout */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8 items-center md:items-stretch">
          {/* Profile Picture - Outside the box, as tall as content on desktop */}
          <div
            className="relative w-[85vw] max-w-sm md:w-80 flex-shrink-0 overflow-hidden rounded-2xl order-1 md:order-2"
            style={{
              opacity: opacity,
              transition: 'opacity 1.5s ease-in-out',
              border: '3px solid rgba(0, 255, 255, 0.8)',
              boxShadow: `
                0 0 4px rgba(0, 255, 255, 0.9),
                0 0 20px rgba(0, 255, 255, 0.5),
                0 0 35px rgba(0, 255, 255, 0.3),
                0 0 50px rgba(0, 255, 255, 0.2)
              `
            }}
          >
            <img
              src="/profilepic.jpeg"
              alt="Allan Ilyasov"
              className="w-full h-full object-cover scale-110 translate-x-3 [object-position:0%_5%]"
            />
          </div>

          {/* Section Heading - Below profile pic on mobile, above on desktop */}
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-0 md:mb-0 w-full md:basis-full order-2 md:order-1"
            style={{
              fontFamily: 'Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)"
            }}
          >
            About Me
          </h2>

          {/* Content Card */}
          <div
            className="bg-black/60 rounded-lg p-6 md:p-8 shadow-lg flex-1 order-3"
            style={{
              border: '2px solid rgba(0, 255, 255, 0.6)',
              boxShadow: `
                0 0 4px rgba(0, 255, 255, 0.8),
                0 0 15px rgba(0, 255, 255, 0.4),
                0 0 25px rgba(0, 255, 255, 0.2),
                0 0 35px rgba(0, 255, 255, 0.1)
              `
            }}
          >
            {/* Text Content */}
            <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4">
                Greetings. I am Allan Ilyasov.
              </p>
              {/* Paragraph 1 - Edit your background here */}
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4">
                I'm a Graduate Student pursuing an M.S. in Data Science through an accelerated 4+1 program, after completing my B.S. in Computer Science. Currently working as a Graduate Research Assistant,
                I specialize in building AI-powered applications and scalable cloud infrastructure.
              </p>

              {/* Paragraph 2 - Edit your expertise here */}
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4">
                My expertise spans full-stack development, machine learning, and AWS cloud services. I've led the development
                of Codify AI, an AI-powered programming tutor, and won a hackathon for innovative AI solutions.
              </p>

              {/* Paragraph 3 - Edit personal interests here */}
              <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                When I'm not coding, I'm contributing to Uncle Edik's Pickles, a startup I helped grow from a home-based
                operation to a national brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
