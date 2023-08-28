/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        Rosa: {
          primary: "#FEF2F2",

          secondary: "#FCA5A5",

          accent: "#FEE2E2",

          neutral: "#231b31",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#57e5c4",

          warning: "#efb343",

          error: "#ee4f49",
        },
        Azul: {
          primary: "#EFF6FF",

          secondary: "#93C5FD",

          accent: "#DBEAFE",

          neutral: "#231b31",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#57e5c4",

          warning: "#efb343",

          error: "#ee4f49",
        },
        Oscura: {
          primary: "#94A3B8",

          secondary: "#334155",

          accent: "#CBD5E1",

          neutral: "#231b31",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#57e5c4",

          warning: "#efb343",

          error: "#ee4f49",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
