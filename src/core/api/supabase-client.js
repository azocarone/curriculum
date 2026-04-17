import { createClient } from '@supabase/supabase-js';
import { ENV } from '@core/config/env';

// Centralización del cliente (Patrón Singleton)
export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);