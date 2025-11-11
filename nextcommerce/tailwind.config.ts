import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0A0A0A',       // --bg-color principal
        'dark-card': '#1A1A1A',  // --card-bg
        'dark-lighter': '#222222', // --skill-bg
        
        'neon': '#A78BFA',       // --primary-color (Roxo Neon)
        'neon-dark': '#8B5CF6',  // --primary-color-darker
        
        'gray-text': '#e0e0e0',  // --text-color principal
        'gray-muted': '#9ca3af', // Texto secundário
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-poppins)'],
        mono: ['var(--font-fira-code)'],
      },
      boxShadow: {
        'neon': '0 0 12px rgba(167, 139, 250, 0.8)',
        'card': '0 5px 15px rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'gradient-skeleton': 'linear-gradient(90deg, #1A1A1A 25%, #222222 50%, #1A1A1A 75%)',
      },

      animation: {
        'fadeIn': 'fadeIn 0.2s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;