import React from 'react';
import { galleryItems } from '../assets/restaurant/restaurantAssets';
import { Sparkles, Utensils } from 'lucide-react';
import './RestaurantGallery.css';

export const RestaurantGallery = () => {
  return (
    <section id="galeria" className="gallery-section">
      <div className="lavid-container">
        <div className="gallery-intro">
          <span className="section-tag">Galería & Ambiente</span>
          <h2 className="section-title">Nuestra experiencia</h2>
          <p className="section-subtitle">
            Un recorrido visual por nuestros espacios, la calidez de nuestro ambiente y la excelencia de nuestra propuesta culinaria.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div key={item.id} className={`gallery-item item-${idx + 1}`}>
              <img src={item.image} alt={item.title} className="gallery-img" />
              <div className="gallery-overlay">
                <span className="gallery-cat">{item.category}</span>
                <h4 className="gallery-item-title">{item.title}</h4>
                <p className="gallery-item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
