'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const sb = createClient()
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Email</label>
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Palavra-passe</label>
        <input
          type="password" required value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-club-red">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'A entrar…' : 'Entrar'}
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Esqueceste a palavra-passe? Contacta a direção do clube.
      </p>
    </form>
  )
}
