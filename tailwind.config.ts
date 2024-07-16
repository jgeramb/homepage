import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "app.{js,ts,vue}"
  ],
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      primary: colors.zinc,
      highlight: "#4ca6ff",
      error: "#d93036",
      warning: "#f5a623",
      success: "#0cce6b"
    },
    fontFamily: {
      title: ["Outfit", "Helvetica Neue", "Helvetica", "sans-serif"],
      text: ["Inter", "Helvetica Neue", "Helvetica", "sans-serif"]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
      }
    }
  }
};
