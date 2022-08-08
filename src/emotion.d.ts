import '@emotion/react';

type colType = {
  base: string;
  light?: string;
  dark?: string;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: colType;
      secondary: colType;
      jimgray: colType;
      confirmGreen: colType;
      cancelRed: colType;
    },
    screen: {
      sm: string;
    md: string;
    lg: string;
    xl: string;
    }
  }
}