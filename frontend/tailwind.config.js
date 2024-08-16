module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode:'media',
  
    theme: {
      fontFamily: {
        sans: [
          '"Inter var", sans-serif',
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32'
          },
        ],
      },
    },
  
  variants: {
    extend: {},
  },
  plugins: [],
};
