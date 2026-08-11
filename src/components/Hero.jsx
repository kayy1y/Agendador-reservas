import React from 'react';
import { Calendar, Utensils, Award, Flame, Wine, ShieldCheck } from 'lucide-react';
import { restaurantImages } from '../assets/restaurant/restaurantAssets';
import { restaurantConfig } from '../config/restaurantConfig';
import './Hero.css';

export const Hero = ({ onReserveClick, onOpenMenu }) => {
  return (
    <section id="inicio" className="hero-section">
      <div 
        className="hero-bg-image" 
        style={{ backgroundImage: `url(${restaurantImages.userPhoto1 || restaurantImages.heroBg})` }}
      />
      <div className="hero-overlay" />

      <div className="lavid-container hero-container">
        <div className="hero-badge">
          <Award size={16} />
          <span>Experiencia Gastronómica Premium</span>
        </div>

        <h2 className="hero-restaurant-name">{restaurantConfig.name}</h2>
        <h1 className="hero-main-title">Reserva tu mesa</h1>

        <p className="hero-description">
          Disfruta una experiencia especial en La Vid. Cortes de carne madurados a la parrilla, pizzas artesanales elaboradas en horno de piedra a la leña y una selecta cava de vinos.
        </p>

        <div className="hero-cta-group">
          <button type="button" className="btn-copper btn-hero-lg" onClick={onReserveClick}>
            <Calendar size={20} />
            <span>Reservar mesa</span>
          </button>
          
          <button type="button" className="btn-secondary btn-hero-secondary" onClick={onOpenMenu}>
            <Utensils size={20} />
            <span>Ver Menú Gastronómico</span>
          </button>
        </div>

        <div className="hero-features-bar">
          <div className="feature-item">
            <Flame className="feature-icon" size={20} />
            <div className="feature-text">
              <strong>Cortes Madurados</strong>
              <span>Parrilla a la leña</span>
            </div>
          </div>

          <div className="feature-divider" />

          <div className="feature-item">
            <UtensilsIcon className="feature-icon" size={20} />
            <div className="feature-text">
              <strong>Pizza Artesanal</strong>
              <span>Masa madre 48h</span>
            </div>
          </div>

          <div className="feature-divider" />

          <div className="feature-item">
            <Wine className="feature-icon" size={20} />
            <div className="feature-text">
              <strong>Cava Exclusiva</strong>
              <span>Maridajes de autor</span>
            </div>
          </div>

          <div className="feature-divider" />

          <div className="feature-item">
            <ShieldCheck className="feature-icon" size={20} />
            <div className="feature-text">
              <strong>Reserva Garantizada</strong>
              <span>Confirmación al instante</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UtensilsIcon = (props) => (
  <svg 
    width={props.size || 24} 
    height={props.size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
  >
    <path d="M18 2v20M14 2v20M10 2v6a4 4 0 0 1-4 4H4M4 2v20" />
  </svg>
);
