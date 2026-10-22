import type { Config } from "tailwindcss"

// Palette: "into the light". Warm ink and bone carry the site, signal yellow
// (from the original brand) is the action and light color, clay marks states
// and small accents.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0F0E0C", 2: "#191713", 3: "#25221D" },
        bone: { DEFAULT: "#F3EFE9", 2: "#E6DFD3" },
        signal: { DEFAULT: "#FFCB37", deep: "#E8AE12" },
        clay: "#A84A24",
        muted: "#ABA498",
        stone: "#5A544B",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.14em" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        lead: ["clamp(1.125rem, 1.6vw, 1.375rem)", { lineHeight: "1.55" }],
        h3: ["clamp(1.375rem, 2.2vw, 1.875rem)", { lineHeight: "1.15" }],
        h2: ["clamp(2.25rem, 5.2vw, 4.5rem)", { lineHeight: "0.95" }],
        h1: ["clamp(3rem, 8.6vw, 8.5rem)", { lineHeight: "0.86" }],
        quote: ["clamp(1.75rem, 3.6vw, 3.25rem)", { lineHeight: "1.12" }],
      },
      maxWidth: { page: "84rem", measure: "38rem" },
      spacing: { gutter: "clamp(1rem, 4vw, 3rem)", nav: "4.5rem" },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
}
export default config
