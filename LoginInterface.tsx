import React from 'react';
import TravelDiningMode from './TravelDiningMode';
import ApprovedNutrition from './ApprovedNutrition';
import SessionBookingEngine from './SessionBookingEngine';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: '#111315', 
      minHeight: '100vh', 
      color: '#F4F1EA', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 24px'
    }}>
      {/* Executive Portal Header */}
      <header style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 48px auto', 
        borderBottom: '1px solid rgba(197, 168, 128, 0.1)',
        paddingBottom: '24px'
      }}>
        <h1 style={{ 
          color: '#C5A880', 
          fontSize: '28px', 
          fontWeight: 600, 
          letterSpacing: '0.05em',
          margin: '0 0 8px 0'
        }}>
          LOKESH METHOD
        </h1>
        <p style={{ color: '#888', margin: 0, fontSize: '14px', letterSpacing: '0.01em' }}>
          Client Performance Dashboard • Active Session Management
        </p>
      </header>

      {/* Responsive Workspace Grid */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Module 1: Metric Tracking & Swaps */}
        <section aria-label="Macro Tracker Engagement">
        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as any }}>
            01 / TIER 1 CAPABILITIES
          </div>
          <TravelDiningMode />
        </section>

        {/* Module 2: Daily Approved Nutrition Schedules */}
        <section aria-label="Nutrition Architecture">
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as any }}>
            02 / NUTRITIONAL DICTATES
          </div>
          <ApprovedNutrition />
        </section>

        {/* Module 3: Session Guardrail Engine */}
        <section aria-label="Appointment Execution">
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            03 / BOOKING PROTOCOLS
          </div>
          <SessionBookingEngine />
        </section>

      </main>

      {/* Professional System Footer */}
      <footer style={{
        maxWidth: '1200px',
        margin: '64px auto 0 auto',
        textAlign: 'center',
        fontSize: '11px',
        color: '#444',
        borderTop: '1px solid rgba(197, 168, 128, 0.05)',
        paddingTop: '24px'
      }}>
        Lokesh Method Performance Systems v1.0.0 • Secured Local Dev Enviroment
      </footer>
    </div>
  );
}
