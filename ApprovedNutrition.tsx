import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface Meal {
  id: number;
  name: string;
  macros: string;
  checked: boolean;
}

export default function ApprovedNutrition() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: 'Pre-Workout Fuel: Oats & Whey', macros: '450 kcal | 35g P', checked: false },
    { id: 2, name: 'Post-Workout Refuel: Rice & Chicken', macros: '650 kcal | 50g P', checked: false },
    { id: 3, name: 'Dinner Precision Block: Baked Salmon', macros: '500 kcal | 40g P', checked: false },
  ]);
  const [syncing, setSyncing] = useState<boolean>(false);

  // Synchronise state changes live down to the cloud database table
  const toggleMealStatus = async (id: number) => {
    // 1. Instantly update the client-side UI checklist state view
    const updatedMeals = meals.map(m => m.id === id ? { ...m, checked: !m.checked } : m);
    setMeals(updatedMeals);
    setSyncing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Perform an upsert statement to store or modify the daily client nutrition record
        await supabase
          .from('client_nutrition_logs')
          .upsert({
            client_id: user.id,
            log_date: new Date().toISOString().split('T')[0],
            calories_consumed: 1600, // Derived contextual summary baseline value
            protein_grams: 125,
            carbs_grams: 135,
            fats_grams: 50,
            meals_completed: updatedMeals,
            updated_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Database synchronisation protocol interrupted:', error);
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
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#C5A880', margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, letterSpacing: '0.02em' }}>
            Approved Nutrition
          </h3>
          <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>Track required meal protocols</p>
        </div>
        
        {/* Dynamic Sync Status Marker badge widget */}
        <span style={{ 
          fontSize: '10px', 
          color: syncing ? '#C5A880' : '#666', 
          transition: 'color 0.3s ease',
          fontFamily: 'monospace'
        }}>
          {syncing ? '⚡ SYNCING' : '✓ SECURE'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {meals.map(meal => (
          <div 
            key={meal.id} 
            onClick={() => toggleMealStatus(meal.id)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '14px', 
              border: '1px solid rgba(197, 168, 128, 0.1)', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              background: meal.checked ? 'rgba(197, 168, 128, 0.03)' : 'rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <p style={{ 
                margin: 0, 
                fontSize: '14px',
                textDecoration: meal.checked ? 'line-through' : 'none', 
                color: meal.checked ? '#555' : '#F4F1EA' 
              }}>
                {meal.name}
              </p>
              <small style={{ color: meal.checked ? '#444' : '#C5A880', fontFamily: 'monospace', marginTop: '2px', display: 'block' }}>
                {meal.macros}
              </small>
            </div>
            
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '4px',
              border: meal.checked ? '1px solid #C5A880' : '1px solid rgba(197, 168, 128, 0.3)',
              backgroundColor: meal.checked ? '#C5A880' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              {meal.checked && <span style={{ color: '#111315', fontSize: '11px', fontWeight: 'bold' }}>✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}