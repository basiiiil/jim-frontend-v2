import { PageProps } from "gatsby";
import React, { createContext, useState } from "react";

export const PageTitleContext = createContext({pageTitle: "", setPageTitle: undefined});

export const PageTitleProvider = ({ children }:PageProps) => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  )
}
