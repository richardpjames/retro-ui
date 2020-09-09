module.exports = {
  purge: ['src/**/*.js', 'src/**/*.jsx', 'public/**/*.html'],
  theme: {
    fontFamily: {
      sans: ['inter'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
    },
  },
  variants: {},
  plugins: [],
};
