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
        sans: ['Poppins', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-left': 'slideOutLeft 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      spacing: {
        'rtl-safe': '0.5rem',
      },
    },
  },
  plugins: [
    // Custom RTL plugin
    function({ addUtilities, addComponents, theme }) {
      // RTL-aware utilities
      addUtilities({
        '.rtl-flip': {
          transform: 'scaleX(-1)',
        },
        '.rtl-margin-start': {
          'margin-inline-start': theme('spacing.4'),
        },
        '.rtl-margin-end': {
          'margin-inline-end': theme('spacing.4'),
        },
        '.rtl-padding-start': {
          'padding-inline-start': theme('spacing.4'),
        },
        '.rtl-padding-end': {
          'padding-inline-end': theme('spacing.4'),
        },
        '.rtl-border-start': {
          'border-inline-start': '1px solid',
        },
        '.rtl-border-end': {
          'border-inline-end': '1px solid',
        },
        '.rtl-rounded-start': {
          'border-start-start-radius': theme('borderRadius.lg'),
          'border-end-start-radius': theme('borderRadius.lg'),
        },
        '.rtl-rounded-end': {
          'border-start-end-radius': theme('borderRadius.lg'),
          'border-end-end-radius': theme('borderRadius.lg'),
        },
        '.text-start': {
          'text-align': 'start',
        },
        '.text-end': {
          'text-align': 'end',
        },
      });

      // RTL-aware components
      addComponents({
        '.rtl-card': {
          '@apply bg-white rounded-lg shadow-md p-6': {},
          '&[dir="rtl"]': {
            '@apply text-right': {},
          },
          '&[dir="ltr"]': {
            '@apply text-left': {},
          },
        },
        '.rtl-form-input': {
          '@apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent': {},
          '&[dir="rtl"]': {
            '@apply text-right': {},
          },
          '&[dir="ltr"]': {
            '@apply text-left': {},
          },
        },
        '.rtl-nav': {
          '@apply flex items-center space-x-6': {},
          '&[dir="rtl"]': {
            '@apply space-x-reverse': {},
          },
        },
        '.rtl-flex': {
          '@apply flex': {},
          '&[dir="rtl"]': {
            '@apply flex-row-reverse': {},
          },
          '&[dir="ltr"]': {
            '@apply flex-row': {},
          },
        },
        '.rtl-grid': {
          '@apply grid gap-6': {},
          '&[dir="rtl"]': {
            direction: 'rtl',
          },
        },
      });
    },
  ],
};