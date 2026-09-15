import React from 'react';
import { ArrowLeft, Building2, CheckCircle2, FileText, ExternalLink, HelpCircle, AlertTriangle, ShieldCheck, Printer, Calendar, IndianRupee, MapPin, User, Tag, Phone } from 'lucide-react';
import RecommendationExplanation from '../components/RecommendationExplanation';
import { MatchTierBadge, EligibilityStatusBadge } from '../components/EligibilityBadge';

export default function SchemeDetails({ scheme, matchData, onBack }) {
  if (!scheme) return null;

  const e = scheme.eligibility || {};

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Back Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Results</span>
        </button>
      </div>

      {/* Main Scheme Header Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-navy" style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>{scheme.category}</span>
            {matchData && <EligibilityStatusBadge isEligible={matchData.eligibility.isEligible} />}
          </div>

          {matchData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>MATCH SCORE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{matchData.matchPercentage}%</div>
              </div>
              <MatchTierBadge tier={matchData.matchTier} />
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: '1.2', marginBottom: '0.4rem' }}>
          {scheme.name}
        </h1>
        {scheme.hindiName && (
          <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.75rem' }}>
            {scheme.hindiName}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          <Building2 size={18} color="var(--primary-navy)" />
          <span style={{ fontWeight: 600 }}>{scheme.ministry}</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Mode: {scheme.applicationMode}</span>
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
          {scheme.description}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={scheme.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ textDecoration: 'none' }}
          >
            <span>Visit Official Government Portal</span>
            <ExternalLink size={18} />
          </a>

          <button
            className="btn btn-secondary btn-lg"
            onClick={() => window.print()}
          >
            <Printer size={18} />
            <span>Print Scheme Details</span>
          </button>
        </div>
      </div>

      {/* Recommended Explanation Banner (If coming from matching engine) */}
      {matchData && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '5px solid var(--accent-teal)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={20} color="var(--accent-teal)" />
            <span>Why this scheme was recommended for your profile</span>
          </h3>

          <RecommendationExplanation
            whyRecommended={matchData.whyRecommended}
            warnings={matchData.eligibility.warnings}
            defaultExpanded={true}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Benefits & Application Steps */}
        <div>
          {/* Key Benefits */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--bg-subtle)' }}>
              Key Scheme Benefits
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(scheme.benefits || []).map((benefit, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  <div style={{ background: 'var(--accent-teal-light)', color: '#047857', padding: '0.2rem', borderRadius: '50%', marginTop: '0.15rem' }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Application Process */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--bg-subtle)' }}>
              Step-by-Step Application Process
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(scheme.applicationSteps || []).map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--primary-navy)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ paddingTop: '0.25rem' }}>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Eligibility & Documents */}
        <div>
          {/* Eligibility Matrix */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--bg-subtle)' }}>
              Eligibility Rules Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> Age Limit
                </span>
                <strong style={{ color: 'var(--primary-navy)' }}>
                  {e.minAge || 0} - {e.maxAge || 100} Years
                </strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <IndianRupee size={14} /> Income Ceiling
                </span>
                <strong style={{ color: 'var(--primary-navy)' }}>
                  {e.incomeLimit ? `Up to ₹${e.incomeLimit.toLocaleString('en-IN')}/yr` : 'No Upper Limit'}
                </strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} /> Gender
                </span>
                <strong style={{ color: 'var(--primary-navy)' }}>{e.gender || 'All'}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} /> States
                </span>
                <strong style={{ color: 'var(--primary-navy)' }}>{(e.states || []).join(', ')}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Target Occupation</span>
                <strong style={{ color: 'var(--primary-navy)' }}>{(e.occupation || []).join(', ')}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Social Categories</span>
                <strong style={{ color: 'var(--primary-navy)' }}>{(e.categories || []).join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--bg-subtle)' }}>
              Required Documents
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(scheme.documents || []).map((doc, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <FileText size={15} color="var(--accent-blue)" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpline Information */}
          {scheme.helpline && (
            <div className="card" style={{ background: 'var(--accent-blue-light)', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.35rem' }}>
                <Phone size={16} color="var(--accent-blue)" />
                <span>Toll-Free Helpline</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
                {scheme.helpline}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
