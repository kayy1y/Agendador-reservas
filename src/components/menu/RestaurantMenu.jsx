import React, { useState } from 'react';
import { Search, Flame, Utensils, Sparkles, Filter, ChevronRight, Eye, Phone } from 'lucide-react';
import { menuCategories, menuItems, formatColones } from '../../data/menuData';
import { restaurantImages } from '../../assets/restaurant/restaurantAssets';
import { restaurantConfig } from '../../config/restaurantConfig';
import { DishDetailModal } from './DishDetailModal';
import './RestaurantMenu.css';

export const RestaurantMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter items by category and search term
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.englishName && item.englishName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (dish) => {
    setSelectedDish(dish);
    setIsDetailModalOpen(true);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="menu-header-bg">
        <div 
          className="menu-hero-overlay-img" 
          style={{ backgroundImage: `url(${restaurantImages.menuShot1})` }}
        />
        <div className="menu-bg-gradient" />
        
        <div className="lavid-container menu-intro-content">
          <span className="section-tag">Propuesta Gastronómica</span>
          <h2 className="menu-main-title">Nuestro Menú</h2>
          <p className="menu-main-subtitle">
            Cortes seleccionados a la parrilla, pizzas 100% artesanales a la leña, entradas frías, calientes y recetas especiales en La Fortuna de San Carlos.
          </p>

          {/* Search bar */}
          <div className="menu-search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar en el menú (ej. rib, ceviche, fettuccini, pepperoni)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lavid-container menu-container">
        {/* Category Navigation Tabs */}
        <div className="menu-categories-scroll">
          <div className="menu-categories-pills">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const itemCount = cat.id === 'all' 
                ? menuItems.length 
                : menuItems.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className="pill-count">({itemCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="menu-item-card" onClick={() => handleOpenDetail(item)}>
                <div className="card-top-row">
                  <span className="cat-tag">{item.categoryName}</span>
                  <div className="badges-right">
                    {item.grammage && <span className="gram-tag">{item.grammage}</span>}
                    {item.isSpecialOfDay && <span className="special-tag">Especial</span>}
                    {item.spicyLevel > 0 && (
                      <span className="spicy-tag">
                        {'🌶️'.repeat(item.spicyLevel)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="card-titles">
                  <h3 className="dish-name">{item.name}</h3>
                  {item.englishName && <span className="dish-sub">{item.englishName}</span>}
                </div>

                <p className="dish-desc">{item.description}</p>

                <div className="card-bottom-row">
                  <strong className="dish-price">{formatColones(item.price)}</strong>
                  <button type="button" className="btn-view-detail">
                    <Eye size={16} />
                    <span>Ver detalles</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-menu-results">
              <Utensils size={40} className="no-results-icon" />
              <h3>No encontramos platillos para "{searchQuery}"</h3>
              <p>Intenta buscando otro término o selecciona una categoría diferente.</p>
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

      {/* Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </section>
  );
};
