const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
<<<<<<< HEAD
    extend: {
      backgroundImage: {
        dulwichLanding: "url('assets/images/dc_beijing.webp')",
      },
    },
    fontFamily: {
      inter: ['sans-serif'],
    },
    colors: {
      redBg: '#e33939',
      hoverBg: '#FFE4E6',
      greyBg: '#3D3D3D',
=======
    extend: {},
    fontFamily: {},
    colors: {
      bgWhite: '#feffff',
      dulwichRed: '#E33939',
>>>>>>> 0137b070648b33a00705bc06362f651cc1513b50
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
    },
    screens: {
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
