import type { PageProps } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import "../../styles.css";

const PageWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  border: 4px dotted red;
  padding: 8rem;
`;

export const TopLayout = ({ children }: PageProps) => {
  return <PageWrapper>{children}</PageWrapper>;
};
