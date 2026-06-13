import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks } from '../data/portfolio';

type NavigationProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export function Navigation({ isMenuOpen, onToggleMenu, onCloseMenu }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 24);
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  return (
    <nav className={`site-nav fixed w-full z-50 top-0 ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}>
      <div className="container mx-auto px-6 lg:px-10">
        <div className="nav-inner flex justify-between items-center">
          <a href="#home" className="brand-mark brand-logo" aria-label="Manish Prajapati home">
            <img src="/logo-transparent.png" alt="Manish Prajapati logo" />
          </a>

          <button className="md:hidden nav-toggle" onClick={onToggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
            <a href="mailto:marveluniverse1942@gmail.com" className="nav-hire">Hire me</a>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mobile-menu">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={onCloseMenu}>{link.label}</a>
            ))}
            <a href="mailto:marveluniverse1942@gmail.com" className="nav-hire text-center" onClick={onCloseMenu}>Hire me</a>
          </div>
        )}
      </div>
    </nav>
  );
}
