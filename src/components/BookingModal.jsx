import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Sparkles, Calendar, Users } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function BookingModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    packageTitle: '',
    travelDate: '',
    travelers: '2 Travelers',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        destination: initialData.destinationName || initialData.name || prev.destination,
        packageTitle: initialData.packageTitle || initialData.title || '',
        travelers: initialData.travelers || prev.travelers
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(40,199,111,0.15)', color: '#28C76F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '10px' }}>
              Inquiry Confirmed
            </h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 24px' }}>
              We have received your details. A dedicated IndiaWander travel designer will reach out with a personalized itinerary within 4 hours.
            </p>
            <button
              onClick={handleClose}
              className="btn-pill-gold"
            >
              <span>Back to Browsing</span>
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge-eyebrow">
                <Sparkles size={14} />
                Bespoke Travel Inquiry
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF' }}>
                {formData.packageTitle ? `Book: ${formData.packageTitle}` : 'Plan Your Journey'}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginTop: '6px' }}>
                Fill out this quick form and our luxury travel specialists will craft your perfect itinerary.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>Target Destination</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="">Select Destination</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.slug} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Travel Dates</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Travelers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  >
                    <option>1 Solo Wanderer</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3–5 Family / Friends</option>
                    <option>6+ Curated Group</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests or Preferences</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific sights, dietary preferences, or celebration requirements..."
                />
              </div>

              <button
                type="submit"
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                <span>{loading ? 'Submitting...' : 'Send Journey Inquiry'}</span>
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

