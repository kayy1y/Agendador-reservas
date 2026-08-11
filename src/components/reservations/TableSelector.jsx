import React, { useState } from 'react';
import { Armchair, Users, Sparkles, MapPin, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { reservationService } from '../../services/reservationService';
import { reservationConfig } from '../../config/reservationConfig';
import './TableSelector.css';

export const TableSelector = ({
  selectedDate,
  selectedTime,
  selectedGuests,
  selectedTableId,
  onSelectTable,
  excludeReservationId = null
}) => {
  const [areaFilter, setAreaFilter] = useState('Todos');

  // Get status for all tables from reservation service
  const tablesWithStatus = reservationService.getAvailableTables(
    selectedDate,
    selectedTime,
    selectedGuests,
    reservationConfig.defaultReservationDuration,
    excludeReservationId
  );

  const areas = ['Todos', 'Interior', 'Terraza', 'Salón VIP'];

  const filteredTables = tablesWithStatus.filter(t => {
    if (areaFilter === 'Todos') return true;
    return t.area === areaFilter;
  });

  // Handle Automatic Best Table Selection
  const handleAutoSelect = () => {
    const bestTable = reservationService.autoSelectBestTable(
      selectedDate,
      selectedTime,
      selectedGuests,
      reservationConfig.defaultReservationDuration,
      excludeReservationId
    );

    if (bestTable) {
      onSelectTable(bestTable.id);
    }
  };

  const selectedTableObj = tablesWithStatus.find(t => t.id === selectedTableId);

  return (
    <div className="table-selector-wrapper">
      <div className="selector-header">
        <div className="selector-title">
          <Armchair size={20} className="selector-icon" />
          <span>Selecciona tu mesa</span>
        </div>
        
        <button
          type="button"
          className="btn-auto-select"
          onClick={handleAutoSelect}
          title="Asignar automáticamente la mejor mesa disponible"
        >
          <Sparkles size={16} />
          <span>Elegir la mejor mesa automáticamente</span>
        </button>
      </div>

      <div className="area-tabs-row">
        <span className="area-label">Filtrar por zona:</span>
        <div className="area-buttons">
          {areas.map(area => (
            <button
              key={area}
              type="button"
              className={`area-tab-btn ${areaFilter === area ? 'active' : ''}`}
              onClick={() => setAreaFilter(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="tables-cards-grid">
        {filteredTables.map((table) => {
          const isSelected = selectedTableId === table.id;
          const isSelectable = table.isSelectable;
          const isCapacityDisabled = table.status === 'disabled_capacity';
          const isOccupiedDisabled = table.status === 'disabled_occupied';

          return (
            <div
              key={table.id}
              className={`table-card ${isSelected ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''}`}
              onClick={() => isSelectable && onSelectTable(table.id)}
              role="button"
              tabIndex={isSelectable ? 0 : -1}
              aria-disabled={!isSelectable}
            >
              <div className="table-card-header">
                <span className={`area-badge area-${table.area.toLowerCase().replace(/\s+/g, '-')}`}>
                  <MapPin size={12} />
                  <span>{table.area}</span>
                </span>
                
                {isSelected && (
                  <span className="selected-indicator">
                    <CheckCircle2 size={16} />
                    <span>Seleccionada</span>
                  </span>
                )}
              </div>

              <h4 className="table-name">{table.name}</h4>
              
              <div className="table-capacity">
                <Users size={16} />
                <span>Capacidad hasta {table.capacity} personas</span>
              </div>

              <p className="table-description">{table.description}</p>

              <div className="table-card-footer">
                {isSelectable ? (
                  <span className="table-status-tag status-available">
                    Disponible
                  </span>
                ) : isCapacityDisabled ? (
                  <span className="table-status-tag status-insufficient">
                    Capacidad insuficiente
                  </span>
                ) : (
                  <span className="table-status-tag status-occupied">
                    Mesa ocupada
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTableObj && (
        <div className="selected-table-banner">
          <CheckCircle2 size={18} />
          <div>
            <strong>Mesa seleccionada: {selectedTableObj.name}</strong> ({selectedTableObj.area} - Capacidad {selectedTableObj.capacity} personas)
          </div>
        </div>
      )}
    </div>
  );
};
