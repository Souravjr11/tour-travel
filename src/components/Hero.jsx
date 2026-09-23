import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { HERO_DESTINATIONS } from '../data/travelData';

export default function Hero({ onOpenBooking }) {
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
