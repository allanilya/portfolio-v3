'use client';

/**
 * NAVBAR COMPONENT
 * ================
 * Sticky navigation bar at the top of the page with smooth scrolling to sections.
 *
 * What it displays:
 * - Your name/logo on the left
 * - Navigation links to different sections (About, Skills, Projects)
 * - Smooth scroll animation when clicking links
 * - Sticky header that stays at top when scrolling
 *
 * How to customize:
 * - Name: Change "Allan Ilyasov" on line 40
 * - Links: Add/remove navigation items in the navItems array (lines 26-30)
 * - Colors: Change bg-black/bg-opacity to adjust transparency
 * - Height: Adjust py-4 padding on line 37
 * - Font: Change text sizes in className attributes
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/contexts/AnimationContext';

export default function Navbar() {
  const { isSkipped } = useAnimation();
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isScrollingRef = useRef(false);

  // Detect mobile screen size (matches Hero component)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show navbar when Hero reveal phase begins
  useEffect(() => {
    if (isSkipped) {
      // If animations are skipped, show immediately
      setIsVisible(true);
      return;
    }

    const revealDelay = isMobile ? 10300 : 9600; // Match Hero component timing
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, revealDelay);

    return () => clearTimeout(timer);
  }, [isMobile, isSkipped]);

  // Navigation items - add or remove sections here
  const navItems = [
    { name: 'About Me', href: '#about' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
  ];

  /**
   * Smoothly scrolls to a section when a navigation link is clicked
   * @param e - The mouse click event
   * @param href - The target section's href (e.g., '#about')
   */
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Calculate position with offset for navbar height + padding
      const navbarHeight = 100; // Navbar height + padding to prevent title cutoff
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      // Set active section immediately when clicking
      const sectionId = href.substring(1);
      setActiveSection(sectionId);

      // Prevent scroll handler from overriding during smooth scroll
      isScrollingRef.current = true;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll detection after smooth scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Smooth scroll typically takes ~500-800ms
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    /**
     * Updates the active section indicator based on current scroll position
     */
    const handleScroll = () => {
      // Skip scroll detection during navbar-initiated smooth scrolling
      if (isScrollingRef.current) return;

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY;
      const navbarOffset = 100; // Same offset used in scrollToSection

      // Clear active section when in Hero section (top of page)
      const aboutElement = document.getElementById('about');
      if (aboutElement && scrollPosition < aboutElement.offsetTop - navbarOffset) {
        setActiveSection('');
        return;
      }

      // Find the section that is currently most visible
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          // If we've scrolled past this section's start (accounting for navbar offset)
          if (scrollPosition >= offsetTop - navbarOffset) {
            currentSection = section;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-4 left-4 right-4 z-15 bg-black/60 backdrop-blur-md border border-green-900/30 rounded-xl shadow-lg"
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ opacity: { duration: 0.8 }, pointerEvents: { delay: isVisible ? 0.8 : 0 } }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)"
            }}
          >
            Allan Ilyasov
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-all
                    ${isActive
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                    }
                  `}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-green-400"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu?.classList.toggle('hidden');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-black bg-opacity-95 border-t border-green-900/30 rounded-b-xl">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  scrollToSection(e, item.href);
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className={`
                  block px-3 py-2 text-base font-medium rounded-md
                  ${isActive
                    ? 'text-green-400 bg-green-900/20'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-900/10'
                  }
                `}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
