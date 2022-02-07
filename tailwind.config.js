module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: '#282828',
        'btn-blue': '#11B3FE',
        'inp-gray': '#F6F7F8',
        'btn-hov': '#0095E0',
        'inp-bor': '#E3EBEF',
        danger: '#E03F3F',
        'list-hov': '#EAF1F7',
        'list-cur': '#80A2B6'
      },
      fontSize: {
        '5xl-1': '3.125rem'
      },
      fontFamily: {
        serif: [
          'Vollkorn',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif'
        ]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
