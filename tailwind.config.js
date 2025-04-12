/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React 파일을 포함시킴
  ],
  theme: {
    extend: {
      fontFamily: {
        jua: ['"Jua"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
