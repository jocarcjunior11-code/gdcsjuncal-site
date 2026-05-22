import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─────────────────────────────────────────────────
// Cliente Supabase para o servidor
// ─────────────────────────────────────────────────
// Usado nas páginas que carregam dados no servidor
// antes de mostrar ao utilizador. Mais rápido e seguro.
// ─────────────────────────────────────────────────

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {
          // Em Server Components não conseguimos definir cookies.
          // Será feito em Route Handlers / Middleware.
        },
        remove() {
          // idem
        }
      }
    }
  )
}
