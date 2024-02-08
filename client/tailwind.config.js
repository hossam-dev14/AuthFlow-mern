/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      green: {
        lighter: '#88a94a',
        default: '#6f893d',
        dark: '#5e7534',
      },
      white: "#fff",
      black: "#1f2937",
      gray: {
        100: "#F9FAFB",
        200: "#EAECF3",
        300: "#CED4E8",
        400: "#AAB7C4",
        500: "#6B7283",
      },
      lightGray: '#e1e1e1',
      blue: '#007ace',
      red: '#de3618',
    },
    backgroundImage: {
      'bgImg': "url('./assets/images/bgImg.webp')",
    },
    container: {
      padding: '4rem',
      center: true
    }
  },
  plugins: [],
}

