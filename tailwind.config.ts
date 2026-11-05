import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark:       "#141414",
        deepCharcoal: "#000000",
        offWhite:     "#F1EDE3",
        softCream:    "#D8D1C2",
        mutedGray:    "#8D8B82",
        oliveSage:    "#67685D",
        warmBrown:    "#75624B",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        "cream-pill": "0 10px 30px rgba(20, 43, 32, 0.06)",
        "emerald-glow": "0 10px 30px rgba(20, 43, 32, 0.25)",
        "halo-glow": "0 0 50px rgba(229, 168, 83, 0.4)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      }
    },
  },
  plugins: [],
};

export default config;
