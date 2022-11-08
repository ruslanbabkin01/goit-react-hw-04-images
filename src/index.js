import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { App } from './components/App';
import { GlobalStyles, theme } from '../src/styles/index';
import { Global, ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
