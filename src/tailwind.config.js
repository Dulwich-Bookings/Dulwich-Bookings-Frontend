const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  important: true,
  theme: {
    extend: {},
    fontFamily: { Inter: ['Inter', 'sans-serif'] },
    colors: {
      white: '#ffffff',
      green: '#76D674',
      grayAccent: '#4D4D4D',
      grayLight: '#D9D9D9',
      bgBlack: '#000000',
      bgPurple: '#757AEC',
      bgWhite: '#feffff',
      bgGray: '#F3F3F4',
      bgDarkGray: '#404040',
      bgLightRed: '#E6AEAE',
      dulwichRed: '#E33939',
      dulwichRedHover: '#FDECEC',
      bgBlur: 'rgba(255, 255, 255, 0.5)',
      bgLesson: '#E6E6E6',
      bgBookingBlack: '#797979',
      bgBookingBlackPending: '#2E2E2E',
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
      homeLaptop: '1100px',
      addRoomLaptop: '1369px',
      addRoomSmallerLaptop: '913px',
      bookingSafe: '960px',
      calendarPhone: '576px',
      calendarLaptop: '900px',
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
