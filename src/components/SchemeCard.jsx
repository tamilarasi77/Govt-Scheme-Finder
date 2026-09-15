import React from 'react';
import { Building2, ArrowRight, Award, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { MatchTierBadge, EligibilityStatusBadge } from './EligibilityBadge';
import RecommendationExplanation from './RecommendationExplanation';

export default function SchemeCard({ matchData, onViewDetails }) {
  const { scheme, matchPercentage, matchTier, whyRecommended, eligibility } = matchData;
  const mainBenefit = scheme.benefits && scheme.benefits[0] ? scheme.benefits[0] : scheme.description;

  let progressClass = 'progress-high';
  if (matchPercentage < 60) progressClass = 'progress-low';
  else if (matchPercentage < 80) progressClass = 'progress-medium';

  return (
    <div className="card card-hover animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-navy">{scheme.category}</span>
          <EligibilityStatusBadge isEligible={eligibility.isEligible} />
        </div>
        <MatchTierBadge tier={matchTier} />
      </div>

      {/* Title & Ministry */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-navy)', lineHeight: '1.3', marginBottom: '0.35rem' }}>
        {scheme.name}
      </h3>
      {scheme.hindiName && (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {scheme.hindiName}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        <Building2 size={14} color="var(--primary-navy)" />
        <span style={{ fontWeight: 500 }}>{scheme.ministry}</span>
      </div>

      {/* Main Benefit Box */}
      <div style={{
        background: 'var(--accent-blue-light)',
        borderLeft: '3px solid var(--accent-blue)',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.88rem',
        color: 'var(--primary-navy)',
        marginBottom: '1rem',
        flex: '1'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-blue)', marginBottom: '0.2rem' }}>
          Key Benefit
        </div>
        {mainBenefit}
      </div>

      {/* Match Score Indicator */}
      <div style={{ marginBottom: '1rem' }}>
        <div className="match-score-header">
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>RELEVANCE MATCH</span>
          <span className="score-percent">{matchPercentage}%</span>
        </div>
        <div className="progress-track">
          <div className={`progress-fill ${progressClass}`} style={{ width: `${matchPercentage}%` }}></div>
        </div>
      </div>

      {/* Transparency Recommendation Bullet Points */}
      <RecommendationExplanation 
        whyRecommended={whyRecommended} 
        warnings={eligibility.warnings} 
        defaultExpanded={false}
      />

      {/* View Details Action */}
      <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => onViewDetails(scheme, matchData)}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>View Details & How to Apply</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
