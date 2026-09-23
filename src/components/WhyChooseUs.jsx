import React from 'react';
import { Compass, Sparkles, ShieldCheck, Headphones, Award } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/travelData';

const iconMap = {
  Compass: Compass,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones
};

export default function WhyChooseUs() {
  return (
    <section className="why-us-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Award size={14} />
            The IndiaWander Distinction
          </span>
          <h2 className="section-title">
            India, Curated <em>Your Way.</em>
          </h2>
          <p className="section-subtitle">
            We reject the rushed, check-box tour bus model. Our journeys are unhurried, deeply considered, and personalized to your tastes.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_CHOOSE_US.map((item) => {
            const IconComponent = iconMap[item.icon] || Compass;
            return (
              <div key={item.number} className="why-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="why-number">{item.number}</span>
                  <div style={{ color: 'var(--color-accent-gold)', opacity: 0.85 }}>
                    <IconComponent size={24} />
                  </div>
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

