import React from 'react';
import { ShieldCheck, Cpu, Database, CheckCircle2, Layers, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="page-wrapper animate-fade-in">
      {/* Title Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge-navy" style={{ marginBottom: '0.5rem' }}>Architecture & Documentation</span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
          About Government Scheme Finder
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          A zero-API, deterministic, rule-based recommendation system for Indian government schemes (GOV-01).
        </p>
      </div>

      {/* Zero AI Disclaimer Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--accent-teal-light), #ecfdf5)', border: '1.5px solid #a7f3d0', marginBottom: '2.5rem', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <ShieldCheck size={32} color="#047857" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857', marginBottom: '0.4rem' }}>
              Deterministic Rule Engine Guarantee
            </h3>
            <p style={{ fontSize: '0.98rem', color: '#064e3b', lineHeight: '1.6' }}>
              <strong>"The prototype does not use an AI model, OpenAI API, Gemini API, or paid LLM API. It uses deterministic rule-based matching over a structured government-scheme dataset."</strong>
            </p>
            <p style={{ fontSize: '0.88rem', color: '#047857', marginTop: '0.5rem' }}>
              This guarantees 100% predictable recommendations, zero hallucinations, fast local execution without internet dependency, and strict transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Problem Statement & Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--primary-navy)" />
            <span>Problem Statement</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Citizens often miss out on entitled government welfare schemes due to fragmented information across multiple ministry portals, complex jargon, and lack of clear eligibility checking toolsets.
          </p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--accent-blue)" />
            <span>The Solution</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            A single-window citizen portal that collects basic demographic details and assistance requirements, matching them against a structured JSON scheme dataset using a 100-point rule-based scoring engine.
          </p>
        </div>
      </div>

      {/* Matching Algorithm Breakdown */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--bg-subtle)' }}>
          Rule-Based Relevance Scoring Model (100-Point Scale)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>40 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>Requirement & Category Match</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>+30 pts for exact category match + 10 pts for keyword overlap in user search prompt.</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857' }}>15 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>Age Eligibility</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Satisfies scheme minAge and maxAge range limits.</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b45309' }}>15 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>Income Ceiling</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Annual family income is within specified upper limit.</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>10 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>State Availability</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pan-India coverage or state-specific availability.</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>10 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>Occupation Match</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Target beneficiary occupation (Student, Farmer, Vendor, etc.).</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>10 Points</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0.2rem 0' }}>Special Condition Match</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Disability, Senior Citizen, BPL, Widow, Student, or Farmer flags.</div>
          </div>
        </div>
      </div>

      {/* Future Scope & AI Potential */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
          Future Expansion & AI Integration Scope
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          While this prototype is intentionally built on a deterministic rule engine, future production phases can optionally incorporate AI/ML models for:
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <CheckCircle2 size={16} color="var(--accent-blue)" />
            <span><strong>Natural Language Understanding:</strong> Parsing conversational voice/text queries in regional Indian languages (Hindi, Tamil, Telugu, Bengali, etc.).</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <CheckCircle2 size={16} color="var(--accent-blue)" />
            <span><strong>Document OCR & Auto-Verification:</strong> Auto-extracting income and identity details directly from scanned Ration Cards or Aadhaar cards.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <CheckCircle2 size={16} color="var(--accent-blue)" />
            <span><strong>Conversational Chatbot Assistant:</strong> Step-by-step guidance for completing government application forms.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
