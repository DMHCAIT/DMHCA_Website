import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Dummy values that pass supabase-js validation when real credentials not set
const DUMMY_URL = 'https://xyzcompanyplaceholder.supabase.co'
const DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.placeholder'

let _supabase: SupabaseClient

try {
  _supabase = createClient(
    supabaseUrl || DUMMY_URL,
    supabaseAnonKey || DUMMY_KEY
  )
} catch {
  _supabase = createClient(DUMMY_URL, DUMMY_KEY)
}

export const supabase = _supabase
export default supabase
