import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/travelData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="badge-eyebrow">
            <HelpCircle size={14} />
            Clarity & Guidance
          </span>
          <h2 className="section-title">
            Frequently Asked <em>Questions.</em>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about preparing your bespoke journey through incredible India.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`faq-icon ${isOpen ? 'open' : ''}`}
                    size={20}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-box">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

