/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import formsPlugin from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
      },
    },
    screens: {
      "2xs": "1px",
      'xxxs': '360px',
      'xxs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1700px',

    },
  },
  plugins: [
    daisyui,
    formsPlugin,
  ],
  darkMode: 'media',
};
