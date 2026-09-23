import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Utensils, Hotel, Calendar } from 'lucide-react';

export default function Itinerary({ itinerary = [] }) {
  const [openDays, setOpenDays] = useState({ 1: true });

  const toggleDay = (dayNum) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const expandAll = () => {
    const all = {};
    itinerary.forEach((item) => {
      all[item.day] = true;
    });
    setOpenDays(all);
  };

  const collapseAll = () => {
    setOpenDays({});
  };

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  const areAllExpanded = itinerary.every((item) => openDays[item.day]);

  return (
    <div className="itinerary-component">
      <div className="itinerary-controls-row">
        <span className="itinerary-duration-tag">
          <Calendar size={14} />
          {itinerary.length} Days Itinerary
        </span>
        <button
          type="button"
          className="itinerary-toggle-all-btn"
          onClick={areAllExpanded ? collapseAll : expandAll}
        >
          {areAllExpanded ? 'Collapse All Days' : 'Expand All Days'}
        </button>
      </div>

      <div className="itinerary-timeline">
        {itinerary.map((dayItem) => {
          const isOpen = !!openDays[dayItem.day];
          const paddedDay = String(dayItem.day).padStart(2, '0');

          return (
            <div
              key={dayItem.day}
              className={`itinerary-timeline-node ${isOpen ? 'open' : 'closed'}`}
            >
              <div
                className="itinerary-node-header"
                onClick={() => toggleDay(dayItem.day)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDay(dayItem.day);
                  }
                }}
              >
                <div className="itinerary-node-left">
                  <span className="itinerary-day-pill">DAY {paddedDay}</span>
                  <h4 className="itinerary-day-title">{dayItem.title}</h4>
                </div>

                <div className="itinerary-node-right">
                  <span className="itinerary-accordion-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div className="itinerary-node-body">
                  <p className="itinerary-day-description">{dayItem.desc}</p>

                  <div className="itinerary-day-highlights-bar">
                    {dayItem.meals && (
                      <div className="itinerary-highlight-item">
                        <Utensils size={14} className="highlight-icon" />
                        <span>Meals: <strong>{dayItem.meals}</strong></span>
                      </div>
                    )}
                    {dayItem.stay && (
                      <div className="itinerary-highlight-item">
                        <Hotel size={14} className="highlight-icon" />
                        <span>Stay: <strong>{dayItem.stay}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

