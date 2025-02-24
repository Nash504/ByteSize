/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"], // Add Roboto font
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#58CC02",
        primary: {
          DEFAULT: "#78CA33", // Duolingo green
          foreground: "#FFFFFF", // White text on buttons
        },
        secondary: {
          DEFAULT: "#9CEE6F", // Light green
          foreground: "#333333", // Dark gray text
        },
        muted: {
          DEFAULT: "#D1D5DB", // Light gray
          foreground: "#6B7280", // Gray text
        },
        accent: {
          DEFAULT: "#4FE029", // Bright green
          foreground: "#FFFFFF", // White text
        },
        destructive: {
          DEFAULT: "#F87171", // Red
          foreground: "#FFFFFF", // White text
        },
        border: "#E5E7EB", // Light gray border
        input: "#F3F4F6", // Light gray input background
        ring: "#60A5FA", // Blue ring
        chart: {
          1: "#FF5733",
          2: "#33FF57",
          3: "#3357FF",
          4: "#F333FF",
          5: "#33F3FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".backface-hidden": {
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden",
        },
        ".transform-style-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
      });
    },
  ],
};
