import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Cores institucionais do Grupo Desportivo Centro Social do Juncal
        // Muda aqui se quiseres outras cores — afeta o site todo.
        club: {
          primary: '#0B2545',      // Azul-marinho profundo (cor principal)
          secondary: '#13315C',    // Azul intermédio
          accent: '#D4AF37',       // Dourado discreto (destaques)
          light: '#EEF4ED',        // Bege claro institucional
          dark: '#06182B',         // Quase preto para texto forte
          red: '#C9292E'           // Vermelho desportivo (alertas/CTA)
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif']
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px'
        }
      }
    }
  },
  plugins: []
}

export default config
