import { restaurantTables } from '../data/tables';
import { reservationConfig } from '../config/reservationConfig';
import { supabase } from '../lib/supabaseClient';

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

// Generate random reservation display code: LAVID-RSV-A82F91
export const generateReservationCode = () => {
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

// Map frontend data to Supabase public.reservas table columns
export const mapFrontendToSupabasePayload = (data) => {
  const { customer, reservation, specialRequest = '', occasion = 'Ninguna' } = data;

  const dateStr = reservation.date;
  const timeStr = reservation.time;
  const durationMinutes = Number(reservation.durationMinutes || reservationConfig.defaultReservationDuration || 90);

  // Build ISO timestamp in local Costa Rica timezone offset (-06:00)
  const startIso = new Date(`${dateStr}T${timeStr}:00-06:00`).toISOString();
  const endIso = new Date(new Date(startIso).getTime() + durationMinutes * 60 * 1000).toISOString();

  let obs = specialRequest ? specialRequest.trim() : '';
  if (occasion && occasion !== 'Ninguna') {
    obs = obs ? `[Ocasión: ${occasion}] ${obs}` : `Ocasión: ${occasion}`;
  }

  // Normalize table ID to DB format (e.g. "T-01")
  let tableId = reservation.tableId;
  if (!tableId || !tableId.startsWith('T-')) {
    const numMatch = tableId ? tableId.match(/\d+/) : null;
    if (numMatch) {
      const numStr = String(numMatch[0]).padStart(2, '0');
      tableId = `T-${numStr}`;
    } else {
      tableId = 'T-01';
    }
  }

  return {
    mesa_id: tableId,
    nombre_cliente: customer.name.trim(),
    telefono_cliente: customer.phone ? customer.phone.trim() : null,
    email_cliente: customer.email ? customer.email.trim() : null,
    cantidad_personas: Number(reservation.guests || 2),
    fecha_hora_inicio: startIso,
    fecha_hora_fin: endIso,
    estado: 'CONFIRMADA',
    observaciones: obs || null,
    origen: 'WEB'
  };
};

// Map Supabase public.reservas row back to frontend reservation format
export const mapSupabaseRowToFrontend = (row) => {
  if (!row) return null;

  const startDate = new Date(row.fecha_hora_inicio);
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const hours = String(startDate.getHours()).padStart(2, '0');
  const minutes = String(startDate.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  let durationMinutes = 90;
  if (row.fecha_hora_fin) {
    const endDate = new Date(row.fecha_hora_fin);
    durationMinutes = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
  }

  const tableObj = restaurantTables.find(t => t.id === row.mesa_id);

  // Derive display code from UUID prefix (e.g. LAVID-RSV-A82F91)
  const shortUuid = (row.id || '').split('-')[0].toUpperCase();
  const displayCode = `LAVID-RSV-${shortUuid || '000000'}`;

  const isCancelled = row.estado === 'CANCELADA' || row.estado === 'cancelled';

  return {
    id: displayCode,
    dbId: row.id,
    customer: {
      name: row.nombre_cliente || '',
      phone: row.telefono_cliente || '',
      email: row.email_cliente || ''
    },
    reservation: {
      date: dateStr,
      time: timeStr,
      durationMinutes,
      guests: row.cantidad_personas || 2,
      tableId: row.mesa_id,
      tableName: tableObj ? tableObj.name : `Mesa ${row.mesa_id}`,
      area: tableObj ? tableObj.area : 'Salón Principal'
    },
    specialRequest: row.observaciones || '',
    occasion: 'General',
    status: isCancelled ? 'cancelled' : 'confirmed',
    createdAt: row.creado_en || new Date().toISOString(),
    updatedAt: row.actualizado_en || new Date().toISOString()
  };
};

export const reservationService = {
  // Get all stored local reservations
  getReservations: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Error cargando reservas locales:', error);
      return [];
    }
  },

  // Save reservations to local cache
  saveReservations: (reservations) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  },

  // Check table availability querying REAL Supabase database
  checkTableAvailabilityAsync: async (tableId, dateStr, timeStr, durationMinutes = 90, excludeReservationId = null) => {
    if (!tableId || !dateStr || !timeStr) return false;

    try {
      // Calculate new start and end timestamps in milliseconds
      const startIso = new Date(`${dateStr}T${timeStr}:00-06:00`).toISOString();
      const newStart = new Date(startIso).getTime();
      const newEnd = newStart + durationMinutes * 60 * 1000;

      // Query Supabase public.reservas for active non-cancelled reservations
      const { data: dbReservations, error } = await supabase
        .from('reservas')
        .select('id, mesa_id, fecha_hora_inicio, fecha_hora_fin, estado')
        .neq('estado', 'CANCELADA')
        .neq('estado', 'NO_SE_PRESENTO');

      if (error) {
        console.warn('Error al verificar disponibilidad en Supabase:', error.message);
        return reservationService.checkTableAvailability(tableId, dateStr, timeStr, durationMinutes, excludeReservationId);
      }

      for (const r of (dbReservations || [])) {
        if (r.mesa_id !== tableId) continue;
        if (excludeReservationId && (r.id === excludeReservationId || r.dbId === excludeReservationId)) continue;

        const exStart = new Date(r.fecha_hora_inicio).getTime();
        const exEnd = r.fecha_hora_fin ? new Date(r.fecha_hora_fin).getTime() : exStart + 90 * 60 * 1000;

        // Interval overlap test: max(start1, start2) < min(end1, end2)
        if (Math.max(newStart, exStart) < Math.min(newEnd, exEnd)) {
          return false; // Conflict found!
        }
      }

      return true; // Free & Available
    } catch (err) {
      console.error('Error inesperado al consultar disponibilidad:', err);
      return true;
    }
  },

  // Synchronous local availability check fallback
  checkTableAvailability: (tableId, dateStr, timeStr, durationMinutes = 90, excludeReservationId = null) => {
    if (!tableId || !dateStr || !timeStr) return false;

    const reservations = reservationService.getReservations();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);
    const newStart = new Date(year, month - 1, day, hours, minutes).getTime();
    const newEnd = newStart + durationMinutes * 60 * 1000;

    for (const r of reservations) {
      if (r.status === 'cancelled') continue;
      if (excludeReservationId && (r.id === excludeReservationId || r.dbId === excludeReservationId)) continue;
      if (r.reservation.tableId !== tableId) continue;
      if (r.reservation.date !== dateStr) continue;

      const [rHours, rMinutes] = r.reservation.time.split(':').map(Number);
      const [rYear, rMonth, rDay] = r.reservation.date.split('-').map(Number);
      const exStart = new Date(rYear, rMonth - 1, rDay, rHours, rMinutes).getTime();
      const exDuration = r.reservation.durationMinutes || 90;
      const exEnd = exStart + exDuration * 60 * 1000;

      if (Math.max(newStart, exStart) < Math.min(newEnd, exEnd)) {
        return false;
      }
    }

    return true;
  },

  // Get status of all tables for date, time, and guests
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

  // Auto-select best available table
  autoSelectBestTable: (dateStr, timeStr, guests, durationMinutes = 90, excludeReservationId = null) => {
    const tables = reservationService.getAvailableTables(
      dateStr,
      timeStr,
      guests,
      durationMinutes,
      excludeReservationId
    );
    
    const selectable = tables.filter(t => t.isSelectable);
    if (selectable.length === 0) return null;

    selectable.sort((a, b) => a.capacity - b.capacity);
    return selectable[0];
  },

  // Suggest alternate times
  getSuggestedTimes: (dateStr, targetTimeStr, guests, durationMinutes = 90) => {
    const timeSlots = generateTimeSlots();
    const suggestions = [];

    const [tH, tM] = targetTimeStr.split(':').map(Number);
    const targetMinutes = tH * 60 + tM;

    for (const slot of timeSlots) {
      if (slot === targetTimeStr) continue;

      const [sH, sM] = slot.split(':').map(Number);
      const slotMinutes = sH * 60 + sM;

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

  // CREATE RESERVATION DIRECTLY IN SUPABASE DATABASE (REAL PERSISTENCE)
  createReservation: async (data) => {
    const { customer, reservation, specialRequest = '', occasion = 'Ninguna' } = data;

    // 1. Pre-insert availability check on Supabase to prevent race conditions
    const isFree = await reservationService.checkTableAvailabilityAsync(
      reservation.tableId,
      reservation.date,
      reservation.time,
      reservation.durationMinutes || reservationConfig.defaultReservationDuration
    );

    if (!isFree) {
      throw new Error('La mesa seleccionada ha sido reservada por otro cliente en este mismo horario.');
    }

    // 2. Build payload matching Supabase public.reservas schema
    const payload = mapFrontendToSupabasePayload(data);

    // 3. Perform real INSERT into Supabase public.reservas
    const { data: insertedRow, error } = await supabase
      .from('reservas')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('Error insertando reserva en Supabase:', error);
      throw new Error(`Error al conectar con la base de datos Supabase: ${error.message || 'Verifica la conexión'}`);
    }

    // 4. Map inserted row to frontend object
    const createdFrontend = mapSupabaseRowToFrontend(insertedRow);

    // Sync to local cache
    const localList = reservationService.getReservations();
    localList.unshift(createdFrontend);
    reservationService.saveReservations(localList);

    return createdFrontend;
  },

  // GET RESERVATION BY CODE OR PHONE FROM SUPABASE
  getReservationByCodeAndPhoneAsync: async (codeOrId, phone) => {
    if (!codeOrId || !phone) return null;
    const cleanPhone = normalizePhone(phone);
    const cleanSearch = codeOrId.trim().toUpperCase();

    try {
      const { data: rows, error } = await supabase
        .from('reservas')
        .select('*')
        .neq('estado', 'CANCELADA');

      if (error || !rows) {
        return reservationService.getReservationByCodeAndPhone(codeOrId, phone);
      }

      const matched = rows.find(r => {
        const shortUuid = (r.id || '').split('-')[0].toUpperCase();
        const displayCode = `LAVID-RSV-${shortUuid}`;
        const dbPhone = normalizePhone(r.telefono_cliente);
        
        const codeMatches = r.id.toUpperCase() === cleanSearch || displayCode === cleanSearch;
        const phoneMatches = dbPhone === cleanPhone;

        return codeMatches && phoneMatches;
      });

      return matched ? mapSupabaseRowToFrontend(matched) : null;
    } catch (err) {
      console.error('Error buscando reserva en Supabase:', err);
      return reservationService.getReservationByCodeAndPhone(codeOrId, phone);
    }
  },

  // Fallback sync lookup
  getReservationByCodeAndPhone: (code, phone) => {
    if (!code || !phone) return null;
    const reservations = reservationService.getReservations();
    const cleanCode = code.trim().toUpperCase();
    const cleanPhone = normalizePhone(phone);

    return reservations.find(r => {
      const codeMatches = r.id.toUpperCase() === cleanCode || (r.dbId && r.dbId.toUpperCase() === cleanCode);
      const phoneMatches = normalizePhone(r.customer.phone) === cleanPhone;
      return codeMatches && phoneMatches;
    }) || null;
  },

  // UPDATE EXISTING RESERVATION IN SUPABASE
  updateReservation: async (idOrDbId, updatedData) => {
    const existing = await reservationService.getReservationByCodeAndPhoneAsync(idOrDbId, updatedData.customer?.phone || '');
    const dbId = existing?.dbId || idOrDbId;

    const payload = mapFrontendToSupabasePayload(updatedData);

    const { data: updatedRow, error } = await supabase
      .from('reservas')
      .update(payload)
      .eq('id', dbId)
      .select('*')
      .single();

    if (error) {
      console.error('Error al actualizar en Supabase:', error);
      throw new Error(`No se pudo actualizar la reserva en Supabase: ${error.message}`);
    }

    return mapSupabaseRowToFrontend(updatedRow);
  },

  // CANCEL RESERVATION IN SUPABASE (Sets estado = 'CANCELADA')
  cancelReservation: async (idOrDbId) => {
    // Find dbId if given short code
    const reservations = reservationService.getReservations();
    const localObj = reservations.find(r => r.id === idOrDbId || r.dbId === idOrDbId);
    const dbId = localObj?.dbId || idOrDbId;

    const { data: updatedRow, error } = await supabase
      .from('reservas')
      .update({ 
        estado: 'CANCELADA',
        actualizado_en: new Date().toISOString()
      })
      .eq('id', dbId)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error al cancelar reserva en Supabase:', error);
      throw new Error(`No se pudo cancelar la reserva en Supabase: ${error.message}`);
    }

    // Update local cache
    const updatedLocal = reservations.map(r => {
      if (r.id === idOrDbId || r.dbId === dbId) {
        return { ...r, status: 'cancelled' };
      }
      return r;
    });
    reservationService.saveReservations(updatedLocal);

    return mapSupabaseRowToFrontend(updatedRow) || localObj;
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
  h = h ? h : 12;
  return `${h}:${mStr} ${ampm}`;
};
