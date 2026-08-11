import { restaurantTables } from '../data/tables';
import { reservationConfig } from '../config/reservationConfig';

const STORAGE_KEY = 'LAVID_RESERVATIONS_STORAGE_V1';

// Helper to get formatted today string (YYYY-MM-DD) in local timezone
export const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date nicely (e.g., Sábado 15 de agosto de 2026)
export const formatDateSpanish = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('es-CR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Generate random reservation code: LAVID-RSV-A82F91
const generateReservationCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `LAVID-RSV-${code}`;
};

// Phone normalization (removes spaces, dashes, country code +506 for comparison)
const normalizePhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/\D/g, '').replace(/^506/, '');
};

// Initial Seed Data if LocalStorage is empty
const getInitialSeedReservations = () => {
  const today = getTodayString();
  return [
    {
      id: 'LAVID-RSV-E89K21',
      customer: {
        name: 'Carlos Mendoza',
        phone: '8888-9999',
        email: 'carlos.mendoza@email.com'
      },
      reservation: {
        date: today,
        time: '19:30',
        durationMinutes: 90,
        guests: 4,
        tableId: 'mesa-03',
        tableName: 'Mesa 3',
        area: 'Interior'
      },
      specialRequest: 'Cena de aniversario de bodas. Por favor mesa tranquila.',
      occasion: 'Aniversario',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'LAVID-RSV-M41P89',
      customer: {
        name: 'Sofía Jiménez',
        phone: '8701-2345',
        email: 'sofia.j@email.com'
      },
      reservation: {
        date: today,
        time: '20:00',
        durationMinutes: 90,
        guests: 2,
        tableId: 'mesa-06',
        tableName: 'Mesa 6',
        area: 'Terraza'
      },
      specialRequest: 'Celebración de cumpleaños. Requiere silla cómoda.',
      occasion: 'Cumpleaños',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];
};

export const reservationService = {
  // Get all stored reservations
  getReservations: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        const initial = getInitialSeedReservations();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading reservations from localStorage:', error);
      return getInitialSeedReservations();
    }
  },

  // Save all reservations to localStorage
  saveReservations: (reservations) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    } catch (error) {
      console.error('Error saving reservations to localStorage:', error);
    }
  },

  // Lookup reservation by Code + Phone
  getReservationByCodeAndPhone: (code, phone) => {
    if (!code || !phone) return null;
    const reservations = reservationService.getReservations();
    const cleanCode = code.trim().toUpperCase();
    const cleanPhone = normalizePhone(phone);

    return reservations.find(r => {
      const codeMatches = r.id.toUpperCase() === cleanCode;
      const phoneMatches = normalizePhone(r.customer.phone) === cleanPhone;
      return codeMatches && phoneMatches;
    }) || null;
  },

  // Check if a specific table is available at date & time
  checkTableAvailability: (tableId, dateStr, timeStr, durationMinutes = 90, excludeReservationId = null) => {
    if (!tableId || !dateStr || !timeStr) return false;

    const reservations = reservationService.getReservations();
    
    // Calculate new reservation start and end timestamps in milliseconds
    const [hours, minutes] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);
    const newStart = new Date(year, month - 1, day, hours, minutes).getTime();
    const newEnd = newStart + durationMinutes * 60 * 1000;

    for (const r of reservations) {
      // Ignore cancelled reservations and excluded ID (when modifying)
      if (r.status === 'cancelled') continue;
      if (excludeReservationId && r.id === excludeReservationId) continue;
      if (r.reservation.tableId !== tableId) continue;
      if (r.reservation.date !== dateStr) continue;

      const [rHours, rMinutes] = r.reservation.time.split(':').map(Number);
      const [rYear, rMonth, rDay] = r.reservation.date.split('-').map(Number);
      const exStart = new Date(rYear, rMonth - 1, rDay, rHours, rMinutes).getTime();
      const exDuration = r.reservation.durationMinutes || reservationConfig.defaultReservationDuration;
      const exEnd = exStart + exDuration * 60 * 1000;

      // Check overlap: max(start1, start2) < min(end1, end2)
      if (Math.max(newStart, exStart) < Math.min(newEnd, exEnd)) {
        return false; // Conflict found
      }
    }

    return true; // Available
  },

  // Get status of all tables for a given date, time, and guest count
  getAvailableTables: (dateStr, timeStr, guests, durationMinutes = 90, excludeReservationId = null) => {
    return restaurantTables.map(table => {
      const isCapacityEnough = table.capacity >= guests;
      const isAvailable = reservationService.checkTableAvailability(
        table.id,
        dateStr,
        timeStr,
        durationMinutes,
        excludeReservationId
      );

      let status = 'available';
      let reason = null;

      if (!isCapacityEnough) {
        status = 'disabled_capacity';
        reason = `Capacidad máxima (${table.capacity} personas)`;
      } else if (!isAvailable) {
        status = 'disabled_occupied';
        reason = 'Mesa ocupada en este horario';
      }

      return {
        ...table,
        status,
        reason,
        isSelectable: status === 'available'
      };
    });
  },

  // Auto-select best table (smallest table with capacity >= guests that is free)
  autoSelectBestTable: (dateStr, timeStr, guests, durationMinutes = 90, excludeReservationId = null) => {
    const tables = reservationService.getAvailableTables(
      dateStr,
      timeStr,
      guests,
      durationMinutes,
      excludeReservationId
    );
    
    // Filter available tables
    const selectable = tables.filter(t => t.isSelectable);
    if (selectable.length === 0) return null;

    // Sort by capacity ascending to pick smallest fitting table
    selectable.sort((a, b) => a.capacity - b.capacity);
    return selectable[0];
  },

  // Suggest alternate times if chosen slot is full
  getSuggestedTimes: (dateStr, targetTimeStr, guests, durationMinutes = 90) => {
    const timeSlots = generateTimeSlots();
    const suggestions = [];

    const [tH, tM] = targetTimeStr.split(':').map(Number);
    const targetMinutes = tH * 60 + tM;

    for (const slot of timeSlots) {
      if (slot === targetTimeStr) continue;

      const [sH, sM] = slot.split(':').map(Number);
      const slotMinutes = sH * 60 + sM;

      // Only check slots within 2 hours of target time
      if (Math.abs(slotMinutes - targetMinutes) <= 120) {
        const bestTable = reservationService.autoSelectBestTable(dateStr, slot, guests, durationMinutes);
        if (bestTable) {
          suggestions.push({
            time: slot,
            diff: Math.abs(slotMinutes - targetMinutes),
            table: bestTable
          });
        }
      }
    }

    suggestions.sort((a, b) => a.diff - b.diff);
    return suggestions.slice(0, 4).map(s => s.time);
  },

  // Create new reservation
  createReservation: (data) => {
    const { customer, reservation, specialRequest = '', occasion = 'Ninguna' } = data;

    // Verify availability first
    const isFree = reservationService.checkTableAvailability(
      reservation.tableId,
      reservation.date,
      reservation.time,
      reservation.durationMinutes || reservationConfig.defaultReservationDuration
    );

    if (!isFree) {
      throw new Error('La mesa seleccionada ya no se encuentra disponible para este horario.');
    }

    const tableObj = restaurantTables.find(t => t.id === reservation.tableId);
    const newId = generateReservationCode();
    const nowIso = new Date().toISOString();

    const newReservation = {
      id: newId,
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: (customer.email || '').trim()
      },
      reservation: {
        date: reservation.date,
        time: reservation.time,
        durationMinutes: reservation.durationMinutes || reservationConfig.defaultReservationDuration,
        guests: Number(reservation.guests),
        tableId: reservation.tableId,
        tableName: tableObj ? tableObj.name : reservation.tableName,
        area: tableObj ? tableObj.area : reservation.area
      },
      specialRequest: specialRequest.trim(),
      occasion: occasion,
      status: 'confirmed',
      createdAt: nowIso,
      updatedAt: nowIso
    };

    const reservations = reservationService.getReservations();
    reservations.unshift(newReservation);
    reservationService.saveReservations(reservations);

    return newReservation;
  },

  // Update existing reservation
  updateReservation: (id, updatedData) => {
    const reservations = reservationService.getReservations();
    const index = reservations.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('No se encontró la reserva a actualizar.');
    }

    const existing = reservations[index];
    const newResData = updatedData.reservation || existing.reservation;

    // Check availability ignoring current reservation ID
    const isFree = reservationService.checkTableAvailability(
      newResData.tableId,
      newResData.date,
      newResData.time,
      newResData.durationMinutes || reservationConfig.defaultReservationDuration,
      id
    );

    if (!isFree) {
      throw new Error('La mesa seleccionada no está disponible en la nueva fecha u hora especificada.');
    }

    const tableObj = restaurantTables.find(t => t.id === newResData.tableId);
    const nowIso = new Date().toISOString();

    const updatedReservation = {
      ...existing,
      customer: {
        name: (updatedData.customer?.name || existing.customer.name).trim(),
        phone: (updatedData.customer?.phone || existing.customer.phone).trim(),
        email: (updatedData.customer?.email !== undefined ? updatedData.customer.email : existing.customer.email).trim()
      },
      reservation: {
        date: newResData.date,
        time: newResData.time,
        durationMinutes: newResData.durationMinutes || reservationConfig.defaultReservationDuration,
        guests: Number(newResData.guests),
        tableId: newResData.tableId,
        tableName: tableObj ? tableObj.name : newResData.tableName,
        area: tableObj ? tableObj.area : newResData.area
      },
      specialRequest: (updatedData.specialRequest !== undefined ? updatedData.specialRequest : existing.specialRequest).trim(),
      occasion: updatedData.occasion || existing.occasion,
      updatedAt: nowIso
    };

    reservations[index] = updatedReservation;
    reservationService.saveReservations(reservations);

    return updatedReservation;
  },

  // Cancel reservation (sets status to cancelled, does not delete)
  cancelReservation: (id) => {
    const reservations = reservationService.getReservations();
    const index = reservations.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('No se encontró la reserva.');
    }

    const nowIso = new Date().toISOString();
    reservations[index] = {
      ...reservations[index],
      status: 'cancelled',
      updatedAt: nowIso
    };

    reservationService.saveReservations(reservations);
    return reservations[index];
  }
};

// Generate time slots based on config
export const generateTimeSlots = () => {
  const slots = [];
  const [startH, startM] = reservationConfig.openingTime.split(':').map(Number);
  const [endH, endM] = reservationConfig.closingTime.split(':').map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes <= endMinutes) {
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    slots.push(timeStr);
    currentMinutes += reservationConfig.slotIntervalMinutes;
  }

  return slots;
};

// Format time 24h to 12h display (e.g. 19:30 -> 7:30 PM)
export const formatTime12h = (time24) => {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 becomes 12
  return `${h}:${mStr} ${ampm}`;
};
