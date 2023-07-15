import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
