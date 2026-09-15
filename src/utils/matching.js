import { checkEligibility } from './eligibility';

/**
 * Deterministic Rule-Based Relevance Engine
 * Calculates a match score out of 100 points based on citizen inputs.
 */

export function calculateSchemeRelevance(user = {}, scheme = {}) {
  let score = 0;
  const maxScore = 100;
  const scoreBreakdown = {};
  const whyRecommended = [];

  const e = scheme.eligibility || {};
  const userRequirement = (user.requirement || '').toLowerCase();
  const userPrompt = (user.requirementPrompt || '').toLowerCase();
  const schemeCategory = (scheme.category || '').toLowerCase();

  // 1. Requirement & Keyword Match (40 Points Max)
  let requirementScore = 0;
  
  // Exact category match (+30 pts)
  if (userRequirement && (schemeCategory.includes(userRequirement) || userRequirement.includes(schemeCategory))) {
    requirementScore += 30;
    whyRecommended.push(`Your selected requirement matches the '${scheme.category}' category.`);
  }

  // Natural language query keyword matching (+10 pts)
  if (userPrompt) {
    const keywords = userPrompt.split(/\s+/).filter(w => w.length > 2);
    const searchTarget = `${scheme.name} ${scheme.category} ${scheme.description} ${(scheme.tags || []).join(' ')}`.toLowerCase();
    
    let matchedCount = 0;
    keywords.forEach(kw => {
      if (searchTarget.includes(kw)) {
        matchedCount++;
      }
    });

    if (matchedCount > 0) {
      const keywordBonus = Math.min(10, matchedCount * 4);
      requirementScore += keywordBonus;
      whyRecommended.push(`Matched key terms from your query: "${userPrompt.slice(0, 40)}${userPrompt.length > 40 ? '...' : ''}"`);
    }
  } else if (!userRequirement) {
    // Default score when no requirement specified
    requirementScore = 20;
  }

  score += Math.min(40, requirementScore);
  scoreBreakdown.requirement = Math.min(40, requirementScore);

  // 2. Age Eligibility (15 Points Max)
  const userAge = Number(user.age) || 0;
  let ageScore = 0;
  if (userAge > 0) {
    const minAge = e.minAge ?? 0;
    const maxAge = e.maxAge ?? 100;

    if (userAge >= minAge && userAge <= maxAge) {
      ageScore = 15;
      whyRecommended.push(`Your age (${userAge} yrs) satisfies the scheme criteria (${minAge}-${maxAge} yrs).`);
    } else {
      ageScore = 0;
    }
  } else {
    ageScore = 10; // Default when age not provided
  }
  score += ageScore;
  scoreBreakdown.age = ageScore;

  // 3. Income Eligibility (15 Points Max)
  const userIncome = Number(user.income) || 0;
  let incomeScore = 0;
  if (userIncome > 0) {
    const incomeLimit = e.incomeLimit ?? Infinity;
    if (userIncome <= incomeLimit) {
      incomeScore = 15;
      whyRecommended.push(`Your family income (₹${userIncome.toLocaleString('en-IN')}) is within the scheme ceiling of ₹${incomeLimit.toLocaleString('en-IN')}.`);
    } else {
      incomeScore = 2; // Partial credit if close
    }
  } else {
    incomeScore = 10; // Default
  }
  score += incomeScore;
  scoreBreakdown.income = incomeScore;

  // 4. State Eligibility (10 Points Max)
  const userState = user.state || 'All India';
  let stateScore = 0;
  if (!e.states || e.states.includes('All India') || e.states.includes(userState)) {
    stateScore = 10;
    whyRecommended.push(`The scheme is active and accessible in your state (${userState}).`);
  } else {
    stateScore = 0;
  }
  score += stateScore;
  scoreBreakdown.state = stateScore;

  // 5. Occupation Match (10 Points Max)
  const userOccupation = user.occupation || 'All';
  let occupationScore = 0;
  if (!e.occupation || e.occupation.includes('All') || e.occupation.includes(userOccupation)) {
    occupationScore = 10;
    if (userOccupation !== 'All') {
      whyRecommended.push(`Your occupation as '${userOccupation}' aligns with scheme targeting.`);
    }
  } else {
    occupationScore = 0;
  }
  score += occupationScore;
  scoreBreakdown.occupation = occupationScore;

  // 6. Special Condition Match (10 Points Max)
  let specialScore = 0;
  let matchedSpecialConditions = 0;

  if (e.farmerOnly && user.isFarmer) {
    matchedSpecialConditions++;
    whyRecommended.push('You selected Farmer as your occupation/status.');
  }
  if (e.studentOnly && user.isStudent) {
    matchedSpecialConditions++;
    whyRecommended.push('You are enrolled as a student.');
  }
  if (e.disabilityOnly && user.isDisability) {
    matchedSpecialConditions++;
    whyRecommended.push('Your Disability Support profile matches this scheme.');
  }
  if (e.seniorCitizenOnly && (user.isSeniorCitizen || userAge >= 60)) {
    matchedSpecialConditions++;
    whyRecommended.push('Senior Citizen status verified.');
  }
  if (e.bplOnly && user.isBpl) {
    matchedSpecialConditions++;
    whyRecommended.push('BPL / Low Income Household status matched.');
  }
  if (e.widowOnly && user.isWidow) {
    matchedSpecialConditions++;
    whyRecommended.push('Widow support criteria matched.');
  }
  if (e.unemployedOnly && user.isUnemployed) {
    matchedSpecialConditions++;
    whyRecommended.push('Unemployed youth support criteria matched.');
  }

  // If no restrictive special flags, award full 10 points
  const hasSpecialRestrictions = e.farmerOnly || e.studentOnly || e.disabilityOnly || e.seniorCitizenOnly || e.bplOnly || e.widowOnly || e.unemployedOnly;
  if (!hasSpecialRestrictions) {
    specialScore = 10;
  } else if (matchedSpecialConditions > 0) {
    specialScore = 10;
  } else {
    specialScore = 0;
  }

  score += specialScore;
  scoreBreakdown.special = specialScore;

  // Final match percentage calculation
  const matchPercentage = Math.round((score / maxScore) * 100);

  // Match Tier assignment
  let matchTier = 'Possibly Eligible';
  if (matchPercentage >= 80) {
    matchTier = 'Highly Relevant';
  } else if (matchPercentage >= 60) {
    matchTier = 'Relevant';
  } else if (matchPercentage >= 40) {
    matchTier = 'Possibly Eligible';
  } else {
    matchTier = 'Low Relevance';
  }

  // Get strict eligibility check
  const eligibility = checkEligibility(user, scheme);

  return {
    scheme,
    score,
    maxScore,
    matchPercentage,
    matchTier,
    scoreBreakdown,
    whyRecommended,
    eligibility
  };
}

/**
 * Sorts and ranks all schemes in the dataset based on citizen inputs.
 */
export function rankSchemes(userProfile, schemesList = []) {
  const results = schemesList.map(scheme => calculateSchemeRelevance(userProfile, scheme));
  
  // Sort primarily by match percentage descending, secondarily by eligible status
  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (a.eligibility.isEligible !== b.eligibility.isEligible) {
      return b.eligibility.isEligible ? 1 : -1;
    }
    return a.scheme.name.localeCompare(b.scheme.name);
  });
}
