import React from 'react';
import { galleryItems } from '../assets/restaurant/restaurantAssets';
import { CircularGallery } from './ui/circular-gallery';
import './RestaurantGallery.css';

export const RestaurantGallery = () => {
  const items = galleryItems.map((item) => ({
    common: item.title,
    binomial: item.category,
    photo: {
      url: item.image,
      text: item.description,
      by: 'La Vid Steak House & Pizza',
    },
  }));

  return (
    <section id="galeria" className="gallery-section">
      <div className="lavid-container">
        <div className="gallery-intro">
          <span className="section-tag">Galeria & Ambiente</span>
          <h2 className="section-title">Nuestra experiencia</h2>
          <p className="section-subtitle">
            Un recorrido visual por nuestros espacios, la calidez de nuestro ambiente y la excelencia de nuestra propuesta culinaria.
          </p>

          <div className="gallery-chips">
            <span>Ambiente</span>
            <span>Parrilla</span>
            <span>Pizza artesanal</span>
            <span>Cava</span>
          </div>
        </div>

        <CircularGallery items={items} radius={350} />
      </div>
    </section>
  );
};
