import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, Compass, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { DESTINATIONS, TRAVEL_PACKAGES, FAQS } from '../data/travelData';

export default function DestinationDetail({ onOpenBookingWithData }) {
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

