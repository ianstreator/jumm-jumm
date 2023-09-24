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
        Oscura: {
          primary: "#CBD5E1",

          secondary: "#334155",

          accent: "#94A3B8",

          neutral: "#262626",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#57e5c4",

          warning: "#efb343",

          error: "#ee4f49",
        },
        Rosa: {
          primary: "#FECDD3",

          secondary: "#E64D67",

          accent: "#FDA4AF",

          neutral: "#262626",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#a9d1fe",

          warning: "#efb343",

          error: "#ee4f49",
        },
        Azul: {
          primary: "#DBEAFE",

          secondary: "#4C86E5",

          accent: "#BFDBFE",

          neutral: "#262626",

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
