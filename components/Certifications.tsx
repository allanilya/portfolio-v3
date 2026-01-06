/**
 * CERTIFICATIONS COMPONENT
 * ========================
 * Displays professional certifications with clickable badges.
 *
 * What it displays:
 * - "Certifications" heading
 * - Grid of certification badges
 * - Each badge links to the credential verification page
 * - Hover effects on badges
 *
 * How to customize:
 * - Add new certifications: Add to the certifications array (lines 18-36)
 * - Change grid layout: Modify grid-cols-3 on line 48 (2 = 2 columns, 4 = 4 columns)
 * - Adjust badge size: Change max-w-xs on line 51
 * - Change hover effect: Edit transform-scale on line 52
 */

export default function Certifications() {
  // ADD YOUR CERTIFICATIONS HERE
  const certifications = [
    {
      name: 'AWS Academy Graduate - Cloud Foundations',
      image: '/aws-academy-graduate-cloud-foundations-training-bad.png',
      link: 'https://www.credly.com/badges/82f8f7b0-1d0e-42b8-a393-42d133ba1bb5/print',
    },
    {
      name: 'AWS Academy Graduate - Machine Learning Foundations',
      image: '/aws-academy-graduate-machine-learning-foundations-t.png',
      link: 'https://www.credly.com/badges/0554d3d1-4cf0-45ae-b7b9-f41477c6dada/print',
    },
    {
      name: 'Databricks Fundamentals',
      image: '/Databrick-fundamentals-badge.png',
      link: 'https://credentials.databricks.com/307cb6f5-a9e0-4c69-a446-845527a6a0e1#acc.3w4lyiBh',
    },
  ];

  return (
    <section id="certifications" className="relative z-10 py-0 md:py-22 pb-58 md:pb-64 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-cyan-400"
          style={{
            fontFamily: 'Orbitron, monospace'
          }}
        >
          Certifications
        </h2>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-2 sm:p-4 md:p-6 bg-clear/60 rounded-lg shadow-xl hover:shadow-xl transition-all duration-300 hover:scale-105 h-full"
              style={{

              }}
            >
              <div className="w-full aspect-square flex items-center justify-center mb-2 sm:mb-3 md:mb-4 flex-shrink-0 p-2">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-center text-xs sm:text-sm font-medium text-gray-700 mt-auto px-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {cert.name}
              </p>
              <p className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                View Credential →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
