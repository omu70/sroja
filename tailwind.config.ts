import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1B1813",
          deep: "#141210",
          soft: "#26221B",
          line: "#383228",
        },
        ivory: {
          DEFAULT: "#F2EDE2",
          bright: "#F9F5EB",
          soft: "#EAE3D3",
          mute: "#DDD4C0",
        },
        stone: {
          DEFAULT: "#A89F90",
          dark: "#7C7466",
          light: "#C5BDAE",
        },
        brass: {
          DEFAULT: "#A0804A",
          bright: "#C2A35F",
          dim: "#6E5832",
        },
        gold: {
          DEFAULT: "#C6A75E",
          matte: "#B3954F",
        },
        walnut: {
          DEFAULT: "#5A4533",
          deep: "#3E2F23",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.32em",
        wider2: "0.18em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "slow-zoom": "slowZoom 14s ease-out forwards",
        marquee: "marquee 48s linear infinite",
        "fade-up": "fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) both",
      },
      keyframes: {
        slowZoom: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
