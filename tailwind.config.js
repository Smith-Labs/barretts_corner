/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,tsx,jsx,css}"],
  theme: {
    "primary": "#7a23e7",
    "secondary": "#ee75fb",
    "accent": "#1fb2a6",
    "neutral": "#580048",
    "base-100": "#47003a",
    "info": "#231bf4",
    "success": "#36d399",
    "warning": "#fbbd23",
    "error": "#d500aa",
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#7a23e7",
          "secondary": "#ee75fb",
          "accent": "#1fb2a6",
          "neutral": "#580048",
          "base-100": "#47003a",
          "info": "#231bf4",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#d500aa",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

