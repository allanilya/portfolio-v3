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
import { skillCategories, getColoredGlow, getCardGlow } from '@/lib/skillsData';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/contexts/AnimationContext';

// Depth layer configuration
const DEFAULT_LAYERS = 0;

// Multi-layer depth background - creates stepped shadow effect on all sides
// Each layer extends further out and gets dimmer, creating 3D depth
const DepthBackground: React.FC<{
  rgb: string; // "R,G,B" of the light source (element above)
  layers?: number; // 6-8 layers recommended
}> = ({ rgb, layers = DEFAULT_LAYERS }) => {

  const layerElements = Array.from({ length: layers }, (_, layerIndex) => {
    const depth = layerIndex;
    const depthRatio = depth / (layers - 1); // 0 to 1

    // Reflected light intensity: layers further away get dimmer
    // Creates stepped glow layers from bright to dark
    const reflectedLight = Math.pow(1 - depthRatio, 1.5) * 0.15;

    // Depth offset for parallax effect
    const offsetX = depth * 3;
    const offsetY = depth * 3;

    // Spread increases with depth - each layer extends further on all sides
    const spread = 10 + depth * 10;

    return (
      <div
        key={layerIndex}
        className="absolute pointer-events-none"
        style={{
          // Extend beyond element boundaries on all sides
          top: `-${spread}px`,
          left: `-${spread}px`,
          right: `-${spread}px`,
          bottom: `-${spread}px`,
          // Solid color layer - no patterns or gridlines
          backgroundColor: `rgba(${rgb}, ${reflectedLight})`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
          // NO blur - crisp depth layers
          zIndex: -(layers - depth),
          opacity: reflectedLight > 0.01 ? 1 : 0,
        }}
      />
    );
  });

  return <>{layerElements}</>;
};

export default function Skills() {
  const { isSkipped } = useAnimation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{ categoryIndex: number; skillName: string } | null>(null);

  // Animation variants for skill cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


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
      <style jsx>{`
        @keyframes modalScaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .modal-content-animate {
          animation: modalScaleIn 0.3s ease-out;
        }
      `}</style>

      <section id="skills" className="relative z-10 py-0 md:py-0 px-4 overflow-visible">
        {/* Fixed pixel substrate under entire section */}
        <div className="pixel-grid"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title - No voxel background needed, Tron font has pixel glow */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-cyan-400"
            style={{
              fontFamily: ' Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)"
            }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                transition={{ duration: 0.5, delay: isSkipped ? 0 : index * 0.1 }}
                onClick={() => setSelectedCategory(index)}
                className="group bg-gray-600/20 shadow-lg p-5 md:p-6 transition-all duration-300 rounded-xl transform hover:-translate-y-1 cursor-pointer relative"
               /* style={{
                  borderColor: `rgba(${category.colors.neonRgb}, 0.6)`,
                  boxShadow: `0 0 8px rgba(${category.colors.neonRgb}, 0.6), 0 0 15px rgba(${category.colors.neonRgb}, 0.3)`,
                  overflow: 'visible',
                }}*/
              >
                {/* Depth background for each card - creates 3D stepped shadow effect */}
                <DepthBackground rgb={category.colors.neonRgb} layers={DEFAULT_LAYERS} />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className={`w-1 h-8 bg-gradient-to-b ${category.colors.bg} rounded-full`}></div>
                  <h3
                    className={`text-lg md:text-xl font-bold ${category.colors.text}`}
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      textShadow: getColoredGlow(category.colors.neonRgb)
                    }}
                  >
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
                      style={{
                        textShadow: getColoredGlow(category.colors.neonRgb),
                        boxShadow: getCardGlow(category.colors.neonRgb)
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
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
            className="bg-black/80 bg-opacity-95 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-gray-100 modal-content-animate"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-600 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Category Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1 h-10 bg-gradient-to-b ${skillCategories[selectedCategory].colors.bg} rounded-full`}></div>
                <h3
                  className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedCategory].colors.text}`}
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: getColoredGlow(skillCategories[selectedCategory].colors.neonRgb)
                  }}
                >
                  {skillCategories[selectedCategory].title}
                </h3>
              </div>
              <p className="text-gray-300 text-base md:text-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                    style={{
                      textShadow: getColoredGlow(skillCategories[selectedCategory].colors.neonRgb),
                      boxShadow: getCardGlow(skillCategories[selectedCategory].colors.neonRgb)
                    }}
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
            className="bg-black/80 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-gray-100 modal-content-animate"
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
                <h3
                  className={`text-2xl md:text-3xl font-bold ${skillCategories[selectedSkill.categoryIndex].colors.text}`}
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: getColoredGlow(skillCategories[selectedSkill.categoryIndex].colors.neonRgb)
                  }}
                >
                  {skillCategories[selectedSkill.categoryIndex].title}
                </h3>
              </div>
              <p className="text-gray-300 text-lg md:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                    style={{
                      textShadow: getColoredGlow(skillCategories[selectedSkill.categoryIndex].colors.neonRgb),
                      boxShadow: getCardGlow(skillCategories[selectedSkill.categoryIndex].colors.neonRgb)
                    }}
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
                    <p className="text-gray-300 text-lg md:text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
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
