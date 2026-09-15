import React, { useState } from 'react';
import { UserCheck, Sparkles, HelpCircle, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function FindSchemes({ onSubmitForm, onOpenDemoModal, initialProfile }) {
  const defaultFormState = {
    age: 22,
    gender: 'Female',
    state: 'Tamil Nadu',
    district: '',
    areaType: 'Urban',
    income: 200000,
    occupation: 'Student',
    category: 'OBC',
    isStudent: true,
    isFarmer: false,
    isDisability: false,
    isSeniorCitizen: false,
    isBpl: false,
    isWidow: false,
    isUnemployed: false,
    requirement: 'Education',
    requirementPrompt: 'Scholarship for my college education'
  };

  const [formData, setFormData] = useState(initialProfile || defaultFormState);

  const statesList = [
    'All India', 'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 
    'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const occupationsList = [
    'Student', 'Farmer', 'Unemployed', 'Self-Employed', 'Laborer', 
    'Vendor', 'Artisan', 'Retired', 'Government Employee', 'All'
  ];

  const categoriesList = ['General', 'OBC', 'SC', 'ST', 'Other'];

  const requirementsList = [
    'Education', 'Scholarship', 'Agriculture', 'Employment', 
    'Housing', 'Healthcare', 'Women & Child Welfare', 'Pension', 
    'Disability Support', 'Financial Assistance', 'Skill Development', 
    'Entrepreneurship', 'Food Security'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: !prev[field] };
      // Auto-update age flag if senior citizen checked
      if (field === 'isSeniorCitizen' && updated.isSeniorCitizen && Number(updated.age) < 60) {
        updated.age = 60;
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(formData);
  };

  const handleReset = () => {
    setFormData({
      age: 25,
      gender: 'All',
      state: 'All India',
      district: '',
      areaType: 'Urban',
      income: 300000,
      occupation: 'All',
      category: 'General',
      isStudent: false,
      isFarmer: false,
      isDisability: false,
      isSeniorCitizen: false,
      isBpl: false,
      isWidow: false,
      isUnemployed: false,
      requirement: '',
      requirementPrompt: ''
    });
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2rem' }}>
        <div className="badge badge-navy" style={{ marginBottom: '0.5rem' }}>Citizen Portal Form</div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
          Find Schemes for Me
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          Enter your basic details and requirement below. Our rule engine will match your profile against authentic government scheme criteria.
        </p>
      </div>

      {/* Demo Profile Callout */}
      <div className="demo-banner">
        <div>
          <div style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '1.05rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={18} color="var(--accent-blue)" />
            <span>Want a quick test with pre-filled details?</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Load example citizen personas (Student, Farmer, Senior Citizen, Street Vendor).
          </p>
        </div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onOpenDemoModal}>
          <span>Choose Demo Profile</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-card">
          {/* Section 1: Personal Details */}
          <div className="form-section-title">
            <UserCheck size={22} color="var(--primary-navy)" />
            <span>1. Personal & Financial Details</span>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">
                <span>Age (Years) <span className="required-star">*</span></span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="form-input"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Gender <span className="required-star">*</span></span>
              </label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                required
              >
                <option value="All">All / Gender Neutral</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Annual Family Income (₹) <span className="required-star">*</span></span>
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                className="form-input"
                value={formData.income}
                onChange={(e) => handleChange('income', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">
                <span>State / Territory <span className="required-star">*</span></span>
              </label>
              <select
                className="form-select"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              >
                {statesList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>District</span>
                <span className="optional-tag">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Chennai / Varanasi"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Area Type</span>
                <span className="optional-tag">(Optional)</span>
              </label>
              <select
                className="form-select"
                value={formData.areaType}
                onChange={(e) => handleChange('areaType', e.target.value)}
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                <span>Primary Occupation <span className="required-star">*</span></span>
              </label>
              <select
                className="form-select"
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                required
              >
                {occupationsList.map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Social Category <span className="required-star">*</span></span>
              </label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Additional Status Details */}
          <div className="form-section-title" style={{ marginTop: '1rem' }}>
            <span>2. Additional Status & Vulnerability Flags</span>
            <span className="optional-tag" style={{ fontSize: '0.85rem' }}>(Select all that apply to refine matching)</span>
          </div>

          <div className="checkbox-grid">
            <label className={`checkbox-card ${formData.isStudent ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isStudent}
                onChange={() => handleCheckboxChange('isStudent')}
              />
              <span>Student?</span>
            </label>

            <label className={`checkbox-card ${formData.isFarmer ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isFarmer}
                onChange={() => handleCheckboxChange('isFarmer')}
              />
              <span>Farmer / Agri-Worker?</span>
            </label>

            <label className={`checkbox-card ${formData.isDisability ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isDisability}
                onChange={() => handleCheckboxChange('isDisability')}
              />
              <span>Disability (PwD)?</span>
            </label>

            <label className={`checkbox-card ${formData.isSeniorCitizen ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isSeniorCitizen}
                onChange={() => handleCheckboxChange('isSeniorCitizen')}
              />
              <span>Senior Citizen (60+)?</span>
            </label>

            <label className={`checkbox-card ${formData.isBpl ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isBpl}
                onChange={() => handleCheckboxChange('isBpl')}
              />
              <span>BPL / Low Income Card?</span>
            </label>

            <label className={`checkbox-card ${formData.isWidow ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isWidow}
                onChange={() => handleCheckboxChange('isWidow')}
              />
              <span>Widow / Single Mother?</span>
            </label>

            <label className={`checkbox-card ${formData.isUnemployed ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={formData.isUnemployed}
                onChange={() => handleCheckboxChange('isUnemployed')}
              />
              <span>Unemployed Job Seeker?</span>
            </label>
          </div>

          {/* Section 3: Requirement Selector & Prompt */}
          <div className="form-section-title" style={{ marginTop: '1.5rem' }}>
            <span>3. What Type of Government Support Are You Looking For?</span>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">
              <span>Select Primary Category Requirement</span>
            </label>
            <div className="category-grid">
              {requirementsList.map(req => {
                const isSelected = formData.requirement === req;
                return (
                  <button
                    key={req}
                    type="button"
                    className={`category-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleChange('requirement', isSelected ? '' : req)}
                  >
                    <span>{req}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Describe Your Need in Words</span>
              <span className="optional-tag">(Keyword Matching)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Scholarship for my college education OR Crop insurance for small farmer"
              value={formData.requirementPrompt}
              onChange={(e) => handleChange('requirementPrompt', e.target.value)}
            />
          </div>

          {/* Form Actions */}
          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <RefreshCw size={16} />
              <span>Reset Form</span>
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ background: 'linear-gradient(135deg, var(--primary-navy), var(--primary-navy-light))' }}
            >
              <span>Find Matching Schemes Now</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
