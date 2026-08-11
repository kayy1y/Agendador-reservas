import React from 'react';
import { Clock, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { 
  generateTimeSlots, 
  formatTime12h, 
  reservationService 
} from '../../services/reservationService';
import { reservationConfig } from '../../config/reservationConfig';
import './TimeSelector.css';

export const TimeSelector = ({ 
  selectedDate, 
  selectedGuests, 
  selectedTime, 
  onSelectTime,
  excludeReservationId = null
}) => {
  const timeSlots = generateTimeSlots();

  // Calculate availability for each time slot
  const slotAvailability = timeSlots.map(timeStr => {
    const bestTable = reservationService.autoSelectBestTable(
      selectedDate,
      timeStr,
      selectedGuests,
      reservationConfig.defaultReservationDuration,
      excludeReservationId
    );
    return {
      time: timeStr,
      formattedTime: formatTime12h(timeStr),
      isAvailable: !!bestTable,
      bestTable
    };
  });

  // Calculate suggested times if selected time is unavailable or to offer quick choices
  const suggestedTimes = selectedTime 
    ? reservationService.getSuggestedTimes(
        selectedDate, 
        selectedTime, 
        selectedGuests, 
        reservationConfig.defaultReservationDuration
      )
    : [];

  const isSelectedTimeAvailable = selectedTime 
    ? slotAvailability.find(s => s.time === selectedTime)?.isAvailable 
    : false;

  return (
    <div className="time-selector-wrapper">
      <div className="selector-header">
        <div className="selector-title">
          <Clock size={20} className="selector-icon" />
          <span>Selecciona la hora de tu estancia</span>
        </div>
        <span className="selector-hint">
          Duración estándar estimada: {reservationConfig.defaultReservationDuration} minutos
        </span>
      </div>

      <div className="time-slots-grid">
        {slotAvailability.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const isDisabled = !slot.isAvailable;

          return (
            <button
              key={slot.time}
              type="button"
              className={`time-slot-btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => slot.isAvailable && onSelectTime(slot.time)}
              disabled={isDisabled}
            >
              <span className="time-text">{slot.formattedTime}</span>
              <span className="slot-badge">
                {isDisabled ? 'Sin lugar' : 'Disponible'}
              </span>
            </button>
          );
        })}
      </div>

      {selectedTime && !isSelectedTimeAvailable && (
        <div className="no-availability-box">
          <div className="no-avail-header">
            <AlertCircle size={20} className="alert-icon" />
            <div>
              <strong>No encontramos mesas disponibles a las {formatTime12h(selectedTime)}</strong>
              <p>El restaurante se encuentra completo en ese horario para {selectedGuests} personas.</p>
            </div>
          </div>

          {suggestedTimes.length > 0 && (
            <div className="suggested-times-row">
              <div className="suggested-title">
                <Sparkles size={16} />
                <span>Horarios alternativos disponibles cercanos:</span>
              </div>
              <div className="suggested-pills">
                {suggestedTimes.map((timeStr) => (
                  <button
                    key={timeStr}
                    type="button"
                    className="suggested-pill-btn"
                    onClick={() => onSelectTime(timeStr)}
                  >
                    <Clock size={14} />
                    <span>{formatTime12h(timeStr)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTime && isSelectedTimeAvailable && (
        <div className="selected-time-banner">
          <CheckCircle2 size={18} />
          <span>Hora seleccionada: <strong>{formatTime12h(selectedTime)}</strong> (Reserva por {reservationConfig.defaultReservationDuration} min)</span>
        </div>
      )}
    </div>
  );
};
