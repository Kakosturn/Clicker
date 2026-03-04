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
      colors: {
        game: {
          ichor: "#B9FF24", // Main 1: The Alien/Player/Treasure
          rust: "#D73A4A", // Main 2: The Flesh/Meat/Enemy/Combat
          monolith: "#101114", // Grey: Deep Void Background
          panel: "#25272c", // Grey: Explored Grid / UI Cards
          border: "#2A2D35", // Grey: Grid Lines / Outlines
        },
        upgrades: "var(--upgrades-bg)",
        features: "var(--features-bg)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
