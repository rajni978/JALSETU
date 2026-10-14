/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { 950: '#06223f', 900: '#082f55', 800: '#0b3d6e', 700: '#0f4c85' },
        aqua: { 50: '#ecfbfd', 100: '#cff3f8', 400: '#2cc4dc', 500: '#12a9c4', 600: '#0b89a3' },
        surface: '#f2f7fb',
      },
      boxShadow: { card: '0 1px 2px rgba(8,47,85,.06), 0 4px 14px rgba(8,47,85,.05)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'wave-x': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        bubble: {
          '0%': { transform: 'translateY(0) scale(.6)', opacity: '0' },
          '15%': { opacity: '.7' },
          '100%': { transform: 'translateY(-500px) scale(1.1)', opacity: '0' },
        },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'wave-slow': 'wave-x 18s linear infinite',
        'wave-fast': 'wave-x 10s linear infinite',
        bubble: 'bubble 9s ease-in infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};