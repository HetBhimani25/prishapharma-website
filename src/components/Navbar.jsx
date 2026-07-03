import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import agencyData from '../data/agency.json';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/brands', label: 'Brands' },
  { to: '/products', label: 'Products' },
  { to: '/catalogues', label: 'Catalogues' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container">
          <div className="navbar__inner">
            <Link to="/" className="navbar__logo" aria-label="Prisha Pharma Home">
              <img src={agencyData.logo} alt={agencyData.name} />
            </Link>

            <nav className="navbar__nav" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <a href={`tel:${agencyData.phone}`} className="navbar__cta" aria-label={`Call ${agencyData.phone}`}>
              <Phone size={16} />
              {agencyData.phone}
            </a>

            <button
              className="navbar__hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-overlay${isOpen ? '' : ' hidden'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className={`mobile-drawer${isOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mobile-drawer__header">
          <img src={agencyData.logo} alt={agencyData.name} />
          <button className="mobile-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-drawer__nav" role="navigation" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `mobile-drawer__link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a href={`tel:${agencyData.phone}`} className="mobile-drawer__cta">
            <Phone size={16} />
            {agencyData.phone}
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
