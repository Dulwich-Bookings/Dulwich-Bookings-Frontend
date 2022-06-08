const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
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
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
