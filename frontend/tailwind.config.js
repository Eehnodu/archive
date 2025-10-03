/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        wxl: "1024px",
        "2xl": "1440px",
        "3xl": "1920px",
        "2xs": "425px",
        "3xs": "375px",
      },
      colors: {
        main: "#10B981",      // Emerald Green
        mainHover: "#059669", // Darker Emerald
        sub1: "#84CC16",      // Lime 500 (그린 옆 계열)
        sub1Hover: "#65A30D", // Lime 600
        sub2: "#F0FDF4",      // Pale Green (배경)
      },
      fontFamily: {
        pretendardVariable: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
