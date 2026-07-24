/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0a1628', light: '#1a2744', surface: '#152238' },
        electric: { DEFAULT: '#3b82f6', light: '#60a5fa', soft: 'rgba(59,130,246,0.12)' },
        emerald: { DEFAULT: '#059669', light: '#34d399' },
        amber: { DEFAULT: '#d97706', light: '#fbbf24' },
        teal: { DEFAULT: '#0d9488', light: '#2dd4bf' },
        purple: { DEFAULT: '#7c3aed', light: '#a78bfa' },
        rose: { DEFAULT: '#e11d48', light: '#fb7185' },
        graphite: { DEFAULT: '#1e293b', light: '#334155', muted: '#64748b' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],
        'chapter': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '30': '7.5rem', '34': '8.5rem',
        '38': '9.5rem', '42': '10.5rem', '46': '11.5rem',
        '88': '22rem', '128': '32rem', '144': '36rem',
      },
      borderRadius: {
        '2xl': '1rem', '3xl': '1.25rem', '4xl': '1.75rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.08)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.12)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.12)',
        'nav': '0 4px 24px rgba(0,0,0,0.06)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-slow': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'reveal': { '0%': { clipPath: 'inset(0 100% 0 0)' }, '100%': { clipPath: 'inset(0 0 0 0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-slow': 'fade-in-slow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
