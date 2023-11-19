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
      main: "##64748b",
      light: "##a2acb9",
      dark: "#334155",
      100: "#e0e3e8",
      200: "#c1c7d1",
      300: "#a2acb9",
      400: "#8390a2",
      500: "#64748b",
      600: "#505d6f",
      700: "#334155",
      800: "#282e38",
      900: "#14171c",
    },
    secondary: {
      main: "#ed5623",
      light: "#fbddd3",
      dark: "#8e3415",
      100: "#f8bba7",
      200: "#f6ab91",
      300: "#f49a7b",
      400: "#f1784f",
      500: "#ed5623",
      600: "#be451c",
      700: "#8e3415",
      800: "#772b12",
      900: "#5f220e",
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
