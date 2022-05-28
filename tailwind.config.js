module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          850:'#1A192C',
          950: '#12111E'
        },
        green:{
          350:'#53DF9A'
        },
        purple:{
          350:'#8459FF'
        },
        yellow:{
          350:'#FFD678',
          450:"#FE8F65"
        },
        red:{
          350:'#F87171'
        },
        blue:{
          350:'#4AD0EE'
        },
        pink:{
          350:'#EA59E2'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
