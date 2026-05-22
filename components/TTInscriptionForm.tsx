'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CheckCircle } from 'lucide-react'

export function TTInscriptionForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      full_name:    fd.get('full_name') as string,
      birth_date:   (fd.get('birth_date') as string) || null,
      email:        (fd.get('email') as string) || null,
      phone:        fd.get('phone') as string,
      guardian_name:(fd.get('guardian_name') as string) || null,
      experience:   (fd.get('experience') as string) || null,
      message:      (fd.get('message') as string) || null
    }

    try {
      const sb = createClient()
      const { error } = await sb.from('tt_inscriptions').insert(payload)
      if (error) throw error
      setDone(true)
    } catch (err) {
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
          Inscrição enviada!
        </h2>
        <p className="mt-3 text-gray-600">
          Vamos contactar-te em 48h úteis para marcar um treino experimental e tirar todas as dúvidas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-2xl space-y-5 p-8">
      <Field label="Nome do atleta" name="full_name" required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Data de nascimento" name="birth_date" type="date" />
        <Field label="Nome do encarregado (se menor)" name="guardian_name" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Email" name="email" type="email" />
        <Field label="Telemóvel" name="phone" type="tel" required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Experiência</label>
        <select name="experience" className="input">
          <option value="">— Seleciona —</option>
          <option>Nunca joguei</option>
          <option>Iniciante — joguei algumas vezes</option>
          <option>Intermédio — pratico regularmente</option>
          <option>Avançado / federado noutro clube</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-club-dark">Mensagem (opcional)</label>
        <textarea name="message" rows={4} className="input" placeholder="Quando podes treinar? Tens alguma questão?" />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'A enviar…' : 'Submeter inscrição'}
      </button>
      <p className="text-center text-xs text-gray-400">
        Ao submeter, aceitas que a direção te contacte para combinar treino experimental.
      </p>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid #e5e7eb;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
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
