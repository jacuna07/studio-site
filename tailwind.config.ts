import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C10",
        paper: "#ffffff",
        stone: "#8a8a8a",
        mist: "#242424",
        cobalt: "#3057ff",
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
