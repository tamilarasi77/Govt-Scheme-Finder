import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export function MatchTierBadge({ tier }) {
  let badgeClass = 'badge-tier-possibly';

  if (tier === 'Highly Relevant') {
    badgeClass = 'badge-tier-highly';
  } else if (tier === 'Relevant') {
    badgeClass = 'badge-tier-relevant';
  } else if (tier === 'Possibly Eligible') {
    badgeClass = 'badge-tier-possibly';
  } else {
    badgeClass = 'badge-tier-low';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <ShieldCheck size={13} />
      <span>{tier}</span>
    </span>
  );
}

export function EligibilityStatusBadge({ isEligible }) {
  if (isEligible) {
    return (
      <span className="badge badge-teal" style={{ textTransform: 'none', fontWeight: 600 }}>
        <CheckCircle2 size={13} />
        <span>Likely Eligible</span>
      </span>
    );
  }

  return (
    <span className="badge badge-saffron" style={{ textTransform: 'none', fontWeight: 600 }}>
      <AlertTriangle size={13} />
      <span>Check Specific Conditions</span>
    </span>
  );
}
