import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface ShadowDraft {
  id: string;
  full_name: string;
  phone_number: string;
  track_selection: string;
  intake_answers: {
    experience?: string;
    primaryGoal?: string;
    injuryHistory?: string;
  };
  generated_plan_draft: {
    recommendedCaloricBaseline?: number;
    macroSplit?: { protein: string; carbs: string; fats: string };
    initialBlockFocus?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
}

export default function ShadowDraftQueue() {
  const [drafts, setDrafts] = useState<ShadowDraft[]>([
    {
      id: '1',
      full_name: 'Rahul Sharma',
      phone_number: '+91 98765 43210',
      track_selection: 'Hybrid Performance (Hyrox/Yoddha/Devils Circuit)',
      intake_answers: { experience: 'Intermediate', primaryGoal: 'Build stability for obstacle race segments.', injuryHistory: 'Minor left knee meniscus strain 2025' },
      generated_plan_draft: { recommendedCaloricBaseline: 2100, macroSplit: { protein: '150g', carbs: '200g', fats: '65g' }, initialBlockFocus: 'Aerobic Threshold Foundation' },
      status: 'pending'
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actioningId, setActioningId] = useState<string | null>(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shadow_drafts')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setDrafts(data);
      }
    } catch (err) {
      console.error('Queue retrieval failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessDraft = async (id: string, action: 'approved' | 'rejected') => {
    setActioningId(id);
    try {
      const { error } = await supabase
        .from('shadow_drafts')
        .update({ status: action })
        .eq('id', id);

      if (!error) {
        setDrafts(drafts.filter(d => d.id !== id));
      }
    } catch (err) {
      console.error('Action execution failed:', err);
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#1A1D20', border: '1px solid rgba(244, 241, 234, 0.09)', borderRadius: '14px', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ borderBottom: '1px solid rgba(244,241,234,0.09)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h3 style={{ color: '#C5A880', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, letterSpacing: '0.02em' }}>
          Shadow Draft Verification Queue
        </h3>
        <p style={{ color: '#9BA1A8', margin: 0, fontSize: '12px' }}>Review and approve automated blueprints generated from client intake wizard forms.</p>
      </div>

      {loading && <p style={{ color: '#C5A880', fontSize: '12px' }}>Retrieving pending drafts...</p>}
      {!loading && drafts.length === 0 && <p style={{ color: '#9BA1A8', fontSize: '12px' }}>No pending shadow intakes awaiting verification.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {drafts.map(draft => (
          <div key={draft.id} style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22262A', border: '1px solid rgba(244,241,234,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#F4F1EA' }}>{draft.full_name}</h4>
                <span style={{ fontSize: '11px', color: '#9BA1A8', display: 'block' }}>📞 {draft.phone_number} | 🎯 {draft.track_selection}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  disabled={actioningId === draft.id}
                  onClick={() => handleProcessDraft(draft.id, 'rejected')}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(200,90,90,0.3)', backgroundColor: 'transparent', color: '#C85A5A', cursor: 'pointer', fontSize: '11px' }}
                >
                  Reject
                </button>
                <button
                  disabled={actioningId === draft.id}
                  onClick={() => handleProcessDraft(draft.id, 'approved')}
                  style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#4E9F76', color: '#111315', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}
                >
                  {actioningId === draft.id ? 'Processing...' : 'Approve Draft'}
                </button>
              </div>
            </div>

            {/* Assessment Telemetry Metadata Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', paddingTop: '12px', borderTop: '1px solid rgba(244,241,234,0.05)' }}>
              <div>
                <span style={{ color: '#C5A880', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Intake Assessment:</span>
                <p style={{ margin: '0 0 4px 0', color: '#9BA1A8' }}><strong>Experience:</strong> {draft.intake_answers.experience}</p>
                <p style={{ margin: '0 0 4px 0', color: '#9BA1A8' }}><strong>Goal:</strong> {draft.intake_answers.primaryGoal}</p>
                <p style={{ margin: 0, color: '#9BA1A8' }}><strong>Injuries:</strong> {draft.intake_answers.injuryHistory || 'None logged'}</p>
              </div>
              <div style={{ backgroundColor: '#111315', padding: '12px', borderRadius: '8px', border: '1px solid rgba(197,168,128,0.1)' }}>
                <span style={{ color: '#C5A880', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Auto-Generated Blueprint:</span>
                <p style={{ margin: '0 0 2px 0', color: '#F4F1EA' }}>🔥 <strong>Energy:</strong> {draft.generated_plan_draft.recommendedCaloricBaseline} kcal</p>
                <p style={{ margin: '0 0 2px 0', color: '#F4F1EA' }}>🥩 <strong>Protein:</strong> {draft.generated_plan_draft.macroSplit?.protein} | 🌾 <strong>Carbs:</strong> {draft.generated_plan_draft.macroSplit?.carbs}</p>
                <p style={{ margin: 0, color: '#F4F1EA' }}>🧱 <strong>Block Focus:</strong> {draft.generated_plan_draft.initialBlockFocus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}