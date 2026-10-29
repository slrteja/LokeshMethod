import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function PublicLanding({ onDevNavigate }: { onDevNavigate?: (view: string) => void }) {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    track: 'Hybrid Performance (Hyrox/Yoddha/Devils Circuit)',
    experience: 'Intermediate',
    primaryGoal: '',
    injuryHistory: ''
  });

  const specializedTracks = [
    { name: 'Hybrid Performance (Hyrox/Yoddha/Devils Circuit)', desc: 'Optimizing explosive strength-endurance and structural durability for intense obstacle tracks.' },
    { name: 'Endurance Architecture (Marathon/Half-Marathon)', desc: 'Biomechanical optimization, cardiovascular pacing zones, and structural load management.' },
    { name: 'Clinical Injury Rehabilitation', desc: 'Post-injury return-to-performance protocols focusing on joint stability and movement execution.' },
    { name: 'Metabolic Recomposition & Nutrition Coach', desc: 'Strict Indian food-focused macronutrient allocation tied to absolute energy balance metrics.' }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const submitIntakeForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const systemGeneratedDraft = {
        recommendedCaloricBaseline: formData.track.includes('Endurance') ? 2400 : 2100,
        macroSplit: formData.track.includes('Nutrition') 
          ? { protein: '160g', carbs: '180g', fats: '60g' } 
          : { protein: '150g', carbs: '200g', fats: '65g' },
        initialBlockFocus: formData.track.includes('Rehab') ? 'Isometric Joint Stability' : 'Aerobic Threshold Foundation',
        shadowReviewRequired: true
      };

      const { error } = await supabase
        .from('shadow_drafts')
        .insert({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          track_selection: formData.track,
          intake_answers: { experience: formData.experience, primaryGoal: formData.primaryGoal, injuryHistory: formData.injuryHistory },
          generated_plan_draft: systemGeneratedDraft,
          status: 'pending'
        });

      if (!error) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#111315', color: '#F4F1EA', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', padding: '0 0 60px 0' }}>
      
      {/* 🛠️ DEVELOPER TESTING NAVIGATION BAR */}
      <div style={{ backgroundColor: '#1A1D20', padding: '12px 20px', borderBottom: '1px solid rgba(244,241,234,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#C5A880', letterSpacing: '0.05em' }}>⚙️ DEV NAVIGATION BYPASS</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onDevNavigate?.('client')} style={{ background: 'rgba(197,168,128,0.1)', color: '#C5A880', border: '1px solid #C5A880', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>⚡ Force Client View</button>
          <button onClick={() => onDevNavigate?.('coach')} style={{ background: 'rgba(197,168,128,0.1)', color: '#C5A880', border: '1px solid #C5A880', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>⚡ Force Coach View</button>
        </div>
      </div>
      
      {/* Hero Section */}
      <section style={{ position: 'relative', background: 'linear-gradient(185deg, rgba(17,19,21,0.95) 40%, rgba(26,29,32,0.8) 100%)', borderBottom: '1px solid rgba(244, 241, 234, 0.09)', padding: '60px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C5A880', background: 'rgba(197, 168, 128, 0.1)', padding: '5px 12px', borderRadius: '99px' }}>
          Elite Tier Performance Coaching
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#F4F1EA', margin: '20px 0 16px 0' }}>
          THE LOKESH METHOD
        </h1>
        <p style={{ color: '#9BA1A8', fontSize: '15px', maxWidth: '640px', margin: '0 auto 32px auto' }}>
          Clinical precision meets high-performance physical execution. Tailored architectures for obstacle races, elite marathons, and structural injury rehabilitation protocols.
        </p>
        {step === 1 && !success && (
          <button onClick={() => setStep(2)} style={{ backgroundColor: '#C5A880', color: '#111315', padding: '14px 32px', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Initiate Performance Intake
          </button>
        )}
      </section>

      <div style={{ maxWidth: '960px', margin: '40px auto 0 auto', padding: '0 16px' }}>
        {step === 1 && !success && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#C5A880', marginBottom: '24px', textAlign: 'center' }}>SPECIALIZED PERFORMANCE PATHS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {specializedTracks.map((track, i) => (
                <div key={i} style={{ backgroundColor: '#1A1D20', border: '1px solid rgba(244, 241, 234, 0.09)', borderRadius: '14px', padding: '20px' }}>
                  <h3 style={{ fontSize: '14px', color: '#F4F1EA', marginBottom: '8px', fontWeight: 600 }}>{track.name}</h3>
                  <p style={{ color: '#9BA1A8', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && !success && (
          <div style={{ backgroundColor: '#1A1D20', border: '1px solid rgba(244, 241, 234, 0.09)', borderRadius: '14px', padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#F4F1EA' }}>Biometric & Track Intake</h3>
            <form onSubmit={submitIntakeForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C5A880', marginBottom: '6px' }}>FULL LEGAL NAME</label>
                <input type="text" required value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(244,241,234,0.09)', backgroundColor: '#111315', color: '#F4F1EA', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C5A880', marginBottom: '6px' }}>CONTACT PHONE NUMBER</label>
                <input type="tel" required placeholder="+91 XXXXX XXXXX" value={formData.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(244,241,234,0.09)', backgroundColor: '#111315', color: '#F4F1EA', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C5A880', marginBottom: '6px' }}>TARGET METRIC TRACK</label>
                <select value={formData.track} onChange={(e) => handleInputChange('track', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(244,241,234,0.09)', backgroundColor: '#111315', color: '#F4F1EA', outline: 'none' }}>
                  {specializedTracks.map((t, idx) => <option key={idx} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C5A880', marginBottom: '6px' }}>PRIMARY ATHLETIC OBJECTIVE</label>
                <textarea required rows={3} value={formData.primaryGoal} onChange={(e) => handleInputChange('primaryGoal', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(244,241,234,0.09)', backgroundColor: '#111315', color: '#F4F1EA', outline: 'none', resize: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(244,241,234,0.2)', backgroundColor: 'transparent', color: '#9BA1A8', cursor: 'pointer' }}>Back</button>
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#C5A880', color: '#111315', cursor: 'pointer', fontWeight: 'bold' }}>
                  {submitting ? 'Processing...' : 'Submit Intake'}
                </button>
              </div>
            </form>
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#1A1D20', border: '1px solid #4E9F76', borderRadius: '14px', padding: '30px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
            <h3 style={{ color: '#4E9F76', margin: '0 0 10px 0' }}>Intake Form Stored</h3>
            <p style={{ color: '#9BA1A8', fontSize: '13px' }}>Your Shadow Draft has been created in the database timeline loop.</p>
            <button onClick={() => { setSuccess(false); setStep(1); }} style={{ marginTop: '20px', background: 'transparent', color: '#C5A880', border: '1px solid #C5A880', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Return Home</button>
          </div>
        )}
      </div>
    </div>
  );
}