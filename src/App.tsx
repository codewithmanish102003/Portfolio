import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, ExternalLink, Github, Layout, Linkedin, Mail, Menu, Moon, Server, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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

  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "min-h-screen bg-gray-900 text-white transition-colors duration-500" : "min-h-screen bg-gray-50 text-black transition-colors duration-500"}>
      {/* Navigation */}
      <nav className={isDarkMode ? "bg-gray-800/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-700" : "bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-200"}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <a href="#" className={isDarkMode ? "text-xl font-bold text-white hover:text-blue-400 transition-colors" : "text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"}>
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
              <a href="#skills" className={isDarkMode ? "text-gray-300 hover:text-white transition-all duration-300 relative group" : "text-gray-600 hover:text-blue-600 transition-all duration-300 relative group"}>
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#projects" className={isDarkMode ? "text-gray-300 hover:text-white transition-all duration-300 relative group" : "text-gray-600 hover:text-blue-600 transition-all duration-300 relative group"}>
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className={isDarkMode ? "text-gray-300 hover:text-white transition-all duration-300 relative group" : "text-gray-600 hover:text-blue-600 transition-all duration-300 relative group"}>
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button onClick={toggleTheme} className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="#skills" className={isDarkMode ? "text-gray-300 hover:text-white transition-colors" : "text-gray-600 hover:text-blue-600 transition-colors"} onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#projects" className={isDarkMode ? "text-gray-300 hover:text-white transition-colors" : "text-gray-600 hover:text-blue-600 transition-colors"} onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#contact" className={isDarkMode ? "text-gray-300 hover:text-white transition-colors" : "text-gray-600 hover:text-blue-600 transition-colors"} onClick={() => setIsMenuOpen(false)}>Contact</a>
                <button onClick={toggleTheme} className="self-start p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                  {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="relative overflow-hidden pt-16">
        <div className={isDarkMode ? "hero-bg absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" : "hero-bg absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"}>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10 min-h-screen">
          {/* Profile Image */}
          <div className="hero-image w-full md:w-1/2 mb-8 md:mb-0 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img 
                src="\1707530238951.jpg"
                alt="Manish Prajapati"
                className="relative rounded-full w-80 h-80 object-cover border-4 border-white/20 shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="w-full md:w-1/2 md:order-1 flex flex-col items-center md:items-start text-white">
            <h1 className="hero-text text-6xl md:text-7xl font-bold mb-4 text-center md:text-left bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Manish Prajapati
            </h1>
            <h2 className="hero-text text-3xl md:text-4xl font-semibold mb-6 text-center md:text-left text-blue-200">
              MERN Stack Developer
            </h2>
            <p className="hero-text text-xl mb-8 text-blue-100 text-center md:text-left max-w-lg leading-relaxed">
              Crafting robust and scalable web applications with modern technologies. Passionate about creating exceptional user experiences that make a difference.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span className="group-hover:mr-2 transition-all duration-300">Get in touch</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="#projects" className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span className="group-hover:mr-2 transition-all duration-300">View my work</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">↓</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section ref={skillsRef} className={isDarkMode ? "py-24 bg-gray-800 relative" : "py-24 bg-white relative"} id="skills">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code2, title: "Frontend", skills: "React, Next.js, TypeScript, Tailwind CSS", color: "from-blue-500 to-cyan-500" },
              { icon: Server, title: "Backend", skills: "Node.js, Express, REST APIs", color: "from-green-500 to-emerald-500" },
              { icon: Database, title: "Database", skills: "MongoDB, MySQL", color: "from-purple-500 to-pink-500" },
              { icon: Layout, title: "Design", skills: "Responsive Design, UI/UX", color: "from-orange-500 to-red-500" }
            ].map((skill, index) => (
              <div key={index} className="skill-card group">
                <div className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border ${
                  isDarkMode 
                    ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700/70" 
                    : "bg-gray-50/80 border-gray-200 hover:bg-white/90"
                }`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} p-4 mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <skill.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{skill.title}</h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{skill.skills}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className={isDarkMode ? "py-24 bg-gray-900 relative" : "py-24 bg-gray-50 relative"} id="projects">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Netflix UI Clone",
                description: "Netflix UI Clone using HTML and CSS with responsive design and modern animations",
                image: "netflix.png",
                tech: ["HTML", "CSS", "JavaScript"],
                github: "https://github.com/codewithmanish102003/Work/tree/main/Netflix",
                gradient: "from-red-500 to-pink-500"
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
                title: "Simple Blog",
                description: "A feature-rich blog application with user authentication and content management",
                image: "blogweb.png",
                tech: ["NodeJS", "ExpressJS", "SQLite", "EJS", "TailwindCSS"],
                github: "https://github.com/codewithmanish102003/BLog-Website",
                live: "https://simple-blog-8dsc.onrender.com/",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "GDrive",
                description: "Cloud storage solution for uploading, storing and downloading documents securely",
                image: "gdrive.png",
                tech: ["JavaScript", "NodeJS", "ExpressJS", "EJS", "TailwindCSS"],
                github: "https://github.com/codewithmanish102003/GDrive",
                live: "https://gdrive-g9z9.onrender.com",
                gradient: "from-purple-500 to-pink-500"
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
                title: "E-commerce Platform",
                description: "Full-featured e-commerce website with cart management and secure checkout",
                image: "ecommerce2.png",
                tech: ["React", "NodeJS", "ExpressJS", "MongoDB", "Tailwind", "Redux"],
                github: "https://github.com/codewithmanish102003/New-folder",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((project, index) => (
              <div key={index} className="project-card group">
                <div className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border ${
                  isDarkMode 
                    ? "bg-gray-800/80 border-gray-700 hover:bg-gray-800/90" 
                    : "bg-white/90 border-gray-200 hover:bg-white"
                }`}>
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                    <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          isDarkMode 
                            ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Code
                      </a>
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                            isDarkMode 
                              ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={isDarkMode ? "py-24 bg-gray-800 relative" : "py-24 bg-white relative"} id="contact">
        <div className="container mx-auto px-6">
          <div className="contact-content max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className={`text-xl mb-12 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              I'm always interested in hearing about new projects and opportunities. Let's create something amazing together!
            </p>
            
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
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="mb-4">
            <p className="text-lg font-semibold">Contact: 9649527632</p>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} Manish Prajapati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;