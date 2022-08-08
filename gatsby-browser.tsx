import "@fontsource/nunito/200.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/nunito/900.css";
import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import { ScreenSizeProvider } from "./src/utils/screensize-provider";
import { PageTitleProvider } from "./src/utils/pagetitle-provider";
import { ThemeProvider } from "@emotion/react";

import "./styles.css";
import theme from "./src/design/theme";
import { TopLayout } from "./src/layout/topLayout";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <TopLayout>
        <ScreenSizeProvider>
          <PageTitleProvider>{element}</PageTitleProvider>
        </ScreenSizeProvider>
      </TopLayout>
    </ThemeProvider>
  );
};
