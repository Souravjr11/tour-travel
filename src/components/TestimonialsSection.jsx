import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export default function TestimonialsSection() {
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

