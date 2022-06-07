const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: {},
    colors: {
      white: '#ffffff',
      grayAccent: '#4D4D4D',
      grayLight: '#D9D9D9',
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
    },
    screens: {
      bookingSafe: '1135px',
      phone: '576px',
      laptop: '900px',
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
