import React, { useEffect } from 'react';
import { X, MapPin, Instagram } from 'lucide-react';

export default function LightboxModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close image"
          style={{ top: '-40px', right: '0' }}
        >
          <X size={24} />
        </button>

        <img src={item.image} alt={item.title} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', color: '#FFFFFF' }}>
          <div>
            <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} />
              {item.location}
            </span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginTop: '2px' }}>
              {item.title}
            </h4>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
            <Instagram size={16} />
            <span>{item.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

