import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { reservationService, getTodayString, generateTimeSlots, formatTime12h } from '../../services/reservationService';
import { reservationConfig } from '../../config/reservationConfig';
import './ReservationEditor.css';

export const ReservationEditor = ({
  isOpen,
  reservation,
  onClose,
  onReservationUpdated
}) => {
  if (!isOpen || !reservation) return null;

  const [date, setDate] = useState(reservation.reservation.date);
  const [time, setTime] = useState(reservation.reservation.time);
  const [guests, setGuests] = useState(reservation.reservation.guests);
  const [tableId, setTableId] = useState(reservation.reservation.tableId);
  const [name, setName] = useState(reservation.customer.name);
  const [phone, setPhone] = useState(reservation.customer.phone);
  const [email, setEmail] = useState(reservation.customer.email || '');
  const [specialRequest, setSpecialRequest] = useState(reservation.specialRequest || '');
  const [occasion, setOccasion] = useState(reservation.occasion || 'Ninguna');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTables = reservationService.getAvailableTables(
    date,
    time,
    guests,
    reservationConfig.defaultReservationDuration,
    reservation.dbId || reservation.id
  );

  const timeSlots = generateTimeSlots();
  const today = getTodayString();

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Nombre y teléfono son obligatorios.');
      return;
    }

    if (!tableId) {
      setErrorMsg('Debes seleccionar una mesa disponible.');
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await reservationService.updateReservation(reservation.dbId || reservation.id, {
        customer: { name, phone, email },
        reservation: {
          date,
          time,
          guests,
          tableId
        },
        specialRequest,
        occasion
      });

      onReservationUpdated(updated);
      onClose();
    } catch (err) {
      console.error('Error actualizando reserva:', err);
      setErrorMsg(err.message || 'Error al actualizar la reserva en Supabase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lavid-modal-backdrop" onClick={onClose}>
      <div className="lavid-modal-card modal-editor" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="editor-modal-header">
          <h3 className="modal-title">Modificar reserva</h3>
          <span className="editor-code-badge">Código: {reservation.id}</span>
        </div>

        {errorMsg && (
          <div className="editor-error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="editor-form-body">
          <div className="editor-form-grid">
            {/* Date */}
            <div className="editor-field">
              <label>Fecha</label>
              <input 
                type="date" 
                min={today} 
                value={date} 
                onChange={(e) => {
                  setDate(e.target.value);
                  setTableId('');
                }}
                required 
              />
            </div>

            {/* Time */}
            <div className="editor-field">
              <label>Hora</label>
              <select 
                value={time} 
                onChange={(e) => {
                  setTime(e.target.value);
                  setTableId('');
                }}
              >
                {timeSlots.map(ts => (
                  <option key={ts} value={ts}>{formatTime12h(ts)}</option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div className="editor-field">
              <label>Personas</label>
              <select 
                value={guests} 
                onChange={(e) => {
                  setGuests(Number(e.target.value));
                  setTableId('');
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(num => (
                  <option key={num} value={num}>{num} personas</option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="editor-field">
              <label>Mesa asignada</label>
              <select 
                value={tableId} 
                onChange={(e) => setTableId(e.target.value)}
                required
              >
                <option value="">-- Seleccionar mesa --</option>
                {availableTables.map(t => (
                  <option 
                    key={t.id} 
                    value={t.id}
                    disabled={!t.isSelectable}
                  >
                    {t.name} ({t.area} - Cap. {t.capacity}) {!t.isSelectable ? `[${t.reason}]` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="editor-field">
              <label>Nombre del titular *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            {/* Phone */}
            <div className="editor-field">
              <label>Teléfono *</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
            </div>

            {/* Email */}
            <div className="editor-field full-width">
              <label>Correo electrónico (opcional)</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Occasion */}
            <div className="editor-field full-width">
              <label>Ocasión especial</label>
              <select 
                value={occasion} 
                onChange={(e) => setOccasion(e.target.value)}
              >
                {reservationConfig.occasions.map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* Special Request */}
            <div className="editor-field full-width">
              <label>Solicitudes especiales</label>
              <textarea 
                rows={3} 
                value={specialRequest} 
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
            </div>
          </div>

          <div className="editor-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>

            <button type="submit" className="btn-copper" disabled={isSubmitting}>
              <Save size={18} />
              <span>{isSubmitting ? 'Guardando...' : 'Guardar cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
