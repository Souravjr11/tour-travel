import React, { useState } from 'react';
import Hero from '../components/Hero';
import DestinationsSection from '../components/DestinationsSection';
import FeaturedShowcase from '../components/FeaturedShowcase';
import TravelPackagesSection from '../components/TravelPackagesSection';
import ExperiencesSection from '../components/ExperiencesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import StoryAboutSection from '../components/StoryAboutSection';
import TripPlannerSection from '../components/TripPlannerSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import BookingModal from '../components/BookingModal';
import LightboxModal from '../components/LightboxModal';

export default function Home({ isBookingOpen, setIsBookingOpen, bookingData, setBookingData }) {
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleOpenBooking = (customData = null) => {
    if (customData) {
      setBookingData(customData);
    }
    setIsBookingOpen(true);
  };

  return (
    <main>
      {/* Hero Section (Faithful to Reference Image) */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Destinations Section (12 Indian destinations, editorial grid) */}
      <DestinationsSection />

      {/* Featured Horizontal Showcase */}
      <FeaturedShowcase />

      {/* Travel Packages Section */}
      <TravelPackagesSection onOpenBooking={handleOpenBooking} />

      {/* Travel Experiences */}
      <ExperiencesSection onSelectExperience={(title) => handleOpenBooking({ packageTitle: `${title} Experience` })} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Story / About Us Section */}
      <StoryAboutSection onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Trip Planner */}
      <TripPlannerSection onOpenBookingWithData={(data) => handleOpenBooking(data)} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Instagram / Masonry Gallery */}
      <GallerySection onOpenLightbox={(item) => setLightboxItem(item)} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Lightbox Modal */}
      {lightboxItem && (
        <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </main>
  );
}

