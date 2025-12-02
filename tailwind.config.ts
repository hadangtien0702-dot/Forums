
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-pin-grid': 'float-pin-grid 3s ease-in-out infinite',
        'float-pin-featured': 'float-pin-featured 3s ease-in-out infinite',
        'pulse-custom': 'pulse-custom 2s infinite',
        'fadeInDown-custom': 'fadeInDown 0.8s ease forwards',
        'fadeInUp-custom': 'fadeInUp 0.8s ease forwards',
      },
      keyframes: {
        'float-pin-grid': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'float-pin-featured': {
          '0%, 100%': { transform: 'rotate(-15deg) translateY(0)' },
          '50%': { transform: 'rotate(-20deg) translateY(-8px)' },
        },
        'pulse-custom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeInDown: {
          'from': { opacity: '0', transform: 'translateY(-30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
