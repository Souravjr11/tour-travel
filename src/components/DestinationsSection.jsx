import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import DestinationCard from './DestinationCard';

export default function DestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'North', 'South', 'West', 'East', 'Islands'];

  const filteredDestinations = activeFilter === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.region === activeFilter);

  return (
    <section id="destinations" className="destinations-section section-padding">
      <div className="container">
        <div className="section-head">
          <span className="badge-eyebrow">
            <MapPin size={14} />
            Iconic Landscapes
          </span>
          <h2 className="section-title">
            Explore <em>India.</em>
          </h2>
          <p className="section-subtitle">
            From the Himalayas to the Indian Ocean. Discover 12 hand-selected Indian regions celebrating ancient culture, majestic topography, and raw natural beauty.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="destination-filters" role="tablist" aria-label="Destination Regions">
          {filters.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'All' ? 'All Destinations' : `${filter} India`}
            </button>
          ))}
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="editorial-grid">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
