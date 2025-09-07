import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, X as CloseIcon, Code2, Database, ExternalLink, Github, Layout, Linkedin, Mail, Menu, RocketIcon, Server, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

gsap.registerPlugin(ScrollTrigger);

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
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    // Check if device is small on mount and resize
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);

    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  useEffect(() => {
    // Set initial visibility for all elements
    gsap.set('.hero-text, .hero-image, .hero-buttons, .skill-card, .project-card, .contact-content', {
      opacity: 1
    });

    // Hero section animations with delay to ensure elements are rendered
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo('.hero-text',
      { y: 50, opacity: 0 },
      { duration: 1, y: 0, opacity: 1, ease: 'power2.out', stagger: 0.2 }
    )
      .fromTo('.hero-image',
        { scale: 0.9, opacity: 0 },
        { duration: 1.2, scale: 1, opacity: 1, ease: 'back.out(1.2)' },
        '-=0.6'
      )
      .fromTo('.hero-buttons',
        { y: 30, opacity: 0 },
        { duration: 0.8, y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.4'
      );

    // Skills section animation
    gsap.fromTo('.skill-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });

    // Projects section animation
    gsap.fromTo('.project-card',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'power2.out'
      });

    // Contact section animation
    gsap.fromTo('.contact-content',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      });

    // Section reveal animations
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }
    if (educationRef.current) {
      gsap.fromTo(
        educationRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }
    if (achievementsRef.current) {
      gsap.fromTo(
        achievementsRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }
    if (contactRef.current) {
      gsap.fromTo(
        contactRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    }

    // Floating animation for hero image
    gsap.to('.hero-image img', {
      duration: 3,
      y: -20,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Parallax effect for hero background (optional)
    gsap.to('.hero-bg', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -50,
      ease: 'none'
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY with your EmailJS credentials
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFeedback({ type: 'success', message: 'Message sent successfully!' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setSending(false);
    }
  };

  // Modal close handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      {/* Navigation */}
      <nav className="bg-gray-800/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Manish Prajapati
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden transition-transform duration-200 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#skills" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden pt-24 md:pt-0">
        <div className="container mx-auto px-6 flex flex-col items-center justify-between relative z-10">
          {/* Profile Image - Moved to top for mobile */}
          <div className="w-full flex justify-center items-center mb-12 md:hidden">
            <div className="relative group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 animate-pulse"></div>
                <img
                  src="\1707530238951.jpg"
                  alt="Manish Prajapati - Full Stack Developer"
                  className="relative rounded-full w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover border-4 border-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute -bottom-4 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Available for work
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 text-center md:text-left hero-text">
            <div className="mb-2 px-4 py-1.5 bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-500/30 inline-flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-200">Available for opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-6 mb-4 text-center md:text-left bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
              Hi, I'm Manish Prajapati
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left text-blue-100">
              MERN Stack Developer | Problem Solver | Tech Enthusiast
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-blue-50/90 text-center md:text-left max-w-2xl leading-relaxed">
              I build exceptional digital experiences using modern web technologies. 
              With expertise in the MERN stack and a passion for clean code, I transform complex 
              problems into elegant, user-centric solutions that drive business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md">
              <a 
                href="#contact" 
                className="group relative flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="group-hover:mr-2 transition-all duration-300">Hire Me</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a 
                href="#projects" 
                className="group relative flex-1 bg-transparent border-2 border-blue-500/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="group-hover:mr-2 transition-all duration-300">View My Work</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">↓</span>
                </span>
              </a>
            </div>
            
            <div className="mt-12 flex items-center space-x-6">
              <a href="https://github.com/codewithmanish102003" target="_blank" rel="noopener noreferrer" 
                className="text-blue-100 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/manish-prajapati-651a212aa" target="_blank" rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn Profile">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:marveluniverse1942@gmail.com" 
                className="text-blue-100 hover:text-white transition-colors duration-300"
                aria-label="Email Me">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Profile Image - Desktop */}
          <div className="hidden md:flex md:w-1/2 justify-center items-center relative z-10 mt-12 md:mt-0">
            <div className="relative group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 animate-pulse"></div>
                <img
                  src="\1707530238951.jpg"
                  alt="Manish Prajapati - Full Stack Developer"
                  className="relative rounded-full w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover border-4 border-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute -bottom-4 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Available for work
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-blue-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-400 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </header>

      {/* Work Experience Section */}
      <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
              My professional journey and the valuable experiences I've gained along the way
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            <div className="relative">
              {/* Timeline line - Hidden on mobile, shown on md and up */}
              <div className="hidden md:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {/* Experience 1 */}
                <div className="relative pl-2 sm:pl-16 md:pl-0 md:pr-16 group">
                  <div className="md:text-right mb-4 md:mb-0 md:absolute md:right-[calc(50%+40px)] md:w-1/2 pr-0 sm:pr-4 md:pr-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">MERN Stack Developer Intern</h3>
                    <p className="text-blue-300 text-sm sm:text-base">8 Bit System Pvt. Ltd.</p>
                    <p className="text-xs sm:text-sm text-gray-400">June 2025 - Present</p>
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full transform -translate-x-1/2 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="md:ml-[calc(50%+60px)] bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300">
                    <h4 className="text-xl font-semibold text-white mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Developed and maintained responsive web applications using React, Node.js, and MongoDB</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Collaborated with cross-functional teams to design and implement new features</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Optimized application performance and improved load times by 40%</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full">React</span>
                      <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full">Node.js</span>
                      <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full">MongoDB</span>
                      <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full">Express.js</span>

                    </div>
                  </div>
                </div>

                {/* Experience 2 */}
                <div className="relative pl-2 sm:pl-16 md:pl-0 md:pr-16 group mt-8 sm:mt-0">
                  <div className="md:hidden mb-4">
                    <p className="text-blue-300 text-sm sm:text-base">Academic Projects</p>
                    <p className="text-xs sm:text-sm text-gray-400">Jun 2024 - 2025</p>
                  </div>
                  <div className="hidden md:block absolute right-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full transform translate-x-1/2 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="md:mr-[calc(50%+10px)] bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 group-hover:border-purple-500/50 transition-all duration-300">
                    <div className="hidden md:block text-right mb-4">
                      <p className="text-blue-300">Academic Projects</p>
                      <p className="text-sm text-gray-400">Jun 2024 - 2025</p>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Developed and maintained responsive web applications using React, Node.js, and MongoDB</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Optimized application performance and improved load times by 40%</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm rounded-full">JavaScript</span>
                      <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm rounded-full">React</span>
                      <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm rounded-full">Tailwind CSS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent"></div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-24 bg-gray-800 relative" id="skills">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          {isSmallDevice ? (
            // Grid layout for small devices - show all cards
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Code2,
                  title: "Languages",
                  skills: "JavaScript, TypeScript, Python, C, C++, Core Java",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Code2,
                  title: "Frontend",
                  skills: "HTML, CSS, JavaScript, Tailwind CSS, Bootstrap",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Server,
                  title: "Backend",
                  skills: "Node.js, Express.js, Django, GraphQL (basics), REST API",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Database,
                  title: "Database",
                  skills: "MongoDB, MySQL",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Layout,
                  title: "Frameworks & Libraries",
                  skills: "React.js, Next.js, Django, Bootstrap",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Layout,
                  title: "Tools & Platforms",
                  skills: "Git, GitHub, VS Code, Netlify, Render, Vercel, Cloudinary, Postman",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: RocketIcon,
                  title: "Currently Learning",
                  skills: "Advanced Django, Next.js, SEO Optimization, System Design",
                  color: "from-yellow-500 to-orange-500",
                }
              ].map((skill, index) => (
                <div key={index} className="skill-card group">
                  <div className={"p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border bg-gray-700/50 border-gray-600 hover:bg-gray-700/70"}>
                    <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${skill.color} p-4 mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                      <skill.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{skill.title}</h3>
                    <p className="text-gray-300">{skill.skills}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Swiper layout for larger devices
            <Swiper
              key="skills-swiper"
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              className="!pb-8"
            >
              {[
                {
                  icon: Code2,
                  title: "Languages",
                  skills: "JavaScript, TypeScript, Python, C, C++, Core Java",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Code2,
                  title: "Frontend",
                  skills: "HTML, CSS, JavaScript, Tailwind CSS, Bootstrap",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Server,
                  title: "Backend",
                  skills: "Node.js, Express.js, Django, GraphQL (basics), REST API",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Database,
                  title: "Database",
                  skills: "MongoDB, MySQL",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Layout,
                  title: "Frameworks & Libraries",
                  skills: "React.js, Next.js, Django, Bootstrap",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Layout,
                  title: "Tools & Platforms",
                  skills: "Git, GitHub, VS Code, Netlify, Render, Cloudinary, Postman",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: RocketIcon,
                  title: "Currently Learning",
                  skills: "Django, Next.js, SEO Optimization, System Design",
                  color: "from-yellow-500 to-orange-500",
                }
              ].map((skill, index) => (
                <SwiperSlide key={index}>
                  <div className="skill-card group mt-4">
                    <div className={"p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border bg-gray-700/50 border-gray-600 hover:bg-gray-700/70"}>
                      <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${skill.color} p-4 mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                        <skill.icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{skill.title}</h3>
                      <p className="text-gray-300">{skill.skills}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 bg-gray-900 relative overflow-hidden" id="projects">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              A collection of my recent work, showcasing my skills and experience in web development
            </p>
          </div>
          {/* Work Projects Section */}
          <div className="w-full mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Work Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Dosedefence - Pharmacy Centralized Management System",
                  description: "A comprehensive platform for managing pharmacy operations, including inventory, sales, and customer management.",
                  image: "dosedefence.png",
                  tech: ["TypeScript", "React", "NodeJS", "ExpressJS", "MongoDB", "Tailwind","Postman"],
                  github: "#",
                  live: "https://dosedefence.com",
                  gradient: "from-pink-500 to-red-500"
                },
                {
                  title: "Khushi Laptops - Refurbished Laptops Store",
                  description: "A platform for showcasing and managing refurbished laptops.",
                  image: "khushilaptop.png",
                  tech: ["React", "NodeJS", "ExpressJS", "MongoDB", "Tailwind","Cloudinary"],
                  github: "#",
                  live: "https://khushilaptop.com/",
                  gradient: "from-blue-500 to-purple-500"
                }
              ].map((project, index) => (
                <div 
                  key={`work-${index}`}
                  className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                  onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                >
                  <div className="relative overflow-hidden h-56">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    <img 
                      src={`/${project.image}`} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.png';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-700/80 text-xs font-medium text-gray-200 rounded-full backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-white transition-colors group"
                        onClick={e => e.stopPropagation()}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-5 h-5 mr-2 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                          onClick={e => e.stopPropagation()}
                        >
                          <span className="mr-2">Live Demo</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects Section */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Academic Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                   {
                    title: "Starway Collections - E-commerce Website",
                    description: "Full-featured e-commerce website with cart management and secure checkout",
                    image: "ecommerce2.png",
                    tech: ["React", "NodeJS", "ExpressJS", "MongoDB", "Tailwind", "Redux"],
                    live: "https://starwaycollections.netlify.app",
                    gradient: "from-indigo-500 to-purple-500"
                  },
                  {
                    title: "GDrive - Storage Management System",
                    description: "A cloud storage management system with file upload, download, and sharing capabilities",
                    image: "gdrive.png",
                    tech: ["EJS", "NodeJS", "ExpressJS", "MongoDB", "Tailwind", "Cloudinary"],
                    github: "https://github.com/codewithmanish102003/Work/tree/main/GDrive",
                    live: "https://gdrive.netlify.app/",
                    gradient: "from-green-500 to-blue-500"
                  },
                  {
                    title: "Employee Task Management",
                    description: "Real-time task management system with advanced features and analytics",
                    image: "emts.png",
                  tech: ["React", "ExpressJS", "MongoDB", "Tailwind"],
                  github: "https://github.com/codewithmanish102003/Work/tree/main/Employee_Management_System",
                  live: "https://emts.netlify.app/",
                  gradient: "from-orange-500 to-red-500"
                },
                
                {
                  title: "musicDev - Music Player",
                  description: "Music player application with playlist management and audio controls",
                  image: "musicdev.png",
                  tech: ["HTML", "TailwindCSS", "JavaScript"],
                  github: "https://github.com/codewithmanish102003/musicDev",
                  live: "https://musicdevplay.netlify.app/",
                  gradient: "from-pink-500 to-red-500"
                },
              
                {
                  title: "Calculator",
                  description: "Functional Calculator with advanced operations and beautiful UI design",
                  image: "calculator.png",
                  tech: ["HTML", "CSS", "JavaScript"],
                  github: "https://github.com/codewithmanish102003/Calculator",
                  live: "https://basefuncalc.netlify.app/",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Netflix UI Clone",
                  description: "Netflix UI Clone using HTML and CSS with responsive design and modern animations",
                  image: "netflix.png",
                  tech: ["HTML", "CSS", "JavaScript"],
                  github: "https://github.com/codewithmanish102003/Work/tree/main/Netflix",
                  gradient: "from-red-500 to-pink-500"
                }
              ].map((project, index) => (
                <div 
                  key={`academic-${index}`}
                  className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                  onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                >
                  <div className="relative overflow-hidden h-56">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    <img 
                      src={`/${project.image}`} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.png';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-700/80 text-xs font-medium text-gray-200 rounded-full backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-white transition-colors group"
                        onClick={e => e.stopPropagation()}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-5 h-5 mr-2 group-hover:text-purple-400 transition-colors" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
                          onClick={e => e.stopPropagation()}
                        >
                          <span className="mr-2">Live Demo</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={closeModal} aria-label="Close">
              <CloseIcon className="w-6 h-6" />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 object-cover rounded-xl mb-6" />
            <h3 className="text-2xl font-bold mb-2 text-blue-400">{selectedProject.title}</h3>
            <p className="mb-4 text-gray-300">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((tech: string, techIndex: number) => (
                <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Code
                </a>
              )}
              {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Education Section */}
      <section ref={educationRef} className="py-20 bg-gray-900" id="education">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-4 bg-gradient-to-r from-blue-900/20 to-purple-900/10 rounded-xl p-6 shadow-lg">
              <div className="flex-shrink-0">
                <span className="inline-block w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-2xl font-bold text-blue-500">B</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400">Bachelor of Computer Application</h3>
                <p className="text-gray-300">University Of Rajasthan <span className="text-sm text-gray-400">(CGPA 8.4, 2025)</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-gradient-to-r from-blue-900/10 to-purple-900/5 rounded-xl p-6 shadow">
              <div className="flex-shrink-0">
                <span className="inline-block w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center text-2xl font-bold text-green-500">12</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400">XII (RBSE)</h3>
                <p className="text-gray-300">Welfare Academy <span className="text-sm text-gray-400">89.20% (2022)</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-gradient-to-r from-blue-900/10 to-purple-900/5 rounded-xl p-6 shadow">
              <div className="flex-shrink-0">
                <span className="inline-block w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center text-2xl font-bold text-purple-500">10</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400">X (RBSE)</h3>
                <p className="text-gray-300">Sharda Vidhya Bhawan Sr. Sec. School <span className="text-sm text-gray-400">89.67% (2020)</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-20 bg-gray-800" id="achievements">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achievements
          </h2>
          <ul className="max-w-2xl mx-auto space-y-6">
            <li className="flex items-start gap-4 bg-gradient-to-r from-blue-800/10 to-purple-800/10 rounded-xl p-5 shadow">
              <span className="inline-block mt-1 w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-lg font-bold text-blue-500">✓</span>
              <span className="text-lg text-gray-300">Certified in <span className="font-semibold text-blue-300">SmartCom 2023</span> and <span className="font-semibold text-purple-300">Namaste Web3</span> from Jaipur</span>
            </li>
            <li className="flex items-start gap-4 bg-gradient-to-r from-blue-800/10 to-purple-800/10 rounded-xl p-5 shadow">
              <span className="inline-block mt-1 w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center text-lg font-bold text-green-500">✓</span>
              <span className="text-lg text-gray-300">Completed <span className="font-semibold text-green-300">Upflairs Pvt Ltd Web Development and Designing</span> program in 2024</span>
            </li>
            <li className="flex items-start gap-4 bg-gradient-to-r from-blue-800/10 to-purple-800/10 rounded-xl p-5 shadow">
              <span className="inline-block mt-1 w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center text-lg font-bold text-yellow-500">✓</span>
              <span className="text-lg text-gray-300">Achieved certification in <span className="font-semibold text-yellow-300">Cloud Computing Basics</span> from Scaler Academy</span>
            </li>
            <li className="flex items-start gap-4 bg-gradient-to-r from-blue-800/10 to-purple-800/10 rounded-xl p-5 shadow">
              <span className="inline-block mt-1 w-8 h-8 bg-pink-600/20 rounded-full flex items-center justify-center text-lg font-bold text-pink-500">✓</span>
              <span className="text-lg text-gray-300">Completed <span className="font-semibold text-pink-300">Web Development and Designing</span> from Broadcast Engineering Consultants India Limited in 2024</span>
            </li>
            <li className="flex items-start gap-4 bg-gradient-to-r from-blue-800/10 to-purple-800/10 rounded-xl p-5 shadow">
              <span className="inline-block mt-1 w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center text-lg font-bold text-indigo-500">✓</span>
              <span className="text-lg text-gray-300">Certified in <span className="font-semibold text-indigo-300">All India National Creativity Aptitude Test</span> Conducted by Naukri in 2025</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-gray-800 relative" id="contact">
        <div className="container mx-auto px-6">
          <div className="contact-content max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl mb-12 text-gray-300">
              I'm always interested in hearing about new projects and opportunities. Let's create something amazing together!
            </p>
            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto mb-12 bg-gradient-to-br from-blue-900/10 to-purple-900/10 p-8 rounded-2xl shadow-lg flex flex-col gap-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Your Name"
                required
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Your Email"
                required
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleFormChange}
                placeholder="Your Message"
                required
                rows={5}
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              {feedback && (
                <div className={feedback.type === 'success' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                  {feedback.message}
                </div>
              )}
            </form>
            {/* Resume Download Button */}
            <div className="mb-12">
              <a
                href="Manish Prajapati.pdf"
                download
                className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="group-hover:mr-2 transition-all duration-300">Download Resume</span>
                <span className="inline-block group-hover:translate-y-[-2px] transition-transform duration-300">↓</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {[
                { icon: Github, href: "https://github.com/codewithmanish102003", label: "GitHub", color: "hover:bg-gray-800" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/manish-prajapati-651a212aa", label: "LinkedIn", color: "hover:bg-blue-600" },
                { icon: Mail, href: "mailto:marveluniverse1942@gmail.com", label: "Email", color: "hover:bg-red-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.icon !== Mail ? "_blank" : undefined}
                  rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                  className={`group p-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-xl ${social.color} hover:text-white`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-white pt-16 pb-8 relative overflow-hidden">
        {/* Decorative SVG wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none" style={{ height: "60px" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C300,60 900,0 1200,60 L1200,0 L0,0 Z" fill="#1e293b" fillOpacity="0.7" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          {/* Left: About & Contact */}
          <div className="flex-1 mb-8 md:mb-0 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-400">Manish Prajapati</h3>
            <p className="text-gray-300 mb-4 max-w-xs">MERN Stack Developer passionate about building modern, scalable web apps.</p>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:marveluniverse1942@gmail.com" className="hover:underline text-gray-200">marveluniverse1942@gmail.com</a>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <span className="font-semibold text-blue-400">Call:</span>
              <a href="tel:9649527632" className="hover:underline text-gray-200">9649527632</a>
            </div>
          </div>
          {/* Center: Social Links */}
          <div className="flex-1 flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Connect with me</h4>
            <div className="flex space-x-5 mb-4">
              {[
                { icon: Github, href: "https://github.com/codewithmanish102003", label: "GitHub", color: "hover:bg-gray-800" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/manish-prajapati-651a212aa", label: "LinkedIn", color: "hover:bg-blue-600" },
                { icon: Mail, href: "mailto:marveluniverse1942@gmail.com", label: "Email", color: "hover:bg-red-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.icon !== Mail ? "_blank" : undefined}
                  rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                  className={`group p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl ${social.color} hover:text-white`}
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-125" />
                </a>
              ))}
            </div>
            <a
              href="Manish Prajapati.pdf"
              download
              className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <span>Download Resume</span>
              <span className="ml-2">↓</span>
            </a>
          </div>
          {/* Right: Quick Links */}
          <div className="flex-1 flex flex-col items-end sm:items-center">
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
            <nav className="flex flex-col items-end space-y-2">
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
        <div className="relative container mx-auto px-6 text-center mt-12 border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Manish Prajapati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;