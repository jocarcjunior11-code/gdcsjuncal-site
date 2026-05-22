import { createBrowserClient } from '@supabase/ssr'

// ─────────────────────────────────────────────────
// Cliente Supabase para o browser
// ─────────────────────────────────────────────────
// Usado em componentes "client" (interativos) para
// ler dados ou fazer login.
// ─────────────────────────────────────────────────

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
