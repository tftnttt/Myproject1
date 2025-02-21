import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = https://smmalsqhmevctoetwexc.supabase.co; 
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbWFsc3FobWV2Y3RvZXR3ZXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNDQxNTEsImV4cCI6MjA1NTcyMDE1MX0.q4_eBMdhp8yW-pjSqXWLlmYm_51gy5gncV24QJft2nI; // Замени на свой ключ

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
