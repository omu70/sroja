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
          DEFAULT: "#F4EFE5",
          bright: "#FAF7EF",
          soft: "#EFE8D9",
          mute: "#E2DAC7",
        },
        stone: {
          DEFAULT: "#A89F90",
          dark: "#766E60",
          light: "#C5BDAE",
        },
        brass: {
          DEFAULT: "#9A7A42",
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
        marquee: "marquee 44s linear infinite",
        "fade-up": "fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
        "float-late": "float 8.5s ease-in-out 1.2s infinite",
        "spin-slow": "spin 28s linear infinite",
        kenburns: "kenburns 16s ease-in-out infinite alternate",
        shimmer: "shimmer 3.4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4.5s ease-in-out infinite",
        scrollcue: "scrollcue 2.2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-9px)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-150% 0" },
          "60%, 100%": { backgroundPosition: "250% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        scrollcue: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(220%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
