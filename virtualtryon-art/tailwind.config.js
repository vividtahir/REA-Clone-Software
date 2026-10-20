/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#FFD700',
          400: '#E5C07B',
          500: '#C6A664',
          600: '#B8860B',
          700: '#8C6615',
        },
        dark: {
          900: '#0E0E0E',
          800: '#141414',
          700: '#1A1A1A',
          600: '#2A2A2A',
        }
      },
      animation: {
        'scroll-loop': 'scroll-loop 25s linear infinite',
        'generation-progress': 'generation-progress-slide 2s linear infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'scroll-loop': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'generation-progress-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        }
      }
    },
  },
  plugins: [],
}
