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

// Multi-layer voxel depth background - non-luminous blocks reflecting the glow from above
// Like Minecraft terrain: uniform-sized voxels, no borders, each layer reflects less light
const VoxelBackground: React.FC<{
  rgb: string; // "R,G,B" of the light source (element above)
  layers?: number; // 6-8 layers recommended
  voxelSize?: number; // Size of each voxel in pixels
}> = ({ rgb, layers = 8, voxelSize = 2 }) => {

  const layerElements = Array.from({ length: layers }, (_, layerIndex) => {
    const depth = layerIndex;
    const depthRatio = depth / (layers - 1); // 0 to 1

    // Reflected light intensity: visible pixelated gradient effect
    // Creates stepped glow layers from bright to black
    const reflectedLight = Math.pow(1 - depthRatio, 1.5) * 0.05; // Visible voxel gradient

    // Depth offset for parallax
    const offsetX = depth * 2;
    const offsetY = depth * 2;

    // Spread increases with depth
    const spread = 30 + depth * 12;

    return (
      <div
        key={layerIndex}
        className="absolute pointer-events-none"
        style={{
          // Extend beyond element boundaries
          top: `-${spread}px`,
          left: `-${spread}px`,
          right: `-${spread}px`,
          bottom: `-${spread}px`,
          // Solid connected voxels - no borders, like Minecraft blocks
          // Create grid pattern: 1px lines every voxelSize pixels
          backgroundImage: `
            linear-gradient(0deg, rgba(${rgb}, ${reflectedLight}) 0, rgba(${rgb}, ${reflectedLight}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${rgb}, ${reflectedLight}) 0, rgba(${rgb}, ${reflectedLight}) 1px, transparent 1px)
          `,
          backgroundSize: `${voxelSize}px ${voxelSize}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
          // NO blur - crisp, non-luminous voxel blocks
          zIndex: -(layers - depth),
          opacity: reflectedLight > 0.01 ? 1 : 0,
        }}
      />
    );
  });

  return <>{layerElements}</>;
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{ categoryIndex: number; skillName: string } | null>(null);

  // Helper function to get RGB values for CSS variables
  const getRgb = (color: string) => {
    return {
      'text-purple-400': '192, 132, 252',
      'text-blue-400': '96, 165, 250',
      'text-green-400': '74, 222, 128',
      'text-orange-400': '251, 146, 60',
      'text-indigo-400': '129, 140, 248',
      'text-teal-400': '45, 212, 191',
      'text-pink-400': '244, 114, 182',
    }[color] || '255, 255, 255';
  };

  // Helper function to get colored glow for skill category titles and text (pixelated/stepped glow)
  const getColoredGlow = (color: string) => {
    const rgb = getRgb(color);
    return `
      0 0 2px rgba(${rgb}, 0.9),
      0 0 15px rgba(${rgb}, 0.6),
      0 0 30px rgba(${rgb}, 0.4),
      0 0 45px rgba(${rgb}, 0.25),
      0 0 60px rgba(${rgb}, 0.15)
    `;
  };

  const getCardGlow = (color: string) => {
    const rgb = {
      'text-purple-400': '192, 132, 252',
      'text-blue-400': '96, 165, 250',
      'text-green-400': '74, 222, 128',
      'text-orange-400': '251, 146, 60',
      'text-indigo-400': '129, 140, 248',
      'text-teal-400': '45, 212, 191',
      'text-pink-400': '244, 114, 182',
    }[color];

    if (!rgb) return '';

    return `
      0 0 4px rgba(${rgb}, 0.9),
      0 0 20px rgba(${rgb}, 0.5),
      0 0 35px rgba(${rgb}, 0.3),
      0 0 50px rgba(${rgb}, 0.2)
    `;
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
        
          position: relative;
        }

        /* Layer 1: Pixel Grid Underlay */
        .neon-pixel::before {
          content: "";
          position: absolute;
          inset: -40px; /* Glow spread area */
          z-index: -1;
          pointer-events: none;

          /* Create the cube/voxel grid that light catches on */
          background-image:
            linear-gradient(90deg, rgba(var(--rgb), 0.3) 1px, transparent 1px),
            linear-gradient(0deg, rgba(var(--rgb), 0.3) 1px, transparent 1px);
          background-size: 6px 6px; /* Cube size - matches fixed grid */

          /* Neon bloom that illuminates the grid */
          filter:
            blur(28px)        /* Medium bloom - catches the grid */
            brightness(1.8)   /* Amplify the glow */
            saturate(1.5);    /* Boost color intensity */

          opacity: 0.85;
        }

        /* Layer 2: Soft Outer Bloom */
        .neon-pixel::after {
          content: "";
          position: absolute;
          inset: -60px; /* Wider spread for large diffused bloom */
          z-index: -2;
          pointer-events: none;

          /* Radial gradient for soft outer glow */
          background: radial-gradient(
            circle at center,
            rgba(var(--rgb), 0.7) 0%,
            rgba(var(--rgb), 0.35) 30%,
            rgba(var(--rgb), 0.15) 60%,
            transparent 100%
          );

          /* Large blur for wide diffusion (matches your 70px composite) */
          filter: blur(50px);
          opacity: 0.9;
        }

        /* Sharp neon core on the text itself */
        .neon-pixel {
          text-shadow:
            0 0 2px rgba(var(--rgb), 1),      /* Sharp core */
            0 0 8px rgba(var(--rgb), 0.8),    /* Close glow */
            0 0 16px rgba(var(--rgb), 0.6),   /* Medium spread */
            0 0 32px rgba(var(--rgb), 0.4);   /* Wider halo */
        }
      `}</style>

      <section id="skills" className="relative z-10 py-16 md:py-20 px-4 overflow-visible">
        {/* Fixed pixel substrate under entire section */}
        <div className="pixel-grid"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title - No voxel background needed, Tron font has pixel glow */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-cyan-400"
            style={{
              fontFamily: 'TR2N, Orbitron, monospace',
              textShadow: "0 0 2px rgba(0, 255, 255, 0.8), 0 0 70px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)"
            }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(index)}
                className="group bg-gray-800 p-5 md:p-6 transition-all duration-300 border-2 transform hover:-translate-y-1 cursor-pointer relative"
                style={{
                  borderColor: `rgba(${getRgb(category.colors.text)}, 0.6)`,
                  boxShadow: `0 0 8px rgba(${getRgb(category.colors.text)}, 0.6), 0 0 15px rgba(${getRgb(category.colors.text)}, 0.3)`,
                  overflow: 'visible',
                }}
              >
                {/* Voxel background for each card - light source is the card title */}
                <VoxelBackground rgb={getRgb(category.colors.text)} layers={8} />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className={`w-1 h-8 bg-gradient-to-b ${category.colors.bg} rounded-full`}></div>
                  <h3
                    className={`text-lg md:text-xl font-bold ${category.colors.text}`}
                    style={{
                      textShadow: getColoredGlow(category.colors.text)
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
                        textShadow: getColoredGlow(category.colors.text),
                        boxShadow: getCardGlow(category.colors.text)
                      }}
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
