import { Award } from 'lucide-react';
import { forwardRef } from 'react';
import { achievements } from '../data/portfolio';

export const AchievementsSection = forwardRef<HTMLElement>(function AchievementsSection(_, ref) {
  return (
    <section ref={ref} id="achievements" className="py-24 achievements-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="achievements-title">
          <span className="section-label">Recognition</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Milestones & Certifications</h2>
        </div>
        <div className="achievement-wall">
          {achievements.map((achievement, index) => (
            <article className="achievement-tile" key={achievement.text}>
              <span className="achievement-index">0{index + 1}</span>
              <Award className="achievement-icon" />
              <p>{achievement.text}</p>
            </article>
          ))}
          <div className="achievement-total"><strong>5+</strong><span>Professional<br />certifications</span></div>
        </div>
      </div>
    </section>
  );
});
