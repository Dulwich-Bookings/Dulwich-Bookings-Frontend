const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: { Inter: ['Inter', 'sans-serif'] },
    colors: {
      bgBlack: '#000000',
      bgPurple: '#757AEC',
      bgWhite: '#feffff',
      bgGray: '#F3F3F4',
      textGray: '#404040',
      dulwichRed: '#E33939',
      dulwichRedHover: '#FDECEC',
      bgBlur: 'rgba(255, 255, 255, 0.5)',
      transparent: 'transparent',
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
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
      //custom breakpoints for respective pages
      phone: '640px',
      laptop: '900px',
      homePhone: '450px',
      settingPhone: '985px',
      settingLaptop: '1250px',
      homeLaptop: '1100px',
      addRoomLaptop: '1369px',
      addRoomSmallerLaptop: '913px',
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
