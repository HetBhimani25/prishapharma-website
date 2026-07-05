import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import agencyData from '../data/agency.json';

const Footer = () => {
  const year = new Date().getFullYear();
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/companies', label: 'Our Companies' },
    { to: '/products', label: 'Products' },
    { to: '/catalogues', label: 'Catalogues' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Link to="/" aria-label="Prisha Pharma Home">
                <img src={agencyData.logo} alt={agencyData.name} />
              </Link>
            </div>
            <p className="footer__tagline">{agencyData.description}</p>
            <span className="footer__badge">
              <span className="footer__badge-dot" />
              {agencyData.experience} of Trusted Service
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer__col-title">Quick Links</h3>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    <ChevronRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer__col-title">Contact Us</h3>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <MapPin size={16} className="footer__contact-icon" />
                <span className="footer__contact-text">{agencyData.address}</span>
              </li>
              <li className="footer__contact-item">
                <Phone size={16} className="footer__contact-icon" />
                <a href={`tel:${agencyData.phone}`} className="footer__contact-text">{agencyData.phone}</a>
              </li>
              <li className="footer__contact-item">
                <Mail size={16} className="footer__contact-icon" />
                <a href={`mailto:${agencyData.email}`} className="footer__contact-text">{agencyData.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer__col-title">Stay Updated</h3>
            <p className="footer__newsletter-desc">Subscribe for the latest pharmaceutical updates and news.</p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter subscription">
              <input type="email" placeholder="Your email" className="footer__newsletter-input" aria-label="Email address" required />
              <button type="submit" className="footer__newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {year} {agencyData.name}. All rights reserved.</p>
          <div className="footer__legal">
            <span className="footer__legal-link">Privacy Policy</span>
            <span className="footer__legal-link">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
