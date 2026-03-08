import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, "index.html"),
    path.join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        overlay: "var(--bg-overlay)",
        canvas: {
          DEFAULT: "#1a1a1f",
          raised: "#222228",
          elevated: "#2a2a31",
          overlay: "#32323a",
        },
        ink: {
          DEFAULT: "#e8e6e3",
          muted: "#9a9898",
          faint: "#5e5d5c",
          ghost: "#3d3d42",
        },
        accent: {
          emerald: "#34d399",
          "emerald-dim": "#065f46",
          amber: "#fbbf24",
          "amber-dim": "#78350f",
          blue: "#60a5fa",
          "blue-dim": "#1e3a5f",
          rose: "#fb7185",
          "rose-dim": "#4c1d2e",
        },
        border: {
          DEFAULT: "#2e2e35",
          subtle: "#262629",
        },
      },
    },
  },
  plugins: [],
};
