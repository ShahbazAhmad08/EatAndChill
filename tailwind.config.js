/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626', // royal crimson red matching logo
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#600e12',
          950: '#450a0a',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // vibrant golden yellow from logo
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(185, 28, 28, 0.15), 0 0 20px -5px rgba(245, 158, 11, 0.1)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.07)',
        'card-hover': '0 25px 50px -12px rgba(185, 28, 28, 0.2), 0 0 1px 1px rgba(245, 158, 11, 0.2)',
        'glow': '0 0 35px rgba(220, 38, 38, 0.35)',
        'glow-gold': '0 0 35px rgba(245, 158, 11, 0.4)',
        'glow-emerald': '0 0 35px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
