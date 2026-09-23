import React, { useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const FILTER_ITEMS = [
  { id: 'all', label: 'All' },
  { id: 'ladakh', label: 'Ladakh' },
  { id: 'kashmir', label: 'Kashmir' },
  { id: 'himachal', label: 'Himachal' },
  { id: 'rajasthan', label: 'Rajasthan' },
  { id: 'goa', label: 'Goa' },
  { id: 'kerala', label: 'Kerala' },
  { id: 'uttarakhand', label: 'Uttarakhand' },
  { id: 'meghalaya', label: 'Meghalaya' },
  { id: 'andaman', label: 'Andaman' },
  { id: 'tamil-nadu', label: 'Tamil Nadu' },
  { id: 'sikkim', label: 'Sikkim' },
  { id: 'varanasi-agra', label: 'Varanasi & Agra' }
];

export default function FilterTabs({
  activeFilter,
  onSelectFilter,
  totalCount = 42,
  filteredCount
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="filter-tabs-wrapper">
      {/* Editorial Counter & Subtitle */}
      <div className="filter-tabs-header">
        <div className="filter-count-badge">
          <Sparkles size={13} className="filter-badge-sparkle" />
          <span>12 Destinations • 40+ Curated Journeys</span>
        </div>
        {filteredCount !== undefined && (
          <span className="filter-showing-text">
            Showing <b>{filteredCount}</b> of <b>{totalCount}</b> Journeys
          </span>
        )}
      </div>

      {/* Scrollable Tabs Row with arrow controls */}
      <div className="filter-tabs-nav-container">
        <button
          type="button"
          className="filter-scroll-arrow left"
          onClick={scrollLeft}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollContainerRef}
          className="filter-tabs-track"
          role="tablist"
          aria-label="Filter packages by Indian region"
        >
          {FILTER_ITEMS.map((item) => {
            const isActive = activeFilter.toLowerCase() === item.id.toLowerCase() ||
              (item.id === 'all' && (activeFilter === 'all' || activeFilter === 'All'));

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="packages-grid"
                className={`filter-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectFilter(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="filter-scroll-arrow right"
          onClick={scrollRight}
          aria-label="Scroll tabs right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

