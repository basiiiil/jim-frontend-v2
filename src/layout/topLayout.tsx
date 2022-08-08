import type { PageProps } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import "../../styles.css";

const PageWrapper = styled.main({
  display: "flex",
  width: "100vw",
  height: "100vh",
  // border: "4px dotted red",
});

const NavWrapper = styled.nav((props) => ({
  display: "flex",
  flexFlow: "column nowrap",
  left: 0,
  width: "20rem",
  backgroundColor: props.theme.colors.primary.base,
}));

const MainWrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  // border: "4px dotted green",
  alignItems: "center",
});

const ContentWrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  width: "50%",
  height: "100%",
  border: "4px dotted red",
  padding: "1rem",
});

export const TopLayout = ({ children }: PageProps) => {
  return (
    <PageWrapper>
      <NavWrapper />
      <MainWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </MainWrapper>
    </PageWrapper>
  );
};
