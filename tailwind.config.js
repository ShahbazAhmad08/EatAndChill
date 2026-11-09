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
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff4c24', // primary vibrant warm tomato red/orange
          600: '#ea3a12',
          700: '#c22d0c',
          800: '#9a240c',
          900: '#7c1e0a',
        },
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(255, 76, 36, 0.15), 0 0 20px -5px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.07)',
        'card-hover': '0 25px 50px -12px rgba(255, 76, 36, 0.2), 0 0 1px 1px rgba(255, 76, 36, 0.1)',
        'glow': '0 0 35px rgba(255, 76, 36, 0.35)',
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
