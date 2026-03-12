import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUp, BrainIcon, X as CloseIcon, Code2, Database,
  ExternalLink, Github, Instagram, Layout, Linkedin, Mail, Menu,
  RocketIcon, Server, X, MapPin, Phone, ChevronRight,
  Briefcase, GraduationCap, Award, Layers
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const dialogCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const [_activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkDeviceSize = () => setIsSmallDevice(window.innerWidth < 768);
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) { e.preventDefault(); closeModal(); }
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => dialogCloseBtnRef.current?.focus(), 0);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-role', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-bio', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-socials', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero-image-wrap', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1');

    // Floating image
    gsap.to('.hero-image-wrap img', {
      y: -12, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1
    });

    // Scroll animations
    const fadeUp = (el: Element | null, trigger: Element | null) => {
      if (!el || !trigger) return;
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        scrollTrigger: { trigger, start: 'top 82%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out'
      });
    };

    [skillsRef, projectsRef, educationRef, achievementsRef, contactRef].forEach(r => fadeUp(r.current, r.current));

    gsap.fromTo('.skill-card', { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: skillsRef.current, start: 'top 78%' },
      y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out'
    });

    gsap.fromTo('.project-card', { y: 50, opacity: 0 }, {
      scrollTrigger: { trigger: projectsRef.current, start: 'top 78%' },
      y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out'
    });

    // Scroll indicator
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const sections = ['home', 'experience', 'skills', 'projects', 'education', 'achievements', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (form.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) { setSending(false); return; }
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const closeModal = () => { setModalOpen(false); setSelectedProject(null); };

  const navLinks = [
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const skills = [
    { icon: Code2, title: "Languages", skills: "JavaScript, TypeScript, Python, C, C++, Java", color: "from-sky-500 to-blue-600" },
    { icon: Layout, title: "Frontend", skills: "React.js, Next.js, HTML5, CSS3, Tailwind, Bootstrap", color: "from-violet-500 to-purple-600" },
    { icon: Server, title: "Backend", skills: "Node.js, Express.js, Django, REST API, GraphQL", color: "from-emerald-500 to-teal-600" },
    { icon: Database, title: "Database", skills: "MongoDB, MySQL, Mongoose", color: "from-amber-500 to-orange-600" },
    { icon: Layers, title: "Tools & Platforms", skills: "Git, GitHub, VS Code, Postman, Netlify, Vercel, Cloudinary", color: "from-rose-500 to-pink-600" },
    { icon: RocketIcon, title: "Currently Learning", skills: "Next.js, SEO Optimization, System Design, Flask", color: "from-cyan-500 to-sky-600" },
    { icon: BrainIcon, title: "Future Goals", skills: "AI, Machine Learning, Deep Learning, Blockchain", color: "from-indigo-500 to-violet-600" },
  ];

  const workProjects: Project[] = [
    {
      title: "Time To Legal — CRM Management System",
      description: "A comprehensive CRM platform for employee task tracking, attendance management, and workflow automation.",
      image: "timetolegal.png",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      github: "#",
      live: "https://ttl.timetolegal.com/login",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Electronic Prescriber — E-Prescription System",
      description: "Secure digital prescription platform connecting healthcare providers and pharmacies with end-to-end encryption.",
      image: "eps.png",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      github: "#",
      live: "https://doserx.dosedefence.com",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Dosedefence — Pharmacy Management",
      description: "Centralized pharmacy operations platform with inventory control, sales tracking, and customer management.",
      image: "dosedefence.png",
      tech: ["TypeScript", "React", "Node.js", "MongoDB", "Tailwind"],
      github: "#",
      live: "https://dosedefence.com",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      title: "Particle14 — IT Solutions Provider",
      description: "Corporate website for an IT solutions company, showcasing services with a polished, modern interface.",
      image: "particle14.png",
      tech: ["React", "Node.js", "Tailwind"],
      github: "#",
      live: "https://particle14.com/",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Nidhi Corporation Tech",
      description: "Full-featured corporate platform for an IT services firm with lead capture and service showcasing.",
      image: "nidhicorporationtech.png",
      tech: ["React", "Node.js", "Tailwind"],
      github: "#",
      live: "https://nidhicorporationtech.com/",
      gradient: "from-amber-500 to-orange-600"
    },
  ];

  const education = [
    { level: "BCA", title: "Bachelor of Computer Application", institution: "University of Rajasthan", detail: "CGPA 8.4 · 2025", color: "from-blue-500 to-indigo-600", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { level: "XII", title: "Senior Secondary (RBSE)", institution: "Welfare Academy", detail: "89.20% · 2022", color: "from-emerald-500 to-teal-600", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { level: "X", title: "Secondary (RBSE)", institution: "Sharda Vidhya Bhawan Sr. Sec. School", detail: "89.67% · 2020", color: "from-violet-500 to-purple-600", badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  ];

  const achievements = [
    { text: "Certified in SmartCom 2023 and Namaste Web3 from Jaipur", accent: "blue" },
    { text: "Completed Upflairs Pvt Ltd Web Development and Designing program (2024)", accent: "emerald" },
    { text: "Achieved certification in Cloud Computing Basics from Scaler Academy", accent: "amber" },
    { text: "Completed Web Development and Designing from Broadcast Engineering Consultants India Limited (2024)", accent: "rose" },
    { text: "Certified in All India National Creativity Aptitude Test by Naukri (2025)", accent: "violet" },
  ];

  const accentClass: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white font-['DM_Sans',sans-serif]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@600;700;800&display=swap');
        
        :root {
          --accent: #4F8EF7;
          --accent2: #7C3AED;
          --surface: #111827;
          --surface2: #1a2236;
          --border: rgba(255,255,255,0.07);
          --text-muted: #94a3b8;
        }
        
        * { box-sizing: border-box; }
        
        html { scroll-behavior: smooth; }
        
        .font-display { font-family: 'Playfair Display', serif; }
        
        .nav-link-active::after {
          width: 100% !important;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #4F8EF7 0%, #A78BFA 50%, #F472B6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-glass {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4F8EF7, #7C3AED);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #7C3AED, #4F8EF7);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary span { position: relative; z-index: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(79,142,247,0.35); }
        
        .btn-outline {
          background: transparent;
          border: 1.5px solid rgba(79,142,247,0.4);
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          border-color: #4F8EF7;
          background: rgba(79,142,247,0.08);
          transform: translateY(-2px);
        }
        
        .project-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          border-color: rgba(79,142,247,0.3);
        }
        
        .skill-card {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-card:hover {
          transform: translateY(-4px);
          border-color: rgba(79,142,247,0.3) !important;
        }
        
        .timeline-dot {
          position: relative;
        }
        .timeline-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4F8EF7, #7C3AED);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .timeline-dot:hover::before { opacity: 0.3; }
        
        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        
        .glow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4F8EF7;
          box-shadow: 0 0 8px #4F8EF7, 0 0 20px rgba(79,142,247,0.4);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        
        @keyframes scroll-cue {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        
        .scroll-cue { animation: scroll-cue 1.6s ease-in-out infinite; }
        
        .section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }
        
        input, textarea {
          background: rgba(17,24,39,0.8) !important;
          border: 1.5px solid rgba(255,255,255,0.08) !important;
          transition: border-color 0.25s ease, box-shadow 0.25s ease !important;
        }
        input:focus, textarea:focus {
          outline: none !important;
          border-color: rgba(79,142,247,0.5) !important;
          box-shadow: 0 0 0 3px rgba(79,142,247,0.1) !important;
        }
        input.error, textarea.error {
          border-color: rgba(248,113,113,0.5) !important;
        }
        
        .mesh-bg {
          background: 
            radial-gradient(ellipse 80% 50% at 20% 10%, rgba(79,142,247,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(244,114,182,0.04) 0%, transparent 70%);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1E; }
        ::-webkit-scrollbar-thumb { background: rgba(79,142,247,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(79,142,247,0.5); }
      `}</style>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full btn-primary flex items-center justify-center shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0" style={{ background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-base font-semibold tracking-tight text-white/90 hover:text-white transition-colors">
              <span className="gradient-text font-display">MP</span>
              <span className="text-white/50 mx-2">·</span>
              <span className="font-light">Manish Prajapati</span>
            </a>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <a
                href="manish(december)_compressed.pdf"
                download
                className="btn-primary text-sm font-medium px-5 py-2 rounded-lg text-white"
              >
                <span>Resume</span>
              </a>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-5 border-t border-white/5">
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="manish(december)_compressed.pdf" download className="btn-primary text-sm font-medium px-5 py-2.5 rounded-lg text-white text-center mt-1">
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <header ref={heroRef} id="home" className="min-h-screen flex items-center relative overflow-hidden pt-5" style={{ background: '#0A0F1E' }}>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 py-20">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <div className="hero-badge inline-flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                <span className="glow-dot"></span>
                <span className="section-label">Open to opportunities</span>
              </div>

              <h1 className="hero-name font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] mb-5">
                <span className="block text-white">Manish</span>
                <span className="block gradient-text">Prajapati</span>
              </h1>

              <h2 className="hero-role text-xl md:text-2xl font-light text-slate-300 mb-6 tracking-wide">
                MERN Stack Developer
                <span className="text-white/20 mx-3">·</span>
                <span className="text-slate-400">Problem Solver</span>
                <span className="text-white/20 mx-3">·</span>
                <span className="text-slate-400">Tech Enthusiast</span>
              </h2>

              <p className="hero-bio text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 text-base md:text-lg">
                I engineer exceptional digital experiences with modern web technologies. 
                Specializing in the MERN stack, I transform complex problems into elegant, 
                scalable solutions that drive real business impact.
              </p>

              <div className="hero-cta flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-10">
                <a href="#contact" className="btn-primary px-8 py-3.5 rounded-lg font-semibold text-white flex items-center gap-2">
                  <span>Let's Work Together</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#projects" className="btn-outline px-8 py-3.5 rounded-lg font-medium text-slate-300">
                  View Projects
                </a>
              </div>

              <div className="hero-socials flex items-center gap-5 justify-center lg:justify-start">
                <a href="https://github.com/codewithmanish102003" target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/manish-prajapati-651a212aa" target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/marvel102003" target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:marveluniverse1942@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <a href="tel:9649527632" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">9649527632</span>
                </a>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Jaipur, India</span>
                </div>
              </div>
            </div>

            {/* Mobile image */}
            <div className="lg:hidden flex justify-center w-full order-1">
              <div className="hero-image-wrap relative">
                <div className="absolute -inset-3 rounded-full" style={{ background: 'conic-gradient(from 0deg, #4F8EF7, #7C3AED, #F472B6, #4F8EF7)', opacity: 0.15, filter: 'blur(12px)' }}></div>
                <div className="relative rounded-full overflow-hidden w-44 h-44 border-2 border-white/10">
                  <img src="\1707530238951.jpg" alt="Manish Prajapati" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 flex items-center gap-1.5 bg-[#111827] border border-white/10 rounded-full px-3 py-1.5 text-xs font-medium">
                  <span className="glow-dot"></span> Available
                </div>
              </div>
            </div>

            {/* Desktop image */}
            <div className="hidden lg:flex flex-shrink-0 relative order-2 justify-center">
              <div className="absolute -inset-12"></div>
              <div className="relative">
                <div className="absolute -inset-2 " ></div>
                <img
                  src="\portfolio.png"
                  alt="Manish Prajapati"
                  className="relative w-96 h-96 xl:w-[550px] xl:h-[550px] object-contain"
                  loading="eager"
                />
                <div className="absolute -bottom-4 -left-6 card-glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl" style={{ mixBlendMode: 'normal' }}>
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Current Role</div>
                    <div className="text-sm text-white font-semibold">MERN Developer</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-6 card-glass rounded-xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="glow-dot"></span>
                    <span className="text-xs text-slate-400">Status</span>
                  </div>
                  <div className="text-sm text-white font-semibold">Available for work</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-600 tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent scroll-cue"></div>
        </div>
      </header>

      {/* ── STATS BAR ── */}
      <div className="bg-[#111827] border-y border-white/5 py-6">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: "1+", label: "Years Experience" },
              { value: "5+", label: "Live Projects" },
              { value: "8.4", label: "CGPA Score" },
              { value: "5+", label: "Certifications" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text font-display">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 tracking-wide uppercase font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WORK EXPERIENCE ── */}
      <section id="experience" className="py-24 relative" style={{ background: '#0A0F1E' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="section-label block mb-3">Career</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Work Experience</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {/* Job 1 */}
            <div className="card-glass rounded-2xl p-8 hover:border-blue-500/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">MERN Stack Developer</h3>
                      <p className="text-blue-400 font-medium mt-0.5">8 Bit System Pvt. Ltd.</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      June 2025 – Present
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Developed and maintained responsive web applications using React, Node.js, and MongoDB",
                      "Collaborated with cross-functional teams to design and implement new features",
                      "Optimized application performance, improving load times by 40%",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                        <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "MongoDB", "Express.js", "TypeScript"].map(t => (
                      <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/15">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="card-glass rounded-2xl p-8 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Academic & Freelance Projects</h3>
                      <p className="text-violet-400 font-medium mt-0.5">Self-directed / Freelance</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 self-start">
                      Jun 2024 – 2025
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Built full-stack applications with React, Node.js, and MongoDB",
                      "Improved application performance and load times through optimization",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                        <ChevronRight className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "React", "Tailwind CSS"].map(t => (
                      <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/15">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section ref={skillsRef} id="skills" className="py-24" style={{ background: '#0D1426' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="section-label block mb-3">Capabilities</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Technical Expertise</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          {isSmallDevice ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="skill-card card-glass rounded-2xl p-6 border border-white/5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{skill.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{skill.skills}</p>
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
              autoplay={{ delay: 2800, disableOnInteraction: false }}
              loop={true}
              className="!pb-4"
            >
              {skills.map((skill, i) => (
                <SwiperSlide key={i}>
                  <div className="skill-card card-glass rounded-2xl p-6 border border-white/5 m-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{skill.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{skill.skills}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section ref={projectsRef} id="projects" className="py-24 relative" style={{ background: '#0A0F1E' }}>
        <div className="absolute inset-0 mesh-bg pointer-events-none"></div>
        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <div className="mb-16">
            <span className="section-label block mb-3">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"></div>
            <p className="text-slate-400 max-w-2xl text-base">
              A curated selection of production-grade applications I've designed and developed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workProjects.map((project, index) => (
              <div
                key={index}
                className="project-card card-glass rounded-2xl overflow-hidden cursor-pointer border border-white/5"
                role="button" tabIndex={0}
                aria-label={`View ${project.title}`}
                onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); setModalOpen(true); } }}
              >
                <div className="relative h-52 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-15`}></div>
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2" onClick={e => e.stopPropagation()}>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                        aria-label="Live demo">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                        aria-label="GitHub">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-white mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)' }}
          onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="relative h-52">
              <img src={`/${selectedProject.image}`} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
              <button ref={dialogCloseBtnRef} onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Close">
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <h3 id="modal-title" className="text-xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t: string, i: number) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{t}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {selectedProject.github && selectedProject.github !== '#' && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                )}
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white">
                    <span><ExternalLink className="w-4 h-4 inline mr-1" />Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDUCATION ── */}
      <section ref={educationRef} id="education" className="py-24" style={{ background: '#0D1426' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="section-label block mb-3">Background</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Education</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Education Cards */}
            <div className="lg:col-span-2 space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="card-glass rounded-2xl p-6 flex items-center gap-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center flex-shrink-0 font-bold text-white text-sm shadow-lg`}>
                    {edu.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{edu.title}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                  </div>
                  <span className={`hidden sm:inline text-xs font-semibold px-3 py-1.5 rounded-full border flex-shrink-0 ${edu.badge}`}>
                    {edu.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Side - Education Stats */}
            <div className="hidden lg:flex flex-col gap-6">
              <div className="card-glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">Academic Journey</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold gradient-text font-display">8.4</div>
                    <p className="text-xs text-slate-400 mt-1">Current CGPA</p>
                  </div>
                  <div className="h-px bg-white/10"></div>
                  <div>
                    <div className="text-sm text-slate-300 font-medium">3 Levels Completed</div>
                    <p className="text-xs text-slate-500 mt-1">X, XII, BCA</p>
                  </div>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">Highlights</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span className="text-slate-300">Active learner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span className="text-slate-300">5+ Certifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section ref={achievementsRef} id="achievements" className="py-24" style={{ background: '#0A0F1E' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="section-label block mb-3">Recognition</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Achievements</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Achievements List */}
            <div className="lg:col-span-2 space-y-4">
              {achievements.map((ach, i) => (
                <div key={i} className={`flex items-start gap-4 card-glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${accentClass[ach.accent]}`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed pt-1">{ach.text}</p>
                </div>
              ))}
            </div>

            {/* Right Side - Achievement Stats */}
            <div className="hidden lg:flex flex-col gap-6">
              <div className="card-glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-white">Certifications</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold gradient-text font-display">5+</div>
                    <p className="text-xs text-slate-400 mt-1">Professional Certifications</p>
                  </div>
                  <div className="h-px bg-white/10"></div>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p>✓ SmartCom 2023</p>
                    <p>✓ Namaste Web3</p>
                    <p>✓ Cloud Computing</p>
                    <p>✓ Web Development</p>
                    <p>✓ Creativity Aptitude</p>
                  </div>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <RocketIcon className="w-5 h-5 text-rose-400" />
                  <h3 className="font-semibold text-white">Growth</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">→</span>
                    <span className="text-slate-300">Continuous learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">→</span>
                    <span className="text-slate-300">Industry recognized</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={contactRef} id="contact" className="py-24 relative" style={{ background: '#0D1426' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16 text-center">
              <span className="section-label block mb-3">Get in Touch</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Let's Build Something Great</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
              <p className="text-slate-400 max-w-lg mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just a good conversation about tech.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Info */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "marveluniverse1942@gmail.com", href: "mailto:marveluniverse1942@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 9649527632", href: "tel:9649527632" },
                  { icon: MapPin, label: "Location", value: "Jaipur, Rajasthan, India", href: "#" },
                  { icon: Github, label: "GitHub", value: "codewithmanish102003", href: "https://github.com/codewithmanish102003" },
                  { icon: Linkedin, label: "LinkedIn", value: "Manish Prajapati", href: "https://linkedin.com/in/manish-prajapati-651a212aa" },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 card-glass rounded-xl p-4 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{item.label}</div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleFormSubmit} className="card-glass rounded-2xl p-8 border border-white/5 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleFormChange}
                      placeholder="John Doe" required
                      className={`w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleFormChange}
                      placeholder="john@example.com" required
                      className={`w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleFormChange}
                      placeholder="Tell me about your project..." required rows={5}
                      className={`w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 resize-none ${errors.message ? 'error' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
                  </div>
                  <button
                    type="submit" disabled={sending}
                    className="btn-primary w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    )}
                    <span>{sending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#070B16', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-12">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-col gap-8">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="text-lg font-bold mb-1">
                  <span className="gradient-text font-display">Manish Prajapati</span>
                </div>
                <p className="text-xs text-slate-500">MERN Stack Developer · Jaipur, India</p>
              </div>

              <div className="flex items-center gap-4 justify-center sm:justify-end">
                {[
                  { href: "https://github.com/codewithmanish102003", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/manish-prajapati-651a212aa", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://instagram.com/marvel102003", icon: Instagram, label: "Instagram" },
                  { href: "mailto:marveluniverse1942@gmail.com", icon: Mail, label: "Email" },
                ].map(s => (
                  <a key={s.href} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-9 h-9 rounded-lg card-glass border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
                    aria-label={s.label}>
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
                <a href="manish(december)_compressed.pdf" download
                  className="btn-primary px-4 py-2 rounded-lg text-xs font-semibold text-white ml-2">
                  <span>Resume ↓</span>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider font-medium">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 mt-10 pt-6 text-center">
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} Manish Prajapati. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;