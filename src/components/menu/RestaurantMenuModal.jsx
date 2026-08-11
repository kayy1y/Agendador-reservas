import React, { useState } from 'react';
import { X, Search, Utensils, Eye, GlassWater } from 'lucide-react';
import { menuCategories, menuItems, formatColones } from '../../data/menuData';
import { restaurantConfig } from '../../config/restaurantConfig';
import { DishDetailModal } from './DishDetailModal';
import './RestaurantMenuModal.css';

export const RestaurantMenuModal = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  if (!isOpen) return null;

  // Filter items by search term and selected category
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.englishName && item.englishName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Group items by category for clear visual separation
  const categoriesToDisplay = activeCategory === 'all' 
    ? menuCategories.filter(c => c.id !== 'all')
    : menuCategories.filter(c => c.id === activeCategory);

  const handleOpenDetail = (dish) => {
    setSelectedDish(dish);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="lavid-modal-backdrop menu-modal-backdrop" onClick={onClose}>
      <div className="menu-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header Close Button (Fixed z-index) */}
        <button type="button" className="menu-modal-close" onClick={onClose} aria-label="Cerrar menú">
          <X size={24} />
        </button>

        {/* Modal Top Title Header */}
        <div className="menu-modal-header-title">
          <span className="section-tag">Carta Gastronómica Oficial</span>
          <h2 className="menu-banner-title">Menú La Vid</h2>
          <p className="menu-banner-subtitle">
            {restaurantConfig.name} — La Fortuna de San Carlos
          </p>
        </div>

        {/* Sticky Controls Panel (Search Field + Category Pills pinned at the top so it can NEVER be covered) */}
        <div className="menu-sticky-controls">
          {/* Always Visible Search Bar */}
          <div className="menu-modal-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por plato o ingrediente (ej. rib eye, ceviche, pizza, sangría, entraña)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-field"
            />
            {searchQuery && (
              <button type="button" className="clear-btn" onClick={() => setSearchQuery('')}>
                Limpiar
              </button>
            )}
          </div>

          {/* Category Navigation Pills */}
          <div className="menu-pills-bar">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`menu-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Menu Body with Clean Category Blocks */}
        <div className="menu-modal-body">
          {searchQuery && (
            <div className="search-results-info">
              <span>Resultados para "<strong>{searchQuery}</strong>": {filteredItems.length} platillos encontrados</span>
            </div>
          )}

          {categoriesToDisplay.map((cat) => {
            const catDishes = filteredItems.filter(d => d.category === cat.id);
            if (catDishes.length === 0) return null;

            return (
              <div key={cat.id} className="category-section-block">
                {/* Clean Category Header */}
                <div className="category-block-header">
                  <div className="cat-title-row">
                    {cat.id === 'beverages' ? (
                      <GlassWater size={22} className="cat-icon" />
                    ) : (
                      <Utensils size={22} className="cat-icon" />
                    )}
                    <h3 className="category-block-title">{cat.name}</h3>
                  </div>

                  {cat.id === 'pizzas' && (
                    <span className="cat-notice-badge">
                      Pizzas 100% artesanales en UN SOLO TAMAÑO
                    </span>
                  )}

                  {cat.id === 'beef' && (
                    <span className="cat-notice-badge">
                      Cortes madurados a la parrilla de leña
                    </span>
                  )}

                  {cat.id === 'beverages' && (
                    <span className="cat-notice-badge drinks-badge">
                      Cava de Vinos, Coctelería & Bebidas
                    </span>
                  )}
                </div>

                <div className="category-dishes-grid">
                  {catDishes.map((dish) => (
                    <div key={dish.id} className="menu-dish-card" onClick={() => handleOpenDetail(dish)}>
                      <div className="dish-card-header">
                        <span className="dish-cat-name">{dish.categoryName}</span>
                        <div className="dish-tags-group">
                          {dish.grammage && <span className="tag-gram">{dish.grammage}</span>}
                          {dish.spicyLevel > 0 && (
                            <span className="tag-spicy">
                              {'🌶️'.repeat(dish.spicyLevel)} PICANTE
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="dish-card-main">
                        <h4 className="dish-card-title">{dish.name}</h4>
                        {dish.englishName && <span className="dish-card-sub">{dish.englishName}</span>}
                      </div>

                      <p className="dish-card-desc">{dish.description}</p>

                      <div className="dish-card-footer">
                        <strong className="dish-price">{formatColones(dish.price)}</strong>
                        <button 
                          type="button" 
                          className="btn-view-dish"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleOpenDetail(dish); 
                          }}
                        >
                          <Eye size={15} />
                          <span>Ver detalles</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="menu-no-results">
              <Utensils size={44} className="no-res-icon" />
              <h4>No se encontraron platillos</h4>
              <p>No hay productos que coincidan con "{searchQuery}".</p>
              <button 
                type="button" 
                className="btn-copper"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Ver todo el menú
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal (z-index 3500) */}
      <DishDetailModal
        dish={selectedDish}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};
