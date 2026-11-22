import { createClient } from '@supabase/supabase-js';
import { INITIAL_BOOKINGS } from '../data/dentalData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidConfig = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => isValidConfig;

// ==============================================================================
// Helper functions for Bookings with seamless fallback to localStorage
// ==============================================================================

const LOCAL_STORAGE_KEY = 'auradent_bookings';

const getLocalBookings = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return INITIAL_BOOKINGS;
  } catch (err) {
    console.warn('LocalStorage access failed, falling back to in-memory data', err);
    return INITIAL_BOOKINGS;
  }
};

const saveLocalBookings = (list) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('LocalStorage save failed', err);
  }
};

/**
 * Fetch all bookings from Supabase (or localStorage fallback)
 */
export async function getBookings() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch failed, falling back to local data:', error.message);
        return { data: getLocalBookings(), source: 'local' };
      }

      // Format Supabase snake_case columns to camelCase expected by UI
      const formatted = data.map((b) => ({
        id: b.id,
        patientName: b.patient_name,
        phone: b.phone,
        email: b.email,
        service: b.service,
        doctor: b.doctor,
        date: b.date,
        time: b.time,
        address: b.address,
        symptoms: b.symptoms,
        status: b.status,
        promoApplied: b.promo_applied,
        createdAt: b.created_at
      }));

      // Cache locally as offline backup
      saveLocalBookings(formatted);
      return { data: formatted, source: 'supabase' };
    } catch (err) {
      console.warn('Supabase query error, falling back:', err);
      return { data: getLocalBookings(), source: 'local' };
    }
  }

  return { data: getLocalBookings(), source: 'local' };
}

/**
 * Add a new patient booking
 */
export async function addBooking(bookingData) {
  // Always update local cache for instant UI feedback
  const localList = getLocalBookings();
  saveLocalBookings([bookingData, ...localList]);

  if (supabase) {
    try {
      const payload = {
        id: bookingData.id,
        patient_name: bookingData.patientName,
        phone: bookingData.phone,
        email: bookingData.email || '',
        service: bookingData.service,
        doctor: bookingData.doctor,
        date: bookingData.date,
        time: bookingData.time,
        address: bookingData.address || '',
        symptoms: bookingData.symptoms || '',
        status: bookingData.status || 'Confirmed',
        promo_applied: bookingData.promoApplied || 'None'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([payload])
        .select();

      if (error) {
        console.error('Failed to sync booking to Supabase:', error.message);
        return { success: true, synced: false, error: error.message };
      }

      return { success: true, synced: true, data };
    } catch (err) {
      console.error('Supabase insert exception:', err);
      return { success: true, synced: false, error: err.message };
    }
  }

  return { success: true, synced: false, note: 'Saved locally' };
}

/**
 * Update booking status (e.g., Confirmed, Pending, Completed, Cancelled)
 */
export async function updateBookingStatus(id, newStatus) {
  const localList = getLocalBookings();
  const updatedLocal = localList.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
  saveLocalBookings(updatedLocal);

  if (supabase) {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Supabase update failed:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, synced: true };
    } catch (err) {
      console.error('Supabase update exception:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true, synced: false };
}

/**
 * Delete a booking
 */
export async function deleteBooking(id) {
  const localList = getLocalBookings();
  const updatedLocal = localList.filter((b) => b.id !== id);
  saveLocalBookings(updatedLocal);

  if (supabase) {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete failed:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, synced: true };
    } catch (err) {
      console.error('Supabase delete exception:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true, synced: false };
}
