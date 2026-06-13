import { ExternalLink, Github, X as CloseIcon } from 'lucide-react';
import { RefObject } from 'react';
import type { Project } from '../types';

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  closeButtonRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
};

export function ProjectModal({ project, isOpen, closeButtonRef, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#111111] border border-white/10 rounded-sm shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-52">
          <img src={`/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label="Close"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <h3 id="modal-title" className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-sm bg-orange-500/10 text-orange-300 border border-orange-500/20">{t}</span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300">
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white">
                <span><ExternalLink className="w-4 h-4 inline mr-1" />Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
