/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'theme-bg': '#ebebeb',
        'theme-water': '#a8b9c7',
        'theme-green': '#e1e6c8',
        'theme-border': '#b4b4b4',
        'theme-text': '#000000',
        'theme-subtext': '#595959',
        'theme-primary': '#005578',
        'theme-accent': '#ab4b48',
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
