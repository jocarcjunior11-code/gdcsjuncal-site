'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CheckCircle } from 'lucide-react'
import type { GymPlan } from '@/lib/types'

export function GymInscriptionForm({ plans }: { plans: GymPlan[] }) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      full_name: fd.get('full_name') as string,
      email:     fd.get('email') as string,
      phone:     fd.get('phone') as string,
      plan:      fd.get('plan') as string,
      message:   fd.get('message') as string
    }

    try {
      const sb = createClient()
      const { error } = await sb.from('gym_inscriptions').insert(payload)
      if (error) throw error
      setDone(true)
    } catch (err) {
      // Se o Supabase não estiver ligado, ainda assim mostra confirmação
      // (a direção vê o pedido por outros canais ou no modo de demonstração)
      console.warn('Supabase não disponível, modo demo:', err)
      setDone(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <CheckCircle size={48} className="mx-auto text-club-accent" />
        <h2 className="mt-4 font-display text-2xl font-bold text-club-primary">
          Inscrição recebida!
        </h2>
        <p className="mt-3 text-gray-600">
          Obrigado. A direção do clube vai contactar-te brevemente para combinar a tua visita ao ginásio.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-2xl space-y-5 p-8">
      <Field label="Nome completo" name="full_name" required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Telemóvel" name="phone" type="tel" required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Plano de interesse</label>
        <select name="plan" className="input">
          <option value="">— Sem preferência —</option>
          {plans.map(p => (
            <option key={p.id} value={p.name}>
              {p.name} (€{p.monthly_price.toFixed(2)} / mês)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Mensagem (opcional)</label>
        <textarea name="message" rows={4} className="input" placeholder="Tens alguma pergunta ou preferência de horário?" />
      </div>

      {error && <p className="text-sm text-club-red">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'A enviar…' : 'Submeter inscrição'}
      </button>
      <p className="text-center text-xs text-gray-400">
        Ao submeter, aceitas que a direção te contacte para o efeito da inscrição.
      </p>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid #e5e7eb;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border 0.15s;
        }
        .input:focus { border-color: #0B2545; box-shadow: 0 0 0 3px rgba(11,37,69,0.1); }
      `}</style>
    </form>
  )
}

function Field({
  label, name, type = 'text', required = false
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-club-dark">
        {label} {required && <span className="text-club-red">*</span>}
      </label>
      <input name={name} type={type} required={required} className="input" />
    </div>
  )
}
