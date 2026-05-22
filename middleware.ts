import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// ─────────────────────────────────────────────────
// Middleware — protege as rotas /admin
// ─────────────────────────────────────────────────
// Se o utilizador não estiver autenticado, é redirecionado
// para a página de login.
// ─────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Se Supabase não está configurado, deixa passar (modo demo)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const path = request.nextUrl.pathname
  const isAdmin = path.startsWith('/admin')
  const isLogin = path === '/admin/login'

  if (isAdmin && !isLogin && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
