import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0f',
      paper: '#111118',
    },
    primary: {
      main: '#6c63ff',
    },
    secondary: {
      main: '#00d4aa',
    },
    text: {
      primary: '#f0f0ff',
      secondary: '#8888aa',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0a0a0f',
          color: '#f0f0ff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a24',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          transition: 'all 200ms ease',
          '&:hover': {
            borderColor: 'rgba(108,99,255,0.4)',
            boxShadow: '0 0 20px rgba(108,99,255,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          transition: 'all 200ms ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c73ff, #9b6cf6)',
            boxShadow: '0 0 20px rgba(108,99,255,0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(108,99,255,0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6c63ff',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17,17,24,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.7rem',
        },
      },
    },
  },
});

export default theme;
