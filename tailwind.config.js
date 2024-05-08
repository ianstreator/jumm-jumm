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
        oscura: {
          primary: "#6B7280",

          secondary: "#374151",

          accent: "#D1D5DB",

          neutral: "#262626",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#57e5c4",

          warning: "#efb343",

          error: "#ee4f49",
        },
        rosa: {
          primary: "#FFE4E6",

          secondary: "#FB7185",

          accent: "#FAFAF9",

          neutral: "#262626",

          "base-100": "#423e56",

          info: "#FED7AA",

          success: "#a9d1fe",

          warning: "#efb343",

          error: "#ee4f49",
        },
        azul: {
          primary: "#DBEAFE",

          secondary: "#60A5FA",

          accent: "#FAFAF9",

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
