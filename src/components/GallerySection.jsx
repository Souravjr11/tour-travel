import React, { useState } from 'react';
import { Instagram, Camera, Eye, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/travelData';

export default function GallerySection({ onOpenLightbox }) {
  return (
    <section className="gallery-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <Camera size={14} />
            Visual Journals
          </span>
          <h2 className="section-title">
            India Through <em>Their Eyes.</em>
          </h2>
          <p className="section-subtitle">
            Moments frozen in time across salt pans, snow valleys, sacred ghats, and royal courtyards.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`gallery-card ${item.aspect === 'portrait' ? 'tall' : ''}`}
              onClick={() => onOpenLightbox && onOpenLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="gallery-top-icon">
                  <Instagram size={20} />
                </div>
                <div className="gallery-bot-info">
                  <b>{item.location}</b>
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

