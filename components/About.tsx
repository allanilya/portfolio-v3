/**
 * ABOUT COMPONENT
 * ===============
 * Brief biography section that appears after the Hero section.
 *
 * What it displays:
 * - "About Me" heading
 * - 2-3 paragraphs about your background
 * - White card with shadow on light mode, gray card on dark mode
 *
 * How to customize:
 * - Change the text in the <p> tags (lines 23-34)
 * - Add more paragraphs by copying the <p> tag structure
 * - Adjust card color: Change bg-white and dark:bg-gray-800
 * - Adjust text size: Change text-lg to text-base (smaller) or text-xl (larger)
 * - Adjust padding: Change p-8 to p-6 (less) or p-10 (more)
 */

export default function About() {
  return (
    <section id="about" className="relative z-10 py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</h2>

        {/* Content Card */}
        <div className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-lg">
          {/* Profile Picture + Text Layout */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src="/profilepic.jpeg"
                alt="Allan Ilyasov"
                className="absolute inset-0 w-full h-full object-cover scale-110 translate-x-3 [object-position:0%_5%]"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              {/* Paragraph 1 - Edit your background here */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                I'm a Graduate Student pursuing an M.S. in Data Science through an accelerated 4+1 program, after completing my B.S. in Copmputer Science. Currently working as a Graduate Research Assistant,
                I specialize in building AI-powered applications and scalable cloud infrastructure.
              </p>

              {/* Paragraph 2 - Edit your expertise here */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                My expertise spans full-stack development, machine learning, and AWS cloud services. I've led the development
                of Codify AI, an AI-powered programming tutor, and won a hackathon for innovative AI solutions.
              </p>

              {/* Paragraph 3 - Edit personal interests here */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
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
