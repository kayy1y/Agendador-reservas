import React, { useState } from 'react';
import { Calendar, Users, Armchair, User, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { DateSelector } from './DateSelector';
import { GuestSelector } from './GuestSelector';
import { TimeSelector } from './TimeSelector';
import { TableSelector } from './TableSelector';
import { CustomerForm } from './CustomerForm';
import { ReservationSummary } from './ReservationSummary';
import { ReservationConfirmation } from './ReservationConfirmation';
import { getTodayString, reservationService } from '../../services/reservationService';
import { restaurantImages } from '../../assets/restaurant/restaurantAssets';
import './ReservationWizard.css';

export const ReservationWizard = ({ onOpenLookup }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [selectedTableId, setSelectedTableId] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequest: '',
    occasion: 'Ninguna'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [stepError, setStepError] = useState('');

  const steps = [
    { id: 1, label: 'Fecha & Personas', icon: Calendar },
    { id: 2, label: 'Hora & Mesa', icon: Armchair },
    { id: 3, label: 'Tus Datos', icon: User },
    { id: 4, label: 'Confirmación', icon: CheckCircle2 }
  ];

  const handleNextStep = () => {
    setStepError('');
    if (currentStep === 1) {
      if (!selectedDate) {
        setStepError('Por favor selecciona la fecha de tu reserva.');
        return;
      }
      if (!selectedGuests || selectedGuests < 1) {
        setStepError('Por favor indica la cantidad de personas.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedTime) {
        setStepError('Por favor selecciona una hora disponible.');
        return;
      }
      if (!selectedTableId) {
        setStepError('Por favor selecciona una mesa disponible o utiliza la asignación automática.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const errors = {};
      if (!customerData.name || !customerData.name.trim()) {
        errors.name = 'Ingresa tu nombre completo.';
      }
      if (!customerData.phone || !customerData.phone.trim()) {
        errors.phone = 'Ingresa un teléfono válido para contactarte.';
      } else if (customerData.phone.replace(/\D/g, '').length < 8) {
        errors.phone = 'Ingresa un número telefónico de al menos 8 dígitos.';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setStepError('Por favor completa los campos obligatorios.');
        return;
      }

      setFormErrors({});
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalConfirm = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStepError('');

    try {
      // Create reservation asynchronously in Supabase
      const created = await reservationService.createReservation({
        customer: customerData,
        reservation: {
          date: selectedDate,
          time: selectedTime,
          guests: selectedGuests,
          tableId: selectedTableId
        },
        specialRequest: customerData.specialRequest,
        occasion: customerData.occasion
      });

      setConfirmedReservation(created);
      setCurrentStep(5);
    } catch (err) {
      console.error('Error al confirmar reserva:', err);
      setStepError(err.message || 'Ocurrió un error al procesar tu reserva en Supabase. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetWizard = () => {
    setCurrentStep(1);
    setSelectedDate(getTodayString());
    setSelectedGuests(2);
    setSelectedTime('19:00');
    setSelectedTableId('');
    setCustomerData({
      name: '',
      phone: '',
      email: '',
      specialRequest: '',
      occasion: 'Ninguna'
    });
    setConfirmedReservation(null);
    setFormErrors({});
    setStepError('');
  };

  return (
    <section id="reservar" className="reservations-wizard-section">
      {/* User photo background overlay for the reservation section */}
      <div 
        className="wizard-section-bg" 
        style={{ backgroundImage: `url(${restaurantImages.userPhoto2 || restaurantImages.heroBg})` }}
      />
      <div className="wizard-section-overlay" />

      <div className="lavid-container wizard-relative">
        <div className="wizard-intro">
          <span className="section-tag section-tag-light">Sistema de reservas online</span>
          <h2 className="section-title section-title-light">Asegura tu mesa en La Vid</h2>
          <p className="section-subtitle section-subtitle-light">
            Selecciona el día, horario y tu mesa preferida. El proceso es rápido, seguro y garantizado.
          </p>
        </div>

        <div className="wizard-card lavid-card">
          {/* Stepper Navigation Bar */}
          {currentStep <= 4 && (
            <div className="stepper-bar">
              {steps.map((s, idx) => {
                const isCompleted = currentStep > s.id;
                const isActive = currentStep === s.id;

                return (
                  <React.Fragment key={s.id}>
                    <div 
                      className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => isCompleted && setCurrentStep(s.id)}
                    >
                      <div className="step-badge">
                        {isCompleted ? <CheckCircle2 size={16} /> : <span>{s.id}</span>}
                      </div>
                      <span className="step-label">{s.label}</span>
                    </div>
                    {idx < steps.length - 1 && <div className="step-connector" />}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Inline Step Error Toast/Banner */}
          {stepError && (
            <div className="wizard-error-banner">
              <AlertCircle size={20} />
              <span>{stepError}</span>
            </div>
          )}

          {/* Step Contents */}
          <div className="step-content-container">
            {currentStep === 1 && (
              <div className="wizard-step-fade">
                <DateSelector
                  selectedDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    setStepError('');
                  }}
                />
                
                <div className="step-divider" />
                
                <GuestSelector
                  selectedGuests={selectedGuests}
                  onSelectGuests={(guests) => {
                    setSelectedGuests(guests);
                    setSelectedTableId('');
                    setStepError('');
                  }}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="wizard-step-fade">
                <TimeSelector
                  selectedDate={selectedDate}
                  selectedGuests={selectedGuests}
                  selectedTime={selectedTime}
                  onSelectTime={(time) => {
                    setSelectedTime(time);
                    setSelectedTableId('');
                    setStepError('');
                  }}
                />

                <div className="step-divider" />

                <TableSelector
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedGuests={selectedGuests}
                  selectedTableId={selectedTableId}
                  onSelectTable={(tableId) => {
                    setSelectedTableId(tableId);
                    setStepError('');
                  }}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="wizard-step-fade">
                <CustomerForm
                  customerData={customerData}
                  onChangeCustomer={(data) => {
                    setCustomerData(data);
                    setStepError('');
                  }}
                  errors={formErrors}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="wizard-step-fade">
                <ReservationSummary
                  bookingData={{
                    selectedDate,
                    selectedTime,
                    selectedGuests,
                    selectedTableId,
                    customerData
                  }}
                  onEditStep={() => setCurrentStep(1)}
                  onConfirmReservation={handleFinalConfirm}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}

            {currentStep === 5 && confirmedReservation && (
              <div className="wizard-step-fade">
                <ReservationConfirmation
                  reservation={confirmedReservation}
                  onNewReservation={handleResetWizard}
                  onOpenLookup={onOpenLookup}
                />
              </div>
            )}
          </div>

          {/* Stepper Footer Controls */}
          {currentStep < 4 && (
            <div className="wizard-controls">
              {currentStep > 1 ? (
                <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                  <ChevronLeft size={18} />
                  <span>Atrás</span>
                </button>
              ) : <div />}

              <button type="button" className="btn-copper" onClick={handleNextStep}>
                <span>Continuar</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
