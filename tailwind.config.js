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
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          800: '#0f172a',
          850: '#0b132b',
          900: '#070d1e',
          950: '#030712',
        },
        day1: {
          light: '#eff6ff',
          badge: '#dbeafe',
          border: '#93c5fd',
          primary: '#2563eb',
          dark: '#1e40af',
          gradient: 'from-blue-600 to-indigo-700',
        },
        day2: {
          light: '#f0fdf4',
          badge: '#dcfce7',
          border: '#86efac',
          primary: '#16a34a',
          dark: '#166534',
          gradient: 'from-emerald-600 to-teal-700',
        },
        day3: {
          light: '#fff7ed',
          badge: '#ffedd5',
          border: '#fdba74',
          primary: '#ea580c',
          dark: '#9a3412',
          gradient: 'from-orange-600 to-amber-700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.4)',
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
      },
    },
  },
  plugins: [],
}
