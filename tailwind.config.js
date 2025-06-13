// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          orange: '#e4a246',
          beige: '#e0cc96',
          bluegray: '#406d81',
          lightblue: '#7b99ab',
          lighterblue: '#b5c7d6',
          deepblue: '#2b4e5f',
          navy: '#21414d',
          neon: '#3bf563',
          purple: '#be8ed6',
        }
      }
    },
  },
  plugins: [],
}
