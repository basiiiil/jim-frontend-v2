import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type PageTitleProviderProps = {
  children?: React.ReactNode;
};

interface PageTitleContextIF {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
}

export const PageTitleContext = createContext<PageTitleContextIF>({
  pageTitle: "",
  setPageTitle: () => {},
});

export const PageTitleProvider = ({ children }: PageTitleProviderProps) => {
  const [pageTitle, setPageTitle] = useState<string>("");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};
