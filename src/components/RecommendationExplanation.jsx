import React, { useState } from 'react';
import { Check, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function RecommendationExplanation({ whyRecommended = [], warnings = [], defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!whyRecommended.length && !warnings.length) return null;

  return (
    <div className="recommendation-box">
      <div 
        className="recommendation-title"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer', userSelect: 'none', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <HelpCircle size={15} color="var(--accent-teal)" />
          <span>Why this scheme was recommended:</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: '0.6rem' }}>
          {whyRecommended.length > 0 && (
            <ul className="recommendation-list">
              {whyRecommended.map((item, idx) => (
                <li key={`rec-${idx}`} className="recommendation-item">
                  <Check size={14} className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {warnings.length > 0 && (
            <div style={{ marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-medium)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#b45309', marginBottom: '0.35rem' }}>
                Note on specific eligibility conditions:
              </div>
              <ul className="recommendation-list">
                {warnings.map((warn, idx) => (
                  <li key={`warn-${idx}`} className="recommendation-item">
                    <AlertCircle size={14} className="warning-icon" />
                    <span style={{ color: '#b45309' }}>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
