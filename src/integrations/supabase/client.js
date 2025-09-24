import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

const isNative = () => {
  return !!(window && window.Capacitor && window.Capacitor.isNativePlatform);
};

const capacitorStorage = {
  getItem: async (key) => {
    const { value } = await Preferences.get({ key });
    return value;
  },
  setItem: async (key, value) => {
    await Preferences.set({ key, value });
  },
  removeItem: async (key) => {
    await Preferences.remove({ key });
  },
};

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY, {
    auth: {
      storage: isNative() ? capacitorStorage : localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
});

