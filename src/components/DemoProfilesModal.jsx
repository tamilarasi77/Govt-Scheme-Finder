import React from 'react';
import { X, Sparkles, GraduationCap, Tractor, HeartPulse, Store, ArrowRight } from 'lucide-react';

export default function DemoProfilesModal({ isOpen, onClose, onSelectProfile }) {
  if (!isOpen) return null;

  const demoProfiles = [
    {
      id: 'student',
      title: 'Demo 1 — College Student',
      icon: GraduationCap,
      color: '#2563eb',
      bg: '#eff6ff',
      details: 'Age: 22 • Female • Tamil Nadu • ₹2.0 Lakh • OBC • Education Scholarship',
      profile: {
        age: 22,
        gender: 'Female',
        state: 'Tamil Nadu',
        district: 'Chennai',
        income: 200000,
        occupation: 'Student',
        category: 'OBC',
        isStudent: true,
        isFarmer: false,
        isDisability: false,
        isSeniorCitizen: false,
        isBpl: false,
        isWidow: false,
        isUnemployed: false,
        requirement: 'Education',
        requirementPrompt: 'Scholarship for my college education and tuition fees'
      }
    },
    {
      id: 'farmer',
      title: 'Demo 2 — Small Farmer',
      icon: Tractor,
      color: '#059669',
      bg: '#d1fae5',
      details: 'Age: 45 • Male • Uttar Pradesh • ₹1.5 Lakh • General • Crop Insurance & Income Support',
      profile: {
        age: 45,
        gender: 'Male',
        state: 'Uttar Pradesh',
        district: 'Varanasi',
        income: 150000,
        occupation: 'Farmer',
        category: 'General',
        isStudent: false,
        isFarmer: true,
        isDisability: false,
        isSeniorCitizen: false,
        isBpl: false,
        isWidow: false,
        isUnemployed: false,
        requirement: 'Agriculture',
        requirementPrompt: 'Financial support and crop insurance for small farmer family'
      }
    },
    {
      id: 'senior',
      title: 'Demo 3 — Senior Citizen (BPL)',
      icon: HeartPulse,
      color: '#d97706',
      bg: '#fef3c7',
      details: 'Age: 67 • Female • Maharashtra • ₹80,000 • SC • Pension & Healthcare Support',
      profile: {
        age: 67,
        gender: 'Female',
        state: 'Maharashtra',
        district: 'Pune',
        income: 80000,
        occupation: 'Laborer',
        category: 'SC',
        isStudent: false,
        isFarmer: false,
        isDisability: false,
        isSeniorCitizen: true,
        isBpl: true,
        isWidow: false,
        isUnemployed: false,
        requirement: 'Pension',
        requirementPrompt: 'Old age pension and free hospital medical treatment'
      }
    },
    {
      id: 'vendor',
      title: 'Demo 4 — Street Vendor / Micro-Business',
      icon: Store,
      color: '#7c3aed',
      bg: '#f3e8ff',
      details: 'Age: 32 • Male • Delhi • ₹1.2 Lakh • ST • Business Loan & Skill Training',
      profile: {
        age: 32,
        gender: 'Male',
        state: 'Delhi',
        district: 'Central Delhi',
        income: 120000,
        occupation: 'Vendor',
        category: 'ST',
        isStudent: false,
        isFarmer: false,
        isDisability: false,
        isSeniorCitizen: false,
        isBpl: true,
        isWidow: false,
        isUnemployed: false,
        requirement: 'Entrepreneurship',
        requirementPrompt: 'Collateral-free working capital loan to expand street vendor business'
      }
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={22} color="var(--accent-saffron)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>Select a Demo Profile</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Click any persona below to auto-populate form details for testing.</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {demoProfiles.map((dp) => {
              const Icon = dp.icon;
              return (
                <div
                  key={dp.id}
                  className="card card-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                    padding: '1.25rem 1.5rem'
                  }}
                  onClick={() => {
                    onSelectProfile(dp.profile);
                    onClose();
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: dp.bg,
                      color: dp.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>
                        {dp.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {dp.details}
                      </p>
                    </div>
                  </div>

                  <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                    <span>Select Profile</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
