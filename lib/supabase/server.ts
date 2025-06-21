import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://pupjnmjmdvruijcfpxtg.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cGpubWptZHZydWlqY2ZweHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTg2NDgsImV4cCI6MjA2NDczNDY0OH0.Bp1lFAIKpTwRfaaSVwgmir5Xj0oqO2iAHFa1PtzvKuA"

export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}
