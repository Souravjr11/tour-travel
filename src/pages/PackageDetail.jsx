import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Check,
  X,
  Star,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Hotel,
  HelpCircle,
  MessageCircle,
  Lightbulb,
  Award,
  Compass,
  PhoneCall
} from 'lucide-react';
import { TRAVEL_PACKAGES } from '../data/travelData';
import Itinerary from '../components/Itinerary';
import Gallery from '../components/Gallery';

export default function PackageDetail({ onOpenBookingWithData }) {
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
