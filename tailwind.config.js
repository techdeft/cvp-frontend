import prelinePlugin from 'preline/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
    },

  },

  plugins: [
    prelinePlugin,
  ],
}

