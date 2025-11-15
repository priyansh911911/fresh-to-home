import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { glassmorphismTheme } from './utils/theme';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={glassmorphismTheme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        background: '#ffffff',
        backgroundAttachment: 'fixed'
      }}>
        <App />
      </div>
    </ThemeProvider>
  </BrowserRouter>
);