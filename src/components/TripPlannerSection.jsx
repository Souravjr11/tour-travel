import React, { useState } from 'react';
import { Calendar, Users, Compass, DollarSign, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function TripPlannerSection({ onOpenBookingWithData }) {
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

