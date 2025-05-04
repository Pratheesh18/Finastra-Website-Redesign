import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/Hero';
import AboutSection from './components/About';
import SpeakersSection from './components/SpeakersSection';
import AgendaSection from './components/Agenda';
import LocationSection from './components/Location';
import RegistrationSection from './components/RegistrationSection';
import OrganizerSection from './components/Organizer';

function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <AgendaSection />
      <LocationSection />
      <RegistrationSection />
      <OrganizerSection />
    </Layout>
  );
}

export default App;