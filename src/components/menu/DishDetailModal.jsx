import React from 'react';
import { X, Flame, Phone, Info } from 'lucide-react';
import { formatColones } from '../../data/menuData';
import { restaurantConfig } from '../../config/restaurantConfig';
import './DishDetailModal.css';

export const DishDetailModal = ({ dish, isOpen, onClose }) => {
  if (!isOpen || !dish) return null;

  const handleOrderWhatsApp = () => {
    const text = `Hola, quisiera realizar un pedido a domicilio en La Vid Steak House & Pizza:\n\n*Producto:* ${dish.name}\n*Precio:* ${formatColones(dish.price)}\n*Ubicación:* ${restaurantConfig.address}`;
    const url = `https://wa.me/${restaurantConfig.whatsappClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="lavid-modal-backdrop dish-detail-backdrop" onClick={onClose}>
      <div className="lavid-modal-card dish-detail-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar detalle">
          <X size={20} />
        </button>

        {/* Dish Title & Header Badges */}
        <div className="dish-modal-header">
          <div className="dish-badges">
            <span className="dish-cat-badge">{dish.categoryName}</span>
            {dish.grammage && <span className="dish-gram-badge">{dish.grammage}</span>}
            {dish.isSpecialOfDay && <span className="dish-special-badge">Especial del Día</span>}
            {dish.spicyLevel > 0 && (
              <span className="dish-spicy-badge">
                {'🌶️'.repeat(dish.spicyLevel)} PICANTE
              </span>
            )}
          </div>

          <h3 className="dish-modal-title">{dish.name}</h3>
          {dish.englishName && <h4 className="dish-modal-sub">{dish.englishName}</h4>}
        </div>

        {/* Clean Description Only */}
        <div className="dish-modal-body">
          <div className="dish-desc-box">
            <p className="desc-es">{dish.description}</p>
            {dish.englishDescription && <p className="desc-en">"{dish.englishDescription}"</p>}
          </div>

          {dish.category === 'pizzas' && (
            <div className="pizza-rule-box">
              <Info size={16} />
              <span>Nuestras pizzas son 100% artesanales y preparadas en <strong>UN SOLO TAMAÑO</strong>.</span>
            </div>
          )}

          {dish.category === 'beef' && (
            <div className="beef-rule-box">
              <Flame size={16} />
              <span>Todos nuestros cortes de carne son preparados a la parrilla de leña.</span>
            </div>
          )}
        </div>

        {/* Modal Footer Price Display & Order Button */}
        <div className="dish-modal-footer">
          <div className="price-breakdown">
            <span className="price-label">Precio:</span>
            <strong className="total-colones">{formatColones(dish.price)}</strong>
          </div>

          <button type="button" className="btn-copper btn-order-wa" onClick={handleOrderWhatsApp}>
            <Phone size={18} />
            <span>Agendar pedido a Domicilio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
