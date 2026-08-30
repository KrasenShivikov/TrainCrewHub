import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rail: {
          ink: "#17212b",
          line: "#d7dde3",
          mist: "#f5f7f9",
          signal: "#c9362b",
          route: "#256f63"
        }
      },
      boxShadow: {
        panel: "0 1px 2px rgba(23, 33, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
