/**
 * Detailed deterministic eligibility checking logic for government schemes.
 * Evaluates citizen inputs against scheme rules and outputs reasons & warnings.
 */

export function checkEligibility(user = {}, scheme = {}) {
  const reasons = [];
  const warnings = [];

  const userAge = Number(user.age) || 0;
  const userIncome = Number(user.income) || 0;
  const userGender = user.gender || 'All';
  const userState = user.state || 'All India';
  const userCategory = user.category || 'General';
  const userOccupation = user.occupation || 'All';

  const e = scheme.eligibility || {};

  // 1. Age Verification
  if (e.minAge !== undefined && e.minAge !== null && e.minAge > 0) {
    if (userAge < e.minAge) {
      warnings.push(`Minimum age required is ${e.minAge} years (Your age: ${userAge})`);
    } else {
      reasons.push(`Satisfies age requirement (${userAge} years is ≥ ${e.minAge})`);
    }
  }

  if (e.maxAge !== undefined && e.maxAge !== null && e.maxAge < 100) {
    if (userAge > e.maxAge) {
      warnings.push(`Maximum eligible age limit is ${e.maxAge} years (Your age: ${userAge})`);
    } else {
      reasons.push(`Age is within upper limit (${userAge} years is ≤ ${e.maxAge})`);
    }
  }

  // 2. Income Limit Check
  if (e.incomeLimit && e.incomeLimit > 0) {
    if (userIncome > e.incomeLimit) {
      warnings.push(`Annual income ₹${userIncome.toLocaleString('en-IN')} exceeds ceiling of ₹${e.incomeLimit.toLocaleString('en-IN')}`);
    } else {
      reasons.push(`Annual family income (₹${userIncome.toLocaleString('en-IN')}) is within ₹${e.incomeLimit.toLocaleString('en-IN')} limit`);
    }
  }

  // 3. Gender Requirement
  if (e.gender && e.gender !== 'All') {
    if (userGender !== e.gender && userGender !== 'All') {
      warnings.push(`Scheme is exclusively for ${e.gender} beneficiaries (Selected: ${userGender})`);
    } else {
      reasons.push(`Gender criteria matched (${e.gender})`);
    }
  }

  // 4. State / Territory Coverage
  if (e.states && Array.isArray(e.states) && !e.states.includes('All India')) {
    if (userState && userState !== 'All India' && !e.states.includes(userState)) {
      warnings.push(`Scheme is restricted to specific states: ${e.states.join(', ')}`);
    } else {
      reasons.push(`Available in your state (${userState})`);
    }
  } else {
    reasons.push('Applicable pan-India across all States & UTs');
  }

  // 5. Occupation Match
  if (e.occupation && Array.isArray(e.occupation) && !e.occupation.includes('All')) {
    if (userOccupation && userOccupation !== 'All' && !e.occupation.includes(userOccupation)) {
      warnings.push(`Occupation requirement: ${e.occupation.join(', ')} (Your occupation: ${userOccupation})`);
    } else {
      reasons.push(`Occupation matches (${userOccupation})`);
    }
  }

  // 6. Social Category Match
  if (e.categories && Array.isArray(e.categories) && !e.categories.includes('All')) {
    if (userCategory && !e.categories.includes(userCategory)) {
      warnings.push(`Category restricted to ${e.categories.join(', ')} (Your category: ${userCategory})`);
    } else {
      reasons.push(`Social category eligible (${userCategory})`);
    }
  }

  // 7. Special Condition Requirements
  if (e.farmerOnly && !user.isFarmer) {
    warnings.push('Requires land-holding farmer status');
  } else if (e.farmerOnly && user.isFarmer) {
    reasons.push('Farmer eligibility confirmed');
  }

  if (e.studentOnly && !user.isStudent) {
    warnings.push('Requires currently enrolled student status');
  } else if (e.studentOnly && user.isStudent) {
    reasons.push('Enrolled student status verified');
  }

  if (e.disabilityOnly && !user.isDisability) {
    warnings.push('Requires Person with Disability (PwD) / UDID cardholder status');
  } else if (e.disabilityOnly && user.isDisability) {
    reasons.push('Disability support qualification met');
  }

  if (e.seniorCitizenOnly && !user.isSeniorCitizen && userAge < 60) {
    warnings.push('Requires Senior Citizen status (60+ years)');
  } else if (e.seniorCitizenOnly && (user.isSeniorCitizen || userAge >= 60)) {
    reasons.push('Senior Citizen status confirmed');
  }

  if (e.bplOnly && !user.isBpl) {
    warnings.push('Requires Below Poverty Line (BPL) / Low Income card');
  } else if (e.bplOnly && user.isBpl) {
    reasons.push('BPL / Low-Income status satisfied');
  }

  if (e.widowOnly && !user.isWidow) {
    warnings.push('Requires widow status for eligibility');
  } else if (e.widowOnly && user.isWidow) {
    reasons.push('Widow assistance criteria met');
  }

  if (e.unemployedOnly && !user.isUnemployed) {
    warnings.push('Requires registered job seeker / unemployed status');
  } else if (e.unemployedOnly && user.isUnemployed) {
    reasons.push('Unemployed youth criteria met');
  }

  const isEligible = warnings.length === 0;

  return {
    isEligible,
    reasons,
    warnings
  };
}
