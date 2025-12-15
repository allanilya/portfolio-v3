/**
 * SKILLS COMPONENT
 * ================
 * Displays your technical skills organized by category in a grid layout.
 *
 * What it displays:
 * - "Technical Skills" heading
 * - Cards for each skill category (Languages, Frontend, Backend, etc.)
 * - Individual skill tags within each card
 * - Gray background to separate from other sections
 *
 * How to customize:
 * - EDIT skills: Go to /lib/skillsData.ts to add/remove categories and skills
 * - Change layout: grid-cols-3 means 3 columns on desktop (line 56)
 *   - grid-cols-2 = 2 columns
 *   - grid-cols-4 = 4 columns
 */

'use client';

import { useState, useEffect } from 'react';
import { skillCategories } from '@/lib/skillsData';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCategory !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory]);

  return (
    <>
      <section id="skills" className="relative z-10 py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(index)}
                className="group bg-gray-800 rounded-xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-600 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-8 bg-gradient-to-b ${category.colors.bg} rounded-full`}></div>
                  <h3 className={`text-lg md:text-xl font-bold ${category.colors.text}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1.5 ${category.colors.badge} rounded-lg text-sm font-medium transition-transform hover:scale-105`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Modal - Outside section to avoid z-index stacking context issues */}
      {selectedCategory !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto backdrop-blur-sm"
          onClick={() => {
            setSelectedCategory(null);
            setExpandedSkill(null);
          }}
          style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div
            className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000 }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setExpandedSkill(null);
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Category Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1 h-10 bg-gradient-to-b ${skillCategories[selectedCategory].colors.bg} rounded-full`}></div>
                <h3 className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedCategory].colors.text}`}>
                  {skillCategories[selectedCategory].title}
                </h3>
              </div>
              <p className="text-gray-300 text-base md:text-lg">
                {skillCategories[selectedCategory].description}
              </p>
            </div>

            {/* Skills List */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Skills in this category:</h4>
              {skillCategories[selectedCategory].skills.map((skill, index) => (
                <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors text-left"
                  >
                    <span className={`font-medium ${skillCategories[selectedCategory].colors.text}`}>
                      {skill.name}
                    </span>
                    {expandedSkill === skill.name ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedSkill === skill.name && (
                    <div className="px-4 pb-4 pt-2 bg-gray-750 border-t border-gray-700">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
