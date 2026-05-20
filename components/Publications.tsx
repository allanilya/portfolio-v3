'use client';

import { motion } from 'framer-motion';

const publications = [
  {
    title: "Codify: An Intelligent Socratic Tutoring System for Programming Education",
    venue: "FLAIRS-39 · The International FLAIRS Conference Proceedings, Vol. 39 No. 1 (2026)",
    year: "2026",
    url: "https://doi.org/10.32473/flairs.39.1.141554",
  },
  {
    title: "AI Tutor: Transforming Education with Intelligent Learning",
    venue: "FLAIRS-38 · The International FLAIRS Conference Proceedings, Vol. 38 (2025)",
    year: "2025",
    url: "https://doi.org/10.32473/flairs.38.1.138666",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="relative z-10 pt-0 pb-20 md:pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          Publications
        </motion.h2>

        <div className="flex flex-col gap-4 md:gap-6">
          {publications.map((pub, index) => (
            <motion.a
              key={index}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="group relative bg-clear/60 rounded-xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-gray-900 font-semibold text-lg leading-snug group-hover:text-cyan-700 transition-colors duration-200"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {pub.title}
                </h3>
                <span
                  className="flex-shrink-0 text-cyan-700 text-sm font-mono mt-1"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {pub.year}
                </span>
              </div>
              <p className="text-cyan-700/80 text-s mt-1 font" style={{ fontFamily: 'Inter, sans-serif' }}>
                {pub.venue}
              </p>

              <span className="text-cyan-700 text-sm mt-3 inline-block group-hover:underline">
                Read paper →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
