const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  important: true,
  theme: {
    fontWeight: {
      extra: 100,
      light: 300,
      normal: 400,
      medium: 500,
    },
    extend: {},
    fontFamily: { Inter: ['Inter', 'sans-serif'] },
    colors: {
      bgBlack: '#000000',
      bgPurple: '#757AEC',
      bgWhite: '#feffff',
      bgGray: '#E6E6E6',
      dulwichRed: '#E33939',
      dulwichRedHover: '#FDECEC',
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 17,
      xl: 20,
      xxl: 24,
      '3xl': 30,
    },
    placeholderColor: {
      primary: '#333333',
    },
    screens: {
      //dimensions are aligned to MUI breakpoints
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
