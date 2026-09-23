import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, MapPin } from 'lucide-react';

export default function DestinationCard({ dest }) {
  if (!dest) return null;

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

          <Link
            to={`/destinations/${dest.slug}`}
            className="dest-link-btn"
            aria-label={`Explore ${dest.name}`}
          >
            <span>Explore</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

