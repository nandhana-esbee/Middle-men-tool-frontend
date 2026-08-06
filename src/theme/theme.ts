import { createTheme, alpha } from "@mui/material/styles";

/**
 * Design tokens for the Middle Men Console.
 *
 * This is an internal developer tool for managing generation "sessions" and
 * the "modules" (API contracts: page, route, input/output features) inside
 * them, so the palette and type system lean into that: a confident signal
 * blue for actions, a teal for "output"/success states, an amber for
 * destructive-adjacent warnings, and a monospace face reserved for anything
 * that is literally data (session ids, api routes, JSON).
 */

const ink = {
  900: "#12131A",
  700: "#2B2E3B",
  500: "#5B5F72",
  300: "#9A9DAE",
  200: "#C7CAD6",
  100: "#E2E5EC",
  50: "#F4F5F8",
};

const signal = {
  main: "#3454D1",
  dark: "#243B99",
  light: "#5B78E0",
  soft: "#EBEFFC",
};

const teal = {
  main: "#0E8E82",
  dark: "#0A6259",
  light: "#38A99E",
  soft: "#E3F5F2",
};

const amber = {
  main: "#B4740E",
  dark: "#8A5807",
  light: "#D69A3E",
  soft: "#FBF0DD",
};

const coral = {
  main: "#C7434B",
  dark: "#9C2C33",
  light: "#DA6B71",
  soft: "#FBEAEB",
};

declare module "@mui/material/styles" {
  interface Palette {
    ink: typeof ink;
    accentTeal: typeof teal;
  }
  interface PaletteOptions {
    ink?: typeof ink;
    accentTeal?: typeof teal;
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: signal,
    secondary: teal,
    error: coral,
    warning: amber,
    success: teal,
    ink,
    accentTeal: teal,
    background: {
      default: ink[50],
      paper: "#FFFFFF",
    },
    text: {
      primary: ink[900],
      secondary: ink[500],
    },
    divider: ink[100],
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    subtitle1: { fontWeight: 500 },
    subtitle2: {
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontSize: "0.72rem",
      color: ink[500],
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: ink[50],
        },
        "::selection": {
          backgroundColor: alpha(signal.main, 0.2),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: ink[900],
          backgroundImage: "none",
          boxShadow: "none",
          borderBottom: `1px solid ${ink[700]}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 16,
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${ink[100]}`,
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: ink[100],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export const mono = '"JetBrains Mono", ui-monospace, Menlo, monospace';
export { ink, signal, teal, amber, coral };
