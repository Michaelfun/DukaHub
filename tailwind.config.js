/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f5',
          100: '#fce7ec',
          200: '#f9c5d4',
          300: '#f59eb7',
          400: '#f0688f',
          500: '#e93f6f',
          600: '#d71c5b',
          700: '#b01449',
          800: '#91143f',
          900: '#7a1438',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        burgundy: {
          50: '#fdf2f5',
          100: '#fce7ec',
          200: '#f9c5d4',
          300: '#f59eb7',
          400: '#e05c7e',
          500: '#d02957',
          600: '#ae1c45',
          700: '#91143f',
          800: '#7a1438',
          900: '#641230',
        },
        accent: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d1dae7',
          300: '#aabcd3',
          400: '#7d98ba',
          500: '#5e7da2',
          600: '#476488',
          700: '#3a516f',
          800: '#324560',
          900: '#2d3c51',
        },
        dark: {
          bg: '#111927',
          card: '#1a2333',
          sidebar: '#0f1623',
          border: '#2e3a4f',
          primary: '#e93f6f',
          text: {
            primary: '#ffffff',
            secondary: '#9ca3af',
            muted: '#6b7280'
          },
          accent: '#007bff',
          hover: '#2e3a4f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} 