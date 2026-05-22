import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'

export function formatMatchDate(iso: string): string {
  try {
    return format(parseISO(iso), "EEE, d 'de' MMM · HH'h'mm", { locale: pt })
  } catch {
    return iso
  }
}

export function formatNewsDate(iso: string): string {
  try {
    return format(parseISO(iso), "d 'de' MMMM 'de' yyyy", { locale: pt })
  } catch {
    return iso
  }
}

export function formatShortDate(iso: string): string {
  try {
    return format(parseISO(iso), 'dd/MM/yyyy', { locale: pt })
  } catch {
    return iso
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
