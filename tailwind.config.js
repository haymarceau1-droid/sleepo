/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aave-bg': '#0a0d14',
        'aave-surface': '#0f1219',
        'aave-glass': 'rgba(255,255,255,0.04)',
        'aave-glass-hover': 'rgba(255,255,255,0.07)',
        'aave-border': 'rgba(255,255,255,0.08)',
        'aave-border-light': 'rgba(255,255,255,0.12)',
        'aave-border-subtle': 'rgba(255,255,255,0.04)',
        'aave-separator': 'rgba(255,255,255,0.05)',
        midnight: '#060a12',
        'sleepo-purple': {
          50: '#f0edf9',
          100: '#d4cbf0',
          200: '#b8a8e6',
          300: '#9c86dc',
          400: '#8063d2',
          500: '#6247AA',
          600: '#4e3988',
          700: '#3a2a66',
          800: '#261c44',
          900: '#120d22',
        },
        'purple-primary': '#6247AA',
        'purple-light': '#7C5CBF',
        'purple-dark': '#15104D',
        'purple-glow': 'rgba(98,71,170,0.4)',
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        celadon: {
          400: '#7dd3c0',
          500: '#5cb8a0',
        },
        'blue-ios': 'rgba(0,122,255,0.9)',
      },
      fontFamily: {
        sans: ['"Google Sans"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        display: ['"Google Sans"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'glass-title': ['22px', { lineHeight: '28px', fontWeight: '700', letterSpacing: '-0.03em' }],
        'glass-heading': ['17px', { lineHeight: '22px', fontWeight: '600', letterSpacing: '-0.02em' }],
        'glass-body': ['15px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '-0.01em' }],
        'glass-caption': ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0em' }],
        'glass-stat': ['32px', { lineHeight: '36px', fontWeight: '700', letterSpacing: '-0.04em' }],
        'glass-label': ['11px', { lineHeight: '14px', fontWeight: '600', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        'glass': '20px',
        'glass-sm': '14px',
        'glass-xs': '10px',
        'glass-pill': '9999px',
      },
      animation: {
        'glass-in': 'glassIn 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        'glass-slide-up': 'glassSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'glass-fade': 'glassFade 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'twinkle': 'twinkle var(--duration, 3s) ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        glassIn: {
          '0%': { opacity: '0', transform: 'scale(0.97) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        glassSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glassFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(98, 71, 170, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(98, 71, 170, 0.3)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-4px) rotate(1deg)' },
          '66%': { transform: 'translateY(2px) rotate(-1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(98, 71, 170, 0.08)' },
          '50%': { boxShadow: '0 0 20px rgba(98, 71, 170, 0.2)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      },
    },
  },
  plugins: [],
};
