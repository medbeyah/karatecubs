/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#0f8d7e',
          700: '#0c6b5f',
        },
      },
      fontFamily: {
        sans: ['Futura', 'Bungee', 'Poppins', 'sans-serif'],
        'arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
