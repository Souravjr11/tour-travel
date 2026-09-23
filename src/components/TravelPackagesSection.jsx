import React, { useState, useMemo } from 'react';
import { Compass } from 'lucide-react';
import { TRAVEL_PACKAGES, REGION_FILTERS } from '../data/travelData';
import PackageCard from './PackageCard';
import FilterTabs from './FilterTabs';

export default function TravelPackagesSection({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPackages = useMemo(() => {
    if (activeFilter === 'all') {
      return TRAVEL_PACKAGES;
    }

    const filterDef = REGION_FILTERS.find((f) => f.id === activeFilter);
    if (!filterDef) {
      return TRAVEL_PACKAGES;
    }

    return TRAVEL_PACKAGES.filter((pkg) => {
      const pkgRegion = (pkg.region || pkg.destination || '').toLowerCase();
      return filterDef.match.some((term) => pkgRegion.includes(term.toLowerCase()));
    });
  }, [activeFilter]);

  return (
    <section id="packages" className="packages-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <span className="badge-eyebrow">
            <Compass size={14} />
            Bespoke Travel Packages
          </span>
          <h2 className="section-title">
            Journeys Designed <em>For You.</em>
          </h2>
          <p className="section-subtitle">
            Immersive multi-day expeditions across 12 iconic regions of India, crafted with handpicked luxury stays, private mountain chauffeurs, and authentic local access.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          totalCount={TRAVEL_PACKAGES.length}
          filteredCount={filteredPackages.length}
        />

        {/* Packages Grid */}
        <div
          id="packages-grid"
          className="packages-grid"
          role="region"
          aria-label="Travel packages list"
        >
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="packages-empty-state">
            <p>No packages found for this region. Showing all journeys.</p>
            <button
              type="button"
              className="btn-pill-gold"
              onClick={() => setActiveFilter('all')}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
