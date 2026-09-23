import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import BookingModal from './components/BookingModal';
import PageLoader from './components/PageLoader';

import Home from './pages/Home';
import DestinationDetail from './pages/DestinationDetail';
import PackageDetail from './pages/PackageDetail';

import './styles.css';

// Scroll restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingData(null);
  };

  return (
    <div className="app-layout">
      <PageLoader />
      <ScrollToTop />

      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isBookingOpen={isBookingOpen}
              setIsBookingOpen={setIsBookingOpen}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          }
        />
        <Route
          path="/destinations/:slug"
          element={<DestinationDetail onOpenBookingWithData={handleOpenBooking} />}
        />
        <Route
          path="/packages/:slug"
          element={<PackageDetail onOpenBookingWithData={handleOpenBooking} />}
        />
      </Routes>

      <Footer />

      <FloatingControls />

      {/* Global Booking & Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingData}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
