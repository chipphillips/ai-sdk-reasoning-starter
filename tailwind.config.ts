import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        card: "var(--card)",
        
        // Modern American Color Palette
        american: {
          navy: "#1e3a5f",
          red: "#c41e3a", 
          white: "#fafafa",
          charcoal: "#2d3748",
          silver: "#e2e8f0",
          cream: "#f7fafc",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Consolas", "Monaco", "monospace"],
      },
      boxShadow: {
        'american': '0 4px 6px -1px rgba(30, 58, 95, 0.1), 0 2px 4px -1px rgba(30, 58, 95, 0.06)',
        'american-lg': '0 10px 15px -3px rgba(30, 58, 95, 0.1), 0 4px 6px -2px rgba(30, 58, 95, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;