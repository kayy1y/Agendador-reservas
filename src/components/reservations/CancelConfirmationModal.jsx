import React from 'react';
import { AlertCircle, X, Check } from 'lucide-react';
import './CancelConfirmationModal.css';

export const CancelConfirmationModal = ({
  isOpen,
  reservation,
  onClose,
  onConfirmCancel,
  isSubmitting
}) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="lavid-modal-backdrop" onClick={onClose}>
      <div className="lavid-modal-card modal-cancel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-danger">
          <div className="danger-icon-circle">
            <AlertCircle size={36} />
          </div>
          <h3 className="modal-title">¿Cancelar esta reserva?</h3>
          <p className="modal-subtitle">
            Esta acción liberará la mesa ({reservation.reservation.tableName}) para otros clientes. La reserva quedará registrada como cancelada en el historial.
          </p>
        </div>

        <div className="cancel-details-box">
          <div>
            <span>Código:</span> <strong>{reservation.id}</strong>
          </div>
          <div>
            <span>Cliente:</span> <strong>{reservation.customer.name}</strong>
          </div>
          <div>
            <span>Fecha y Hora:</span> <strong>{reservation.reservation.date} a las {reservation.reservation.time}</strong>
          </div>
        </div>

        <div className="modal-actions-row">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Volver
          </button>

          <button 
            type="button" 
            className="btn-danger" 
            onClick={onConfirmCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cancelando...' : 'Sí, cancelar reserva'}
          </button>
        </div>
      </div>
    </div>
  );
};
