import { ArrowUpRight, Download } from 'lucide-react';
import { navLinks, socialLinks } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="footer-cta-grid">
            <div>
              <span className="footer-eyebrow"><i /> Available for new opportunities</span>
              <h2 className="font-display">Have an idea?<br /><span>Let's build it.</span></h2>
            </div>
            <a href="https://wa.me/919649527632?text=Hi%20Manish%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20opportunity%20with%20you." target="_blank" rel="noopener noreferrer" className="footer-mail" aria-label="Start a WhatsApp conversation with Manish Prajapati">
              <span>Start a conversation</span>
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10">
        <div className="footer-directory">
          <div className="footer-identity">
            <a href="#home" className="footer-logo footer-logo-image" aria-label="Manish Prajapati home">
              <img src="/logo-transparent.png" alt="Manish Prajapati logo" loading="lazy" />
            </a>
            <p>MERN Stack Developer building useful digital products from Jaipur, India.</p>
          </div>

          <div className="footer-column">
            <span>Navigate</span>
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </div>

          <div className="footer-column">
            <span>Connect</span>
            {socialLinks.map((social) => (
              <a key={social.href} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {social.label}<ArrowUpRight />
              </a>
            ))}
          </div>

          <div className="footer-column footer-action-column">
            <span>Documents</span>
            <a href="Manish.pdf" download className="footer-resume">
              Download resume <Download />
            </a>
            <a href="https://getaxorvia.com/" target="_blank" rel="noopener noreferrer">Axorvia Studio <ArrowUpRight /></a>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">MANISH</div>

        <div className="footer-bottom">
          <p>Copyright {new Date().getFullYear()} Manish Prajapati</p>
          <p>Designed and developed with intent.</p>
          <a href="#home">Back to top <span>↑</span></a>
        </div>
      </div>
    </footer>
  );
}
