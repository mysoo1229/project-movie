import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    black: {
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    blue: string;
  }
}
