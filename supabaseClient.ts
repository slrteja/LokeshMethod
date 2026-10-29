import { createClient } from '@supabase/supabase-js';

// 1. Your live API project endpoint link
const supabaseUrl = 'https://supabase.co';

// 2. Your authentic public key copied directly from your dashboard screen
const supabaseAnonKey = 'sb_publishable_glI2oq9e5Qe6VbHkQj2w6X7z8r9t0y1u2i3o4p5a6s7d8f9g0h1j2k3l4z5x6c7v8b9n0m'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);