import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { FEATURED_DESTINATIONS } from '../data/travelData';
import { VIEW_ONLY_MODE } from '../config/siteConfig';

export default function FeaturedShowcase() {
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
