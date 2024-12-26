import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFF',
      gray: {
        '100': '#E1E1E6',
        '200': '#A9A9B2',
        '400': '#7C7C8A',
        '500': '#505059',
        '600': '#323238',
        '700': '#29292E',
        '800': '#202024',
        '900': '#121214',
      },
      green: {
        '300': '#00B37E',
        '500': '#00875F',
        '700': '#015F43',
        '900': '#00291D',
      },
      red: {
        '300': '#f75a68',
        '500': '#A50203',
        '700': '#960203',
      },
      yellow: {
        '500': '#FFCC00',
        '700': '#FFB300',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
      maxWidth: {
        res: 'calc(100vw - (100vw - 1180px) / 2)',
      },
      gridTemplateColumns: {
        Form: '1fr auto',
        step: 'repeat(4,1fr)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
}
export default config
