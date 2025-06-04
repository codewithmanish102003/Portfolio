import { Code2, Database, ExternalLink, Github, Layout, Linkedin, Mail, Menu, Moon, Server, Sun, X } from 'lucide-react';
import { useState } from 'react';
// import ChatBot from './components/ChatBot';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-black"}>
      {/* Navigation */}
      <nav className={isDarkMode ? "bg-gray-800 shadow-sm fixed w-full z-10" : "bg-white shadow-sm fixed w-full z-10"}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <a href="#" className={isDarkMode ? "text-xl font-bold text-white" : "text-xl font-bold text-blue-600"}>Manish Prajapati</a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#skills" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"}>Skills</a>
              <a href="#projects" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"}>Projects</a>
              <a href="#contact" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"}>Contact</a>
              <button onClick={toggleTheme} className="ml-4">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#skills" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"} onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#projects" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"} onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#contact" className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"} onClick={() => setIsMenuOpen(false)}>Contact</a>
                <button onClick={toggleTheme} className="ml-4">
                  {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className={isDarkMode ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white pt-16" : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-16"}>
        <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Profile Image: On mobile, appears above text; on md+, appears right */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:order-2 flex justify-center">
            <img 
              src="\1707530238951.jpg"
              alt="profile"
              className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-xl mx-auto autofill:object-fill"
            />
          </div>
          <div className="w-full md:w-1/2 md:order-1 flex flex-col items-center md:items-start">
            <h1 className="text-5xl font-bold mb-4 text-center md:text-left">Manish Prajapati</h1>
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">MERN Stack Developer</h2>
            <p className="text-xl mb-8 text-blue-100 text-center md:text-left">
              Crafting robust and scalable web applications with modern technologies. Passionate about creating exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get in touch
              </a>
              <a href="#projects" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View my work
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className={isDarkMode ? "py-20 bg-gray-800" : "py-20 bg-white"} id="skills">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={isDarkMode ? "p-6 bg-gray-700 rounded-xl" : "p-6 bg-gray-50 rounded-xl"}>
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-gray-600">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div className={isDarkMode ? "p-6 bg-gray-700 rounded-xl" : "p-6 bg-gray-50 rounded-xl"}>
              <Server className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <p className="text-gray-600">Node.js, Express, REST APIs</p>
            </div>
            <div className={isDarkMode ? "p-6 bg-gray-700 rounded-xl" : "p-6 bg-gray-50 rounded-xl"}>
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Database</h3>
              <p className="text-gray-600">MongoDB, MySQL</p>
            </div>
            <div className={isDarkMode ? "p-6 bg-gray-700 rounded-xl" : "p-6 bg-gray-50 rounded-xl"}>
              <Layout className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-gray-600">Responsive Design, UI/UX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={isDarkMode ? "py-20 bg-gray-900" : "py-20 bg-gray-50"} id="projects">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Netflix UI Clone",
                description: "Netflix UI Clone using HTML and CSS",
                image: "Screenshot 2025-05-28 235010.png",
                tech: ["HTML", "CSS", "JavaScript", ],
                github: "https://github.com/codewithmanish102003/Work/tree/main/Netflix",
                // live: "https://basefuncalc.netlify.app/"
              },
              {
                title: "Calculator",
                description: "Functional Calculator Using HTML , CSS and JavaScript",
                image: "Screenshot 2025-05-26 214958.png",
                tech: ["HTML", "CSS", "JavaScript", ],
                github: "https://github.com/codewithmanish102003/Calculator",
                live: "https://basefuncalc.netlify.app/"
              },
              {
                title: "Employee Task Management System",
                description: "Real-time task management application with React.js and MongoDB",
                image: "Screenshot 2024-12-22 144610.png",
                tech: ["React","ExpressJS", "MongoDB", "Tailwind"],
                github: "https://github.com/codewithmanish102003/Work/tree/main/Employee_Management_System",
                live: "https://emts.netlify.app/"
              },
              {
                title: "Spotify Clone",
                description: "Functional Web App with few features of Play , Pause and Stop",
                image: "Screenshot 2025-02-22 214713.png",
                tech: ["HTML", "CSS", "JavaScript","ExpressJS" ],
                github: "https://github.com/codewithmanish102003/Spotify",
                live: "https://spotifii.netlify.app/"
              }
            ].map((project, index) => (
              <div key={index} className={isDarkMode ? "bg-gray-800 rounded-xl overflow-hidden shadow-lg" : "bg-white rounded-xl overflow-hidden shadow-lg"}>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </a>
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={isDarkMode ? "py-20 bg-gray-800" : "py-20 bg-white"} id="contact">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div></div>
            <div className="flex flex-col items-center space-y-6">
              <p className="text-gray-600 text-center text-lg mb-8">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <div className="flex space-x-6">
                <a 
                  href="https://github.com/codewithmanish102003" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-gray-400 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/manish-prajapati-651a212aa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-400 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:marveluniverse1942@gmail.com"
                  className="p-3 bg-gray-400 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ChatBot/> */}
      {/* Footer */}
      <footer className={isDarkMode ? "bg-gray-900 text-white py-8" : "bg-gray-900 text-white py-8"}>
        <div className="container mx-auto px-6 text-center">
        Contact : 9649527632
          <p>© {new Date().getFullYear()} mkp. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  );
}

export default App;