import React, { useState } from 'react';
import { filterSchemes, getFilterOptions } from '../utils/search';
import SearchFilters from '../components/SearchFilters';
import SchemeCard from '../components/SchemeCard';
import { rankSchemes } from '../utils/matching';

export default function BrowseSchemes({ schemesData, onViewDetails }) {
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: 'All',
    state: 'All',
    ministry: 'All',
    beneficiary: 'All',
    sortBy: 'name-asc'
  });

  const filterOptions = getFilterOptions(schemesData);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      state: 'All',
      ministry: 'All',
      beneficiary: 'All',
      sortBy: 'name-asc'
    });
  };

  // Run client-side filter
  const filteredSchemes = filterSchemes(schemesData, filters);

  // Wrap schemes with dummy general profile matching so SchemeCard displays cleanly
  const dummyProfile = { age: 25, income: 300000, state: filters.state === 'All' ? 'All India' : filters.state, occupation: 'All' };
  const rankedFiltered = rankSchemes(dummyProfile, filteredSchemes);

  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2rem' }}>
        <div className="badge badge-navy" style={{ marginBottom: '0.5rem' }}>Government Catalog</div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
          Browse All Government Schemes
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          Explore our complete collection of 21 central and state welfare programs. Filter by category, state, or target beneficiary.
        </p>
      </div>

      <SearchFilters
        filterOptions={filterOptions}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={filteredSchemes.length}
      />

      {filteredSchemes.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
            No schemes matched your search criteria
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Try clearing your search query or broadening your category filter.
          </p>
          <button className="btn btn-secondary" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
          {rankedFiltered.map(match => (
            <SchemeCard
              key={match.scheme.id}
              matchData={match}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
