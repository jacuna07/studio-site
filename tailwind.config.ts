import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Brand palette (see the "Tresunotres brand guidelines: color and
      // type" doc). The short names the site already uses (ink, cobalt,
      // stone, mist, paper) keep working: `bg-ink` is Ink 950, `text-cobalt`
      // is Cobalt 500. Stone and Mist are now steps of the Ink scale, so
      // every gray shares the background's slight blue tint.
      colors: {
        ink: {
          DEFAULT: "#0B0C10",
          50: "#F6F7F9",
          100: "#ECEDF1",
          200: "#D5D7DE",
          300: "#B2B5BF",
          400: "#8B8F9B",
          500: "#646977",
          600: "#474B57",
          700: "#30333C",
          800: "#20222A",
          900: "#15171C",
          950: "#0B0C10",
        },
        cobalt: {
          DEFAULT: "#3057FF",
          50: "#EEF2FF",
          100: "#DCE4FF",
          200: "#BAC8FF",
          300: "#8CA3FF",
          // Use 400 for small cobalt text on ink (5.5:1); 500 is 3.7:1,
          // fine for large type, fills, icons and focus rings.
          400: "#5E7DFF",
          500: "#3057FF",
          600: "#2143E0",
          700: "#1833B3",
          800: "#142985",
          900: "#101F5C",
          950: "#0A1438",
        },
        paper: "#FFFFFF",
        stone: "#8B8F9B", // = ink-400 (was #8a8a8a)
        mist: "#20222A", // = ink-800 (was #242424)
        success: "#2BD98A",
        warning: "#FFB547",
        error: "#FF5A5F",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-montserrat)", "system-ui", "sans-serif"],
        mono: ["var(--font-montserrat)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        // The page grid (see Container): margins of 24px on mobile and
        // 32px from md up, growing with the screen until it's 1920px wide,
        // like the reference studio sites.
        content: "1920px",
        // Comfortable reading width for longer copy blocks, so text doesn't
        // run into very long lines now that the grid itself is wider. It
        // matches the old two-thirds column at a 1440px screen (~893px), so
        // line breaks there stay the same; it only stops the copy growing
        // on bigger screens.
        copy: "900px",
      },
    },
  },
  plugins: [],
};

export default config;
