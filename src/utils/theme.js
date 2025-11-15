import { createTheme } from '@mui/material/styles';

export const glassmorphismTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4caf50' },
    secondary: { main: '#ff5722' },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#333'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});