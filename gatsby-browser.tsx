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
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { PageTitleProvider } from "./src/utils/PageTitleProvider";
import "./styles.css";
import { TopLayout } from "./src/layout/TopLayout";
import jimTheme from "./src/design/theme";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={jimTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <PageTitleProvider>
              <TopLayout>{element}</TopLayout>
            </PageTitleProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};
