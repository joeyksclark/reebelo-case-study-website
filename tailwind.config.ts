module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
      colors: {
        primary: {
          100: '#E6F7FF',
          500: '#3490DC',
          900: '#1E293B',
        },
        secondary: {
          100: '#FCE7F3',
          500: '#F472B6',
          900: '#742A68',
        },
      },
      container: {
        center: true,
        padding: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
