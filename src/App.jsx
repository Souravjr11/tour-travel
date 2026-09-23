import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Compass,
  DollarSign,
  Eye,
  Facebook,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Hotel,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  PhoneCall,
  Play,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  X,
  Youtube
} from 'lucide-react';

import {
  DESTINATIONS,
  FAQS,
  FEATURED_DESTINATIONS,
  GALLERY_ITEMS,
  HERO_DESTINATIONS,
  REGION_FILTERS,
  STORY_METRICS,
  TESTIMONIALS,
  TRAVEL_EXPERIENCES,
  TRAVEL_PACKAGES,
  VIEW_ONLY_MODE,
  WHY_CHOOSE_US
} from './data';

// ============================================================================
// SCROLL RESTORATION HELPER
// ============================================================================
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ============================================================================
// COMPONENT: PageLoader
// ============================================================================
function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 300);
    const timer2 = setTimeout(() => setLoading(false), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#101312',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fade ? 'none' : 'all'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '1.5px solid rgba(217, 183, 122, 0.4)',
          background: 'rgba(26, 33, 31, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D9B77A',
          boxShadow: '0 0 30px rgba(217, 183, 122, 0.3)',
          marginBottom: '20px',
          animation: 'pulseRing 2s infinite ease-in-out'
        }}
      >
        <Compass size={32} />
      </div>

      <div style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 700 }}>
        INDIA<span style={{ fontWeight: 400 }}>WANDER</span>
        <span style={{ color: '#D9B77A' }}>.</span>
      </div>

      <p style={{ color: '#8E9994', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '10px' }}>
        Discover India Beyond the Ordinary
      </p>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.96); box-shadow: 0 0 10px rgba(217, 183, 122, 0.2); }
          50% { transform: scale(1.04); box-shadow: 0 0 35px rgba(217, 183, 122, 0.5); }
          100% { transform: scale(0.96); box-shadow: 0 0 10px rgba(217, 183, 122, 0.2); }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// COMPONENT: FloatingControls
// ============================================================================
function FloatingControls() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-widgets-wrap">
      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="float-btn float-whatsapp"
        title="Chat on WhatsApp with Travel Concierge"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Back To Top Button */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="float-btn float-backtop"
          title="Back to Top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: LightboxModal
// ============================================================================
function LightboxModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close image"
          style={{ top: '-40px', right: '0' }}
        >
          <X size={24} />
        </button>

        <img src={item.image} alt={item.title} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', color: '#FFFFFF' }}>
          <div>
            <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} />
              {item.location}
            </span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginTop: '2px' }}>
              {item.title}
            </h4>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
            <Instagram size={16} />
            <span>{item.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: BookingModal
// ============================================================================
function BookingModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    packageTitle: '',
    travelDate: '',
    travelers: '2 Travelers',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        destination: initialData.destinationName || initialData.name || prev.destination,
        packageTitle: initialData.packageTitle || initialData.title || '',
        travelers: initialData.travelers || prev.travelers
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(40,199,111,0.15)', color: '#28C76F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '10px' }}>
              Inquiry Confirmed
            </h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 24px' }}>
              We have received your details. A dedicated IndiaWander travel designer will reach out with a personalized itinerary within 4 hours.
            </p>
            <button
              onClick={handleClose}
              className="btn-pill-gold"
            >
              <span>Back to Browsing</span>
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge-eyebrow">
                <Sparkles size={14} />
                Bespoke Travel Inquiry
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF' }}>
                {formData.packageTitle ? `Book: ${formData.packageTitle}` : 'Plan Your Journey'}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginTop: '6px' }}>
                Fill out this quick form and our luxury travel specialists will craft your perfect itinerary.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>Target Destination</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="">Select Destination</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.slug} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Travel Dates</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Travelers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  >
                    <option>1 Solo Wanderer</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3–5 Family / Friends</option>
                    <option>6+ Curated Group</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests or Preferences</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific sights, dietary preferences, or celebration requirements..."
                />
              </div>

              <button
                type="submit"
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                <span>{loading ? 'Submitting...' : 'Send Journey Inquiry'}</span>
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: Navbar
// ============================================================================
function Navbar({ onOpenBooking }) {
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

// ============================================================================
// COMPONENT: Hero
// ============================================================================
function Hero({ onOpenBooking }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef(null);
  const currentDest = HERO_DESTINATIONS[currentIndex];

  // Autoplay cycle (6.5 seconds)
  useEffect(() => {
    if (!isAutoplay) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_DESTINATIONS.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay]);

  const handleSelectDestination = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  return (
    <section
      id="hero"
      className="hero-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero Showcase"
    >
      {/* Background Crossfade Slides */}
      <div className="hero-bg-stack" aria-hidden="true">
        {HERO_DESTINATIONS.map((dest, index) => (
          <div
            key={dest.id}
            className={`hero-bg-slide ${currentIndex === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${dest.image})` }}
          />
        ))}
      </div>

      {/* Dark Cinematic Overlays */}
      <div className="hero-overlays" aria-hidden="true">
        <div className="hero-overlay-dark" />
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />
      </div>

      <div className="container hero-container">
        {/* Left Side: Editorial Typography & CTAs */}
        <div className="hero-left-content">
          {/* Frosted Pill Badge (Matches screenshot: [New] Travel Beyond Expectations) */}
          <div className="hero-pill-badge">
            <span className="hero-badge-tag">NEW</span>
            <span className="hero-badge-text">Explore Incredible India</span>
          </div>

          {/* Sweeping Display Title (Matches screenshot cursive aesthetic) */}
          <h1 className="hero-main-title">
            Travel Beyond <br className="hero-break-mobile" />the Ordinary
          </h1>

          {/* Dynamic Destination Title */}
          <h2 className="hero-dest-title" key={`title-${currentDest.id}`}>
            {currentDest.title}
          </h2>

          {/* Dynamic Destination Description */}
          <p className="hero-description" key={`desc-${currentDest.id}`}>
            {currentDest.description}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#destinations" className="btn-pill-primary">
              <span>Explore Destinations</span>
              <ArrowUpRight size={18} />
            </a>

            <a href="#packages" className="btn-pill-outline">
              <span>View Travel Packages</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        {/* Right Side: Circular Destination Cards & Far-right Dots */}
        <div className="hero-right-side">
          {/* Vertical Arc of 5 Circular Destination Cards */}
          <div className="hero-circular-cards" role="tablist" aria-label="Featured Hero Destinations">
            {HERO_DESTINATIONS.map((dest, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={dest.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`hero-circle-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectDestination(index)}
                  title={`View ${dest.name}, ${dest.location}`}
                >
                  {/* Label Text beside the circle */}
                  <div className="circle-card-label">
                    <span className="circle-card-name">{dest.name}</span>
                    <span className="circle-card-location">{dest.location}</span>
                  </div>

                  {/* Circular Image Frame */}
                  <div className="circle-thumb-frame">
                    <img
                      src={dest.thumbnail}
                      alt={dest.name}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Far Right: Vertical 5 Navigation Dots */}
          <div className="hero-nav-dots" aria-label="Slideshow Indicators">
            {HERO_DESTINATIONS.map((dest, index) => (
              <button
                key={`dot-${dest.id}`}
                className={`hero-dot-btn ${currentIndex === index ? 'active' : ''}`}
                onClick={() => handleSelectDestination(index)}
                aria-label={`Go to slide ${index + 1}: ${dest.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="hero-controls-bar">
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="hero-pause-btn"
          aria-label={isAutoplay ? 'Pause slideshow' : 'Play slideshow'}
          title={isAutoplay ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoplay ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="hero-slide-counter">
          <b>0{currentIndex + 1}</b> / 0{HERO_DESTINATIONS.length}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: FilterTabs
// ============================================================================
export const FILTER_ITEMS = [
  { id: 'all', label: 'All' },
  { id: 'ladakh', label: 'Ladakh' },
  { id: 'kashmir', label: 'Kashmir' },
  { id: 'himachal', label: 'Himachal' },
  { id: 'rajasthan', label: 'Rajasthan' },
  { id: 'goa', label: 'Goa' },
  { id: 'kerala', label: 'Kerala' },
  { id: 'uttarakhand', label: 'Uttarakhand' },
  { id: 'meghalaya', label: 'Meghalaya' },
  { id: 'andaman', label: 'Andaman' },
  { id: 'tamil-nadu', label: 'Tamil Nadu' },
  { id: 'sikkim', label: 'Sikkim' },
  { id: 'varanasi-agra', label: 'Varanasi & Agra' }
];

function FilterTabs({
  activeFilter,
  onSelectFilter,
  totalCount = 42,
  filteredCount
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="filter-tabs-wrapper">
      {/* Editorial Counter & Subtitle */}
      <div className="filter-tabs-header">
        <div className="filter-count-badge">
          <Sparkles size={13} className="filter-badge-sparkle" />
          <span>12 Destinations • 40+ Curated Journeys</span>
        </div>
        {filteredCount !== undefined && (
          <span className="filter-showing-text">
            Showing <b>{filteredCount}</b> of <b>{totalCount}</b> Journeys
          </span>
        )}
      </div>

      {/* Scrollable Tabs Row with arrow controls */}
      <div className="filter-tabs-nav-container">
        <button
          type="button"
          className="filter-scroll-arrow left"
          onClick={scrollLeft}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollContainerRef}
          className="filter-tabs-track"
          role="tablist"
          aria-label="Filter packages by Indian region"
        >
          {FILTER_ITEMS.map((item) => {
            const isActive = activeFilter.toLowerCase() === item.id.toLowerCase() ||
              (item.id === 'all' && (activeFilter === 'all' || activeFilter === 'All'));

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="packages-grid"
                className={`filter-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectFilter(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="filter-scroll-arrow right"
          onClick={scrollRight}
          aria-label="Scroll tabs right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: DestinationCard
// ============================================================================
function DestinationCard({ dest }) {
  if (!dest) return null;

  const handleScrollToPackages = (e) => {
    e.preventDefault();
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className={`dest-card ${dest.size || 'normal'}`} data-slug={dest.slug}>
      {/* Background Image */}
      <div className="dest-card-bg">
        <img
          src={dest.heroImage || dest.thumbnail}
          alt={dest.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/sikkim.jpg';
          }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="dest-card-shade" />

      {/* Card Top Badges */}
      <div className="dest-card-top">
        <span className="dest-tag-badge">
          {dest.state}
        </span>
        {dest.rating && (
          <div className="dest-rating">
            <Star size={13} fill="currentColor" color="#D9B77A" />
            <span>{dest.rating}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="dest-card-body">
        <span className="dest-region">{dest.region} India</span>
        <h3 className="dest-name">{dest.name}</h3>
        <p className="dest-desc">{dest.description}</p>

        {dest.placesCovered && (
          <p className="dest-places-snippet">
            <MapPin size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            {dest.placesCovered}
          </p>
        )}

        <div className="dest-footer">
          <div className="dest-price-box">
            <small>Starting From</small>
            <b>{dest.startPrice}</b>
          </div>

          {VIEW_ONLY_MODE ? (
            <button
              type="button"
              onClick={handleScrollToPackages}
              className="dest-link-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label={`View packages for ${dest.name}`}
            >
              <span>View Packages</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <Link
              to={`/destinations/${dest.slug}`}
              className="dest-link-btn"
              aria-label={`Explore ${dest.name}`}
            >
              <span>Explore</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// COMPONENT: DestinationsSection
// ============================================================================
function DestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'North', 'South', 'West', 'East', 'Islands'];

  const filteredDestinations = activeFilter === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.region === activeFilter);

  return (
    <section id="destinations" className="destinations-section section-padding">
      <div className="container">
        <div className="section-head">
          <span className="badge-eyebrow">
            <MapPin size={14} />
            Iconic Landscapes
          </span>
          <h2 className="section-title">
            Explore <em>India.</em>
          </h2>
          <p className="section-subtitle">
            From the Himalayas to the Indian Ocean. Discover 12 hand-selected Indian regions celebrating ancient culture, majestic topography, and raw natural beauty.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="destination-filters" role="tablist" aria-label="Destination Regions">
          {filters.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'All' ? 'All Destinations' : `${filter} India`}
            </button>
          ))}
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="editorial-grid">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: FeaturedShowcase
// ============================================================================
function FeaturedShowcase() {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="featured-showcase-section section-padding">
      <div className="container">
        <div className="showcase-header">
          <div>
            <span className="badge-eyebrow">
              <Sparkles size={14} />
              Curator’s Choice
            </span>
            <h2 className="section-title">
              Featured <em>Destinations.</em>
            </h2>
            <p className="section-subtitle">
              Handpicked travel sanctuaries designed to immerse you in breathtaking landscapes and timeless elegance.
            </p>
          </div>

          <div className="showcase-nav-btns">
            <button
              onClick={() => scroll('left')}
              className="showcase-nav-btn"
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="showcase-nav-btn"
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="showcase-track" ref={trackRef}>
          {FEATURED_DESTINATIONS.map((dest) => {
            const cardContent = (
              <>
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                />
                <div className="showcase-item-shade" />

                <div className="showcase-item-content">
                  <span className="showcase-item-tag">{dest.tag} · {dest.season}</span>
                  <h3 className="showcase-item-name">{dest.name}</h3>
                  <p className="showcase-item-title">{dest.title}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent-gold)', fontSize: '0.85rem', fontWeight: '600' }}>
                    <span>{VIEW_ONLY_MODE ? 'View Packages' : 'View Details'}</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </>
            );

            if (VIEW_ONLY_MODE) {
              return (
                <div
                  key={dest.slug}
                  onClick={handleScrollToPackages}
                  className="showcase-item"
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View packages for ${dest.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleScrollToPackages();
                    }
                  }}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={dest.slug}
                to={`/destinations/${dest.slug}`}
                className="showcase-item"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: PackageCard
// ============================================================================
function PackageCard({ pkg, onOpenBooking }) {
  if (!pkg) return null;

  const handlePlanClick = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking({
        packageTitle: pkg.title,
        destinationName: pkg.destination || pkg.region || ''
      });
    }
  };

  return (
    <article className="package-card" data-slug={pkg.slug}>
      {/* Image Container with Subtle Badges */}
      <div className="package-image-wrap">
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/sikkim.jpg';
          }}
        />
        <div className="package-image-overlay" />

        {/* Top Badges */}
        <div className="package-top-badges">
          {pkg.popular ? (
            <span className="badge-popular">
              <Sparkles size={11} className="badge-icon" />
              Popular
            </span>
          ) : (
            <span className="badge-region-tag">{pkg.region || pkg.destination}</span>
          )}

          <span className="package-duration-badge">
            <Clock size={12} />
            {pkg.duration}
          </span>
        </div>

        {/* Price Floating Tag */}
        <div className="package-price-badge">
          <small>Starts at</small>
          <span>{pkg.price}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="package-content">
        {/* Region & Places Covered */}
        <div className="package-location">
          <MapPin size={13} className="location-pin-icon" />
          <span className="package-region-name">{pkg.region || pkg.destination}</span>
        </div>

        <h3 className="package-title">
          {VIEW_ONLY_MODE ? (
            <span className="package-title-text">{pkg.title}</span>
          ) : (
            <Link to={`/packages/${pkg.slug}`} className="package-title-link">
              {pkg.title}
            </Link>
          )}
        </h3>

        {/* Tourist Places Covered */}
        {pkg.placesCovered && (
          <div className="package-places-covered" title={pkg.placesCovered}>
            <span className="places-label">Places:</span>
            <span className="places-list">{pkg.placesCovered}</span>
          </div>
        )}

        <p className="package-desc">{pkg.shortDesc}</p>

        {/* Actions Row */}
        <div className="package-footer-actions">
          {VIEW_ONLY_MODE ? (
            <button
              type="button"
              onClick={handlePlanClick}
              className="btn-plan-trip btn-plan-full"
              aria-label={`Inquire about ${pkg.title}`}
            >
              <span>Inquire This Journey</span>
              <ArrowRight size={14} className="action-arrow" />
            </button>
          ) : (
            <>
              <Link
                to={`/packages/${pkg.slug}`}
                className="btn-view-package"
                aria-label={`View details for ${pkg.title}`}
              >
                <span>View Package</span>
                <ArrowRight size={14} className="action-arrow" />
              </Link>

              <button
                type="button"
                onClick={handlePlanClick}
                className="btn-plan-trip"
                aria-label={`Plan trip for ${pkg.title}`}
              >
                Plan This Trip
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// COMPONENT: TravelPackagesSection
// ============================================================================
function TravelPackagesSection({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPackages = useMemo(() => {
    if (activeFilter === 'all') {
      return TRAVEL_PACKAGES;
    }

    const filterDef = REGION_FILTERS.find((f) => f.id === activeFilter);
    if (!filterDef) {
      return TRAVEL_PACKAGES;
    }

    return TRAVEL_PACKAGES.filter((pkg) => {
      const pkgRegion = (pkg.region || pkg.destination || '').toLowerCase();
      return filterDef.match.some((term) => pkgRegion.includes(term.toLowerCase()));
    });
  }, [activeFilter]);

  return (
    <section id="packages" className="packages-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <span className="badge-eyebrow">
            <Compass size={14} />
            Bespoke Travel Packages
          </span>
          <h2 className="section-title">
            Journeys Designed <em>For You.</em>
          </h2>
          <p className="section-subtitle">
            Immersive multi-day expeditions across 12 iconic regions of India, crafted with handpicked luxury stays, private mountain chauffeurs, and authentic local access.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          totalCount={TRAVEL_PACKAGES.length}
          filteredCount={filteredPackages.length}
        />

        {/* Packages Grid */}
        <div
          id="packages-grid"
          className="packages-grid"
          role="region"
          aria-label="Travel packages list"
        >
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="packages-empty-state">
            <p>No packages found for this region. Showing all journeys.</p>
            <button
              type="button"
              className="btn-pill-gold"
              onClick={() => setActiveFilter('all')}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: ExperiencesSection
// ============================================================================
function ExperiencesSection({ onSelectExperience }) {
  return (
    <section id="experiences" className="experiences-section section-padding">
      <div className="container">
        <div className="section-head">
          <span className="badge-eyebrow">
            <Compass size={14} />
            Wayfarer Styles
          </span>
          <h2 className="section-title">
            Travel For The <em>Experience.</em>
          </h2>
          <p className="section-subtitle">
            Whether you seek high-altitude adrenaline, barefoot island solitude, or ancient royal hospitality, we curate each journey around what moves you.
          </p>
        </div>

        <div className="experiences-grid">
          {TRAVEL_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="experience-card"
              onClick={() => onSelectExperience && onSelectExperience(exp.title)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="experience-card-img"
                loading="lazy"
              />
              <div className="experience-card-shade" />

              <div className="experience-card-content">
                <span className="experience-count">{exp.count}</span>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-desc">{exp.desc}</p>
                <div className="experience-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: WhyChooseUs
// ============================================================================
const iconMap = {
  Compass: Compass,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones
};

function WhyChooseUs() {
  return (
    <section className="why-us-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Award size={14} />
            The IndiaWander Distinction
          </span>
          <h2 className="section-title">
            India, Curated <em>Your Way.</em>
          </h2>
          <p className="section-subtitle">
            We reject the rushed, check-box tour bus model. Our journeys are unhurried, deeply considered, and personalized to your tastes.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_CHOOSE_US.map((item) => {
            const IconComponent = iconMap[item.icon] || Compass;
            return (
              <div key={item.number} className="why-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="why-number">{item.number}</span>
                  <div style={{ color: 'var(--color-accent-gold)', opacity: 0.85 }}>
                    <IconComponent size={24} />
                  </div>
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: StoryAboutSection
// ============================================================================
function StoryAboutSection({ onOpenBooking }) {
  return (
    <section id="about" className="story-section section-padding">
      <div className="container">
        <div className="story-grid">
          {/* Left: Destination Photography */}
          <div className="story-images-asymmetric">
            <div className="story-img-main">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=85"
                alt="Architectural arches and reflection in India"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Story Content & Metrics */}
          <div className="story-content">
            <span className="badge-eyebrow">
              <HeartHandshake size={14} />
              Our Philosophy
            </span>
            <h2 className="section-title">
              India Has A Story.<br />
              <em>Let Us Take You There.</em>
            </h2>

            <p className="story-text">
              India is not simply a destination; it is an epic living tapestry of colors, sacred river hymns, high Himalayan winds, and timeless hospitality.
            </p>
            <p className="story-text">
              At IndiaWander, we exist to bridge the gap between ordinary tourism and genuine discovery. We partner with local historians, heritage property keepers, and master storytellers across the subcontinent to craft journeys that stay with you forever.
            </p>

            {/* Metrics Counters */}
            <div className="story-metrics-grid">
              {STORY_METRICS.map((metric) => (
                <div key={metric.label} className="metric-item">
                  <b>{metric.value}</b>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '36px' }}>
              <button
                onClick={onOpenBooking}
                className="btn-pill-gold"
              >
                <span>Discover With Us</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: TripPlannerSection
// ============================================================================
function TripPlannerSection({ onOpenBookingWithData }) {
  const [destination, setDestination] = useState('ladakh');
  const [travelDate, setTravelDate] = useState('2025-05-15');
  const [travelers, setTravelers] = useState('2 Travelers (Couple)');
  const [travelStyle, setTravelStyle] = useState('Luxury');
  const [budget, setBudget] = useState('₹50,000');
  const [itineraryResult, setItineraryResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const travelStyles = [
    'Adventure',
    'Relaxation',
    'Luxury',
    'Family',
    'Honeymoon',
    'Backpacking',
    'Culture'
  ];

  const budgetOptions = [
    '₹10,000 – ₹20,000',
    '₹25,000 – ₹45,000',
    '₹50,000 – ₹85,000',
    '₹1,00,000+'
  ];

  const handleBuildJourney = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const selectedDestObj = DESTINATIONS.find((d) => d.slug === destination) || DESTINATIONS[0];
      
      setItineraryResult({
        destinationName: selectedDestObj.name,
        state: selectedDestObj.state,
        style: travelStyle,
        travelers: travelers,
        estimatedDays: '6 Days / 5 Nights',
        recommendedRoute: `${selectedDestObj.bestPlaces[0]?.name || selectedDestObj.name} → ${selectedDestObj.bestPlaces[1]?.name || 'Scenic Valley'} → ${selectedDestObj.bestPlaces[2]?.name || 'Cultural Oasis'}`,
        highlights: [
          `Private VIP transfer across ${selectedDestObj.name}`,
          `Bespoke ${travelStyle.toLowerCase()} accommodations with daily breakfast`,
          `Exclusive local expert guiding at ${selectedDestObj.bestPlaces[0]?.name || 'key landmarks'}`
        ],
        budgetTier: budget
      });
      setIsGenerating(false);
    }, 450);
  };

  return (
    <section id="planner" className="planner-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Sparkles size={14} />
            Interactive Trip Designer
          </span>
          <h2 className="section-title">
            Plan Your <em>Journey.</em>
          </h2>
          <p className="section-subtitle">
            Tell us your vision, and our intelligent itinerary builder will recommend a bespoke travel outline designed around your preferences.
          </p>
        </div>

        <div className="planner-box">
          <form onSubmit={handleBuildJourney}>
            <div className="planner-form-grid">
              {/* Destination */}
              <div className="form-field">
                <label>Where do you want to go?</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date */}
              <div className="form-field">
                <label>Approximate Travel Dates</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                />
              </div>

              {/* Number of Travelers */}
              <div className="form-field">
                <label>Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                >
                  <option>1 Solo Wanderer</option>
                  <option>2 Travelers (Couple)</option>
                  <option>3–5 Family / Friends</option>
                  <option>6+ Curated Group</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="form-field">
                <label>Target Budget (Per Person)</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Style Selector */}
            <div className="style-selector-group">
              <span className="style-selector-label">Preferred Travel Style</span>
              <div className="style-pills">
                {travelStyles.map((style) => (
                  <button
                    type="button"
                    key={style}
                    className={`style-pill-btn ${travelStyle === style ? 'active' : ''}`}
                    onClick={() => setTravelStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="planner-action-bar">
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                ✨ 100% customizable with our dedicated concierge
              </span>

              <button
                type="submit"
                className="btn-pill-gold"
                disabled={isGenerating}
              >
                <span>{isGenerating ? 'Designing Itinerary...' : 'Build My Journey'}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* Recommended Itinerary Result Card */}
          {itineraryResult && (
            <div className="itinerary-result-card">
              <div className="itinerary-result-header">
                <div>
                  <span className="badge-eyebrow" style={{ marginBottom: '4px' }}>
                    <CheckCircle2 size={13} color="#28C76F" />
                    Recommended Concept Found
                  </span>
                  <h3>
                    {itineraryResult.destinationName} {itineraryResult.style} Odyssey
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>
                    Curated for {itineraryResult.travelers} · {itineraryResult.estimatedDays}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', display: 'block' }}>ESTIMATED TIER</span>
                  <b style={{ color: 'var(--color-accent-gold)', fontSize: '1.2rem' }}>{itineraryResult.budgetTier}</b>
                </div>
              </div>

              <div className="itinerary-highlights">
                <div className="highlight-box">
                  <b>Suggested Route</b>
                  <p>{itineraryResult.recommendedRoute}</p>
                </div>
                <div className="highlight-box">
                  <b>Signature Inclusions</b>
                  <p>{itineraryResult.highlights[0]}</p>
                </div>
                <div className="highlight-box">
                  <b>Handpicked Experience</b>
                  <p>{itineraryResult.highlights[2]}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => onOpenBookingWithData && onOpenBookingWithData(itineraryResult)}
                  className="btn-pill-gold"
                >
                  <span>Request Full Itinerary & Booking Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: TestimonialsSection
// ============================================================================
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Star size={14} fill="currentColor" />
            Traveler Voices
          </span>
          <h2 className="section-title">
            Stories From The <em>Road.</em>
          </h2>
          <p className="section-subtitle">
            Unfiltered reflections from discerning travelers who explored India through our lens.
          </p>
        </div>

        <div className="testimonial-carousel-wrap">
          <div style={{ color: 'var(--color-accent-gold)', display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <blockquote className="testimonial-quote">
            “{current.quote}”
          </blockquote>

          <div className="testimonial-author">
            <div className="author-avatar">
              <img
                src={current.avatar}
                alt={current.name}
                loading="lazy"
              />
            </div>
            <div className="author-name">{current.name}</div>
            <div className="author-details">{current.city} · {current.trip}</div>
          </div>

          <div className="testimonial-arrows">
            <button
              onClick={prev}
              className="showcase-nav-btn"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`hero-dot-btn ${currentIndex === i ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="showcase-nav-btn"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: GallerySection
// ============================================================================
function GallerySection({ onOpenLightbox }) {
  return (
    <section className="gallery-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Camera size={14} />
            Visual Journals
          </span>
          <h2 className="section-title">
            India Through <em>Their Eyes.</em>
          </h2>
          <p className="section-subtitle">
            Moments frozen in time across salt pans, snow valleys, sacred ghats, and royal courtyards.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`gallery-card ${item.aspect === 'portrait' ? 'tall' : ''}`}
              onClick={() => onOpenLightbox && onOpenLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="gallery-top-icon">
                  <Instagram size={20} />
                </div>
                <div className="gallery-bot-info">
                  <b>{item.location}</b>
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: FaqSection
// ============================================================================
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <HelpCircle size={14} />
            Clarity & Guidance
          </span>
          <h2 className="section-title">
            Frequently Asked <em>Questions.</em>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about preparing your bespoke journey through incredible India.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`faq-icon ${isOpen ? 'open' : ''}`}
                    size={20}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-box">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: ContactSection
// ============================================================================
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Ladakh',
    travelDate: '',
    travelers: '2 Travelers',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Ladakh',
        travelDate: '',
        travelers: '2 Travelers',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-info-col">
            <div>
              <span className="badge-eyebrow">
                <Sparkles size={14} />
                Connect With Us
              </span>
              <h2 className="section-title">
                Your Journey <em>Starts Here.</em>
              </h2>
              <p className="section-subtitle">
                Whether you have a fully formed dream or simply a curiosity to wander, speak with our private trip curators today.
              </p>
            </div>

            <div className="contact-channels">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="channel-item">
                <div className="channel-icon-box">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>WHATSAPP CONCIERGE</small>
                  <b>+91 98765 43210</b>
                </div>
              </a>

              <a href="mailto:concierge@indiawander.com" className="channel-item">
                <div className="channel-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>EMAIL INQUIRIES</small>
                  <b>concierge@indiawander.com</b>
                </div>
              </a>

              <a href="tel:+919876543210" className="channel-item">
                <div className="channel-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>DIRECT PHONE</small>
                  <b>+91 98765 43210 (24/7)</b>
                </div>
              </a>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.85rem', fontWeight: '600' }}>
                Talk to a Travel Expert
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '4px' }}>
                Our senior destination specialists are available for scheduled video consultations to review bespoke routes.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-box">
            {submitted && (
              <div className="form-success-banner">
                <CheckCircle2 size={24} style={{ marginBottom: '8px' }} />
                <h4>Thank you! Your inquiry has been received.</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  A senior IndiaWander travel designer will review your preferences and contact you within 4 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Patel"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Destination *</label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                    <option value="Multi-Region Custom">Multi-Region Custom</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Target Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Travelers</label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option>1 Solo Traveler</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3–5 Family / Friends</option>
                    <option>6+ Private Group</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tell us about your ideal journey</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details like preferred pace, celebrations, dietary restrictions, or must-see landmarks..."
                />
              </div>

              <button
                type="submit"
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                <span>{loading ? 'Sending Request...' : 'Send Inquiry'}</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENT: Footer
// ============================================================================
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo">
              <div className="brand-icon-box">
                <Compass size={18} />
              </div>
              <span>
                INDIA<b>WANDER</b>
                <span className="gold-dot">.</span>
              </span>
            </Link>
            <p>
              Discover India Beyond the Ordinary. Luxury, authentic, and cinematic travel expeditions crafted across the subcontinent.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <Youtube size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="/#hero">Home</a></li>
              <li><a href="/#destinations">Destinations</a></li>
              <li><a href="/#packages">Travel Packages</a></li>
              <li><a href="/#experiences">Experiences</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="footer-heading">Popular Escapes</h4>
            <ul className="footer-links-list">
              <li><Link to="/destinations/ladakh">Ladakh</Link></li>
              <li><Link to="/destinations/kashmir">Kashmir</Link></li>
              <li><Link to="/destinations/kerala">Kerala</Link></li>
              <li><Link to="/destinations/rajasthan">Rajasthan</Link></li>
              <li><Link to="/destinations/goa">Goa</Link></li>
              <li><Link to="/destinations/andaman-nicobar">Andaman Islands</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="newsletter-box">
            <h4 className="footer-heading">Journals & Inspiration</h4>
            <p>
              Receive handpicked seasonal routes, hidden havelis, and exclusive editorial travel stories directly to your inbox.
            </p>

            {subscribed ? (
              <div style={{ color: '#28C76F', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                <Check size={16} />
                <span>You are subscribed to the IndiaWander Journal!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} INDIAWANDER Travel Discovery Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Responsible Tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// COMPONENT: Itinerary
// ============================================================================
function Itinerary({ itinerary = [] }) {
  const [openDays, setOpenDays] = useState({ 1: true });

  const toggleDay = (dayNum) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const expandAll = () => {
    const all = {};
    itinerary.forEach((item) => {
      all[item.day] = true;
    });
    setOpenDays(all);
  };

  const collapseAll = () => {
    setOpenDays({});
  };

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  const areAllExpanded = itinerary.every((item) => openDays[item.day]);

  return (
    <div className="itinerary-component">
      <div className="itinerary-controls-row">
        <span className="itinerary-duration-tag">
          <Calendar size={14} />
          {itinerary.length} Days Itinerary
        </span>
        <button
          type="button"
          className="itinerary-toggle-all-btn"
          onClick={areAllExpanded ? collapseAll : expandAll}
        >
          {areAllExpanded ? 'Collapse All Days' : 'Expand All Days'}
        </button>
      </div>

      <div className="itinerary-timeline">
        {itinerary.map((dayItem) => {
          const isOpen = !!openDays[dayItem.day];
          const paddedDay = String(dayItem.day).padStart(2, '0');

          return (
            <div
              key={dayItem.day}
              className={`itinerary-timeline-node ${isOpen ? 'open' : 'closed'}`}
            >
              <div
                className="itinerary-node-header"
                onClick={() => toggleDay(dayItem.day)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDay(dayItem.day);
                  }
                }}
              >
                <div className="itinerary-node-left">
                  <span className="itinerary-day-pill">DAY {paddedDay}</span>
                  <h4 className="itinerary-day-title">{dayItem.title}</h4>
                </div>

                <div className="itinerary-node-right">
                  <span className="itinerary-accordion-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div className="itinerary-node-body">
                  <p className="itinerary-day-description">{dayItem.desc}</p>

                  <div className="itinerary-day-highlights-bar">
                    {dayItem.meals && (
                      <div className="itinerary-highlight-item">
                        <Utensils size={14} className="highlight-icon" />
                        <span>Meals: <strong>{dayItem.meals}</strong></span>
                      </div>
                    )}
                    {dayItem.stay && (
                      <div className="itinerary-highlight-item">
                        <Hotel size={14} className="highlight-icon" />
                        <span>Stay: <strong>{dayItem.stay}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: Gallery
// ============================================================================
function Gallery({ images = [], title = 'Journey Gallery' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-component">
      <div className="gallery-grid">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className={`gallery-grid-item item-${idx % 5}`}
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`Open image ${idx + 1} of ${images.length} in lightbox`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
          >
            <img src={imgUrl} alt={`${title} photo ${idx + 1}`} loading="lazy" />
            <div className="gallery-item-hover">
              <Maximize2 size={20} className="hover-zoom-icon" />
              <span>View Photo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`${title} enlarged view ${lightboxIndex + 1}`}
            />
            <div className="lightbox-caption-bar">
              <span>{title}</span>
              <span>{lightboxIndex + 1} / {images.length}</span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: Home
// ============================================================================
function Home({ isBookingOpen, setIsBookingOpen, bookingData, setBookingData }) {
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleOpenBooking = (customData = null) => {
    if (customData) {
      setBookingData(customData);
    }
    setIsBookingOpen(true);
  };

  return (
    <main>
      {/* Hero Section (Faithful to Reference Image) */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Destinations Section (12 Indian destinations, editorial grid) */}
      <DestinationsSection />

      {/* Featured Horizontal Showcase */}
      <FeaturedShowcase />

      {/* Travel Packages Section */}
      <TravelPackagesSection onOpenBooking={handleOpenBooking} />

      {/* Travel Experiences */}
      <ExperiencesSection onSelectExperience={(title) => handleOpenBooking({ packageTitle: `${title} Experience` })} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Story / About Us Section */}
      <StoryAboutSection onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Trip Planner */}
      <TripPlannerSection onOpenBookingWithData={(data) => handleOpenBooking(data)} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Instagram / Masonry Gallery */}
      <GallerySection onOpenLightbox={(item) => setLightboxItem(item)} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Lightbox Modal */}
      {lightboxItem && (
        <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </main>
  );
}

// ============================================================================
// COMPONENT: DestinationDetail
// ============================================================================
function DestinationDetail({ onOpenBookingWithData }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const destination = DESTINATIONS.find((d) => d.slug === slug) || DESTINATIONS[0];
  const relatedPackages = TRAVEL_PACKAGES.filter((p) =>
    p.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
    destination.name.toLowerCase().includes(p.destination.toLowerCase())
  );

  return (
    <div className="destination-detail-page" style={{ paddingTop: '80px', backgroundColor: 'var(--color-dark)' }}>
      {/* Back Link */}
      <div className="container" style={{ padding: '20px 32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted)', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </button>
      </div>

      {/* Hero Section */}
      <section
        className="detail-hero-section"
        style={{ backgroundImage: `url(${destination.heroImage})` }}
      >
        <div className="detail-hero-shade" />
        <div className="container detail-hero-content">
          <span className="badge-eyebrow">
            <MapPin size={14} />
            {destination.state} · {destination.region} India
          </span>
          <h1 className="detail-title">{destination.name}</h1>
          <p className="detail-tagline">{destination.tagline}</p>

          <div className="detail-meta-pills">
            <div className="detail-meta-pill">
              <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Best Time: {destination.bestTime}
            </div>
            <div className="detail-meta-pill">
              <Star size={14} fill="#D9B77A" color="#D9B77A" style={{ display: 'inline', marginRight: '6px' }} />
              {destination.rating} ({destination.reviewCount} Reviews)
            </div>
            <div className="detail-meta-pill">
              From {destination.startPrice}
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Highlights */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '56px', alignItems: 'start' }}>
            <div>
              <span className="badge-eyebrow">
                <Compass size={14} />
                Overview
              </span>
              <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '20px' }}>
                Discovering <em>{destination.name}.</em>
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '24px' }}>
                {destination.overview}
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {destination.description}
              </p>

              {/* Things to Do */}
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '20px' }}>
                  Signature Things To Do
                </h3>
                <div style={{ display: 'grid', gap: '14px' }}>
                  {destination.thingsToDo.map((thing, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Sparkles size={16} color="var(--color-accent-gold)" />
                      <span style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>{thing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div style={{ background: 'var(--color-secondary-dark)', border: '1px solid rgba(217, 183, 122, 0.3)', borderRadius: 'var(--radius-md)', padding: '32px', position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Curated Private Tours
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-accent-gold)', margin: '6px 0 16px' }}>
                {destination.startPrice} <span style={{ fontSize: '0.9rem', color: 'var(--color-muted)', fontWeight: '400' }}>/ person</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                Enjoy dedicated chauffeured travel, verified heritage resorts, and bespoke itineraries designed by local specialists.
              </p>

              <button
                onClick={() => onOpenBookingWithData && onOpenBookingWithData({ destinationName: destination.name, state: destination.state })}
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '14px' }}
              >
                <span>Inquire For {destination.name}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#28C76F" /> 100% Tailor-made routes
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#28C76F" /> Flexible cancellation terms
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#28C76F" /> 24/7 dedicated support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Places to Visit */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-secondary-dark)' }}>
        <div className="container">
          <div className="section-head">
            <span className="badge-eyebrow">
              <MapPin size={14} />
              Key Landmarks
            </span>
            <h2 className="section-title">
              Best Places To Visit in <em>{destination.name}.</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {destination.bestPlaces.map((place, idx) => (
              <div
                key={idx}
                style={{ background: 'rgba(16, 19, 18, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '24px' }}
              >
                <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-gold)', fontWeight: '700', letterSpacing: '0.1em' }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#FFFFFF', margin: '8px 0' }}>
                  {place.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: '1.55' }}>
                  {place.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <div className="section-head">
              <span className="badge-eyebrow">
                <Sparkles size={14} />
                Ready To Book
              </span>
              <h2 className="section-title">
                Featured Packages for <em>{destination.name}.</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {relatedPackages.map((pkg) => (
                <div key={pkg.slug} className="package-card">
                  <div className="package-image-wrap">
                    <img src={pkg.image} alt={pkg.title} />
                    <span className="package-tag-badge">{pkg.tag}</span>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">{pkg.title}</h3>
                    <p className="package-desc">{pkg.shortDesc}</p>
                    <div className="package-meta-row">
                      <div className="package-price-wrap">
                        <small>From</small>
                        <span>{pkg.price}</span>
                      </div>
                      <Link to={`/packages/${pkg.slug}`} className="btn-pill-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                        <span>View Itinerary</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {destination.gallery && destination.gallery.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--color-secondary-dark)' }}>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">
                Gallery of <em>{destination.name}.</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {destination.gallery.map((img, idx) => (
                <div key={idx} style={{ height: '260px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img src={img} alt={`${destination.name} photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: PackageDetail
// ============================================================================
function PackageDetail({ onOpenBookingWithData }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const pkg = TRAVEL_PACKAGES.find((p) => p.slug === slug) || TRAVEL_PACKAGES[0];

  const handleBookClick = () => {
    if (onOpenBookingWithData) {
      onOpenBookingWithData({
        packageTitle: pkg.title,
        destinationName: pkg.destination || pkg.region || ''
      });
    }
  };

  const placesList = (pkg.placesCovered || pkg.location || '')
    .split('•')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="package-detail-page">
      {/* Navigation Breadcrumb Bar */}
      <nav className="detail-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="container breadcrumb-inner">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="breadcrumb-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to Packages</span>
          </button>
          <div className="breadcrumb-trail">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <a href="/#packages">Packages</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{pkg.title}</span>
          </div>
        </div>
      </nav>

      {/* 1. Hero Banner */}
      <header
        className="detail-hero-section"
        style={{ backgroundImage: `url(${pkg.image})` }}
      >
        <div className="detail-hero-shade" />
        <div className="container detail-hero-content">
          <div className="detail-hero-badges-row">
            <span className="badge-eyebrow">
              <Compass size={14} />
              {pkg.region || pkg.destination} · {pkg.duration}
            </span>
            {pkg.popular && (
              <span className="badge-popular">
                <Sparkles size={12} />
                Popular Journey
              </span>
            )}
          </div>

          <h1 className="detail-title">{pkg.title}</h1>
          <p className="detail-tagline">
            <MapPin size={15} style={{ display: 'inline', marginRight: '6px' }} />
            {pkg.placesCovered || pkg.location}
          </p>

          <div className="detail-meta-pills">
            <div className="detail-meta-pill price-pill">
              <small>Starting From</small>
              <b>{pkg.price}</b>
            </div>
            <div className="detail-meta-pill">
              <Clock size={14} color="var(--color-accent-gold)" />
              <span>{pkg.duration}</span>
            </div>
            <div className="detail-meta-pill">
              <Star size={14} fill="#D9B77A" color="#D9B77A" />
              <span>{pkg.rating || 4.95} ({pkg.reviews || 120} Verified Reviews)</span>
            </div>
            <button
              type="button"
              onClick={handleBookClick}
              className="btn-pill-gold hero-cta-btn"
            >
              <span>Plan This Trip</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Places Covered Strip */}
      {placesList.length > 0 && (
        <section className="places-covered-strip">
          <div className="container">
            <div className="places-strip-inner">
              <span className="places-strip-title">
                <MapPin size={14} />
                Key Tourist Places:
              </span>
              <div className="places-tags-flow">
                {placesList.map((place, idx) => (
                  <span key={idx} className="place-chip">
                    {place}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content & Sticky Booking Sidebar */}
      <section className="detail-body-section section-padding">
        <div className="container">
          <div className="detail-layout-grid">
            {/* Left Column: Extensive Content */}
            <div className="detail-main-column">
              {/* 2. Overview / Description */}
              <article className="detail-content-block" id="overview">
                <span className="badge-eyebrow">
                  <Sparkles size={14} />
                  Overview
                </span>
                <h2 className="detail-section-title">
                  The Expedition <em>Experience.</em>
                </h2>
                <p className="detail-lead-text">{pkg.overview || pkg.shortDesc}</p>
                {pkg.shortDesc && pkg.shortDesc !== pkg.overview && (
                  <p className="detail-sub-text">{pkg.shortDesc}</p>
                )}
              </article>

              {/* 3. Key Activities & Experiences */}
              {pkg.activities && pkg.activities.length > 0 && (
                <article className="detail-content-block" id="activities">
                  <span className="badge-eyebrow">
                    <Award size={14} />
                    Curated Moments
                  </span>
                  <h3 className="detail-section-title">
                    Key Activities & <em>Experiences.</em>
                  </h3>
                  <div className="activities-list-grid">
                    {pkg.activities.map((act, idx) => (
                      <div key={idx} className="activity-item-card">
                        <div className="activity-icon-wrap">
                          <Sparkles size={16} color="var(--color-accent-gold)" />
                        </div>
                        <p>{act}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 4. Day-by-Day Itinerary */}
              <article className="detail-content-block" id="itinerary">
                <span className="badge-eyebrow">
                  <Calendar size={14} />
                  Daily Route
                </span>
                <h3 className="detail-section-title">
                  Day-by-Day <em>Itinerary.</em>
                </h3>
                <Itinerary itinerary={pkg.itinerary} />
              </article>

              {/* 5. Hotel & Accommodation Highlights */}
              {pkg.hotels && pkg.hotels.length > 0 && (
                <article className="detail-content-block" id="hotels">
                  <span className="badge-eyebrow">
                    <Hotel size={14} />
                    Accommodations
                  </span>
                  <h3 className="detail-section-title">
                    Handpicked Luxury <em>Stays.</em>
                  </h3>
                  <div className="hotels-cards-grid">
                    {pkg.hotels.map((hotel, idx) => (
                      <div key={idx} className="hotel-card-item">
                        <div className="hotel-card-icon">
                          <Hotel size={20} color="var(--color-accent-gold)" />
                        </div>
                        <div className="hotel-card-info">
                          <h4 className="hotel-name">{hotel}</h4>
                          <span className="hotel-tag">Verified Boutique & Heritage Partner</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 6. Inclusions & Exclusions */}
              <article className="detail-content-block" id="inclusions-exclusions">
                <span className="badge-eyebrow">
                  <ShieldCheck size={14} />
                  Trip Details
                </span>
                <h3 className="detail-section-title">
                  What is <em>Included.</em>
                </h3>

                <div className="inclusions-exclusions-grid">
                  {/* Inclusions */}
                  <div className="inc-box inclusions-box">
                    <h4 className="inc-box-title">
                      <Check size={18} /> What's Included
                    </h4>
                    <ul className="inc-list">
                      {(pkg.inclusions || []).map((inc, i) => (
                        <li key={i}>
                          <Check size={14} className="list-check-icon" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="inc-box exclusions-box">
                    <h4 className="inc-box-title">
                      <X size={18} /> What's Excluded
                    </h4>
                    <ul className="inc-list">
                      {(pkg.exclusions || []).map((exc, i) => (
                        <li key={i}>
                          <X size={14} className="list-cross-icon" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              {/* 7. Best Time to Visit & Travel Tips */}
              <article className="detail-content-block" id="tips">
                <div className="tips-weather-grid">
                  {pkg.bestTime && (
                    <div className="best-time-card">
                      <span className="badge-eyebrow">
                        <Calendar size={13} />
                        Ideal Season
                      </span>
                      <h4 className="card-sub-heading">Best Time to Visit</h4>
                      <p className="card-highlight-text">{pkg.bestTime}</p>
                      <p className="card-sub-text">
                        Weather and road passes are most favorable during this window for optimal sightseeing.
                      </p>
                    </div>
                  )}

                  {pkg.travelTips && pkg.travelTips.length > 0 && (
                    <div className="travel-tips-card">
                      <span className="badge-eyebrow">
                        <Lightbulb size={13} />
                        Insider Advice
                      </span>
                      <h4 className="card-sub-heading">Essential Travel Tips</h4>
                      <ul className="tips-list">
                        {pkg.travelTips.map((tip, idx) => (
                          <li key={idx}>
                            <span>•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>

              {/* 8. Image Gallery with Lightbox */}
              {pkg.gallery && pkg.gallery.length > 0 && (
                <article className="detail-content-block" id="gallery">
                  <span className="badge-eyebrow">
                    <Sparkles size={14} />
                    Visual Journey
                  </span>
                  <h3 className="detail-section-title">
                    Destination <em>Gallery.</em>
                  </h3>
                  <Gallery images={pkg.gallery} title={pkg.title} />
                </article>
              )}

              {/* 9. Customer Reviews */}
              {pkg.reviewsList && pkg.reviewsList.length > 0 && (
                <article className="detail-content-block" id="reviews">
                  <span className="badge-eyebrow">
                    <Star size={14} />
                    Guest Stories
                  </span>
                  <h3 className="detail-section-title">
                    Traveler <em>Reviews.</em>
                  </h3>
                  <div className="reviews-cards-list">
                    {pkg.reviewsList.map((rev, idx) => (
                      <div key={idx} className="review-item-card">
                        <div className="review-top-bar">
                          <div className="review-author-meta">
                            <b className="author-name">{rev.author}</b>
                            <span className="author-loc">{rev.location}</span>
                          </div>
                          <div className="review-stars">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={14} fill="#D9B77A" color="#D9B77A" />
                            ))}
                          </div>
                        </div>
                        <p className="review-text">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 10. Frequently Asked Questions */}
              {pkg.faqs && pkg.faqs.length > 0 && (
                <article className="detail-content-block" id="faqs">
                  <span className="badge-eyebrow">
                    <HelpCircle size={14} />
                    Have Questions?
                  </span>
                  <h3 className="detail-section-title">
                    Package <em>FAQs.</em>
                  </h3>
                  <div className="faqs-accordion">
                    {pkg.faqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                          <div
                            className="faq-accordion-header"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isOpen}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setOpenFaq(isOpen ? null : idx);
                              }
                            }}
                          >
                            <span>{faq.q}</span>
                            <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
                          </div>
                          {isOpen && (
                            <div className="faq-accordion-body">
                              <p>{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </article>
              )}
            </div>

            {/* Right Column: Sticky Booking Card */}
            <aside className="detail-sidebar-column">
              <div className="detail-sticky-booking-card">
                <span className="sidebar-booking-label">Exclusive Departure / Custom Dates</span>
                <div className="sidebar-price-amount">{pkg.price}</div>
                <span className="sidebar-price-sub">
                  Per person (Double Occupancy) · {pkg.duration}
                </span>

                <button
                  type="button"
                  onClick={handleBookClick}
                  className="btn-pill-gold btn-full-width"
                >
                  <span>Plan This Trip</span>
                  <ArrowRight size={16} />
                </button>

                <p className="sidebar-guarantee-note">
                  No immediate charge. Our travel designer will customize your exact dates and itinerary first.
                </p>

                <div className="sidebar-features-list">
                  <div className="sidebar-feature-row">
                    <ShieldCheck size={16} color="var(--color-accent-gold)" />
                    <span>Verified boutique and luxury stays</span>
                  </div>
                  <div className="sidebar-feature-row">
                    <ShieldCheck size={16} color="var(--color-accent-gold)" />
                    <span>Dedicated private chauffeur & SUV</span>
                  </div>
                  <div className="sidebar-feature-row">
                    <ShieldCheck size={16} color="var(--color-accent-gold)" />
                    <span>24/7 personal trip concierge</span>
                  </div>
                  <div className="sidebar-feature-row">
                    <ShieldCheck size={16} color="var(--color-accent-gold)" />
                    <span>100% customizable itinerary</span>
                  </div>
                </div>

                <div className="sidebar-contact-box">
                  <small>Prefer talking to an expert?</small>
                  <a href="tel:+919876543210" className="sidebar-phone-link">
                    <PhoneCall size={14} />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 11. Final Inquiry CTA Banner */}
      <section className="detail-final-cta-section section-padding">
        <div className="container">
          <div className="final-cta-card">
            <span className="badge-eyebrow">
              <MessageCircle size={14} />
              Start Exploring
            </span>
            <h2 className="final-cta-title">
              Ready to Experience <em>{pkg.title}?</em>
            </h2>
            <p className="final-cta-desc">
              Connect with our destination specialist to customize your preferred dates, add private helicopter transfers, or upgrade to heritage royal suites.
            </p>
            <div className="final-cta-buttons">
              <button
                type="button"
                onClick={handleBookClick}
                className="btn-pill-gold"
              >
                <span>Plan This Trip Now</span>
                <ArrowRight size={16} />
              </button>
              <Link to="/#packages" className="btn-pill-secondary">
                Explore Other Journeys
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT & ROUTER
// ============================================================================
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingData(null);
  };

  return (
    <div className="app-layout">
      <PageLoader />
      <ScrollToTop />

      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isBookingOpen={isBookingOpen}
              setIsBookingOpen={setIsBookingOpen}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          }
        />

        {/* Multi-page detail routes: redirected to main view when in VIEW_ONLY_MODE */}
        <Route
          path="/destinations/:slug"
          element={
            VIEW_ONLY_MODE ? (
              <Navigate to="/" replace />
            ) : (
              <DestinationDetail onOpenBookingWithData={handleOpenBooking} />
            )
          }
        />
        <Route
          path="/packages/:slug"
          element={
            VIEW_ONLY_MODE ? (
              <Navigate to="/" replace />
            ) : (
              <PackageDetail onOpenBookingWithData={handleOpenBooking} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <FloatingControls />

      {/* Global Booking & Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingData}
      />
    </div>
  );
}
