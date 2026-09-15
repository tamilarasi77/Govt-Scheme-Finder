import React, { useState } from 'react';
import schemesData from './data/schemes.json';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoProfilesModal from './components/DemoProfilesModal';

import Home from './pages/Home';
import FindSchemes from './pages/FindSchemes';
import Results from './pages/Results';
import BrowseSchemes from './pages/BrowseSchemes';
import SchemeDetails from './pages/SchemeDetails';
import About from './pages/About';

import { rankSchemes } from './utils/matching';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [selectedMatchData, setSelectedMatchData] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Form submission handler from FindSchemes
  const handleFormSubmit = (profileData) => {
    setUserProfile(profileData);
    setActivePage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scheme card selection handler
  const handleSelectScheme = (scheme, matchData = null) => {
    setSelectedScheme(scheme);

    // If matchData wasn't passed directly, compute it if userProfile exists
    if (!matchData && userProfile) {
      const ranked = rankSchemes(userProfile, [scheme]);
      setSelectedMatchData(ranked[0]);
    } else {
      setSelectedMatchData(matchData);
    }

    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Demo profile loader handler
  const handleSelectDemoProfile = (profile) => {
    setUserProfile(profile);
    // If on find page, fill form; if on home, directly navigate to results
    if (activePage === 'home') {
      setActivePage('results');
    } else {
      setActivePage('find');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      <main className="main-content">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onSelectScheme={handleSelectScheme}
            schemesData={schemesData}
          />
        )}

        {activePage === 'find' && (
          <FindSchemes
            onSubmitForm={handleFormSubmit}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            initialProfile={userProfile}
          />
        )}

        {activePage === 'results' && userProfile && (
          <Results
            userProfile={userProfile}
            schemesData={schemesData}
            onViewDetails={handleSelectScheme}
            onEditDetails={() => setActivePage('find')}
            onBrowseAll={() => setActivePage('browse')}
          />
        )}

        {activePage === 'browse' && (
          <BrowseSchemes
            schemesData={schemesData}
            onViewDetails={handleSelectScheme}
          />
        )}

        {activePage === 'details' && (
          <SchemeDetails
            scheme={selectedScheme}
            matchData={selectedMatchData}
            onBack={() => {
              if (userProfile) setActivePage('results');
              else setActivePage('browse');
            }}
          />
        )}

        {activePage === 'about' && (
          <About />
        )}
      </main>

      <Footer setActivePage={setActivePage} />

      <DemoProfilesModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectProfile={handleSelectDemoProfile}
      />
    </div>
  );
}
