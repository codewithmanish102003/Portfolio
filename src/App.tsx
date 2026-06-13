import { useEffect, useMemo, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { AchievementsSection } from './components/AchievementsSection';
import { AboutSection } from './components/AboutSection';
import { BackgroundLayer } from './components/BackgroundLayer';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { StatsBar } from './components/StatsBar';
import { SkillsSection } from './components/SkillsSection';
import { usePortfolioAnimations } from './hooks/usePortfolioAnimations';
import './styles/portfolio.css';
import type { Project } from './types';

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const dialogCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, setActiveSection] = useState('home');

  const animationRefs = useMemo(() => ({
    skillsRef,
    projectsRef,
    educationRef,
    achievementsRef,
    aboutRef,
  }), []);

  usePortfolioAnimations(animationRefs, setShowScrollTop, setActiveSection);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        e.preventDefault();
        closeModal();
      }
    };

    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => dialogCloseBtnRef.current?.focus(), 0);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen text-white font-['DM_Sans',sans-serif] relative" style={{ background: 'transparent', zIndex: 0 }}>
      <BackgroundLayer />
      <ScrollToTopButton visible={showScrollTop} onClick={scrollToTop} />
      <Navigation
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((value) => !value)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <HeroSection ref={heroRef} />
      <StatsBar />
      <AboutSection ref={aboutRef} />
      <ExperienceSection />
      <SkillsSection ref={skillsRef} />
      <ProjectsSection ref={projectsRef} onSelectProject={openProject} />
      <ProjectModal project={selectedProject} isOpen={modalOpen} closeButtonRef={dialogCloseBtnRef} onClose={closeModal} />
      <EducationSection ref={educationRef} />
      <AchievementsSection ref={achievementsRef} />
      <Footer />
    </div>
  );
}

export default App;
