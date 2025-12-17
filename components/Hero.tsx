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

import { LucideGithub, LucideLinkedin, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 pt-25 md:pt-32 pb-12">
      <div className="max-w-4xl w-full text-center">
        {/* PROFILE PHOTO */}
        <div className="mb-4 md:mb-8 flex justify-center">
          {/*
            ADJUSTING IMAGE SIZE:
            Change w-70 h-70 on line 37 to:
            - w-32 h-32 = small (128px)
            - w-40 h-40 = medium-small (160px)
            - w-48 h-48 = medium (192px)
            - w-56 h-56 = medium-large (224px)
            - w-64 h-64 = large (256px)
            - w-72 h-72 = extra-large (288px)
            - w-80 h-80 = huge (320px)
          */}
          <div className="relative w-70 h-70 overflow-hidden rounded-full">
            <img
              src="/profilepic.jpeg"
              alt="Allan Ilyasov"
              className="absolute inset-0 w-full h-full object-cover scale-110 translate-x-3 [object-position:0%_5%]"
            />
          </div>
        </div>

        {/* NAME - Change your name here */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Allan Ilyasov
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
