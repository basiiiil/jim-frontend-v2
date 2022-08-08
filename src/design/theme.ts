import { Theme } from "@emotion/react";

const theme:Theme = {
  colors: {
    primary: {
      base: "#991A5F",
      light: "#ab437c",
      dark: "#7d154e",
    },
    secondary: {
      base: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    jimgray: {
      base: "#1e293b",
    },
    confirmGreen: {
      base: "#22c55e",
      light: "#4ade80",
      dark: "#16a34a",
    },
    cancelRed: {
      base: "#e11d48",
      light: "#f43f5e",
      dark: "#be123c",
    }
  },
  screen: {
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
  },
};

export default theme;
