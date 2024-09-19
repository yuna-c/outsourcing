/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif'
        ]
      },
      colors: {
        'custom-deepgreen': '#16423C',
        'custom-green': '#478485',
        'custom-teal': '#50B498',
        'custom-mint': '#9BDBA6',
        'custom-yellow': '#DEF9C4',
        'kakao-yellow': '#ead61d', // #FAE100
        'custom-palemint': '#E9EFEC',
        'custom-gray': '#ededed'
      },
      width: {
        'xl-1/2-important': '50% !important'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(#9BDBA6 0%, #83CEA1 66.5%, #50B498 100%)'
      }
    }
  },
  plugins: []
};
