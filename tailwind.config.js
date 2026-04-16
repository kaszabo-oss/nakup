/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // emerald (Potraviny)
    'bg-emerald-500', 'bg-emerald-50', 'bg-emerald-100',
    'border-emerald-200', 'border-emerald-500',
    'text-emerald-700', 'shadow-emerald-200',
    'hover:bg-emerald-100', 'hover:bg-emerald-600',
    // sky (Drogeria)
    'bg-sky-500', 'bg-sky-50', 'bg-sky-100',
    'border-sky-200', 'border-sky-500',
    'text-sky-700', 'shadow-sky-200',
    'hover:bg-sky-100', 'hover:bg-sky-600',
    // rose (Kozmetika)
    'bg-rose-500', 'bg-rose-50', 'bg-rose-100',
    'border-rose-200', 'border-rose-500',
    'text-rose-700', 'shadow-rose-200',
    'hover:bg-rose-100', 'hover:bg-rose-600',
    // amber (Ostatne)
    'bg-amber-500', 'bg-amber-50', 'bg-amber-100',
    'border-amber-200', 'border-amber-500',
    'text-amber-700', 'shadow-amber-200',
    'hover:bg-amber-100', 'hover:bg-amber-600',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
