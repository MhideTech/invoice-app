/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#7C5DFA",
          hover: "#9277FF",
        },
        navy: {
          dark: "#0C0E16",
          DEFAULT: "#141625",
          card: "#1E2139",
          input: "#252945",
          border: "#252945",
        },
        gray: {
          label: "#DFE3FA",
          muted: "#888EB0",
          border: "#494E6E",
        },
        status: {
          paid: "#33D69F",
          pending: "#FF8F00",
          draft: "#373B53",
          "paid-bg": "rgba(51,214,159,0.06)",
          "pending-bg": "rgba(255,143,0,0.06)",
          "draft-bg": "rgba(55,59,83,0.06)",
        },
      },
      fontFamily: {
        sans: ["'League Spartan'", "sans-serif"],
      },
      boxShadow: {
        card: "0px 10px 20px rgba(72, 84, 159, 0.25)",
        form: "0px 0px 0px 1px rgba(124,93,250,0.6)",
      },
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
