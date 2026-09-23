import React, { useState } from 'react';
import { Send, Phone, Mail, MessageCircle, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Ladakh',
    travelDate: '',
    travelers: '2 Travelers',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Ladakh',
        travelDate: '',
        travelers: '2 Travelers',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-info-col">
            <div>
              <span className="badge-eyebrow">
                <Sparkles size={14} />
                Connect With Us
              </span>
              <h2 className="section-title">
                Your Journey <em>Starts Here.</em>
              </h2>
              <p className="section-subtitle">
                Whether you have a fully formed dream or simply a curiosity to wander, speak with our private trip curators today.
              </p>
            </div>

            <div className="contact-channels">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="channel-item">
                <div className="channel-icon-box">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>WHATSAPP CONCIERGE</small>
                  <b>+91 98765 43210</b>
                </div>
              </a>

              <a href="mailto:concierge@indiawander.com" className="channel-item">
                <div className="channel-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>EMAIL INQUIRIES</small>
                  <b>concierge@indiawander.com</b>
                </div>
              </a>

              <a href="tel:+919876543210" className="channel-item">
                <div className="channel-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <small style={{ color: 'var(--color-subtle)', display: 'block', fontSize: '0.78rem' }}>DIRECT PHONE</small>
                  <b>+91 98765 43210 (24/7)</b>
                </div>
              </a>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.85rem', fontWeight: '600' }}>
                Talk to a Travel Expert
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '4px' }}>
                Our senior destination specialists are available for scheduled video consultations to review bespoke routes.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-box">
            {submitted && (
              <div className="form-success-banner">
                <CheckCircle2 size={24} style={{ marginBottom: '8px' }} />
                <h4>Thank you! Your inquiry has been received.</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  A senior IndiaWander travel designer will review your preferences and contact you within 4 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Patel"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Destination *</label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                    <option value="Multi-Region Custom">Multi-Region Custom</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label>Target Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Travelers</label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option>1 Solo Traveler</option>
                    <option>2 Travelers (Couple)</option>
                    <option>3–5 Family / Friends</option>
                    <option>6+ Private Group</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tell us about your ideal journey</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details like preferred pace, celebrations, dietary restrictions, or must-see landmarks..."
                />
              </div>

              <button
                type="submit"
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                <span>{loading ? 'Sending Request...' : 'Send Inquiry'}</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

