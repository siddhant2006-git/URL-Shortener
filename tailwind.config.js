/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: [
          "var(--font-size-xs)",
          { lineHeight: "var(--line-height-normal)" },
        ],
        sm: [
          "var(--font-size-sm)",
          { lineHeight: "var(--line-height-normal)" },
        ],
        base: [
          "var(--font-size-base)",
          { lineHeight: "var(--line-height-normal)" },
        ],
        lg: [
          "var(--font-size-lg)",
          { lineHeight: "var(--line-height-normal)" },
        ],
        xl: ["var(--font-size-xl)", { lineHeight: "var(--line-height-tight)" }],
        "2xl": [
          "var(--font-size-2xl)",
          { lineHeight: "var(--line-height-tight)" },
        ],
        "3xl": [
          "var(--font-size-3xl)",
          { lineHeight: "var(--line-height-tight)" },
        ],
        "4xl": [
          "var(--font-size-4xl)",
          { lineHeight: "var(--line-height-tight)" },
        ],
        "5xl": [
          "var(--font-size-5xl)",
          { lineHeight: "var(--line-height-tight)" },
        ],
      },
      colors: {
        border: "var(--border-primary)",
        input: "var(--border-primary)",
        ring: "var(--text-primary)",
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--text-primary)",
          foreground: "var(--bg-primary)",
        },
        secondary: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--text-secondary)",
        },
        muted: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--text-muted)",
        },
        "text-tertiary": "var(--text-tertiary)",
        "bg-interactive": "var(--bg-interactive)",
        accent: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--text-secondary)",
        },
        destructive: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "var(--bg-primary)",
          foreground: "var(--text-primary)",
        },
        black: "#000000",
        "near-black": "#111111",
        "dark-gray": "#1a1a1a",
        "medium-gray": "#666666",
        "light-gray": "#e5e5e5",
        "lighter-gray": "#dcdcdc",
        "off-white": "#fafafa",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
