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
      colors: {
        main: "#10B981", // Green
        mainHover: "#059669", // Darker Green
        sub1: "#F59E0B", // Amber
        sub1Hover: "#D97706", // Darker Amber
        sub2: "#FFFBEB", // Warm Ivory (배경/사이드바)
      },
      fontFamily: {
        pretendardVariable: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
