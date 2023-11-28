import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography: {
    fontFamily: "Lexend,  sans-serif",
    // allVariants: {
    // 	color: "#000",
    // },
    button: {
      textTransform: "unset",
    },
  },
  palette: {
    primary: {
      main: "#f36d6c",
      light: "#f79998",
      dark: "#c25756",
      50: "#fef0f0",
      100: "#fbd3d3",
      200: "#f9b6b6",
      300: "#f79998",
      400: "#f47c7b",
      500: "#db6261",
      600: "#c25756",
      700: "#aa4c4c",
      800: "#7a3736",
      900: "#492120",
      contrastText: "#fff",
    },
    secondary: {
      main: "#475569",
      light: "#cbd5e1",
      dark: "#1e293b",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      contrastText: "#fff",
    },
    success: {
      light: "#9bd99b",
      main: "#5ec25e",
      dark: "#36b336",
      contrastText: "#fff",
    },
    info: {
      main: "#ffffff",
      contrastText: "#401b60",
    },
    warning: {
      light: "#f3b999",
      main: "#ed9666",
      dark: "#e15000",
      contrastText: "#fff",
    },
    error: {
      light: "#d0736e",
      main: "#c1453d",
      dark: "#b1160d",
      contrastText: "#fff",
    },
  },
});

export default theme;
