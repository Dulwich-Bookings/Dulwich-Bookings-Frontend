const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: { Inter: ['Inter', 'sans-serif'] },
    colors: {
      bgBlack: '#000000',
      bgCard: '#D9D9D9',
      bgPurple: '#757AEC',
      bgNoHover: '#404040',
      bgPlaceholder: '#333333',
      bgWhite: '#feffff',
      dulwichRed: '#E33939',
      dulwichRedHover: '#FDECEC',
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
    },
    placeholderColor: {
      primary: '#333333',
    },
    screens: {
      xs: '0px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      phone: '640px',
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
