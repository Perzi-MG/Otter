/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'blue': '#71A6D2',
        'aqua': '#50CCA6',
        'brand-black': '#0D0D0D',
        'gray': '#888888',
        'brand-gray': '#252526',
        'dark-blue': '#1A6566',
        'light-blue': '#C5C8D9',
        'brand-white': '#F3F2EC', // Se usa 'brand-white' para no sobreescribir el blanco por defecto de Tailwind

        'sky-blue': '#B4E1FF',
        'pure-white': '#FFFFFF',
        'light-mint-green': '#A0E7E5',
      },
    },
  },
  plugins: [],
}

