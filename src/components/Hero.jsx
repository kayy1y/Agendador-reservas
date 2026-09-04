import React from 'react';
import {
  ArrowDown,
  Award,
  Calendar,
  Flame,
  MapPin,
  ShieldCheck,
  Utensils,
  Wine,
} from 'lucide-react';
import { restaurantImages } from '../assets/restaurant/restaurantAssets';
import { restaurantConfig } from '../config/restaurantConfig';
import { ScrollExpandMedia } from './ui/scroll-expansion-hero';
import './Hero.css';

export const Hero = ({ onReserveClick, onOpenMenu }) => {
  const highlights = [
    {
      icon: Flame,
      title: 'Parrilla & horno de lena',
      description: 'Cortes madurados, brasas intensas y pizza artesanal en un solo recorrido.',
    },
    {
      icon: Wine,
      title: 'Cava y maridajes',
      description: 'Etiquetas seleccionadas para una noche elegante, intima y memorable.',
    },
    {
      icon: ShieldCheck,
      title: 'Reserva inmediata',
      description: 'Confirma tu mesa en minutos con un flujo simple y claro.',
    },
  ];

  return (
    <>
      <section id="inicio" className="hero-section">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc={restaurantImages.hero}
          bgImageSrc={restaurantImages.heroBg}
          title="Reserva una noche memorable"
          date={restaurantConfig.name}
          scrollToExpand="Desliza para descubrir la experiencia"
          textBlend
        >
          <div className="hero-expanded-grid" aria-hidden="true" />
        </ScrollExpandMedia>

        <div className="hero-overlay-shell">
          <div className="hero-overlay-card">
            <div className="hero-badge">
              <Award size={16} />
              <span>Experiencia gastronomica premium</span>
            </div>

            <div className="hero-topline">
              <span>{restaurantConfig.subtitle}</span>
              <span className="hero-topline-separator" />
              <span>{restaurantConfig.openingHours}</span>
            </div>

            <p className="hero-description">
              Disfruta una experiencia especial en La Vid. Cortes de carne madurados a la parrilla,
              pizzas artesanales elaboradas en horno de piedra a la lena y una cava seleccionada para
              celebrar con calma.
            </p>

            <div className="hero-cta-group">
              <button type="button" className="btn-copper btn-hero-lg" onClick={onReserveClick}>
                <Calendar size={20} />
                <span>Reservar mesa</span>
              </button>

              <button type="button" className="btn-secondary btn-hero-secondary" onClick={onOpenMenu}>
                <Utensils size={20} />
                <span>Ver menu gastronomico</span>
              </button>
            </div>

            <div className="hero-insight-bar">
              <div className="hero-insight-meta">
                <MapPin size={16} />
                <span>{restaurantConfig.address}</span>
              </div>
              <div className="hero-scroll-hint">
                <ArrowDown size={16} />
                <span>Entrada inmersiva</span>
              </div>
            </div>

            <div className="hero-features-bar">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="feature-item">
                    <div className="feature-icon-wrap">
                      <Icon className="feature-icon" size={18} />
                    </div>
                    <div className="feature-text">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
