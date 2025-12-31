import { createTheme } from "@mui/material/styles";
import {
  borderRadius,
  breakpoints,
  colours,
  shadows,
  typography,
  spacing,
} from "./constants";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colours.primary.main,
      light: colours.primary.light,
      dark: colours.primary.dark,
      contrastText: colours.primary.contrastText,
    },
    secondary: {
      main: colours.secondary.main,
      light: colours.secondary.light,
      dark: colours.secondary.dark,
      contrastText: colours.secondary.contrastText,
    },
    success: {
      main: colours.success.main,
      light: colours.success.light,
      dark: colours.success.dark,
      contrastText: colours.success.contrastText,
    },
    error: {
      main: colours.error.main,
      light: colours.error.light,
      dark: colours.error.dark,
      contrastText: colours.error.contrastText,
    },
    warning: {
      main: colours.warning.main,
      light: colours.warning.light,
      dark: colours.warning.dark,
      contrastText: colours.warning.contrastText,
    },
    info: {
      main: colours.info.main,
      light: colours.info.light,
      dark: colours.info.dark,
      contrastText: colours.info.contrastText,
    },

    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.6)",
      disabled: "rgba(0,0,0,0.38)",
    },
    divider: "rgba(0,0,0,0.12)",
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
          boxShadow: shadows.light,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
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
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "none",
          boxShadow: shadows.medium,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:MuiOutlinedInput-root": {
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
          borderBottom: `1px solid ${colours.grey[200]}`,
        },
        head: {
          fontWeight: 600,
          background: colours.grey[50],
        },
      },
    },
  },
});
