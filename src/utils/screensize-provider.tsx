/* eslint-disable react/function-component-definition */
import { node } from "prop-types";
import React, { useEffect, useState } from "react";
import type { PageProps} from "gatsby"

export const ScreenSizeContext = React.createContext({
    xsDown: false,
    smDown: false,
    smUp: false,
    mdDown: false,
    mdUp: false,
    lgDown: false,
    lgUp: false,
    xlUp: false,
  });

interface Screensize {
    xsDown: boolean,
    smDown: boolean,
    smUp: boolean,
    mdDown: boolean,
    mdUp: boolean,
    lgDown: boolean,
    lgUp: boolean,
    xlUp: boolean,
}

export const ScreenSizeProvider = ({ children }: PageProps) => {
  const [screensize, setScreensize] = useState({
    xsDown: false,
    smDown: false,
    smUp: false,
    mdDown: false,
    mdUp: false,
    lgDown: false,
    lgUp: false,
    xlUp: false,
  });

  const handleResize = () => {
    const winWidth = window.innerWidth;
    const newScreensize:Screensize = { ...screensize };
    let screens = [];

    if (winWidth < 600) {
      // xs
      screens = ["xs", "xsDown", "smDown", "mdDown", "lgDown"];
    } else if (winWidth >= 600 && winWidth < 960) {
      // sm
      screens = ["sm", "smDown", "smUp", "mdDown", "lgDown"];
    } else if (winWidth >= 960 && winWidth < 1280) {
      // md
      screens = ["md", "smUp", "mdUp", "mdDown", "lgDown"];
    } else if (winWidth >= 1280 && winWidth < 1920) {
      // lg
      screens = ["lg", "smUp", "mdUp", "lgUp", "lgDown"];
    } else {
      // xl
      screens = ["xl", "smUp", "mdUp", "lgUp", "xlUp"];
    }

    screens.forEach(screen => {
      newScreensize[screen as keyof Screensize] = true;
    });

    setScreensize(newScreensize);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={screensize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
