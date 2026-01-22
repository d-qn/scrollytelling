/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'lt-bg': '#ebebeb',
        'lt-water': '#a8b9c7',
        'lt-green': '#e1e6c8',
        'lt-border': '#b4b4b4',
        'lt-text': '#000000',
        'lt-subtext': '#595959',
        'lt-main-blue': '#005578',
        'lt-div-red': '#ab4b48',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        medium: '500',
      }
    }
  },
  plugins: []
};
