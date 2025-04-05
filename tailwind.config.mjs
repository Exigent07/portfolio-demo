/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground-color)",
        highlight: "var(--highlight-color)",
        accent: "var(--accent-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)"
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        subheading: ["Space Grotesk", "sans-serif"],
        body: ["Ubuntu", "sans-serif"],
        load1: ["Orbitron", "sans-serif"],
        load2: ["Saira Stencil One", "sans-serif"],
        load3: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
