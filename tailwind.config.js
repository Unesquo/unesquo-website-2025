/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],  
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['var(--font-press-start)', 'monospace'],
      },
    },
  },
  plugins: [],
}

