import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { forwardRef } from 'react';

export const HeroSection = forwardRef<HTMLElement>(function HeroSection(_, ref) {
  return (
    <header ref={ref} id="home" className="hero-section min-h-screen relative overflow-hidden pt-0">
      <div className="hero-orange-rail" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container mx-auto px-6 lg:px-10 relative z-10 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] items-center gap-10 lg:gap-16 w-full py-20 lg:py-24">
          <div className="hero-copy order-2 lg:order-1">
            <div className="hero-kicker"><span /> Manish Prajapati</div>

            <h1 className="hero-role-ticker" aria-label="Web Developer, Web Designer, Tech Enthusiast, Problem Solver">
              <span className="hero-role-prefix">I create as a</span>
              <span className="hero-role-window" aria-hidden="true">
                <span className="hero-role-track">
                  <strong>Web Developer</strong>
                  <strong>Web Designer</strong>
                  <strong>Tech Enthusiast</strong>
                  <strong>Problem Solver</strong>
                  <strong>Web Developer</strong>
                </span>
              </span>
            </h1>

            <p className="hero-name">Based in Jaipur <span>/</span> Building for the web</p>

            <div className="hero-actions flex flex-wrap gap-3 mt-9">
              <a href="#projects" className="btn-primary px-7 py-3.5 font-semibold text-white flex items-center gap-2">
                <span>Explore my work</span><ArrowUpRight className="w-4 h-4 relative z-10" />
              </a>
              <a href="manish(december)_compressed.pdf" download className="btn-outline px-7 py-3.5 font-semibold text-white">
                Download CV
              </a>
            </div>

            <div className="hero-socials flex items-center gap-3 mt-9">
              <span className="hero-social-label">Follow</span>
              {[
                ['GitHub', 'https://github.com/codewithmanish102003', Github],
                ['LinkedIn', 'https://linkedin.com/in/manish-prajapati-651a212aa', Linkedin],
                ['Instagram', 'https://instagram.com/marvel102003', Instagram],
                ['Email', 'mailto:marveluniverse1942@gmail.com', Mail],
              ].map(([label, href, Icon]) => (
                <a key={label as string} href={href as string} target={(href as string).startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label as string}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual order-1 lg:order-2">
            <div className="hero-photo-frame">
              <div className="hero-photo-number">01</div>
              <div className="hero-photo-lines" aria-hidden="true" />
              <img src="/portfolio.png" alt="Manish Prajapati" loading="eager" fetchPriority="high" width={650} height={650} />
              <div className="hero-availability"><span /> Available for work</div>
            </div>
          </div>
        </div>
      </div>

      <a href="#experience" className="hero-scroll" aria-label="Scroll to experience">
        <ArrowDown className="w-4 h-4" />
      </a>
    </header>
  );
});
