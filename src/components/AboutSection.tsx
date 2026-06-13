import { ArrowUpRight, Code2, MapPin } from 'lucide-react';
import { forwardRef } from 'react';

const facts = [
  { value: '01+', label: 'Year building products' },
  { value: '05+', label: 'Live projects shipped' },
  { value: 'MERN', label: 'Primary development stack' },
];

export const AboutSection = forwardRef<HTMLElement>(function AboutSection(_, ref) {
  return (
    <section ref={ref} id="about" className="py-24 about-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="about-layout">
          <div className="about-portrait">
            <span className="about-portrait-index">ABOUT / 01</span>
            <img src="/1707530238951.jpg" alt="Manish Prajapati" loading="lazy" />
            <div className="about-location"><MapPin /> Jaipur, India</div>
          </div>

          <div className="about-copy">
            <span className="section-label">A little about me</span>
            <h2 className="font-display">Developer by craft.<br /><span>Problem solver by nature.</span></h2>
            <p className="about-lead">
              I am a MERN Stack Developer focused on building fast, practical and scalable digital products.
            </p>
            <p className="about-body">
              I enjoy taking an idea from rough requirements to a polished product, balancing clean interfaces with reliable backend architecture. My work is driven by curiosity, attention to detail and the belief that good software should feel simple to use.
            </p>

            <div className="about-principle">
              <Code2 />
              <div><span>How I work</span><strong>Think clearly. Build carefully. Improve continuously.</strong></div>
            </div>

            <div className="about-facts">
              {facts.map((fact) => (
                <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
              ))}
            </div>

            <a href="mailto:marveluniverse1942@gmail.com" className="about-link">
              Let's work together <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
