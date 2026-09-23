import React from 'react';
import { HeartHandshake, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { STORY_METRICS } from '../data/travelData';

export default function StoryAboutSection({ onOpenBooking }) {
  return (
    <section id="about" className="story-section section-padding">
      <div className="container">
        <div className="story-grid">
          {/* Left: Asymmetric Photography */}
          <div className="story-images-asymmetric">
            <div className="story-img-main">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=85"
                alt="Architectural arches and reflection in India"
                loading="lazy"
              />
            </div>
            <div className="story-img-sub">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Traveler enjoying Himalayan morning"
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

