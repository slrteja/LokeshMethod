import React, { useState } from 'react';

export default function SessionBookingEngine() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const slots = [
    { id: '1', time: '08:00 AM', available: true },
    { id: '2', time: '10:30 AM', available: true },
    { id: '3', time: '04:00 PM', available: true },
    { id: '4', time: '06:30 PM', available: true },
  ];

  const handleBooking = () => {
    if (selectedSlot) {
      setBookingConfirmed(true);
    }
  };

  // 🗓️ Generate Google Calendar ICS Link Dynamically
  const getCalendarLink = () => {
    const title = encodeURIComponent("LOKESH METHOD: 1-on-1 Performance Coaching");
    const details = encodeURIComponent("Secured 1-on-1 performance audit session with Master Coach Lokesh. 8-hour policy lock enforced.");
    const location = encodeURIComponent("Lokesh Method HQ / Digital Portal");
    
    // Set standard 1-hour performance block window parameters (UTC ISO formatting)
    const startTime = "20261102T050000Z"; 
    const endTime = "20261102T060000Z"; 

    return `https://google.com{title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  // 💬 Generate Direct Secure WhatsApp Redirection Hyperlink
  const getWhatsAppLink = () => {
    const coachPhoneNumber = "+919876543210"; // Update with your actual coaching contact line
    const text = encodeURIComponent("Hello Coach Lokesh, I just checked in my Readiness Metrics and would like to confirm my upcoming training session configuration.");
    return `https://wa.me{coachPhoneNumber}?text=${text}`;
  };

  return (
    <div style={{
      backgroundColor: '#111315',
      color: '#F4F1EA',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid rgba(197, 168, 128, 0.2)',
      maxWidth: '400px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#C5A880', margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
          Session Booking & Concierge
        </h3>
        <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>Strict 8-Hour Notice Policy Active</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {slots.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => !bookingConfirmed && setSelectedSlot(s.time)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: selectedSlot === s.time ? '#C5A880' : 'rgba(0,0,0,0.2)',
              color: selectedSlot === s.time ? '#111315' : '#F4F1EA',
              border: '1px solid rgba(197, 168, 128, 0.15)',
              cursor: bookingConfirmed ? 'not-allowed' : 'pointer',
              fontWeight: selectedSlot === s.time ? 'bold' : 'normal',
              fontSize: '13px',
              transition: 'all 0.2s'
            }}
          >
            {s.time}
          </button>
        ))}
      </div>

      {!bookingConfirmed ? (
        <button
          type="button"
          disabled={!selectedSlot}
          onClick={handleBooking}
          style={{
            width: '100%',
            backgroundColor: selectedSlot ? '#C5A880' : '#22262A',
            color: selectedSlot ? '#111315' : '#666',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            cursor: selectedSlot ? 'pointer' : 'not-allowed',
            fontSize: '13px',
            marginBottom: '12px'
          }}
        >
          Confirm Performance Reservation
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
          <a
            href={getCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              backgroundColor: 'rgba(78, 159, 118, 0.1)',
              color: '#34d399',
              border: '1px solid rgba(78, 159, 118, 0.3)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '13px'
            }}
          >
            📅 Add to Google Calendar
          </a>
        </div>
      )}

      {/* Persistent WhatsApp Intercom Hub Engagement Widget */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          backgroundColor: 'transparent',
          color: '#C5A880',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          padding: '12px',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontSize: '13px',
          transition: 'all 0.2s'
        }}
      >
        <span>💬</span> Message Coach via WhatsApp
      </a>
    </div>
  );
}