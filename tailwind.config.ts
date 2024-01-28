import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#536dfe",
        'countries-green': '#34D399',
        'countries-blue': '#536dfe',
        'countries-yellow': '#f2c037',
        'countries-orange': '#ff6e40',
        'countries-mantel': '#22D3EE',
        "countries-black": "#1E1E1E",
        "countries-black-1": "#4B4B4B",
        "countries-gray": "#D9D9D9",
        "countries-gray-1": "#BFBFBF",
        "countries-danger": "#C83532",
      },
      fontFamily: {
        'countries-dale': 'Dela Gothic One',
        'countries-montserrat': 'Montserrat',
        'countries-poppins': 'Poppins',
      }
    },
  },
  darkMode: 'class',
}
export default config
