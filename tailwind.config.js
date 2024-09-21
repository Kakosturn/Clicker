/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        modalShow: {
          "0%": { opacity: 0, transform: "translate(-50%, -50%)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
        },
      },
      animation: {
        modalShow: "modalShow 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
