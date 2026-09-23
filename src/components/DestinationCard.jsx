import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, MapPin } from 'lucide-react';
import { VIEW_ONLY_MODE } from '../config/siteConfig';

export default function DestinationCard({ dest }) {
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

