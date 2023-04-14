import { createTheme } from "@mui/material/styles";


const jimTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#991a5f",
      contrastText: "#fff",
    },
    secondary: {
      main: "##0eef91",
    },
    background: {
      default: "#ffffff",
    },
    jimgray: {
      main: "#374151",
    },
    error: {
      main: "#dc2626",
    },
    success: {
      main: "#84cc16",
    },
    warning: {
      main: "#facc15",
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true
      }
    }
  },
})

export default jimTheme;
