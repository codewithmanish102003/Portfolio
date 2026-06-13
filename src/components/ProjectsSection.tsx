import { ArrowUpRight } from 'lucide-react';
import { forwardRef } from 'react';
import { workProjects } from '../data/portfolio';
import type { Project } from '../types';

type ProjectsSectionProps = { onSelectProject: (project: Project) => void };

export const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>(function ProjectsSection({ onSelectProject }, ref) {
  return (
    <section ref={ref} id="projects" className="py-24 relative project-gallery-section">
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="section-heading-row mb-12">
          <div>
            <span className="section-label block mb-3">Selected work</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Projects in Frames</h2>
          </div>
          <p>A visual collection of products I have designed and developed.</p>
        </div>

        <div className="project-gallery project-gallery-refined">
          {workProjects.slice(0, 5).map((project, index) => (
            <button
              key={project.title}
              type="button"
              className={`project-card project-frame project-frame-${index + 1}`}
              onClick={() => onSelectProject(project)}
              aria-label={`View ${project.title}`}
            >
              <img src={`/${project.image}`} alt={project.title} loading="lazy" />
              <span className="project-frame-shade" />
              <span className="project-frame-index">0{index + 1}</span>
              {index === 0 && <span className="project-featured-label">Featured</span>}
              <span className="project-frame-caption">
                <span>
                  <small>{project.tech.slice(0, 2).join(' / ')}</small>
                  <strong>{project.title}</strong>
                </span>
                <i><ArrowUpRight className="w-5 h-5" /></i>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});
