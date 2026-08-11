import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Users, 
  Armchair, 
  User, 
  Phone, 
  Search, 
  PlusCircle, 
  Printer 
} from 'lucide-react';
import { formatDateSpanish, formatTime12h } from '../../services/reservationService';
import { restaurantConfig } from '../../config/restaurantConfig';
import './ReservationConfirmation.css';

export const ReservationConfirmation = ({
  reservation,
  onNewReservation,
  onOpenLookup
}) => {
  const [copied, setCopied] = useState(false);

  if (!reservation) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="confirmation-card-wrapper">
      <div className="confirmation-hero">
        <div className="check-icon-circle">
          <CheckCircle2 size={56} className="check-svg" />
        </div>
        
        <h2 className="confirmation-title">¡Reserva confirmada!</h2>
        <p className="confirmation-subtitle">Tu mesa está reservada en {restaurantConfig.name}.</p>
      </div>

      <div className="code-display-box">
        <span className="code-label">Código de reserva único</span>
        <div className="code-row">
          <strong className="code-value">{reservation.id}</strong>
          <button 
            type="button" 
            className="btn-copy-code"
            onClick={handleCopyCode}
            title="Copiar código al portapapeles"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
        <span className="code-hint">Guarda este código junto a tu número de teléfono para consultar o modificar tu reserva más adelante.</span>
      </div>

      <div className="confirmation-details-card">
        <h4 className="details-card-title">Detalles de la reserva</h4>
        
        <div className="details-grid">
          <div className="detail-cell">
            <Calendar size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Fecha</span>
              <strong>{formatDateSpanish(reservation.reservation.date)}</strong>
            </div>
          </div>

          <div className="detail-cell">
            <Clock size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Hora y Estancia</span>
              <strong>{formatTime12h(reservation.reservation.time)} (90 min)</strong>
            </div>
          </div>

          <div className="detail-cell">
            <Users size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Personas</span>
              <strong>{reservation.reservation.guests} personas</strong>
            </div>
          </div>

          <div className="detail-cell">
            <Armchair size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Mesa</span>
              <strong>{reservation.reservation.tableName} ({reservation.reservation.area})</strong>
            </div>
          </div>

          <div className="detail-cell">
            <User size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Titular</span>
              <strong>{reservation.customer.name}</strong>
            </div>
          </div>

          <div className="detail-cell">
            <Phone size={18} className="cell-icon" />
            <div>
              <span className="cell-label">Teléfono</span>
              <strong>{reservation.customer.phone}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button type="button" className="btn-secondary" onClick={handlePrint}>
          <Printer size={18} />
          <span>Imprimir / Guardar</span>
        </button>

        <button type="button" className="btn-secondary" onClick={onOpenLookup}>
          <Search size={18} />
          <span>Consultar reservas</span>
        </button>

        <button type="button" className="btn-copper" onClick={onNewReservation}>
          <PlusCircle size={18} />
          <span>Nueva reserva</span>
        </button>
      </div>
    </div>
  );
};
