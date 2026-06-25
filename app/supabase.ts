import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ckoifzcgntfwsuyyoowf.supabase.co'; 
const supabaseKey = 'sb_publishable_-ADO9Hv7bLm1jeoN9GgL48i9_d6R_gHwW-fLg'; 

export const supabase = createClient(supabaseUrl, supabaseKey);