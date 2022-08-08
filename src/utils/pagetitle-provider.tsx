import type { PageProps } from "gatsby";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface PageTitleContextIF {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>
}

export const PageTitleContext = createContext<PageTitleContextIF>({pageTitle: "", setPageTitle: () => {}});

export const PageTitleProvider = ({ children }: PageProps) => {
  const [pageTitle, setPageTitle] = useState<string>("");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  )
}
