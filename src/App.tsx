import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import PresidentSection from './components/PresidentSection';
import EventsSection from './components/EventsSection';
import ActivitiesSection from './components/ActivitiesSection';
import VisionSection from './components/VisionSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <EventsSection />
          <ActivitiesSection />
          <VisionSection />
          <PresidentSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
