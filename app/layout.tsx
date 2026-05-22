import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { clubConfig } from '@/lib/club-config'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${clubConfig.name} — Site Oficial`,
    template: `%s | ${clubConfig.shortName}`
  },
  description: clubConfig.seo.description,
  keywords: clubConfig.seo.keywords,
  openGraph: {
    title: clubConfig.name,
    description: clubConfig.seo.description,
    type: 'website',
    locale: 'pt_PT'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
