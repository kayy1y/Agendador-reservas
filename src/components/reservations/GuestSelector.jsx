import React from 'react';
import { Users, Minus, Plus, UserCheck } from 'lucide-react';
import './GuestSelector.css';

export const GuestSelector = ({ selectedGuests, onSelectGuests }) => {
  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleIncrement = () => {
    if (selectedGuests < 12) {
      onSelectGuests(selectedGuests + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedGuests > 1) {
      onSelectGuests(selectedGuests - 1);
    }
  };

  return (
    <div className="guest-selector-wrapper">
      <div className="selector-header">
        <div className="selector-title">
          <Users size={20} className="selector-icon" />
          <span>Cantidad de personas</span>
        </div>
        <span className="selector-hint">
          Para grupos de más de 8 personas se asignará el Salón VIP
        </span>
      </div>

      <div className="counter-box">
        <button 
          type="button" 
          className="counter-btn"
          onClick={handleDecrement}
          disabled={selectedGuests <= 1}
          aria-label="Disminuir personas"
        >
          <Minus size={20} />
        </button>

        <div className="counter-display">
          <span className="counter-number">{selectedGuests}</span>
          <span className="counter-label">
            {selectedGuests === 1 ? 'persona' : 'personas'}
          </span>
        </div>

        <button 
          type="button" 
          className="counter-btn"
          onClick={handleIncrement}
          disabled={selectedGuests >= 12}
          aria-label="Aumentar personas"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="guest-pills-row">
        {guestOptions.map((num) => {
          const isSelected = selectedGuests === num;
          return (
            <button
              key={num}
              type="button"
              className={`guest-pill ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectGuests(num)}
            >
              <span>{num} {num === 1 ? 'persona' : num === 8 ? 'o más' : 'personas'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
