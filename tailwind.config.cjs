/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1850px',
      },
      textUnderlineOffset: {
        3: '3px',
      },
      colors: {
        'light-blue-100': '#0A66C2',
        'dark-grey': '#444444',
        'light-grey-100': '#BBBBBB',
      },
      backgroundColor: {
        'light-blue': '#0378BF',
        'light-grey': '#D0D0D0',
        'light-blue-100': '#0A66C2',
        'white-200': '#F3F3F3',
        'white-opacity': 'rgba(255, 255, 255, 0.04)',
        'white-opacity-100': '#0000001A',
        'strong-blue': '#2B4C81',
        'light-blue-300': '#407BB6',
        'light-grey-100': '#f6f6f6',
        'light-blue-200': '#009CDE',
        'dark-blue-100': '#0377BF',
        'light-grey-200': '#FBF8FA',
        'white-300': '#FBF8FA',
        'white-500': '#F5F5F5',
        'light-grey-300': '#AEAEAE',
        'red-100': '#FF7E7E',
        'light-grey-400': '#f2f2f2',
        'light-grey-500': '#ECF0F1',
        'blue-100': '#148EFF',
        'light-green': '#65DB8E',
        'light-grey-600': '#F8F8F8',
        'dark-grey': '#292D30',
        'light-blue-400': '#34B3F1',
        'light-grey-700': '#BFBFBF',
        'light-grey-150': '#E9E9E7',
        'blue-500': '#0C9ED9',
        'light-grey-800': '#8D8D8D',
        'green-300': '#11AF22',
        'dark-grey-100': '#666666',
        'grey-600': '#ededed',
        'pink-purple': '#BB6BD9',
        'green-120': '#11AF22'
      },
      borderColor: {
        'light-blue': '#0378BF',
        'light-blue-100': '#148EFF',
        'light-blue-200': '#0A66C2',
        'light-grey': '#C5C3C0',
        'grey-300': '#dcdcdc',
        'light-grey-100': 'rgba(0, 0, 0, 0.07)',
        'green-100': '#11AF22',
        'grey-200': '#E5E5E5',
        'grey-400': 'rgba(0, 0, 0, 0.1)',
        'grey-500': '#CED4DA',
        'light-grey-200': '#C8C8C8',
        'dark-grey': '#292D30',
        'green-400': '#11AF22',
        'error-red': '#ff00007d',
      },
      textColor: {
        'light-blue': '#0378BF',
        'light-grey': '#C5C3C0',
        'dark-grey': '#333333',
        'grey-500': '#505050',
        'grey-600': '#666666',
        'grey-700': '#868E96',
        'dark-100': '#0F0F0F',
        'purple-100': '#483EA8',
        'grey-800': '#676767',
        'red-100': '#FF7E7E',
        'grey-100': '#7B7B7B',
        'light-blue-200': '#0377BF',
        'grey-900': '#969696',
        'grey-1000': '#AAAAAA',
        'light-grey-100': '#8F8F8F',
        'error-red': '#E41D1D',
        'light-grey-200': '#757D8A',
        'light-gray-300': '#8D9092'
      },
      boxShadow: {
        '3xl': '0px 0px 28px rgba(86, 61, 124, 0.13)',
        'right-2xl': 'inset 3px 0px 0px #B56A9F',
        'left-2xl': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        'popins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
