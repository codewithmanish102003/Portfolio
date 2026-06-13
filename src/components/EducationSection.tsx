import { forwardRef } from 'react';
import { education } from '../data/portfolio';

export const EducationSection = forwardRef<HTMLElement>(function EducationSection(_, ref) {
  return (
    <section ref={ref} id="education" className="py-24 education-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="education-header">
          <span className="section-label">Academic background</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Education</h2>
          <p>Formal learning that shaped my technical foundation and problem-solving approach.</p>
        </div>
        <div className="education-records">
          {education.map((edu, index) => (
            <article className="education-record" key={edu.title}>
              <span className="education-level">{edu.level}</span>
              <div className="education-main">
                <span>0{index + 1}</span>
                <h3>{edu.title}</h3>
                <p>{edu.institution}</p>
              </div>
              <strong>{edu.detail}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
