/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        basalt: {
          950: "#0B0C10",
          900: "#14161C",
          800: "#1C1F27",
          700: "#282C37",
          600: "#3A3F4D",
        },
        rust: {
          400: "#D9633B",
          500: "#B33F23",
          600: "#8F2F19",
          700: "#6E2412",
        },
        titanium: {
          300: "#E4E7EB",
          400: "#AEB4BD",
          500: "#7C838F",
        },
        amber: {
          400: "#E8A23D",
          500: "#CC7F1F",
        },
        printline: {
          300: "#B7F3EE",
          400: "#7FE7E0",
          500: "#4CC9C1",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        printrise: {
          "0%": { transform: "scaleY(0)", opacity: "0.4" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(6px,-8px)" },
        },
      },
      animation: {
        printrise: "printrise 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
        scan: "scan 3.2s linear infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
