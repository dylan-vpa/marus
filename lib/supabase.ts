import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dzfpzhlkasrkixmaipay.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6ZnB6aGxrYXNya2l4bWFpcGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNzE5NzYsImV4cCI6MjA0NDk0Nzk3Nn0.NZefo_65mH2tX1sBiuM7VvoSoa8YnTh2xn8y8clr_pU'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface RSVP {
  id: number
  created_at: string
  name: string
  email: string
  guests: number
  message: string | null
}