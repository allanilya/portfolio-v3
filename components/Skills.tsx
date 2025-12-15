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
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{ categoryIndex: number; skillName: string } | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCategory !== null || selectedSkill !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory, selectedSkill]);

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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSkill({ categoryIndex: index, skillName: skill.name });
                      }}
                      className={`px-3 py-1.5 ${category.colors.badge} rounded-lg text-sm font-medium transition-transform hover:scale-105 cursor-pointer`}
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
          onClick={() => setSelectedCategory(null)}
          style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div
            className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Category Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1 h-10 bg-gradient-to-b ${skillCategories[selectedCategory].colors.bg} rounded-full`}></div>
                <h3 className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedCategory].colors.text}`}>
                  {skillCategories[selectedCategory].title}
                </h3>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-6">
                {skillCategories[selectedCategory].description}
              </p>
            </div>

            {/* Skills - Horizontal Layout */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Click a skill to learn more:</h4>
              <div className="flex flex-wrap gap-3">
                {skillCategories[selectedCategory].skills.map((skill, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setSelectedSkill({ categoryIndex: selectedCategory, skillName: skill.name });
                      setSelectedCategory(null);
                    }}
                    className={`px-4 py-2 ${skillCategories[selectedCategory].colors.badge} rounded-lg text-sm md:text-base font-medium transition-all hover:scale-110 cursor-pointer shadow-md hover:shadow-lg`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto backdrop-blur-sm"
          onClick={() => setSelectedSkill(null)}
          style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div
            className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Category Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1 h-10 bg-gradient-to-b ${skillCategories[selectedSkill.categoryIndex].colors.bg} rounded-full`}></div>
                <h3 className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedSkill.categoryIndex].colors.text}`}>
                  {skillCategories[selectedSkill.categoryIndex].title}
                </h3>
              </div>
              <p className="text-gray-300 text-lg md:text-xl">
                {skillCategories[selectedSkill.categoryIndex].description}
              </p>
            </div>

            {/* All Skills - Horizontal Layout */}
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-3 text-gray-200">Select a skill:</h4>
              <div className="flex flex-wrap gap-3">
                {skillCategories[selectedSkill.categoryIndex].skills.map((skill, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      // Toggle: if clicking the same skill, hide description by setting skillName to empty
                      if (skill.name === selectedSkill.skillName) {
                        setSelectedSkill({ categoryIndex: selectedSkill.categoryIndex, skillName: '' });
                      } else {
                        setSelectedSkill({ categoryIndex: selectedSkill.categoryIndex, skillName: skill.name });
                      }
                    }}
                    className={`px-4 py-2 ${skillCategories[selectedSkill.categoryIndex].colors.badge} rounded-lg text-sm md:text-base font-medium transition-all hover:scale-110 cursor-pointer shadow-md hover:shadow-lg ${
                      skill.name === selectedSkill.skillName ? 'ring-2 ring-blue-400 scale-105' : ''
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Selected Skill Details - Only show if a skill is selected */}
            <AnimatePresence mode="wait">
              {selectedSkill.skillName && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Skill Title */}
                  <div className="flex justify-center mb-4">
                    <h4 className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedSkill.categoryIndex].colors.text}`}>
                      {selectedSkill.skillName}
                    </h4>
                  </div>

                  {/* Skill Description */}
                  <div className="text-center">
                    <p className="text-gray-300 text-lg md:text-lg leading-relaxed">
                      {skillCategories[selectedSkill.categoryIndex].skills.find(
                        skill => skill.name === selectedSkill.skillName
                      )?.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
