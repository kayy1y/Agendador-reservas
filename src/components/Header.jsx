import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Calendar, Menu as MenuIcon, X, Phone, Utensils, Truck } from 'lucide-react';
import { restaurantConfig } from '../config/restaurantConfig';
import './Header.css';

export const Header = ({ onOpenMenu, onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    }
  };

  const handleDeliveryCall = () => {
    window.open(`https://wa.me/${restaurantConfig.whatsappClean}?text=Hola,%20quisiera%20agendar%20un%20pedido%20por%20env%C3%ADo%20en%20La%20Vid`, '_blank');
  };

  return (
    <header className={`lavid-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Banner Bar for Delivery (Hides smoothly when scrolling down so it NEVER covers nav buttons) */}
      <div className="topbar-strip">
        <div className="lavid-container topbar-content">
          <div className="topbar-info">
            <Truck size={14} />
            <span>Pedidos a Domicilio: <strong>{restaurantConfig.phone}</strong> — {restaurantConfig.address}</span>
          </div>

          <button 
            type="button" 
            className="topbar-btn"
            onClick={handleDeliveryCall}
            title="Llamar o escribir para agendar pedido por envío"
          >
            <Phone size={13} />
            <span>Agendar pedido por envío</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="lavid-container header-content">
          <a href="#inicio" className="brand-logo" onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}>
            <span className="brand-icon">
              <UtensilsCrossed size={22} />
            </span>
            <div className="brand-text">
              <span className="brand-name">LA VID</span>
              <span className="brand-sub">STEAK HOUSE & PIZZA</span>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}>
              Inicio
            </a>
            
            <button 
              type="button" 
              className="nav-link-btn" 
              onClick={() => { setMobileMenuOpen(false); onOpenMenu(); }}
            >
              <Utensils size={16} />
              <span>Ver Menú</span>
            </button>

            <a href="#reservar" onClick={(e) => { e.preventDefault(); handleNavClick('reservar'); }}>
              Reservar
            </a>
            
            <a href="#restaurante" onClick={(e) => { e.preventDefault(); handleNavClick('restaurante'); }}>
              El Restaurante
            </a>
            
            <a href="#galeria" onClick={(e) => { e.preventDefault(); handleNavClick('galeria'); }}>
              Galería
            </a>
          </nav>

          <div className="header-actions">
            <button 
              type="button"
              className="btn-delivery-header hide-mobile"
              onClick={handleDeliveryCall}
              title="Agendar pedido por envío"
            >
              <Truck size={16} />
              <span>Agendar Envío</span>
            </button>

            <button 
              type="button"
              className="btn-copper btn-header-cta"
              onClick={() => handleNavClick('reservar')}
            >
              <Calendar size={18} />
              <span>Reservar mesa</span>
            </button>

            <button 
              type="button" 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
