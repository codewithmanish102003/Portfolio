import { forwardRef } from 'react';
import { skills } from '../data/portfolio';

export const SkillsSection = forwardRef<HTMLElement>(function SkillsSection(_, ref) {
  return (
    <section ref={ref} id="skills" className="py-24 skills-index-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="skills-layout">
          <div className="skills-intro">
            <span className="section-label block mb-3">Capabilities</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Tools I use to build.</h2>
            <p>From interface to database, I work across the complete product stack.</p>
          </div>
          <div className="skills-list">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div className="skill-card skill-row" key={skill.title}>
                  <span className="skill-number">0{index + 1}</span>
                  <Icon className="skill-icon" />
                  <div>
                    <h3>{skill.title}</h3>
                    <p>{skill.skills}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
