import React, { useState } from 'react';
import { rankSchemes } from '../utils/matching';
import SchemeCard from '../components/SchemeCard';
import { Search, SlidersHorizontal, ArrowLeft, RefreshCw, AlertCircle, Grid, HelpCircle } from 'lucide-react';

export default function Results({ userProfile, schemesData, onViewDetails, onEditDetails, onBrowseAll }) {
  const rankedResults = rankSchemes(userProfile, schemesData);

  // Filter state for local result refining
  const [filterTier, setFilterTier] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  // Available categories in current result set
  const categoriesInResults = Array.from(new Set(rankedResults.map(r => r.scheme.category)));

  // Filter results
  const filteredResults = rankedResults.filter(item => {
    if (filterTier !== 'All' && item.matchTier !== filterTier) return false;
    if (filterCategory !== 'All' && item.scheme.category !== filterCategory) return false;
    return true;
  });

  const highMatchCount = rankedResults.filter(r => r.matchPercentage >= 70).length;
  const isNoMatch = rankedResults.length === 0 || rankedResults[0].matchPercentage < 40;

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onEditDetails}>
          <ArrowLeft size={16} />
          <span>Edit My Profile Details</span>
        </button>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Profile: <strong style={{ color: 'var(--primary-navy)' }}>{userProfile.age} Yrs</strong> • <strong style={{ color: 'var(--primary-navy)' }}>{userProfile.gender}</strong> • <strong style={{ color: 'var(--primary-navy)' }}>{userProfile.state}</strong> • Family Income: <strong style={{ color: 'var(--primary-navy)' }}>₹{(Number(userProfile.income) || 0).toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Main Results Header */}
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-navy-light) 100%)', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge" style={{ background: 'var(--accent-saffron)', color: '#ffffff', marginBottom: '0.5rem' }}>
              Rule Engine Recommendations
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Schemes You May Be Eligible For
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
              Found {rankedResults.length} schemes evaluated against your profile and requirement requirement.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{highMatchCount}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>High Matches</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{rankedResults.length}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Total Evaluated</div>
            </div>
          </div>
        </div>
      </div>

      {/* No-Match Fallback Scenario (Requirement 11) */}
      {isNoMatch ? (
        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '750px', margin: '2rem auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-saffron-light)', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <AlertCircle size={32} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
            We couldn't find a highly relevant scheme based on your current details.
          </h2>

          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Your age, income, or selected requirement combination yielded no 80%+ direct matches in our current dataset. Try adjusting your search query or explore all 21 available government schemes manually.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <button className="btn btn-primary" onClick={onBrowseAll}>
              <Grid size={18} />
              <span>Browse All 21 Schemes</span>
            </button>

            <button className="btn btn-secondary" onClick={onEditDetails}>
              <RefreshCw size={18} />
              <span>Change Profile Details</span>
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
              Recommended Nearby Categories to Explore:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Education', 'Healthcare', 'Agriculture', 'Financial Assistance', 'Housing'].map(cat => (
                <button
                  key={cat}
                  className="badge badge-navy"
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}
                  onClick={onBrowseAll}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Result Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <SlidersHorizontal size={16} />
                <span>Filter Tier:</span>
              </div>
              {['All', 'Highly Relevant', 'Relevant', 'Possibly Eligible'].map(tier => (
                <button
                  key={tier}
                  className={`btn btn-sm ${filterTier === tier ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterTier(tier)}
                  style={{ fontSize: '0.8rem' }}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category:</span>
              <select
                className="form-select"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoriesInResults.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
            {filteredResults.map(match => (
              <SchemeCard
                key={match.scheme.id}
                matchData={match}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
