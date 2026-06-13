import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

type SectionRefs = {
  skillsRef: RefObject<HTMLElement>;
  projectsRef: RefObject<HTMLElement>;
  educationRef: RefObject<HTMLElement>;
  achievementsRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
};

export function usePortfolioAnimations(
  refs: SectionRefs,
  setShowScrollTop: (value: boolean) => void,
  setActiveSection: (value: string) => void,
) {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero-kicker', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-role-ticker', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-name', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.35')
      .fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-socials', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero-photo-frame', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1');

    gsap.to('.hero-photo-frame img', {
      y: -12,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const fadeUp = (el: Element | null, trigger: Element | null) => {
      if (!el || !trigger) return;
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        scrollTrigger: { trigger, start: 'top 82%', toggleActions: 'play none none none' },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    [
      refs.skillsRef,
      refs.projectsRef,
      refs.educationRef,
      refs.achievementsRef,
      refs.aboutRef,
    ].forEach((r) => fadeUp(r.current, r.current));

    gsap.fromTo('.skill-card', { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: refs.skillsRef.current, start: 'top 78%' },
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.fromTo('.project-card', { y: 50, opacity: 0 }, {
      scrollTrigger: { trigger: refs.projectsRef.current, start: 'top 78%' },
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'achievements'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refs, setActiveSection, setShowScrollTop]);
}
