import { Briefcase, GraduationCap } from 'lucide-react';

const jobs = [
  { icon: Briefcase, title: 'MERN Stack Developer', company: 'Salo Tech Innovations', period: 'May 2026 - Present', points: ['Building and maintaining scalable full-stack web applications', 'Developing responsive interfaces and reliable backend services', 'Collaborating on product features, performance and code quality'], tech: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
  { icon: Briefcase, title: 'MERN Stack Developer', company: '8 Bit System Pvt. Ltd.', period: 'June 2025 - April 2026', points: ['Responsive production applications with React, Node.js and MongoDB', 'Cross-functional feature planning and implementation', 'Performance optimization that improved load times by 40%'], tech: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
  { icon: GraduationCap, title: 'Academic & Freelance Projects', company: 'Self-directed / Freelance', period: 'Jun 2024 - 2025', points: ['Full-stack products designed and shipped independently', 'Performance, accessibility and responsive UI improvements'], tech: ['JavaScript', 'React', 'Tailwind CSS'] },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 experience-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="section-heading-row mb-16">
          <div><span className="section-label block mb-3">Career path</span><h2 className="font-display text-4xl md:text-5xl font-bold text-white">Experience</h2></div>
          <div className="experience-count">03 <span>chapters</span></div>
        </div>
        <div className="experience-timeline">
          {jobs.map((job, index) => {
            const Icon = job.icon;
            return (
              <article className="experience-entry" key={job.title}>
                <div className="experience-year">0{index + 1}</div>
                <div className="experience-dot"><Icon className="w-5 h-5" /></div>
                <div className="experience-content">
                  <span className="experience-period">{job.period}</span>
                  <h3>{job.title}</h3>
                  <h4>{job.company}</h4>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <div className="experience-tech">{job.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
