import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Logo (clean brand emblem + INDIAWANDER) */}
          <Link to="/" className="brand-logo" aria-label="IndiaWander Home">
            <div className="brand-icon-box">
              <Compass size={20} strokeWidth={2} />
            </div>
            <span>
              INDIA<b>WANDER</b>
              <span className="gold-dot">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-menu" aria-label="Primary Navigation">
            <a href="/#hero" className="nav-link">Home</a>
            <a href="/#destinations" className="nav-link">Destinations</a>
            <a href="/#packages" className="nav-link">Travel Packages</a>
            <a href="/#experiences" className="nav-link">Experiences</a>
            <a href="/#about" className="nav-link">About Us</a>
            <a href="/#contact" className="nav-link">Contact</a>
          </nav>

          {/* Header Action CTA */}
          <div className="header-actions">
            <button
              onClick={onOpenBooking}
              className="btn-pill-primary"
              aria-label="Plan Your Trip"
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="mobile-menu-btn"
              aria-label="Open mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-logo">
            <div className="brand-icon-box">
              <Compass size={18} />
            </div>
            <span>INDIA<b>WANDER</b></span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ color: '#FFFFFF', padding: '6px' }}
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-nav-links">
          <a href="/#hero" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="/#destinations" onClick={() => setMobileOpen(false)}>Destinations</a>
          <a href="/#packages" onClick={() => setMobileOpen(false)}>Travel Packages</a>
          <a href="/#experiences" onClick={() => setMobileOpen(false)}>Experiences</a>
          <a href="/#about" onClick={() => setMobileOpen(false)}>About Us</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </div>

        <div className="mobile-nav-footer">
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenBooking();
            }}
            className="btn-pill-gold"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Sparkles size={16} />
            <span>Plan Your Journey</span>
          </button>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', textAlign: 'center' }}>
            Curated journeys across India
          </p>
        </div>
      </div>
    </>
  );
}

