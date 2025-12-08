/**
 * PROJECTS COMPONENT
 * ==================
 * Interactive carousel that displays your GitHub projects.
 *
 * What it displays:
 * - "Projects" heading
 * - Carousel with left/right arrows (if more than 3 projects)
 * - Project cards showing title, description, and tech stack preview
 * - Click any card to open a modal with full details
 *
 * How to add/edit projects:
 * - Go to /lib/projects.ts and edit the projects array
 * - Each project needs: id, title, description, techStack, githubUrl, liveUrl (optional)
 *
 * How to customize:
 * - Change number of visible cards: Modify grid-cols-3 on line 68
 * - Change card colors: Edit bg-white and dark:bg-gray-800
 * - Change tech stack tag colors: Edit bg-blue-100 (lines 80-85)
 * - Remove carousel arrows: Delete lines 35-55
 */

'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Advances the carousel to the next project in the main view
   */
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  /**
   * Moves the carousel to the previous project in the main view
   */
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  /**
   * Gets the array index of the currently selected project in the modal
   * @returns The index of the selected project, or -1 if no project is selected
   */
  const getCurrentProjectIndex = () => {
    if (selectedProject === null) return -1;
    return projects.findIndex((p) => p.id === selectedProject);
  };

  /**
   * Navigates to the next project in the modal view
   */
  const nextProjectInModal = () => {
    const currentIdx = getCurrentProjectIndex();
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % projects.length;
    setSelectedProject(projects[nextIdx].id);
  };

  /**
   * Navigates to the previous project in the modal view
   */
  const prevProjectInModal = () => {
    const currentIdx = getCurrentProjectIndex();
    if (currentIdx === -1) return;
    const prevIdx = (currentIdx - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIdx].id);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedProject === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIdx = projects.findIndex((p) => p.id === selectedProject);
      if (currentIdx === -1) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (currentIdx - 1 + projects.length) % projects.length;
        setSelectedProject(projects[prevIdx].id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIdx + 1) % projects.length;
        setSelectedProject(projects[nextIdx].id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  /**
   * Gets the subset of projects to display in the carousel
   * @returns All projects if there are 3 or fewer, otherwise returns the previous, current, and next projects
   */
  const getVisibleProjects = () => {
    if (projects.length <= 3) return projects;

    const prev = (currentIndex - 1 + projects.length) % projects.length;
    const next = (currentIndex + 1) % projects.length;

    return [projects[prev], projects[currentIndex], projects[next]];
  };

  return (
    <section id="projects" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Projects
        </h2>
        {/* Carousel Controls */}
        <div className="relative">
          {projects.length > 3 && (
            <>
              <button
                onClick={prevProject}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 min-h-[440px]">
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden ${
                  !project.liveUrl ? 'self-start' : ''
                }`}
              >
                {/* Preview Section */}
                {project.liveUrl && (
                  <div
                    className="relative w-full h-48 bg-gray-100 dark:bg-gray-900 overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank');
                    }}
                  >
                    <iframe
                      src={project.liveUrl}
                      className="w-full h-full border-0 pointer-events-none"
                      style={{
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        width: '200%',
                        height: '200%'
                      }}
                      title={`${project.title} Preview`}
                      sandbox="allow-same-origin allow-scripts"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-lg flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Open Live Site</span>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.liveUrl && (
                      <ExternalLink className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Github className="w-4 h-4" />
                    <span>Click to view details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots for Main Carousel */}
          {projects.length > 3 && (
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index
                      ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            onClick={() => setSelectedProject(null)}
            style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {/* Navigation Arrows - Outside modal box */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevProjectInModal();
                  }}
                  className="absolute left-4 md:left-90 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200 dark:border-gray-700 z-[10001]"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextProjectInModal();
                  }}
                  className="absolute right-4 md:right-90 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200 dark:border-gray-700 z-[10001]"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative mx-16 md:mx-20 lg:mx-24"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 10000 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {projects.find((p) => p.id === selectedProject) && (
                <>
                  <h3 className="text-3xl font-bold mb-4">
                    {projects.find((p) => p.id === selectedProject)!.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {projects.find((p) => p.id === selectedProject)!.description}
                  </p>

                  {/* Live Preview */}
                  {projects.find((p) => p.id === selectedProject)!.liveUrl && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3">Live Preview</h4>
                      <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            {projects.find((p) => p.id === selectedProject)!.liveUrl}
                          </span>
                        </div>
                        <iframe
                          src={projects.find((p) => p.id === selectedProject)!.liveUrl}
                          className="w-full h-[400px] border-0"
                          title={`${projects.find((p) => p.id === selectedProject)!.title} Preview`}
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects
                        .find((p) => p.id === selectedProject)!
                        .techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {projects.find((p) => p.id === selectedProject)!.githubUrl && (
                      <a
                        href={projects.find((p) => p.id === selectedProject)!.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </a>
                    )}
                    {projects.find((p) => p.id === selectedProject)!.liveUrl && (
                      <a
                        href={projects.find((p) => p.id === selectedProject)!.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Open in New Tab
                      </a>
                    )}
                  </div>

                  {/* Navigation Dots */}
                  {projects.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      {projects.map((project, index) => {
                        const currentIdx = getCurrentProjectIndex();
                        return (
                          <button
                            key={project.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project.id);
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${
                              currentIdx === index
                                ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
