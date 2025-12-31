/**
 * FOOTER COMPONENT
 * ================
 * Footer section with name and additional information.
 *
 * What it displays:
 * - Social links
 * - Name and copyright
 * - Built with information
 *
 * How to customize:
 * - Change social links starting at line 23
 * - Adjust spacing with py-16 classes on line 20
 * - Change name on line 47
 */

import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 md:py-20 px-4 mt-24 md:mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/allanilya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/allan-ilyasov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:allanilyasov@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Name and Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Allan Ilyasov. All rights reserved.
          </p>

          {/* Built With */}
          <p className="text-gray-500 text-xs">
            Built with Next.js, Tailwind CSS, and TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
