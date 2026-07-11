/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration - Custom design system for 75 Days Hard English

module.exports = {
  // Enable dark mode via class strategy
  darkMode: 'class',

  // Scan all component and page files for class names
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // Custom brand colors
      colors: {
        // Primary brand - Royal Blue/Purple
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Secondary - Vibrant Purple
        secondary: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        // Accent - Emerald Green (for success)
        accent: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Warning - Amber (for streaks/coins)
        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Danger - Red (for errors)
        danger: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Dark mode surface colors
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },

      // Custom font families
      // 'var(--font-inter)' comes from next/font/google in app/layout.js —
      // this self-hosts Inter at build time (no external network request,
      // no <head> hydration mismatch) and exposes it as a CSS variable.
      // Falls back to system-ui if the variable is ever missing.
      fontFamily: {
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // Custom animations
      animation: {
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'fade-up':       'fadeUp 0.5s ease-out',
        'slide-in':      'slideIn 0.3s ease-out',
        'slide-in-right':'slideInRight 0.3s ease-out',
        'bounce-in':     'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':         'float 3s ease-in-out infinite',
        'glow':          'glow 2s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 3s linear infinite',
        'gradient':      'gradientShift 4s ease infinite',
        'count-up':      'countUp 1s ease-out',
        'scale-in':      'scaleIn 0.2s ease-out',
        'wiggle':        'wiggle 0.5s ease-in-out',
        'streak-fire':   'streakFire 1s ease-in-out infinite',
        'xp-gain':       'xpGain 0.5s ease-out',
        'confetti':      'confettiFall 3s ease-in-out',
      },

      // Animation keyframes
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.5)',  opacity: '0' },
          '70%':  { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(99,102,241,0.5)' },
          '50%':      { boxShadow: '0 0 20px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.4)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
        streakFire: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)',   filter: 'brightness(1)' },
          '50%':      { transform: 'scale(1.1) rotate(2deg)', filter: 'brightness(1.2)' },
        },
        xpGain: {
          '0%':   { transform: 'translateY(0) scale(1)',    opacity: '1' },
          '100%': { transform: 'translateY(-30px) scale(1.2)', opacity: '0' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-100vh) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },

      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Custom box shadows
      boxShadow: {
        'glow-primary':   '0 0 20px rgba(99,102,241,0.4)',
        'glow-secondary': '0 0 20px rgba(217,70,239,0.4)',
        'glow-accent':    '0 0 20px rgba(16,185,129,0.4)',
        'glow-warning':   '0 0 20px rgba(245,158,11,0.4)',
        'glow-danger':    '0 0 20px rgba(244,63,94,0.4)',
        'card-dark':      '0 4px 24px rgba(0,0,0,0.4)',
        'card-light':     '0 4px 24px rgba(0,0,0,0.08)',
        'inner-glow':     'inset 0 0 20px rgba(99,102,241,0.1)',
        'glass':          '0 8px 32px rgba(0,0,0,0.3)',
        'button':         '0 4px 15px rgba(99,102,241,0.4)',
        'button-hover':   '0 8px 25px rgba(99,102,241,0.6)',
        'xl-dark':        '0 20px 60px rgba(0,0,0,0.5)',
      },

      // Custom background sizes for animations
      backgroundSize: {
        '300%': '300%',
        '400%': '400%',
      },

      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // Transition durations
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      // Custom screens for fine-grained responsive control
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },

      // Custom backdrop blur
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },

      // Z-index extensions
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },

  // Plugins for additional utilities
  plugins: [],
};
