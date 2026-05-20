/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // JHU-inspired professional color palette with complementary and accent colors
        'jhu-deep-blue': '#002D72',      // Deep blue (for hero sections only)
        'jhu-blue': '#5A8FA0',           // Light steel blue (background color)
        'jhu-heritage-blue': '#5A8FA0',  // Light steel blue (background color)
        'jhu-spirit-blue': '#A2C6E9',    // Light sky blue (button color)
        'jhu-accent-blue': '#A2C6E9',    // Light sky blue (button color)
        'jhu-dark': '#5A8FA0',           // Light steel blue (background color)
        'jhu-gray': '#5A6872',           // Professional gray
        'jhu-light-gray': '#E8E9EA',     // Light background gray
        'jhu-gold': '#CFB87C',  
         'steel-blue': "#4D6A92",         // Academic gold accent
        
        // Legacy colors (keeping for compatibility)
        'wine-red': '#8B0000',
        'royal-violet': '#6A0DAD',
        'coral-red': '#FF4D6D',
        'lavender-tint': '#F5F7FA',      // Updated to cleaner gray-blue
        'dark-navy': '#5A8FA0',          // Light steel blue (background color)
        'soft-white': '#F8FAFC',
        'light-gray': '#CBD5F5',
        'description-gray': '#5A6872',   // Updated to JHU gray
        'muted-gray': '#94A3B8',
        'pink-gradient-start': '#FF6B8A',
        'pink-gradient-end': '#FCA5A5'
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
        '3000': '3000px',
      }
    },
  },
  plugins: [],
}
