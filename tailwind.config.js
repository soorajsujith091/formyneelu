/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 330 80% 90%))",
        input: "hsl(var(--input, 330 80% 90%))",
        ring: "hsl(var(--ring, 345 80% 50%))",
        background: "hsl(var(--background, 350 100% 98%))",
        foreground: "hsl(var(--foreground, 340 50% 20%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 345 80% 50%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 330 80% 92%))",
          foreground: "hsl(var(--secondary-foreground, 340 50% 20%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 330 60% 95%))",
          foreground: "hsl(var(--muted-foreground, 340 30% 45%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 345 80% 50%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 100%))",
        },
      },
    },
  },
  plugins: [],
}
