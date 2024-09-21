/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: [
          'Pretendard', // 로컬 및 웹폰트 모두 사용
          'Arial',
          'Pretendard Variable',
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
        'custom-gray': '#ededed',
        'custom-deepblue': '#074173',
        'custom-skyblue': '#1679AB'
      },
      width: {
        'xl-1/2-important': '50% !important'
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to right bottom, #2587e8, #5396eb, #72a5ed, #8db5f0, #a6c4f2, #accaf1, #b4cfef, #bcd4ee, #b3d1e9, #abcde3, #a3cadd, #9cc6d7)'
      }
    }
  },
  plugins: []
};
