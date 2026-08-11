import React from 'react';
import { Flame, Wine, UtensilsCrossed, Award } from 'lucide-react';
import { restaurantImages } from '../assets/restaurant/restaurantAssets';
import { restaurantConfig } from '../config/restaurantConfig';
import './RestaurantAbout.css';

export const RestaurantAbout = () => {
  return (
    <section id="restaurante" className="about-section">
      <div className="lavid-container">
        <div className="about-grid">
          <div className="about-text-col">
            <span className="section-tag">Tradición & Gastronomía</span>
            <h2 className="section-title">La Vid Steak House & Pizza</h2>
            
            <p className="about-paragraph">
              Nacido de la pasión por la cocina rústica de alta calidad, <strong>La Vid</strong> fusiona el arte de los cortes de carne madurados a la parrilla con la auténtica tradición de la pizza en horno a la leña.
            </p>

            <p className="about-paragraph">
              Cada rincón de nuestro restaurante está revestido de maderas nobles, bronce, tonos cálidos y una iluminación ambiental diseñada para brindar intimidad y confort en cada velada.
            </p>

            <div className="about-features-grid">
              <div className="about-feature-card">
                <Flame size={24} className="af-icon" />
                <div>
                  <strong>Horno de Leña Tradicional</strong>
                  <p>Masa madre de fermentación lenta cocinada en horno de piedra rústico.</p>
                </div>
              </div>

              <div className="about-feature-card">
                <Wine size={24} className="af-icon" />
                <div>
                  <strong>Cava de Vinos Internacional</strong>
                  <p>Amplia selección de tintos y blancos seleccionados para maridar cada plato.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-images-col">
            <div className="img-frame img-primary">
              <img src={restaurantImages.userPhoto2} alt="Fotografía oficial La Vid" />
            </div>
            <div className="img-frame img-secondary">
              <img src={restaurantImages.userPhoto3} alt="Platillos La Vid Steak House" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
