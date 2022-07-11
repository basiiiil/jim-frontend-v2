import * as React from "react";
import { GatsbyBrowser } from "gatsby"
import { ScreenSizeProvider } from "../utils/screensize-provider"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
    element,
  }) => {
    return (
      <ScreenSizeProvider>
        {element}
      </ScreenSizeProvider>
    )
  }