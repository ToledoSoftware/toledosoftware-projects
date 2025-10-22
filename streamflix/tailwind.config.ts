// tailwind.config.ts
import type { Config } from "tailwindcss";
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- Fonts ---
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      // --- Portfolio Colors ---
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          lighter: '#222222',
        },
        primary: {
          DEFAULT: '#A78BFA',
          darker: '#8B5CF6',
        },
        text: {
          DEFAULT: '#e0e0e0',
          muted: '#a0a0a0',
        },
        border: '#333',
      },
      // --- Neon Glow ---
      boxShadow: {
        'neon-glow': '0 0 12px rgba(167, 139, 250, 0.8)',
      }
    },
  },
  plugins: [
    scrollbar,
  ],
};
export default config;