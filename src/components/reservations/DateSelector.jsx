import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getTodayString, formatDateSpanish } from '../../services/reservationService';
import { reservationConfig } from '../../config/reservationConfig';
import './DateSelector.css';

export const DateSelector = ({ selectedDate, onSelectDate }) => {
  const today = getTodayString();

  // Calculate max date (60 days from today)
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + reservationConfig.maxAdvanceDays);
  const maxDateStr = `${maxDateObj.getFullYear()}-${String(maxDateObj.getMonth() + 1).padStart(2, '0')}-${String(maxDateObj.getDate()).padStart(2, '0')}`;

  // Quick date options (Today, Tomorrow, Day after, etc.)
  const quickDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    let label = '';
    if (i === 0) label = 'Hoy';
    else if (i === 1) label = 'Mañana';
    else {
      label = new Intl.DateTimeFormat('es-CR', { weekday: 'short' }).format(d);
      label = label.charAt(0).toUpperCase() + label.slice(1);
    }

    const dayNumber = d.getDate();
    const monthShort = new Intl.DateTimeFormat('es-CR', { month: 'short' }).format(d);

    quickDates.push({
      dateStr,
      label,
      dayNumber,
      monthShort
    });
  }

  return (
    <div className="date-selector-wrapper">
      <div className="selector-header">
        <label htmlFor="date-input" className="selector-title">
          <CalendarIcon size={20} className="selector-icon" />
          <span>Selecciona el día de tu reserva</span>
        </label>
        <span className="selector-hint">
          Reservas con hasta {reservationConfig.maxAdvanceDays} días de anticipación
        </span>
      </div>

      <div className="quick-dates-grid">
        {quickDates.map((item) => {
          const isSelected = selectedDate === item.dateStr;
          return (
            <button
              key={item.dateStr}
              type="button"
              className={`quick-date-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDate(item.dateStr)}
            >
              <span className="qd-label">{item.label}</span>
              <span className="qd-day">{item.dayNumber}</span>
              <span className="qd-month">{item.monthShort}</span>
            </button>
          );
        })}
      </div>

      <div className="custom-date-picker-row">
        <label htmlFor="date-input" className="date-input-label">
          ¿Otra fecha futura?
        </label>
        <div className="date-input-wrapper">
          <input
            id="date-input"
            type="date"
            min={today}
            max={maxDateStr}
            value={selectedDate || today}
            onChange={(e) => onSelectDate(e.target.value)}
            className="lavid-date-input"
          />
        </div>
      </div>

      {selectedDate && (
        <div className="selected-date-banner">
          <Info size={18} />
          <span>Fecha seleccionada: <strong>{formatDateSpanish(selectedDate)}</strong></span>
        </div>
      )}
    </div>
  );
};
