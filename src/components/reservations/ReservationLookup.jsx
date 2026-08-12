import React, { useState } from 'react';
import { 
  Search, 
  X, 
  KeyRound, 
  Phone, 
  Calendar, 
  Clock, 
  Users, 
  Armchair, 
  User, 
  Edit3, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  PartyPopper,
  MessageSquare
} from 'lucide-react';
import { reservationService, formatDateSpanish, formatTime12h } from '../../services/reservationService';
import { ReservationEditor } from './ReservationEditor';
import { CancelConfirmationModal } from './CancelConfirmationModal';
import './ReservationLookup.css';

export const ReservationLookup = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [foundReservation, setFoundReservation] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Modals inside lookup
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    setActionSuccessMsg('');

    if (!code.trim() || !phone.trim()) {
      setSearchError('Ingresa tanto el código de reserva como tu número de teléfono.');
      return;
    }

    setIsSearching(true);
    try {
      // Lookup from Supabase database
      const result = await reservationService.getReservationByCodeAndPhoneAsync(code, phone);
      setFoundReservation(result);
      setHasSearched(true);
    } catch (err) {
      setSearchError('Error al buscar la reserva en Supabase. Intenta nuevamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetSearch = () => {
    setCode('');
    setPhone('');
    setFoundReservation(null);
    setHasSearched(false);
    setSearchError('');
    setActionSuccessMsg('');
  };

  const handleConfirmCancel = async () => {
    if (!foundReservation) return;
    try {
      const targetId = foundReservation.dbId || foundReservation.id;
      const cancelled = await reservationService.cancelReservation(targetId);
      setFoundReservation(cancelled);
      setIsCancelModalOpen(false);
      setActionSuccessMsg('La reserva ha sido cancelada con éxito en la base de datos. La mesa ha quedado liberada.');
    } catch (err) {
      setSearchError(err.message || 'Error al cancelar la reserva en Supabase.');
    }
  };

  const handleReservationUpdated = (updated) => {
    setFoundReservation(updated);
    setActionSuccessMsg('Reserva actualizada correctamente en Supabase.');
  };

  return (
    <div className="lavid-modal-backdrop" onClick={onClose}>
      <div className="lavid-modal-card modal-lookup" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="lookup-header">
          <div className="lookup-icon-circle">
            <Search size={28} />
          </div>
          <h3 className="modal-title">Consultar mi reserva</h3>
          <p className="modal-subtitle">
            Ingresa tu código de reserva y teléfono de contacto para ver, modificar o cancelar tu reserva.
          </p>
        </div>

        {actionSuccessMsg && (
          <div className="lookup-success-banner">
            <CheckCircle2 size={18} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {!hasSearched ? (
          <form onSubmit={handleSearch} className="lookup-form">
            {searchError && (
              <div className="lookup-error-banner">
                <AlertCircle size={18} />
                <span>{searchError}</span>
              </div>
            )}

            <div className="lookup-form-group">
              <label htmlFor="lookup-code-input">Código de reserva *</label>
              <div className="input-with-icon">
                <KeyRound size={18} className="field-icon" />
                <input
                  id="lookup-code-input"
                  type="text"
                  placeholder="Ej. LAVID-RSV-A82F91"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="lookup-form-group">
              <label htmlFor="lookup-phone-input">Teléfono registrado *</label>
              <div className="input-with-icon">
                <Phone size={18} className="field-icon" />
                <input
                  id="lookup-phone-input"
                  type="tel"
                  placeholder="Ej. 8888-8888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <span className="field-hint">Utilizado por seguridad para validar el titular de la reserva.</span>
            </div>

            <div className="lookup-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              <button type="submit" className="btn-copper" disabled={isSearching}>
                <Search size={18} />
                <span>{isSearching ? 'Buscando en Supabase...' : 'Buscar reserva'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="lookup-result-wrapper">
            {foundReservation ? (
              <div className="found-card">
                <div className="found-card-header">
                  <div className="found-title-col">
                    <span className="found-code">{foundReservation.id}</span>
                    <span className="found-created">
                      Creada el {new Date(foundReservation.createdAt).toLocaleDateString('es-CR')}
                    </span>
                  </div>

                  <span className={`status-pill status-${foundReservation.status}`}>
                    {foundReservation.status === 'confirmed' ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Confirmada</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={14} />
                        <span>Cancelada</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="found-details-grid">
                  <div className="found-detail-item">
                    <User size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Cliente</span>
                      <strong>{foundReservation.customer.name}</strong>
                    </div>
                  </div>

                  <div className="found-detail-item">
                    <Phone size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Teléfono</span>
                      <strong>{foundReservation.customer.phone}</strong>
                    </div>
                  </div>

                  <div className="found-detail-item">
                    <Calendar size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Fecha</span>
                      <strong>{formatDateSpanish(foundReservation.reservation.date)}</strong>
                    </div>
                  </div>

                  <div className="found-detail-item">
                    <Clock size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Hora</span>
                      <strong>{formatTime12h(foundReservation.reservation.time)}</strong>
                    </div>
                  </div>

                  <div className="found-detail-item">
                    <Users size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Personas</span>
                      <strong>{foundReservation.reservation.guests} personas</strong>
                    </div>
                  </div>

                  <div className="found-detail-item">
                    <Armchair size={16} className="detail-icon" />
                    <div>
                      <span className="detail-label">Mesa</span>
                      <strong>{foundReservation.reservation.tableName} ({foundReservation.reservation.area})</strong>
                    </div>
                  </div>

                  {foundReservation.occasion && foundReservation.occasion !== 'Ninguna' && (
                    <div className="found-detail-item full-span">
                      <PartyPopper size={16} className="detail-icon" />
                      <div>
                        <span className="detail-label">Ocasión</span>
                        <strong>{foundReservation.occasion}</strong>
                      </div>
                    </div>
                  )}

                  {foundReservation.specialRequest && (
                    <div className="found-detail-item full-span">
                      <MessageSquare size={16} className="detail-icon" />
                      <div>
                        <span className="detail-label">Solicitud especial</span>
                        <strong>"{foundReservation.specialRequest}"</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="found-card-actions">
                  <button type="button" className="btn-secondary" onClick={handleResetSearch}>
                    <Search size={16} />
                    <span>Otra búsqueda</span>
                  </button>

                  {foundReservation.status === 'confirmed' && (
                    <>
                      <button 
                        type="button" 
                        className="btn-danger" 
                        onClick={() => setIsCancelModalOpen(true)}
                      >
                        <XCircle size={16} />
                        <span>Cancelar reserva</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-copper" 
                        onClick={() => setIsEditorOpen(true)}
                      >
                        <Edit3 size={16} />
                        <span>Modificar datos</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="not-found-card">
                <AlertCircle size={44} className="not-found-icon" />
                <h4>No encontramos esta reserva</h4>
                <p>
                  No existe ninguna reserva activa con el código <strong>"{code}"</strong> y el número <strong>"{phone}"</strong>.
                </p>
                <button type="button" className="btn-copper" onClick={handleResetSearch}>
                  Intentar nuevamente
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {foundReservation && (
        <ReservationEditor
          isOpen={isEditorOpen}
          reservation={foundReservation}
          onClose={() => setIsEditorOpen(false)}
          onReservationUpdated={handleReservationUpdated}
        />
      )}

      {/* Cancel Modal */}
      {foundReservation && (
        <CancelConfirmationModal
          isOpen={isCancelModalOpen}
          reservation={foundReservation}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </div>
  );
};
