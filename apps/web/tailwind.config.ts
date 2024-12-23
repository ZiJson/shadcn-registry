import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary":
          "conic-gradient( #811a90, #c3c8ff, #e897dd, #e47b9e, #ffdbdb)",
        "gradient-secondary":
          "conic-gradient(at 75% 25%, #4d0059, #ffaaea, #ffc487, #6e3fff, #ffdbdb)",
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "spin-slower": "spin 20s linear infinite",
        "pulse-slow": "pulse 15s linear infinite",
      },
      keyframes: {
        pulse: {
          "50%": {
            opacity: "0.1",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".border-gradient": {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            border: "20px solid rgba(255,255,255,0.3)",
            "border-image":
              "conic-gradient(at 75% 25%, #811a90, #c3c8ff, #e897dd, #e47b9e, #ffdbdb) 1",
            filter: "blur(20px)",
            "pointer-events": "none",
            "z-index": "-1",
          },
        },
      })
    }),
  ],
  // safelist: [
  //   {
  //     pattern: /./,
  //   },
  // ],
} satisfies Config
