import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Sparkles, Star } from 'lucide-react';

export default function PackageCard({ pkg, onOpenBooking }) {
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
          <Link to={`/packages/${pkg.slug}`} className="package-title-link">
            {pkg.title}
          </Link>
        </h3>

        {/* Tourist Places Covered */}
        {pkg.placesCovered && (
          <div className="package-places-covered" title={pkg.placesCovered}>
            <span className="places-label">Places:</span>
            <span className="places-list">{pkg.placesCovered}</span>
          </div>
        )}

        <p className="package-desc">{pkg.shortDesc}</p>

        {/* Rating & Actions Row */}
        <div className="package-footer-actions">
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
        </div>
      </div>
    </article>
  );
}

