import React from 'react';
import { Landmark, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
            <div style={{ background: '#ffffff', color: 'var(--primary-navy)', padding: '0.35rem', borderRadius: '6px' }}>
              <Landmark size={20} />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Government Scheme Finder</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            A transparent, deterministic, citizen-first scheme recommendation engine. Discover eligible central and state government benefits in seconds.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--accent-saffron)' }}>
            <span>✓ Zero AI/ML Dependency</span> • <span>✓ 100% Offline Rule Engine</span>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0 }}>Home</button></li>
            <li><button onClick={() => { setActivePage('find'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0 }}>Find Schemes for Me</button></li>
            <li><button onClick={() => { setActivePage('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0 }}>Browse Schemes Catalog</button></li>
            <li><button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0 }}>About & Architecture</button></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Scheme Categories</h4>
          <ul className="footer-links">
            <li><span style={{ cursor: 'pointer' }} onClick={() => setActivePage('browse')}>Education & Scholarships</span></li>
            <li><span style={{ cursor: 'pointer' }} onClick={() => setActivePage('browse')}>Agriculture & Farming</span></li>
            <li><span style={{ cursor: 'pointer' }} onClick={() => setActivePage('browse')}>Healthcare & Medical</span></li>
            <li><span style={{ cursor: 'pointer' }} onClick={() => setActivePage('browse')}>Housing & Infrastructure</span></li>
            <li><span style={{ cursor: 'pointer' }} onClick={() => setActivePage('browse')}>Women & Child Welfare</span></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Important Disclaimer</h4>
          <div className="disclaimer-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.35rem', color: '#ffffff' }}>
              <ShieldAlert size={15} color="var(--accent-saffron)" />
              <span>Prototype Notice</span>
            </div>
            This prototype provides scheme information based on the available dataset and rule-based eligibility criteria. Final eligibility and application approval are determined by the respective government department.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Government Scheme Finder Prototype (GOV-01) • Built for Civic Transparency
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>Dataset: 21 Verified Schemes</span>
          <span>Pan-India Coverage</span>
          <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            myScheme Portal <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
