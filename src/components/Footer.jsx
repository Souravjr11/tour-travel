import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Instagram, Facebook, Youtube, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo">
              <div className="brand-icon-box">
                <Compass size={18} />
              </div>
              <span>
                INDIA<b>WANDER</b>
                <span className="gold-dot">.</span>
              </span>
            </Link>
            <p>
              Discover India Beyond the Ordinary. Luxury, authentic, and cinematic travel expeditions crafted across the subcontinent.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <Youtube size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="/#hero">Home</a></li>
              <li><a href="/#destinations">Destinations</a></li>
              <li><a href="/#packages">Travel Packages</a></li>
              <li><a href="/#experiences">Experiences</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="footer-heading">Popular Escapes</h4>
            <ul className="footer-links-list">
              <li><Link to="/destinations/ladakh">Ladakh</Link></li>
              <li><Link to="/destinations/kashmir">Kashmir</Link></li>
              <li><Link to="/destinations/kerala">Kerala</Link></li>
              <li><Link to="/destinations/rajasthan">Rajasthan</Link></li>
              <li><Link to="/destinations/goa">Goa</Link></li>
              <li><Link to="/destinations/andaman-nicobar">Andaman Islands</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="newsletter-box">
            <h4 className="footer-heading">Journals & Inspiration</h4>
            <p>
              Receive handpicked seasonal routes, hidden havelis, and exclusive editorial travel stories directly to your inbox.
            </p>

            {subscribed ? (
              <div style={{ color: '#28C76F', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                <Check size={16} />
                <span>You are subscribed to the IndiaWander Journal!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} INDIAWANDER Travel Discovery Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Responsible Tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

