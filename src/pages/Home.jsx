import React from 'react';
import { Search, Grid, ShieldCheck, Zap, BookOpen, Layers, ArrowRight, CheckCircle2, Sparkles, Award } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import { rankSchemes } from '../utils/matching';

export default function Home({ setActivePage, onOpenDemoModal, onSelectScheme, schemesData }) {
  // Sample featured schemes preview using general citizen defaults
  const sampleUser = {
    age: 25,
    income: 250000,
    state: 'All India',
    occupation: 'All'
  };
  const rankedSample = rankSchemes(sampleUser, schemesData).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={16} color="var(--accent-saffron)" />
            <span>Deterministic • Rule-Based • 100% Free & Transparent</span>
          </div>

          <h1 className="hero-title">
            Government Scheme Finder
          </h1>

          <p className="hero-subtitle">
            "Find government schemes you may be eligible for — quickly and easily."
          </p>

          <div className="hero-cta">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => setActivePage('find')}
              style={{ background: 'linear-gradient(135deg, var(--accent-saffron), #b45309)', borderColor: 'transparent' }}
            >
              <Search size={20} />
              <span>Search Schemes for Me</span>
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => setActivePage('browse')}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}
            >
              <Grid size={20} />
              <span>Browse All Schemes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Prototype Statistics Counter */}
      <section className="stats-bar">
        <div className="stats-grid">
          <div>
            <div className="stat-number">20+</div>
            <div className="stat-label">Verified Government Schemes</div>
          </div>
          <div>
            <div className="stat-number">12</div>
            <div className="stat-label">Target Categories</div>
          </div>
          <div>
            <div className="stat-number">All India</div>
            <div className="stat-label">States & UTs Coverage</div>
          </div>
          <div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Local & Private Match Engine</div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="page-wrapper">
        {/* Short Explanation of How System Works */}
        <section style={{ margin: '2rem 0 3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-navy" style={{ marginBottom: '0.5rem' }}>How It Works</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Find your benefits in 3 simple steps
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              No login or password needed. Simply enter your basic details and let our rule-based engine check your eligibility.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-blue-light)',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>1</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>
                Enter Basic Profile
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Provide basic details like age, family income, occupation, and what assistance you need.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-teal-light)',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>2</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>
                Rule Engine Matching
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Our deterministic algorithm ranks schemes based on age limits, income ceilings, and state rules.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-saffron-light)',
                color: '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>3</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>
                Get Application Guide
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                View required documents, official portal links, and clear step-by-step application instructions.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Core Feature Cards */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            System Core Features
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1.5rem' }}>
            Designed for Speed, Accuracy, and Transparency
          </h2>

          <div className="features-grid">
            <div className="feature-card card-hover">
              <div className="feature-icon-wrapper">
                <Zap size={26} />
              </div>
              <h3 className="feature-title">Personalized Scheme Discovery</h3>
              <p className="feature-desc">
                Matches schemes specifically tuned to your requirement — whether it's scholarships for education, farmer income support, or pension benefits.
              </p>
            </div>

            <div className="feature-card card-hover">
              <div className="feature-icon-wrapper" style={{ background: 'var(--accent-teal-light)', color: '#047857' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 className="feature-title">Eligibility Checking</h3>
              <p className="feature-desc">
                Clear rule-based eligibility evaluation checking age thresholds, family income ceilings, social categories, and special status flags.
              </p>
            </div>

            <div className="feature-card card-hover">
              <div className="feature-icon-wrapper" style={{ background: 'var(--accent-saffron-light)', color: '#b45309' }}>
                <BookOpen size={26} />
              </div>
              <h3 className="feature-title">Benefits & Application Info</h3>
              <p className="feature-desc">
                Comprehensive bullet points of cash & non-cash benefits, mandatory document checklists, and direct verified government portal links.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Callout Banner */}
        <div className="demo-banner">
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-blue)" />
              <span>Evaluating this prototype for a hackathon demo?</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Test instant matching results using pre-configured profiles (Student, Farmer, Senior Citizen, Entrepreneur).
            </p>
          </div>
          <button className="btn btn-primary" onClick={onOpenDemoModal}>
            <span>Try Demo Profile Now</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Featured Schemes Catalog Preview */}
        <section style={{ margin: '3rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Featured Government Schemes
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Popular welfare programs currently available in our dataset.
              </p>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => setActivePage('browse')}>
              <span>View All 21 Schemes</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {rankedSample.map(match => (
              <SchemeCard
                key={match.scheme.id}
                matchData={match}
                onViewDetails={onSelectScheme}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
