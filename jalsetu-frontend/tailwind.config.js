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
    },
  },
  plugins: [],
};