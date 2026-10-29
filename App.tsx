import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import PublicLanding from './PublicLanding';
import CoachConsole from './CoachConsole';
import TravelDiningMode from './TravelDiningMode';
import ApprovedNutrition from './ApprovedNutrition';
import SessionBookingEngine from './SessionBookingEngine';
import ClientBiometrics from './ClientBiometrics';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [forcedView, setForcedView] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ backgroundColor: '#111315', minHeight: '100vh' }} />;
  }

  // 🚪 Route logic: If developer clicks a force switch button, prioritize that view panel right away
  const currentActiveView = forcedView || (session ? 'client' : 'public');

  if (currentActiveView === 'public') {
    return <PublicLanding onDevNavigate={(view) => setForcedView(view)} />;
  }

  return (
    <div style={{ backgroundColor: '#111315', minHeight: '100vh', color: '#F4F1EA', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      
      {/* Dev Return Dashboard Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto', background: '#1A1D20', padding: '10px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(244,241,234,0.05)' }}>
        <span style={{ fontSize: '12px', color: '#C5A880' }}>Viewing Active State Mode: <strong>{currentActiveView.toUpperCase()}</strong></span>
        <button onClick={() => setForcedView('public')} style={{ background: 'transparent', color: '#9BA1A8', border: '1px solid #444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>⏮️ Return to Main Site</button>
      </div>

      <header style={{ maxWidth: '1200px', margin: '0 auto 48px auto', borderBottom: '1px solid rgba(197, 168, 128, 0.1)', paddingBottom: '24px' }}>
        <h1 style={{ color: '#C5A880', fontSize: '28px', fontWeight: 600, letterSpacing: '0.05em', margin: 0 }}>LOKESH METHOD</h1>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {currentActiveView === 'client' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start' }}>
            <section><div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600 }}>01 / ENERGY BALANCES</div><TravelDiningMode /></section>
            <section><div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600 }}>01B / BIOMETRICS PROTOCOL</div><ClientBiometrics /></section>
            <section><div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600 }}>02 / NUTRITION BLUEPRINT</div><ApprovedNutrition /></section>
            <section><div style={{ marginBottom: '12px', fontSize: '12px', color: '#C5A880', fontWeight: 600 }}>03 / RECONCILED SCHEDULER</div><SessionBookingEngine /></section>
          </div>
        )}

        {currentActiveView === 'coach' && <CoachConsole />}
      </main>
    </div>
  );
}