import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { TRAVEL_EXPERIENCES } from '../data/travelData';

export default function ExperiencesSection({ onSelectExperience }) {
  return (
    <section id="experiences" className="experiences-section section-padding">
      <div className="container">
        <div className="section-head">
          <span className="badge-eyebrow">
            <Compass size={14} />
            Wayfarer Styles
          </span>
          <h2 className="section-title">
            Travel For The <em>Experience.</em>
          </h2>
          <p className="section-subtitle">
            Whether you seek high-altitude adrenaline, barefoot island solitude, or ancient royal hospitality, we curate each journey around what moves you.
          </p>
        </div>

        <div className="experiences-grid">
          {TRAVEL_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="experience-card"
              onClick={() => onSelectExperience && onSelectExperience(exp.title)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="experience-card-img"
                loading="lazy"
              />
              <div className="experience-card-shade" />

              <div className="experience-card-content">
                <span className="experience-count">{exp.count}</span>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-desc">{exp.desc}</p>
                <div className="experience-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

