module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // This makes sure Tailwind looks for classes in all your components
  theme: {
    extend: {
      animation: {
        'spinner-grow': 'spinner-grow 0.75s linear infinite', // Add the custom spinner-grow animation
      },
      keyframes: {
        'spinner-grow': {
          '0%': { transform: 'rotate(0deg)' },  // Rotate from 0 degrees
          '100%': { transform: 'rotate(360deg)' }, // Rotate to 360 degrees
        },
      },
    },
  },
  plugins: [],
};

