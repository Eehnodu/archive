/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        wxl: "1340px",
        "2xl": "1440px",
        "3xl": "1920px",
        "2xs": "425px",
        "3xs": "375px",
      },
      fontFamily: {
        pretendardVariable: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
