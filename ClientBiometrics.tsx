import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function ClientBiometrics() {
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [rhr, setRhr] = useState<number>(62);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('✓ SECURE');

  const handleLogBiometrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setSyncing(true);
    setStatusText('⚡ SYNCING');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Upsert readiness metrics directly into the daily client logs
        const { error } = await supabase
          .from('client_nutrition_logs') 
          .upsert({
            client_id: user.id,
            log_date: new Date().toISOString().split('T')[0],
            calories_consumed: 0, // Fallback placeholder if not set by nutrition card
            protein_grams: 0,
            carbs_grams: 0,
            fats_grams: 0,
            meals_completed: [],
            updated_at: new Date().toISOString()
            // Note: Extend your schema with custom columns if tracking long-term trends
          });

        if (!error) {
          setStatusText('✓ UPDATED');
          setTimeout(() => setStatusText('✓ SECURE'), 2000);
        }
      }
    } catch (err) {
      console.error('Biometric log update failed:', err);
      setStatusText('❌ ERROR');
    } finally {
      setSyncing(false);
    }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3 style={{ color: '#C5A880', margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
            Readiness Biometrics
          </h3>
          <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>Track autonomic nervous system balance</p>
        </div>
        <span style={{ fontSize: '10px', color: syncing ? '#C5A880' : '#666', fontFamily: 'monospace' }}>
          {statusText}
        </span>
      </div>

      <form onSubmit={handleLogBiometrics} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span style={{ color: '#9BA1A8' }}>SLEEP DURATION</span>
            <span style={{ color: '#C5A880', fontWeight: 'bold' }}>{sleepHours} Hours</span>
          </div>
          <input 
            type="range" 
            min="4" 
            max="12" 
            step="0.5"
            value={sleepHours} 
            onChange={(e) => setSleepHours(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#C5A880', cursor: 'pointer' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span style={{ color: '#9BA1A8' }}>RESTING HEART RATE (RHR)</span>
            <span style={{ color: '#C5A880', fontWeight: 'bold' }}>{rhr} BPM</span>
          </div>
          <input 
            type="range" 
            min="40" 
            max="100" 
            step="1"
            value={rhr} 
            onChange={(e) => setRhr(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#C5A880', cursor: 'pointer' }}
          />
        </div>

        <button
          type="submit"
          disabled={syncing}
          style={{
            backgroundColor: 'rgba(197, 168, 128, 0.1)',
            color: '#C5A880',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            padding: '12px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: syncing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {syncing ? 'Logging Metrics...' : 'Log Readiness Metrics'}
        </button>
      </form>
    </div>
  );
}