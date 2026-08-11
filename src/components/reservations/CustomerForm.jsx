import React from 'react';
import { User, Phone, Mail, MessageSquare, PartyPopper } from 'lucide-react';
import { reservationConfig } from '../../config/reservationConfig';
import './CustomerForm.css';

export const CustomerForm = ({ customerData, onChangeCustomer, errors = {} }) => {
  const handleChange = (field, value) => {
    onChangeCustomer({
      ...customerData,
      [field]: value
    });
  };

  return (
    <div className="customer-form-wrapper">
      <div className="selector-header">
        <div className="selector-title">
          <User size={20} className="selector-icon" />
          <span>Datos de contacto del cliente</span>
        </div>
        <span className="selector-hint">
          Los campos marcados con (*) son obligatorios
        </span>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name-input" className="form-label">
            <span>Nombre completo *</span>
          </label>
          <div className="input-with-icon">
            <User size={18} className="field-icon" />
            <input
              id="name-input"
              type="text"
              placeholder="Ej. Juan Pérez González"
              value={customerData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'has-error' : ''}
              required
            />
          </div>
          {errors.name && <span className="field-error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone-input" className="form-label">
            <span>Teléfono de contacto *</span>
          </label>
          <div className="input-with-icon">
            <Phone size={18} className="field-icon" />
            <input
              id="phone-input"
              type="tel"
              placeholder="Ej. 8888-8888 o +506 8888 8888"
              value={customerData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'has-error' : ''}
              required
            />
          </div>
          {errors.phone && <span className="field-error-text">{errors.phone}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="email-input" className="form-label">
            <span>Correo electrónico (opcional)</span>
          </label>
          <div className="input-with-icon">
            <Mail size={18} className="field-icon" />
            <input
              id="email-input"
              type="email"
              placeholder="Ej. cliente@ejemplo.com"
              value={customerData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <span className="field-hint">Para recibir confirmación y recordatorios por correo</span>
        </div>

        <div className="form-group full-width">
          <label htmlFor="occasion-select" className="form-label">
            <span>Ocasión especial (opcional)</span>
          </label>
          <div className="input-with-icon">
            <PartyPopper size={18} className="field-icon" />
            <select
              id="occasion-select"
              value={customerData.occasion || 'Ninguna'}
              onChange={(e) => handleChange('occasion', e.target.value)}
              className="lavid-select"
            >
              {reservationConfig.occasions.map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="request-textarea" className="form-label">
            <span>Solicitudes especiales (opcional)</span>
          </label>
          <div className="textarea-with-icon">
            <textarea
              id="request-textarea"
              rows={4}
              placeholder="Indícanos si necesitas una silla para bebé, accesibilidad especial, celebras una ocasión o tienes alguna solicitud adicional."
              value={customerData.specialRequest || ''}
              onChange={(e) => handleChange('specialRequest', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
