import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 300);
    const timer2 = setTimeout(() => setLoading(false), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#101312',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fade ? 'none' : 'all'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '1.5px solid rgba(217, 183, 122, 0.4)',
          background: 'rgba(26, 33, 31, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D9B77A',
          boxShadow: '0 0 30px rgba(217, 183, 122, 0.3)',
          marginBottom: '20px',
          animation: 'pulseRing 2s infinite ease-in-out'
        }}
      >
        <Compass size={32} />
      </div>

      <div style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 700 }}>
        INDIA<span style={{ fontWeight: 400 }}>WANDER</span>
        <span style={{ color: '#D9B77A' }}>.</span>
      </div>

      <p style={{ color: '#8E9994', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '10px' }}>
        Discover India Beyond the Ordinary
      </p>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.96); box-shadow: 0 0 10px rgba(217, 183, 122, 0.2); }
          50% { transform: scale(1.04); box-shadow: 0 0 35px rgba(217, 183, 122, 0.5); }
          100% { transform: scale(0.96); box-shadow: 0 0 10px rgba(217, 183, 122, 0.2); }
        }
      `}</style>
    </div>
  );
}
