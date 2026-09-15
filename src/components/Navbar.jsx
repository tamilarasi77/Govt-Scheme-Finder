import React, { useState } from 'react';
import { Landmark, Search, Grid, Info, Sparkles, Menu, X, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenDemoModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Landmark },
    { id: 'find', label: 'Find Schemes', icon: Search },
    { id: 'browse', label: 'Browse Schemes', icon: Grid },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-brand" 
          onClick={() => handleNavClick('home')} 
          style={{ cursor: 'pointer' }}
        >
          <div style={{
            background: '#ffffff',
            color: 'var(--primary-navy)',
            padding: '0.4rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Landmark size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Government Scheme Finder</span>
              <span className="brand-badge">PROTOTYPE</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
              Government of India • Civic Portal Demo
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-links" style={{ display: mobileMenuOpen ? 'none' : 'flex' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id || (activePage === 'results' && item.id === 'find') || (activePage === 'details' && item.id === 'browse');
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button className="demo-btn-nav" onClick={onOpenDemoModal}>
              <Sparkles size={16} />
              <span>Try Demo Profile</span>
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--primary-navy-dark)',
          padding: '1rem 1.5rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
            <li style={{ marginTop: '0.5rem' }}>
              <button 
                className="demo-btn-nav" 
                onClick={() => { setMobileMenuOpen(false); onOpenDemoModal(); }}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <Sparkles size={18} />
                <span>Try Demo Profile</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
