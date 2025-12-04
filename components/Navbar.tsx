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

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  // Navigation items - add or remove sections here
  const navItems = [
    { name: 'About Me', href: '#about' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
  ];

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-black bg-opacity-80 backdrop-blur-md border border-green-900/30 rounded-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent hover:from-green-300 hover:to-blue-400 transition-all cursor-pointer"
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
                      ? 'text-green-400'
                      : 'text-gray-300 hover:text-green-400'
                    }
                  `}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500"></span>
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
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
