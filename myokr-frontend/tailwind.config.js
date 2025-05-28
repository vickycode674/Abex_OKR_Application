// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: Configure your files to scan for Tailwind classes
  content: [
    "./index.html", // For plain HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // For JavaScript/TypeScript React/Vue/Angular files
    // Add other paths here if you have different file types or locations
    // e.g., "./components/**/*.{js,ts,jsx,tsx}",
    // e.g., "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      // For example, add custom colors:
      // colors: {
      //   'custom-blue': '#243c5a',
      // },
      // Or custom font families:
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      // },
    },
  },
  plugins: [
    // Add Tailwind plugins here, e.g., @tailwindcss/forms
    // require('@tailwindcss/forms'),
  ],
}