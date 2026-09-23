import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function Gallery({ images = [], title = 'Journey Gallery' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-component">
      <div className="gallery-grid">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className={`gallery-grid-item item-${idx % 5}`}
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`Open image ${idx + 1} of ${images.length} in lightbox`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
          >
            <img src={imgUrl} alt={`${title} photo ${idx + 1}`} loading="lazy" />
            <div className="gallery-item-hover">
              <Maximize2 size={20} className="hover-zoom-icon" />
              <span>View Photo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`${title} enlarged view ${lightboxIndex + 1}`}
            />
            <div className="lightbox-caption-bar">
              <span>{title}</span>
              <span>{lightboxIndex + 1} / {images.length}</span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}

