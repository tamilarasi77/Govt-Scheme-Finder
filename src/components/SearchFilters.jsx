import React from 'react';
import { Search, Filter, RefreshCw, SlidersHorizontal } from 'lucide-react';

export default function SearchFilters({
  filterOptions,
  currentFilters,
  onFilterChange,
  onResetFilters,
  totalCount
}) {
  const { categories, ministries, states, beneficiaries } = filterOptions;

  return (
    <div className="card" style={{ marginBottom: '1.75rem', background: '#ffffff', border: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <SlidersHorizontal size={20} color="var(--primary-navy)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>Filter & Search Catalog</h3>
          <span className="badge badge-navy">{totalCount} Schemes Available</span>
        </div>
        <button 
          onClick={onResetFilters}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.82rem' }}
        >
          <RefreshCw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Main Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="form-input"
          style={{ paddingLeft: '2.75rem', fontSize: '1rem' }}
          placeholder="Search by scheme name, ministry, keyword, or document (e.g., 'farmer', 'scholarship', 'ayushman')..."
          value={currentFilters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
        />
      </div>

      {/* Filter Options Grid */}
      <div className="form-grid-3" style={{ marginBottom: 0 }}>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={currentFilters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">State / Territory</label>
          <select
            className="form-select"
            value={currentFilters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
          >
            {states.map(st => (
              <option key={st} value={st}>{st === 'All' ? 'All States & UTs' : st}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Beneficiary Target</label>
          <select
            className="form-select"
            value={currentFilters.beneficiary}
            onChange={(e) => onFilterChange('beneficiary', e.target.value)}
          >
            {beneficiaries.map(ben => (
              <option key={ben} value={ben}>{ben === 'All' ? 'All Beneficiaries' : ben}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-grid-2" style={{ marginTop: '1rem', marginBottom: 0 }}>
        <div className="form-group">
          <label className="form-label">Ministry / Department</label>
          <select
            className="form-select"
            value={currentFilters.ministry}
            onChange={(e) => onFilterChange('ministry', e.target.value)}
          >
            {ministries.map(min => (
              <option key={min} value={min}>{min === 'All' ? 'All Ministries' : min}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            value={currentFilters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            <option value="name-asc">Alphabetical (A to Z)</option>
            <option value="name-desc">Alphabetical (Z to A)</option>
            <option value="income-desc">Income Ceiling (High to Low)</option>
            <option value="income-asc">Income Ceiling (Low to High)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
