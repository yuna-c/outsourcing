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
      screens: {
        xs: { min: '350px' }
      },
      colors: {
        'custom-gray': '#ededed',
        'custom-deepblue': '#074173',
        'custom-skyblue': '#1679AB'
      },
      width: {
        'xl-1/2-important': '50% !important',
        fit: 'fit-content'
      },
      maxWidth: {
        fit: 'fit-content'
      },
      height: {
        fit: 'fit-content'
      },
      minHeight: {
        fit: 'fit-content'
      },
      backgroundImage: {
        'custom-gradient':
          // 'linear-gradient(to right bottom, #2587e8, #5396eb, #72a5ed, #8db5f0, #a6c4f2, #accaf1, #b4cfef, #bcd4ee, #b3d1e9, #abcde3, #a3cadd, #9cc6d7)',
          'linear-gradient(to right bottom, rgb(229, 235, 240, 92%), rgb(59, 130, 246, 0.5)), url(/src/assets/images/gallery_bg1.png)',
        'custom-main-gradient':
          'linear-gradient(rgba(7, 65, 115, 0.922), rgba(0, 0, 0, 0.5)), url("/src/assets/images/pills.jpg")'
      }
    }
  },
  plugins: [],
  corePlugins: {
    fontSmoothing: true
  }
};
