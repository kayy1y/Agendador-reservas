import React from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Armchair, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Edit3, 
  Check, 
  Utensils, 
  MapPin, 
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { formatDateSpanish, formatTime12h } from '../../services/reservationService';
import { restaurantTables } from '../../data/tables';
import { restaurantConfig } from '../../config/restaurantConfig';
import { reservationConfig } from '../../config/reservationConfig';
import './ReservationSummary.css';

export const ReservationSummary = ({
  bookingData,
  onEditStep,
  onConfirmReservation,
  isSubmitting
}) => {
  const { selectedDate, selectedTime, selectedGuests, selectedTableId, customerData } = bookingData;
  const tableObj = restaurantTables.find(t => t.id === selectedTableId);

  return (
    <div className="summary-card-wrapper">
      <div className="summary-header">
        <div className="summary-badge">
          <Sparkles size={16} />
          <span>Verifica los detalles antes de confirmar</span>
        </div>
        <h3 className="summary-title">Resumen de tu reserva</h3>
        <p className="summary-sub">{restaurantConfig.name}</p>
      </div>

      <div className="summary-body">
        <div className="summary-grid">
          <div className="summary-item">
            <User className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Cliente</span>
              <strong className="item-value">{customerData.name}</strong>
            </div>
          </div>

          <div className="summary-item">
            <Phone className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Teléfono</span>
              <strong className="item-value">{customerData.phone}</strong>
            </div>
          </div>

          {customerData.email && (
            <div className="summary-item">
              <Mail className="item-icon" size={20} />
              <div className="item-content">
                <span className="item-label">Correo electrónico</span>
                <strong className="item-value">{customerData.email}</strong>
              </div>
            </div>
          )}

          <div className="summary-item">
            <Calendar className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Fecha</span>
              <strong className="item-value">{formatDateSpanish(selectedDate)}</strong>
            </div>
          </div>

          <div className="summary-item">
            <Clock className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Hora y duración</span>
              <strong className="item-value">
                {formatTime12h(selectedTime)} <span className="duration-tag">(1 h 30 min)</span>
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <Users className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Personas</span>
              <strong className="item-value">{selectedGuests} personas</strong>
            </div>
          </div>

          <div className="summary-item">
            <Armchair className="item-icon" size={20} />
            <div className="item-content">
              <span className="item-label">Mesa asignada</span>
              <strong className="item-value">
                {tableObj ? tableObj.name : 'Mesa'} <span className="area-tag">({tableObj ? tableObj.area : 'Interior'})</span>
              </strong>
            </div>
          </div>

          {customerData.occasion && customerData.occasion !== 'Ninguna' && (
            <div className="summary-item">
              <PartyPopper className="item-icon" size={20} />
              <div className="item-content">
                <span className="item-label">Ocasión especial</span>
                <strong className="item-value">{customerData.occasion}</strong>
              </div>
            </div>
          )}
        </div>

        {customerData.specialRequest && (
          <div className="summary-request-box">
            <div className="request-label">
              <MessageSquare size={16} />
              <span>Solicitudes especiales:</span>
            </div>
            <p className="request-text">"{customerData.specialRequest}"</p>
          </div>
        )}
      </div>

      <div className="summary-actions">
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onEditStep}
          disabled={isSubmitting}
        >
          <Edit3 size={18} />
          <span>Editar datos</span>
        </button>

        <button 
          type="button" 
          className="btn-copper btn-confirm-lg" 
          onClick={onConfirmReservation}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-icon" />
              <span>Confirmando reserva...</span>
            </>
          ) : (
            <>
              <Check size={20} />
              <span>Confirmar reserva</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
