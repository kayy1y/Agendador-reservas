import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReservationWizard } from './components/reservations/ReservationWizard';
import { RestaurantAbout } from './components/RestaurantAbout';
import { RestaurantGallery } from './components/RestaurantGallery';
import { Footer } from './components/Footer';
import { RestaurantMenuModal } from './components/menu/RestaurantMenuModal';

export function App() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMenu = () => {
    setIsMenuModalOpen(true);
  };

  return (
    <div className="lavid-app-wrapper">
      {/* Header Navigation */}
      <Header 
        onOpenMenu={handleOpenMenu}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero 
        onReserveClick={() => scrollToSection('reservar')}
        onOpenMenu={handleOpenMenu}
      />

      {/* Main Content Flow */}
      <main>
        {/* Reservation Wizard System - Immediately below Hero */}
        <ReservationWizard 
          onOpenLookup={() => {}}
        />

        {/* Galeria principal inmediatamente después del flujo de reserva */}
        <RestaurantGallery />

        {/* Restaurant Story & Concept */}
        <RestaurantAbout />

      </main>

      {/* Footer */}
      <Footer 
        onOpenMenu={handleOpenMenu}
        onScrollToSection={scrollToSection}
      />

      {/* Full Gastronomic Menu Modal Window (Dedicated Popup Window) */}
      <RestaurantMenuModal 
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}

export default App;
