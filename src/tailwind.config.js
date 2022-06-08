const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: {},
    colors: { bgWhite: '#feffff', dulwichRed: '#E33939', bgBlack: '#000000' },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
    },
    backgroundImage: {
      homePage: './assets/landscapeImage.jpg',
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: 0,
      },
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
