import { createTheme } from "@mui/material/styles";
import {
  borderRadius,
  breakpoints,
  colours,
  typography,
  spacing,
  shadows,
} from "./constants";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colours.primary.light,
      light: "#64b5f6",
      dark: colours.primary.main,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colours.secondary.light,
      light: "#ce93d8",
      dark: colours.secondary.main,
      contrastText: "#ffffff",
    },
    success: {
      main: colours.success.light,
      light: "#81c784",
      dark: colours.success.main,
      contrastText: "#ffffff",
    },
    error: {
      main: colours.error.light,
      light: "#e57373",
      dark: colours.error.main,
      contrastText: "#ffffff",
    },
    warning: {
      main: colours.warning.light,
      light: "#ffb74d",
      dark: colours.warning.main,
      contrastText: "#ffffff",
    },
    info: {
      main: colours.info.light,
      light: "#4fc3f7",
      dark: colours.info.main,
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.6)",
      disabled: "rgba(255,255,255,0.38)",
    },
    divider: "rgba(255,255,255,0.12)",
    grey: colours.grey,
  },
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeightLight: typography.fontWeightLight,
    fontWeightRegular: typography.fontWeightRegular,
    fontWeightMedium: typography.fontWeightMedium,
    fontWeightBold: typography.fontWeightBold,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    h6: typography.h6,
  },
  spacing,
  breakpoints: {
    values: breakpoints,
  },
  shape: {
    borderRadius: borderRadius.medium,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: borderRadius.medium,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: shadows.light,
          "&:hover": {
            boxShadow: shadows.medium,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.large,
          boxShadow: shadows.medium,
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: shadows.light,
        },
        elevation2: {
          boxShadow: shadows.medium,
        },
        elevation3: {
          boxShadow: shadows.heavy,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows.light,
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: shadows.medium,
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:MuiOutlinedinput-root": {
            borderRadius: borderRadius.medium,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.small,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
      },
    },
  },
});
