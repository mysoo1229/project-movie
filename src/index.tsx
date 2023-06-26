import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={myTheme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
