/**
 * Client-side search and filtering utilities for Scheme browsing catalog.
 */

export function filterSchemes(schemes = [], options = {}) {
  const {
    searchQuery = '',
    category = 'All',
    state = 'All',
    ministry = 'All',
    beneficiary = 'All',
    sortBy = 'name-asc'
  } = options;

  const query = searchQuery.trim().toLowerCase();

  const filtered = schemes.filter(scheme => {
    const e = scheme.eligibility || {};

    // 1. Text Search Match
    if (query) {
      const matchName = (scheme.name || '').toLowerCase().includes(query);
      const matchHindiName = (scheme.hindiName || '').toLowerCase().includes(query);
      const matchMinistry = (scheme.ministry || '').toLowerCase().includes(query);
      const matchCategory = (scheme.category || '').toLowerCase().includes(query);
      const matchDesc = (scheme.description || '').toLowerCase().includes(query);
      const matchTags = (scheme.tags || []).some(t => t.toLowerCase().includes(query));
      const matchDocs = (scheme.documents || []).some(d => d.toLowerCase().includes(query));

      if (!matchName && !matchHindiName && !matchMinistry && !matchCategory && !matchDesc && !matchTags && !matchDocs) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== 'All') {
      if (scheme.category !== category) {
        return false;
      }
    }

    // 3. State Filter
    if (state && state !== 'All' && state !== 'All India') {
      if (e.states && !e.states.includes('All India') && !e.states.includes(state)) {
        return false;
      }
    }

    // 4. Ministry Filter
    if (ministry && ministry !== 'All') {
      if (scheme.ministry !== ministry) {
        return false;
      }
    }

    // 5. Beneficiary Type Filter
    if (beneficiary && beneficiary !== 'All') {
      if (beneficiary === 'Student' && !e.studentOnly && !(e.occupation || []).includes('Student')) return false;
      if (beneficiary === 'Farmer' && !e.farmerOnly && !(e.occupation || []).includes('Farmer')) return false;
      if (beneficiary === 'Disability' && !e.disabilityOnly) return false;
      if (beneficiary === 'Senior Citizen' && !e.seniorCitizenOnly && (e.minAge || 0) < 60) return false;
      if (beneficiary === 'BPL' && !e.bplOnly) return false;
      if (beneficiary === 'Women' && e.gender !== 'Female') return false;
    }

    return true;
  });

  // Sorting Logic
  return filtered.sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'income-desc') {
      return (b.eligibility?.incomeLimit || 0) - (a.eligibility?.incomeLimit || 0);
    }
    if (sortBy === 'income-asc') {
      return (a.eligibility?.incomeLimit || 0) - (b.eligibility?.incomeLimit || 0);
    }
    return 0;
  });
}

/**
 * Extracts unique filter options dynamically from scheme dataset.
 */
export function getFilterOptions(schemes = []) {
  const categories = new Set();
  const ministries = new Set();
  const states = new Set(['All India']);

  schemes.forEach(s => {
    if (s.category) categories.add(s.category);
    if (s.ministry) ministries.add(s.ministry);
    if (s.eligibility?.states) {
      s.eligibility.states.forEach(st => states.add(st));
    }
  });

  return {
    categories: ['All', ...Array.from(categories).sort()],
    ministries: ['All', ...Array.from(ministries).sort()],
    states: Array.from(states).sort(),
    beneficiaries: ['All', 'Student', 'Farmer', 'Women', 'Senior Citizen', 'Disability', 'BPL']
  };
}
